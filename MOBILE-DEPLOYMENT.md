# HARYVO — Mobile Deployment Notes

This package contains the HARYVO frontend and Node/Express backend for Razorpay Standard Checkout and the HARYVO AI server endpoint.

## Required server environment variables

Set these in the hosting provider's Environment Variables / Secrets section:

- `PORT=3000`
- `SESSION_SECRET=<long random secret>`
- `RAZORPAY_KEY_ID=<Razorpay Test or Live Key ID>`
- `RAZORPAY_KEY_SECRET=<Razorpay Test or Live Key Secret>`
- `OPENAI_API_KEY=<OpenAI API key>`
- `OPENAI_MODEL=gpt-5.6`

Never put `RAZORPAY_KEY_SECRET` or `OPENAI_API_KEY` in `index.html`.

## Mobile-only deployment

Use a Node.js hosting service that supports an Express server. Upload/push this project folder, set the environment variables above, and use `npm install` followed by `npm start` as the build/start flow.

The server serves the website from the project root and exposes:

- `POST /api/create-order`
- `POST /api/verify-payment`
- `POST /api/login`
- `POST /api/register`
- `POST /api/logout`
- `GET /api/me`
- `POST /api/ai`

## Razorpay testing

Use Razorpay Test Mode first. Create an account on the website, select a product with a configured price, click Buy Now, and complete the Razorpay test checkout. Payment verification happens on the backend.

Before accepting real money, replace Test API credentials with Live credentials and complete Razorpay's required business/KYC setup.
