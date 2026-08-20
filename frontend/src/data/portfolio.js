export const profile = {
  name: "Atharva Gawande",
  firstName: "ATHARVA",
  lastName: "GAWANDE",
  title: "Software Developer / Engineer",
  location: "Nagpur, Maharashtra, India",
  email: "atharvagawande05@gmail.com",
  phone: "+91 7219889469",
  github: "https://github.com/AtharvaGawande14",
  linkedin: "https://linkedin.com/in/atharvagawande14",
  resumeUrl: "https://customer-assets-lqy194kg.emergentagent.net/job_portfolio-pro-2790/artifacts/ymmniw6j_Atharva_Gawande_CV_SED.pdf",
  about: [
    "I'm a BCA graduate from G. H. Raisoni University who builds things that actually ship — from a voice-controlled AI desktop assistant to full-stack dashboards that turn raw engineering metrics into decisions.",
    "My sweet spot is where clean frontend craft meets Python backends and LLM integration. I care about sub-2s load times, honest interfaces, and code that survives contact with real users.",
  ],
  stats: [
    { value: "04", label: "Production Projects" },
    { value: "02", label: "Internships" },
    { value: "8.15", label: "CGPA / 10" },
    { value: "04", label: "Certifications" },
  ],
};

export const projects = [
  {
    id: "cortex",
    index: "01",
    title: "Cortex",
    tagline: "AI Desktop Assistant",
    description:
      "A voice-controlled AI desktop assistant with a dark PyQt5 GUI. OpenRouter + LLaMA 3 for brains, multi-threaded voice I/O, a command parser that opens apps and runs browser searches by voice, and persistent conversation memory via JSON storage.",
    tech: ["Python", "PyQt5", "OpenRouter API", "LLaMA 3", "Edge-TTS", "Threading"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
    accent: "lime",
  },
  {
    id: "dev-dashboard",
    index: "02",
    title: "DevPulse",
    tagline: "Developer Productivity Insights Dashboard",
    description:
      "A full-stack MVP that converts developer metrics — Lead Time, Cycle Time, Bug Rate, PR Throughput — into actionable insights through a rule-based logic engine simulating Jira and CI/CD pipelines.",
    tech: ["React.js", "Node.js", "Express.js", "REST API", "JavaScript"],
    image:
      "https://images.pexels.com/photos/27141307/pexels-photo-27141307.jpeg?auto=compress&cs=tinysrgb&w=1600",
    accent: "cyan",
  },
  {
    id: "pipeline-builder",
    index: "03",
    title: "FlowForge",
    tagline: "Visual Pipeline Builder",
    description:
      "A drag-and-drop workflow builder with a FastAPI backend that validates pipelines as Directed Acyclic Graphs in real time — catch cycles and broken dependencies before a single job runs.",
    tech: ["React.js", "FastAPI", "Python", "React Flow", "REST API"],
    image:
      "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=1600&auto=format&fit=crop",
    accent: "lime",
  },
  {
    id: "face-attendance",
    index: "04",
    title: "Presence",
    tagline: "Face Recognition Attendance System",
    description:
      "Real-time attendance marking with OpenCV — Haar Cascade detection and LBPH recognition cut manual effort by 70% and kill proxy attendance. CSV-based storage means it deploys in classrooms with zero extra hardware.",
    tech: ["Python", "OpenCV", "Haar Cascade", "LBPH", "CSV"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    accent: "cyan",
  },
];

export const skillGroups = [
  {
    id: "programming",
    label: "Programming",
    items: ["Python", "JavaScript"],
  },
  {
    id: "web",
    label: "Web Development",
    items: ["HTML", "CSS", "React.js", "Responsive Design", "REST API Integration", "Cross-browser Compatibility"],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    items: ["FastAPI", "Node.js", "Express.js", "OpenCV", "BeautifulSoup"],
  },
  {
    id: "ai-tools",
    label: "AI & Tools",
    items: ["OpenRouter API", "LLaMA 3", "Prompt Engineering", "Git", "GitHub", "GitHub Actions", "API Integration"],
  },
];

export const experience = [
  {
    id: "ultimez",
    role: "Frontend Web Developer Intern",
    company: "Ultimez Technology",
    period: "JUL 2025 — AUG 2025",
    points: [
      "Engineered a real-time Weather App on the OpenWeatherMap REST API with sub-2s load time across 5+ device types — delivered every task ahead of schedule.",
      "Deployed via GitHub Pages with responsive UI, dynamic icons, and robust error handling for cross-browser compatibility.",
    ],
  },
  {
    id: "onestop",
    role: "Frontend Web Developer Intern",
    company: "1Stop.ai (Raise Digital)",
    period: "JUL 2025 — SEP 2025",
    points: [
      "Built Portfolio, To-Do List, and Expense Tracker apps with responsive UI in HTML, CSS, and JavaScript.",
      "Optimized performance for cross-device compatibility.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Computer Applications",
  school: "G. H. Raisoni University, Amravati",
  period: "2023 — 2026",
  grade: "CGPA 8.15 / 10",
};

export const leadership = {
  role: "Club Member",
  org: "Rotaract Club of Raisoni",
  description:
    "Organised and managed club events and community service initiatives involving 35+ members — planning, coordination, and execution.",
};

export const certifications = [
  { id: "google-ai", name: "AI Professional", issuer: "Google", date: "Jun 2026" },
  { id: "simplilearn-python", name: "Advanced Python", issuer: "Simplilearn", date: "Mar 2026" },
  { id: "lloyds-ds", name: "Data Science Job Simulation", issuer: "Lloyds Banking Group", date: "Sep 2025" },
  { id: "deloitte-cyber", name: "Cyber Job Simulation", issuer: "Deloitte Australia", date: "Aug 2025" },
];
