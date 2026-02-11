# Scrunity — Waitlist Page 🚀

**Scrunity** is an AI-powered collaborative online whiteboard for quickly sketching hand-drawn diagrams, wireframes, and notes — helping teams brainstorm and turn scattered ideas into clear, workable concepts.

This repository contains the landing / waitlist page for Scrunity where early users can sign up for access and join the waitlist.

---

## ✨ Features

- Clean, responsive waitlist landing page with email capture and confirmation flow
- Optional referral / campaign tracking support for growth experiments
- Easy integration points for email providers (Mailchimp, SendGrid, etc.) and analytics
- Simple and accessible UI built with Next.js

---

## 🛠️ Tech Stack

- Next.js (App Router)
- TypeScript
- (Optional) Email provider / backend (Mailchimp, SendGrid, Postgres, etc.)

---

## 🚀 Quick Start (Local)

1. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn
```

2. Start dev server:

```bash
npm run dev
```

3. Open http://localhost:3000 and edit the page at `app/page.tsx`.

> Note: scripts are defined in `package.json`.

---

## ⚙️ Environment

Add any environment variables your waitlist integration needs to a `.env.local` file. Common examples:

- `NEXT_PUBLIC_SITE_URL` — your site URL (e.g., `https://scrunity.app`)
- `MAILCHIMP_API_KEY` — Mailchimp API key (if used)
- `SENDGRID_API_KEY` — SendGrid API key (if used)
- `DATABASE_URL` — connection string for persistence (optional)

Keep secrets out of version control.

---

## 🧪 Testing & Preview

- Unit/integration tests: add and run whatever test framework you prefer (Jest, Vitest, React Testing Library).
- End-to-end: use Playwright or Cypress for flow testing (e.g., email capture & confirmation).

---

## 📦 Deployment

This project is optimized for deployment on Vercel but will work with other Node-compatible hosts. Typical steps:

1. Connect the repository to Vercel (or your host).
2. Add production environment variables in the hosting dashboard.
3. Deploy via Git push / GitHub integration.

---

## 🤝 Contributing

Contributions are welcome!

- Open an issue to propose changes or report bugs
- Send a pull request with a clear description and tests where applicable

Please follow standard GitHub flow and add concise commit messages.

---

## 📬 Contact & Support

If you need help or want to collaborate, open an issue or reach out at hello@scrunity.app (placeholder).

---

## ⚖️ License

This project is open-source — add a license file (`LICENSE`) as needed.


> _Made with ❤️ for better collaboration and faster brainstorming._

