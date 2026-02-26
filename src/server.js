import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pool } from "./db.js";

const app = express();

app.use(helmet());
app.use(express.json());

// Cambiá TU_USUARIO por tu GitHub user cuando tengas el Pages activo
const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "https://TU_USUARIO.github.io"
];

app.use(cors({
    origin: (origin, cb) => {
        if (!origin) return cb(null, true); // Postman/curl
        return allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error("CORS bloqueado"), false);
    }
}));

app.get("/health", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS ok");
        res.json({ ok: true, db: rows[0].ok === 1 });
    } catch (e) {
        res.status(500).json({ ok: false, error: "DB not reachable" });
    }
});

app.get("/api/juegos", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM juegos LIMIT 500");
    res.json(rows);
});

app.get("/api/competidores", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM competidores LIMIT 500");
    res.json(rows);
});

app.get("/api/torneos", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM torneos ORDER BY fechaInicio DESC LIMIT 500");
    res.json(rows);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));