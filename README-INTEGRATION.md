# HARYVO V2 — Login, Register, Razorpay + OpenAI

The frontend remains a single `index.html`. Real login, payment and OpenAI calls use the included server because secret API keys must never be exposed in browser code.

1. Install Node.js 20+.
2. `cd server`
3. Copy `.env.example` to `.env`.
4. Add Razorpay and OpenAI keys.
5. `npm install`
6. `npm start`
7. Open `http://localhost:3000`

Razorpay uses a server-created order and server-side signature verification. OpenAI API keys stay server-side. Before launch, add the final approved prices for all 24 products and production HTTPS/database settings.
