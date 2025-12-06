// Ambil topic dari URL (mapping kuis-general -> general)
const urlParams = new URLSearchParams(window.location.search);
const rawTopic = urlParams.get("topic");
const topic = rawTopic === "kuis-general" ? "general" : rawTopic;
const levelContainer = document.getElementById("levelSelect");
const quizBox = document.querySelector(".quiz-box");
const levelIndicator = document.getElementById("levelIndicator");
const topicPageMap = {
  pengertian: "pengertian-meteorologi.html",
  awan: "awan.html",
  struktur: "struktur-atmosfer.html",
  fenomena: "fenomena-cuaca.html",
  parameter: "parameter-meteorologi.html",
  alat: "taman-alat.html",
  karir: "karir-meteorologi.html",
  "map-bmkg": "map-bmkg.html",
};

let soal = [];
let index = 0;
let score = 0;
let level = topic === "general" ? null : null;
let sessionCounter = 0; // untuk mencegah race saat ganti level
let currentSession = 0;
let audioCtx;

const friendlyTopic = rawTopic === "kuis-general"
  ? "Kuis General"
  : (topic ? topic.replace(/-/g, " ") : "Kuis");

function ensureAudio() {
  if (audioCtx || typeof AudioContext === "undefined") return audioCtx;
  audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(type = "ok") {
  const ctx = ensureAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;

  const config = type === "ok"
    ? { freq: 760, dur: 0.16 }
    : { freq: 220, dur: 0.22 };

  osc.frequency.value = config.freq;
  osc.type = type === "ok" ? "triangle" : "sawtooth";
  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + config.dur);

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + config.dur);
}

function setTopicLabel() {
  const labelEl = document.getElementById("quizTopic");
  if (!labelEl) return;
  const base = rawTopic === "kuis-general"
    ? "KUIS GENERAL"
    : (topic ? topic.toUpperCase() : "KUIS");
  labelEl.textContent = level ? `${base} — ${level.toUpperCase()}` : base;
}

setTopicLabel();

function ensureQuestionMark(text = "") {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const last = trimmed.slice(-1);
  if (["?", "!", ".", ":"].includes(last)) return trimmed;
  return `${trimmed}?`;
}

function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function showChooseLevel() {
  if (!quizBox) return;
  quizBox.innerHTML = `
    <div class="quiz-header">
      <h2>Pilih level untuk mulai</h2>
      <p class="muted small">Easy · Medium · Hard</p>
    </div>
  `;
}

function renderLevelButtons() {
  if (!levelContainer) return;

  if (topic !== "general") {
    levelContainer.style.display = "none";
    return;
  }

  const levels = ["easy", "medium", "hard"];
  if (level) {
    levelContainer.style.display = "none";
    return;
  }

  levelContainer.innerHTML = levels
    .map(l => `<button class="level-btn${l === level ? " active" : ""}" data-level="${l}">${l.toUpperCase()}</button>`)
    .join("");
  levelContainer.style.display = "flex";

  levelContainer.querySelectorAll(".level-btn").forEach(btn => {
    btn.onclick = () => {
      const chosen = btn.dataset.level;
      if (chosen === level) return;
      level = chosen;
      index = 0;
      score = 0;
      setTopicLabel();
      renderLevelButtons();
      showLevelIndicator();
      loadQuestions();
    };
  });
}

renderLevelButtons();
if (topic === "general") {
  showChooseLevel();
} else {
  loadQuestions();
}

function showLevelIndicator() {
  if (!levelIndicator) return;
  if (topic !== "general" || !level) {
    levelIndicator.classList.remove("active");
    levelIndicator.innerHTML = "";
    return;
  }

  levelIndicator.innerHTML = `
    Level: <strong>${level.toUpperCase()}</strong>
    <button type="button" id="changeLevelBtn">Ganti level</button>
    <button type="button" id="reshuffleLevelBtn">Acak soal</button>
  `;
  levelIndicator.classList.add("active");

  const changeBtn = document.getElementById("changeLevelBtn");
  const reshuffleBtn = document.getElementById("reshuffleLevelBtn");
  if (changeBtn) {
    changeBtn.onclick = () => {
      level = null;
      setTopicLabel();
      levelIndicator.classList.remove("active");
      levelIndicator.innerHTML = "";
      sessionCounter++;
      currentSession = sessionCounter;
      soal = [];
      showChooseLevel();
      renderLevelButtons();
    };
  }
  if (reshuffleBtn) {
    reshuffleBtn.onclick = () => restartQuiz(true);
  }
}

function renderBaseQuizBox() {
  if (!quizBox) return;
  quizBox.innerHTML = `
    <div class="quiz-header">
      <div>
        <h2 id="questionText">Memuat soal...</h2>
        <p id="progress" class="muted small"></p>
        <span class="pill">${friendlyTopic}</span>
      </div>
    </div>
    <div class="options">
      <button class="opt" id="optA">A</button>
      <button class="opt" id="optB">B</button>
      <button class="opt" id="optC">C</button>
    </div>
    <div class="quiz-bottom-left">
      <button class="result-btn alt" id="restartQuizBtn">Restart</button>
    </div>
  `;
  bindOptionButtons();
  const restartBtn = document.getElementById("restartQuizBtn");
  if (restartBtn) restartBtn.onclick = () => restartQuiz(true);
}

function bindOptionButtons() {
  const set = (id, ans) => {
    const el = document.getElementById(id);
    if (el) el.onclick = () => jawab(ans);
  };
  set("optA", "A");
  set("optB", "B");
  set("optC", "C");
}

function restartQuiz(manual = false) {
  if (!manual) return loadQuestions();
  // manual restart juga butuh session baru supaya fetch lama diabaikan
  loadQuestions();
}

function loadQuestions() {
  const runId = ++sessionCounter;

  if (!topic) {
    document.querySelector(".quiz-box").innerHTML = "<p>Topic tidak diberikan.</p>";
    return;
  }

  if (topic === "general" && !level) {
    showChooseLevel();
    return;
  }

  showLevelIndicator();
  const query = new URLSearchParams({ topic });
  if (level) query.set("level", level);

  fetch(`http://localhost:3000/api/questions?${query.toString()}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (runId !== sessionCounter) return; // sudah ada permintaan baru, abaikan
      soal = shuffle(
        data.map(item => ({
          ...item,
          question: ensureQuestionMark(item.question)
        }))
      );
      index = 0;
      score = 0;
      currentSession = runId;

      if (soal.length === 0) {
        document.querySelector(".quiz-box").innerHTML = "<p>Tidak ada soal untuk topic ini.</p>";
        return;
      }

      renderBaseQuizBox();
      tampilkanSoal();
    })
    .catch(err => {
      if (runId !== sessionCounter) return;
      console.error(err);
      document.querySelector(".quiz-box").innerHTML = "<p>Gagal memuat soal.</p>";
    });
}

function tampilkanSoal() {
  if (index >= soal.length) {
    selesai();
    return;
  }

  const q = soal[index];

  const qEl = document.getElementById("questionText");
  const pEl = document.getElementById("progress");
  const aEl = document.getElementById("optA");
  const bEl = document.getElementById("optB");
  const cEl = document.getElementById("optC");
  if (!qEl || !pEl || !aEl || !bEl || !cEl) {
    renderBaseQuizBox();
    return tampilkanSoal();
  }

  qEl.textContent = (index + 1) + ". " + ensureQuestionMark(q.question);

  aEl.textContent = "A. " + q.choice_a;
  bEl.textContent = "B. " + q.choice_b;
  cEl.textContent = "C. " + q.choice_c;

  pEl.textContent = `Soal ${index + 1} dari ${soal.length}`;

  resetStyle();
}

function resetStyle() {
  document.querySelectorAll(".opt").forEach(btn => {
    btn.classList.remove("correct", "wrong", "disabled");
  });
}

function jawab(jawaban) {
  const correct = soal[index].answer; // "A" / "B" / "C"
  const mySession = currentSession;

  document.querySelectorAll(".opt").forEach(btn => btn.classList.add("disabled"));

  if (jawaban === correct) {
    score++;
    playTone("ok");
    document.getElementById(`opt${jawaban}`).classList.add("correct");
  } else {
    playTone("no");
    document.getElementById(`opt${jawaban}`).classList.add("wrong");
    document.getElementById(`opt${correct}`).classList.add("correct");
  }

  setTimeout(() => {
    if (mySession !== currentSession) return;
    index++;
    tampilkanSoal();
  }, 950);
}

function selesai() {
  const backTarget = topicPageMap[topic] || "index.html";
  if (quizBox) {
    quizBox.innerHTML = `
      <div class="result-box">
        <h2>Kuis Selesai! 🎉</h2>
        <p class="result-score">Skor kamu: <strong>${score} / ${soal.length}</strong></p>
        <div class="quiz-actions align-left">
          <button class="result-btn" id="playAgainBtn">Restart</button>
          <a class="result-btn alt" href="${backTarget}">Kembali ke materi</a>
          <a class="result-btn alt" href="index.html">Menu utama</a>
        </div>
      </div>
    `;
    const again = document.getElementById("playAgainBtn");
    if (again) {
      again.onclick = () => loadQuestions();
    }
  }
}
