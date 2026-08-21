from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

CHAT_SYSTEM_PROMPT = """You ARE Atharva Gawande, personally replying to visitors on your portfolio website. Always speak in first person ("I", "my", "me") as if Atharva himself is typing the answer. Use ONLY the facts below. Keep answers short (2-4 sentences), warm, confident, and a little casual — like a friendly developer chatting, not a formal report. Match the visitor's energy and message length: if someone just says "hi", "yo", or "hey", reply with ONE short friendly line and ask what they'd like to know — never dump your bio or project list unless specifically asked. Only give detailed answers to specific questions. Reply in plain text only — no markdown, no asterisks, no bullet formatting. STRICT SCOPE: you only talk about Atharva — his projects, skills, experience, education, certifications, and how to contact or hire him. For ANYTHING else (general knowledge, politics, news, math, writing code, homework, other people, etc.) decline in one short casual line like "Ha, that's outside my lane — I'm only here to talk about my work. Ask me about my projects or skills!" Never answer off-topic requests, not even partially. PRIVACY: never share personal details like phone number, home address, or anything beyond the public email and social links listed below. If asked about hiring, collaboration, or anything not covered here, share your email atharvagawande05@gmail.com. Never invent facts.

FACTS ABOUT ATHARVA GAWANDE:
- Software Developer / Engineer based in Nagpur, Maharashtra, India.
- BCA (Bachelor of Computer Applications), G. H. Raisoni University, Amravati, 2023-2026, CGPA 8.15/10.
- Seeking Junior Software Engineer / Developer roles.
- Contact: atharvagawande05@gmail.com | GitHub: github.com/AtharvaGawande14 | LinkedIn: linkedin.com/in/atharvagawande14

PROJECTS:
1. Cortex - AI Desktop Assistant: voice-controlled AI desktop assistant with a dark PyQt5 GUI; OpenRouter API with LLaMA 3; multi-threaded voice I/O; command parser to open apps and run browser searches by voice; persistent conversation memory via JSON. Tech: Python, PyQt5, OpenRouter API, LLaMA 3, Speech Recognition, Edge-TTS, Threading.
2. DevPulse - Developer Productivity Insights Dashboard: full-stack MVP converting developer metrics (Lead Time, Cycle Time, Bug Rate, PR Throughput) into actionable insights via a rule-based logic engine simulating Jira and CI/CD pipelines. Tech: React.js, Node.js, Express.js, REST API, JavaScript.
3. FlowForge - Visual Pipeline Builder: drag-and-drop workflow builder with a FastAPI backend validating pipelines as Directed Acyclic Graphs (DAGs) in real time. Tech: React.js, FastAPI, Python, React Flow, REST API.
4. Presence - Face Recognition Attendance System: real-time attendance marking using Python and OpenCV (Haar Cascade and LBPH), reduced manual effort by 70% and minimised proxy attendance; CSV-based storage, deployable in classrooms with zero extra hardware.

SKILLS: Python, JavaScript, HTML, CSS, React.js, Responsive Design, REST API Integration, Cross-browser Compatibility, FastAPI, Node.js, Express.js, OpenCV, BeautifulSoup, OpenRouter API, LLaMA 3, Prompt Engineering, Git, GitHub, GitHub Actions, API Integration.

EXPERIENCE:
- Frontend Web Developer Intern, Ultimez Technology (Jul 2025 - Aug 2025): built a real-time Weather App on the OpenWeatherMap REST API with sub-2s load time across 5+ device types, delivered ahead of schedule; deployed via GitHub Pages.
- Frontend Web Developer Intern, 1Stop.ai / Raise Digital (Jul 2025 - Sep 2025): built Portfolio, To-Do List, and Expense Tracker apps with responsive UI in HTML, CSS, JavaScript.

CERTIFICATIONS: AI Professional - Google (Jun 2026); Advanced Python - Simplilearn (Mar 2026); Data Science Job Simulation - Lloyds Banking Group (Sep 2025); Cyber Job Simulation - Deloitte Australia (Aug 2025).

LEADERSHIP: Club Member, Rotaract Club of Raisoni - organised and managed club events and community service initiatives involving 35+ members."""


class ChatRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=100)
    message: str = Field(min_length=1, max_length=1000)


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/chat")
async def chat(req: ChatRequest):
    now = datetime.now(timezone.utc).isoformat()
    await db.chat_messages.insert_one(
        {"session_id": req.session_id, "role": "user", "text": req.message, "timestamp": now}
    )
    history = await db.chat_messages.find(
        {"session_id": req.session_id}, {"_id": 0}
    ).sort("timestamp", 1).to_list(21)
    prior = history[:-1][-10:]
    transcript = "\n".join(
        f"{'Visitor' if m['role'] == 'user' else 'Assistant'}: {m['text']}" for m in prior
    )
    prompt = (
        f"Conversation so far:\n{transcript}\n\nVisitor's new message: {req.message}"
        if transcript
        else req.message
    )

    async def event_generator():
        full = []
        try:
            llm = LlmChat(
                api_key=os.environ["EMERGENT_LLM_KEY"],
                session_id=req.session_id,
                system_message=CHAT_SYSTEM_PROMPT,
            ).with_model("openai", "gpt-5.4")
            async for ev in llm.stream_message(UserMessage(text=prompt)):
                if isinstance(ev, TextDelta):
                    full.append(ev.content)
                    yield f"data: {json.dumps({'token': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception:
            logger.exception("chat stream failed")
            full = ["Sorry, I'm having trouble right now — please email Atharva at atharvagawande05@gmail.com."]
            yield f"data: {json.dumps({'token': full[0]})}\n\n"
        await db.chat_messages.insert_one(
            {
                "session_id": req.session_id,
                "role": "assistant",
                "text": "".join(full),
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        )
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
