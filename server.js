const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi database PostgreSQL
const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "quiz",    
    password: "12345",
    port: 5432
});

// Root
app.get("/", (req, res) => {
    res.send("Server MeteoMindset Aktif ✔");
});

// API Soal
app.get("/api/questions", async (req, res) => {
    const topic = req.query.topic;
    const level = req.query.level;

    if (!topic) {
        return res.status(400).json({ error: "Topic tidak diberikan." });
    }

    console.log("🔍 Request soal topic:", topic, "| level:", level || "-");

    try {
        let sql = `SELECT id, category, level, question, choice_a, choice_b, choice_c, answer 
                   FROM quiz 
                   WHERE LOWER(category) = LOWER($1)`;
        const params = [topic];

        if (level) {
            sql += ` AND LOWER(level) = LOWER($2)`;
            params.push(level);
        }

        const q = await pool.query(sql, params);

        console.log(`📘 Jumlah soal ditemukan: ${q.rows.length}`);

        res.json(q.rows);
    } catch (err) {
        console.error("❌ DB ERROR:", err);
        res.status(500).json({ error: "Database Error" });
    }
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
