function dbg(t) {
  const d = document.getElementById("dbg");
  if (d) d.textContent = t;
}

dbg("script.js loaded");

const btn = document.getElementById("openQuizBtn");
dbg("openQuizBtn = " + (btn ? "FOUND" : "NOT FOUND"));

// Ambil topic dari URL
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get("topic");

// Elemen HTML (hanya ada di material.html)
const title = document.getElementById("matTitle");
const intro = document.getElementById("matIntro");
const content = document.getElementById("matContent");
const quizBtn = document.getElementById("openQuizBtn");

// Jika elemen tidak ada (halaman lain), hentikan supaya tidak error
if (!title || !intro || !content || !quizBtn) {
  dbg("quiz UI not found on this page");
} else {
  title.innerText = topic ? topic.toUpperCase() : "KUIS";
  intro.innerText = topic ? `Materi mengenai ${topic}` : "";

  // Default action: menuju halaman quiz.html dengan topic yang sama
  if (topic) {
    quizBtn.setAttribute(
      "href",
      `quiz.html?topic=${encodeURIComponent(topic)}`
    );
  }

  // Jika topic tidak ada, tahan klik dan tampilkan pesan
  quizBtn.addEventListener("click", (e) => {
    if (!topic) {
      e.preventDefault();
      if (content) {
        content.innerHTML = "<p>Topic tidak ditemukan pada URL.</p>";
      }
    }
  });
}

async function startQuiz() {
  if (!topic) {
    if (content) content.innerHTML = "<p>Topic tidak ditemukan pada URL.</p>";
    return;
  }

  if (!content) return;

  try {
    const res = await fetch(
      `http://localhost:3000/api/questions?topic=${encodeURIComponent(topic)}`
    );

    if (!res.ok) {
      content.innerHTML = `<p>Gagal memuat soal (${res.status}). Pastikan server backend berjalan.</p>`;
      return;
    }

    const questions = await res.json();

    if (!questions || questions.length === 0) {
      content.innerHTML = "<p>Tidak ada soal untuk topic ini.</p>";
      return;
    }

    jalankanKuis(questions);
  } catch (err) {
    content.innerHTML = "<p>Gagal terhubung ke server.</p>";
    console.error("Fetch error:", err);
  }
}

function jalankanKuis(questions) {
  let index = 0;
  let score = 0;

  tampilkanSoal();

  function tampilkanSoal() {
    const q = questions[index];

    content.innerHTML = `
            <div class="quiz-card">
                <p class="quiz-question"><b>${index + 1}. ${q.question}</b></p>

                <div class="option" data-opt="A">A. ${q.choice_a}</div>
                <div class="option" data-opt="B">B. ${q.choice_b}</div>
                <div class="option" data-opt="C">C. ${q.choice_c}</div>

                <p style="margin-top:12px; color:var(--muted);">
                    ${index + 1} / ${questions.length}
                </p>
            </div>
        `;

    document.querySelectorAll(".option").forEach((opt) => {
      opt.addEventListener("click", () => pilihJawaban(opt));
    });
  }

  function pilihJawaban(opt) {
    const selected = opt.dataset.opt;
    const correct = questions[index].answer;

    if (selected === correct) {
      opt.classList.add("correct");
      score++;
    } else {
      opt.classList.add("wrong");
    }

    document
      .querySelectorAll(".option")
      .forEach((o) => (o.style.pointerEvents = "none"));

    setTimeout(() => {
      index++;
      if (index < questions.length) {
        tampilkanSoal();
      } else {
        tampilkanHasil();
      }
    }, 900);
  }

  function tampilkanHasil() {
    content.innerHTML = `
            <div class="quiz-card">
                <h2>Hasil Kuis</h2>
                <p>Nilai Kamu: <b>${score} / ${questions.length}</b></p>
            </div>
        `;

    if (quizBtn) {
      quizBtn.outerHTML = `
                <button class="btn primary" onclick="location.reload()">Ulangi</button>
            `;
    }
  }
}
