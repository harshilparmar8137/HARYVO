import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Database from "better-sqlite3";
import Razorpay from "razorpay";
import OpenAI from "openai";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

const db = new Database(path.join(__dirname, "haryvo.db"));
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const PRODUCT_CATALOG = Object.freeze({
  "HARYVO-000001": { name: "HARYVO S2 Controller", amountRupees: 1899 },
  "HARYVO-000002": { name: "HARYVO S4 Controller", amountRupees: 2199 },
  "HARYVO-000003": { name: "HARYVO S8 Controller", amountRupees: 2699 },
  "HARYVO-000004": { name: "HARYVO S12 Controller", amountRupees: 3299 },
  "HARYVO-000005": { name: "HARYVO S18 Controller", amountRupees: 4599 },
  "HARYVO-000006": { name: "HARYVO Premium White Controller", amountRupees: 2699 },
  "HARYVO-000007": { name: "HARYVO Premium Black Controller", amountRupees: 2699 },
  "HARYVO-000008": { name: "HARYVO Water Level Controller", amountRupees: 2199 },
  "HARYVO-000009": { name: "HARYVO Smart Door Lock", amountRupees: 5699 },
  "HARYVO-000010": { name: "HARYVO Door & Window Sensor", amountRupees: 999 },
  "HARYVO-000011": { name: "HARYVO Motion Sensor", amountRupees: 1099 },
  "HARYVO-000012": { name: "HARYVO Security Alarm", amountRupees: 1299 },
  "HARYVO-000013": { name: "HARYVO Gas Safety Sensor", amountRupees: 1499 },
  "HARYVO-000014": { name: "HARYVO Fire Safety Sensor", amountRupees: 1499 },
  "HARYVO-000015": { name: "HARYVO Environment Monitor", amountRupees: 1799 },
  "HARYVO-000016": { name: "HARYVO Smart Ventilation Controller", amountRupees: 1599 },
  "HARYVO-000017": { name: "HARYVO Energy Monitor", amountRupees: 1999 },
  "HARYVO-000018": { name: "HARYVO Smart Curtain Controller + Motor", amountRupees: 6499 },
  "HARYVO-000019": { name: "HARYVO Smart Doorbell", amountRupees: 2299 },
  "HARYVO-000020": { name: "HARYVO Smart Home Hub", amountRupees: 2499 },
  "HARYVO-000021": { name: "HARYVO Local Hub", amountRupees: 1999 },
  "HARYVO-000022": { name: "HARYVO Salt Level Monitor", amountRupees: 1699 },
  "HARYVO-000023": { name: "HARYVO Smart Security Camera", amountRupees: 2799 },
  "HARYVO-000024": { name: "HARYVO HVAC Monitor", amountRupees: 2099 }
});

function session(res, user) {
  res.cookie(
    "haryvo_session",
    jwt.sign({ id: user.id }, process.env.SESSION_SECRET, { expiresIn: "7d" }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  );
}

function me(req) {
  try {
    const payload = jwt.verify(
      req.cookies.haryvo_session,
      process.env.SESSION_SECRET
    );
    return db
      .prepare("SELECT id,name,email FROM users WHERE id=?")
      .get(payload.id);
  } catch {
    return null;
  }
}

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Name, email and 8+ character password required." });
  }

  try {
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const result = db
      .prepare("INSERT INTO users(name,email,password_hash) VALUES(?,?,?)")
      .run(cleanName, cleanEmail, await bcrypt.hash(password, 12));
    const user = { id: result.lastInsertRowid, name: cleanName, email: cleanEmail };
    session(res, user);
    res.json({ message: "Account created.", user });
  } catch {
    res.status(409).json({ error: "Email is already registered." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};
  const user = db
    .prepare("SELECT * FROM users WHERE email=?")
    .get(String(email || "").trim().toLowerCase());

  if (!user || !(await bcrypt.compare(String(password || ""), user.password_hash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  session(res, user);
  res.json({
    message: "Logged in.",
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.get("/api/me", (req, res) => {
  const user = me(req);
  user ? res.json(user) : res.status(401).json({ error: "Not logged in" });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("haryvo_session");
  res.json({ message: "Logged out" });
});

app.post("/api/ai", async (req, res) => {
  const message = String(req.body?.message || "").slice(0, 4000);
  if (!openai) {
    return res.status(503).json({ error: "OpenAI API key is not configured on the server." });
  }

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6",
      instructions:
        "You are HARYVO AI Assistant. Answer only with confirmed HARYVO product information. Never invent prices or technical specifications. HARYVO codes: 000001 S2, 000002 S4, 000003 S8, 000004 S12, 000005 S18, 000006 Premium White, 000007 Premium Black, 000008 Water Level, 000009 Smart Door Lock, 000010 Door & Window Sensor, 000011 Motion Sensor, 000012 Security Alarm, 000013 Gas Safety Sensor, 000014 Fire Safety Sensor, 000015 Environment Monitor, 000016 Smart Ventilation, 000017 Energy Monitor, 000018 Smart Curtain, 000019 Smart Doorbell, 000020 Smart Home Hub, 000021 Local Hub, 000022 Salt Level Monitor, 000023 Smart Security Camera, 000024 HVAC Monitor.",
      input: message
    });
    res.json({ reply: response.output_text });
  } catch {
    res.status(502).json({ error: "AI service unavailable" });
  }
});

// Razorpay: create the order on the server so the browser never controls the final price.
app.post("/api/create-order", async (req, res) => {
  const user = me(req);
  if (!user) return res.status(401).json({ error: "Please login before purchase." });

  const productCode = String(req.body?.productCode || "").trim();
  const product = PRODUCT_CATALOG[productCode];
  if (!product) {
    return res.status(400).json({
      error: "Final price for this product is not configured yet."
    });
  }

  const amountPaise = Math.round(Number(product.amountRupees) * 100);
  if (!Number.isInteger(amountPaise) || amountPaise < 100) {
    return res.status(400).json({ error: "Invalid payment amount." });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `haryvo_${Date.now()}`,
      notes: {
        productCode,
        productName: product.name,
        userId: String(user.id)
      }
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
      productCode
    });
  } catch (error) {
    const status = Number(error?.statusCode || error?.status || 500);
    if (status === 401) {
      return res.status(401).json({ error: "Razorpay authentication failed. Check the server API keys." });
    }
    console.error("Razorpay create-order error:", error?.error?.description || error?.message || error);
    res.status(500).json({ error: "Unable to create Razorpay order." });
  }
});

// Razorpay: verify the signature on the server before treating a payment as verified.
app.post("/api/verify-payment", (req, res) => {
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature
  } = req.body || {};

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Missing payment verification fields." });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(String(signature), "utf8");
  const valid =
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!valid) {
    return res.status(400).json({ error: "Invalid payment signature." });
  }

  res.json({ verified: true, order_id: orderId, payment_id: paymentId });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`HARYVO server ready on http://localhost:${PORT}`);
});
