# Atharva Gawande — Portfolio

A dark, cinematic single-page portfolio with heavy motion design and an AI chatbot that answers questions about me in my own voice.

**Live sections:** Hero → About → Projects (horizontal scroll gallery) → Skills → Experience → Certifications ribbon → Contact + floating AI chat.

---

## Tech Stack

**Frontend**
- React.js 19 (Create React App + CRACO)
- Tailwind CSS (+ tailwindcss-animate)
- Framer Motion — animations
- Lenis — smooth scrolling
- react-fast-marquee — certifications ribbon
- lucide-react — icons

**Backend (powers only the AI chatbot)**
- FastAPI (Python)
- MongoDB — stores chat history
- OpenAI GPT-5.4 via the Emergent universal key (`emergentintegrations`)

---

## Project Structure

```
├── backend/
│   ├── server.py          # FastAPI app, /api/chat streaming endpoint
│   ├── requirements.txt
│   └── .env               # MONGO_URL, DB_NAME, EMERGENT_LLM_KEY
└── frontend/
    ├── src/
    │   ├── data/portfolio.js   # ALL content lives here — edit this to change text/projects/skills
    │   ├── components/         # Hero, Projects, Skills, Experience, ChatWidget, etc.
    │   └── App.js
    ├── package.json
    └── .env               # REACT_APP_BACKEND_URL
```

---

## Prerequisites

1. **Node.js** (v18+) — then install yarn: `npm install -g yarn`
2. **Python 3.10+**
3. **MongoDB** — two options:
   - **Option A (no install, recommended): MongoDB Atlas free tier**
     1. Go to https://cloud.mongodb.com and create a free account
     2. Create a free M0 cluster
     3. Database Access → add a user (username + password)
     4. Network Access → allow access from anywhere (`0.0.0.0/0`)
     5. Connect → Drivers → copy the connection string, e.g.
        `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/`
   - **Option B: local install** — install MongoDB Community Server from https://www.mongodb.com/try/download/community and it runs at `mongodb://localhost:27017`
4. **Emergent universal key** — the chatbot uses it for GPT-5.4. Get/top-up yours at Emergent → Profile → Manage plan → Universal Key. (Or swap in your own OpenAI key in `backend/server.py`.)

---

## Setup & Run

**1. Backend** (terminal 1)
```bash
cd backend
pip install -r requirements.txt
```
Create `backend/.env`:
```
MONGO_URL="mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/"   # or mongodb://localhost:27017
DB_NAME="portfolio"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=<your-key>
```
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**2. Frontend** (terminal 2)
```bash
cd frontend
yarn install
```
Create `frontend/.env`:
```
REACT_APP_BACKEND_URL=http://localhost:8001
```
```bash
yarn start
```
Open http://localhost:3000

> **Note:** the site works without the backend — everything except the chat bubble. The chatbot needs the backend + MongoDB running.

---

## Editing Content

Almost everything (name, projects, skills, experience, certifications, social links, resume URL) lives in one file:

```
frontend/src/data/portfolio.js
```

Edit it, save, and the site hot-reloads. No other files needed for content changes.

## Deploying

- **Frontend only** → Vercel / Netlify (free). Chat bubble will not work without the backend.
- **Full app (with chatbot)** → deploy the frontend to Vercel, the backend to any Python host (Render, Railway), MongoDB on Atlas, and set `REACT_APP_BACKEND_URL` to your backend URL.

---

© 2026 Atharva Gawande · atharvagawande05@gmail.com
