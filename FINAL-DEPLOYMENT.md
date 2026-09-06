# HARYVO Final Deployment Package

## Structure
- `index.html` — frontend structure
- `css/style.css` — premium responsive styling
- `js/app.js` — products, cart, UI, AI and Razorpay client flow
- `server.js` — Express backend, authentication, OpenAI and Razorpay
- `assets/` — website assets
- `assets/products/` — 24 product images
- `.env.example` — environment variable template

## Final product prices
The server-side Razorpay catalog contains all 24 approved working selling prices. The backend is the source of truth for payment amount.

## Environment variables
Set these in Render (never commit real secrets):
- `SESSION_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

## Render
Build command: `npm install`
Start command: `npm start`
Root directory: blank

Use Razorpay Test Mode first. Switch to Live Mode only after successful end-to-end testing.
