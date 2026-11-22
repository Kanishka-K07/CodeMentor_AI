<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:06b6d4&height=200&section=header&text=CodeMentor%20AI&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Intelligent%20Pair%20Programmer%20%26%20DSA%20Learning%20Platform&descAlignY=60&descSize=18" alt="CodeMentor AI banner" />

<a href="https://github.com/Kanishka-K07/CodeMentor_AI">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=6366F1&center=true&vCenter=true&width=700&lines=Learn+DSA+with+guided+discovery;Socratic+AI+mentor+powered+by+Gemini;Run+code+in+the+browser+with+Monaco;Track+streaks%2C+mastery+and+progress;Compete+on+weekly%2C+monthly+%26+all-time+leaderboards" alt="Typing animation" />
</a>

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini_AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

![Stars](https://img.shields.io/github/stars/Kanishka-K07/CodeMentor_AI?style=social)
![Forks](https://img.shields.io/github/forks/Kanishka-K07/CodeMentor_AI?style=social)
![Issues](https://img.shields.io/github/issues/Kanishka-K07/CodeMentor_AI)
![Last Commit](https://img.shields.io/github/last-commit/Kanishka-K07/CodeMentor_AI)
![Repo Size](https://img.shields.io/github/repo-size/Kanishka-K07/CodeMentor_AI)
![License](https://img.shields.io/github/license/Kanishka-K07/CodeMentor_AI)

**[Features](#-features) • [How It Works](#-how-it-works) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Roadmap](#-roadmap)**

</div>

---

## 🎯 About

**CodeMentor AI** is a full-stack, AI-powered coding and DSA learning platform. Traditional online judges only tell you *"Accepted"* or *"Wrong Answer"*. CodeMentor AI acts as a **Socratic mentor and pair programmer**: it nudges you toward the solution instead of handing it over.

> 💡 **Guided discovery over direct answers.** Progressive 3-tier hints, conceptual nudges, and time/space complexity critiques help you actually *learn* the algorithm.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 💻 | **Interactive Workspace** | Monaco editor (Java and Python), theme toggle, run/submit controls, live output console |
| 🧠 | **Socratic AI Mentor** | Chat and review panel that analyzes compile errors and logic bugs and gives targeted progressive hints |
| ⚡ | **In-Browser Judge** | Runs visible example tests and hidden edge cases with pass/fail breakdown, runtime and memory stats |
| 📚 | **300+ Curated Problems** | 305 LeetCode-style problems across 15 DSA categories: Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, DP, Recursion, Backtracking, Greedy, Sorting, Searching, Hashing, and Bit Manipulation |
| 🏆 | **Global Leaderboard** | Weekly, Monthly, and All-Time competitive leaderboards tracking coder XP, solve counts, and ranks |
| 🏅 | **Milestone Badges** | Achievement badges awarded for solving 10, 25, 50, 100, 200, and 300 problems, plus streaks and XP ranks |
| 🛠️ | **AI Problem Generator** | Generate new custom problems on demand for any topic and difficulty |
| 📊 | **Dashboard & Heatmap** | GitHub-style 365-day contribution heatmap, topic mastery charts, XP points, streaks |
| 💾 | **Database Persistence & Fallback** | MongoDB + Mongoose backend with automated zero-config local JSON fallback for offline practice |

---

## 💡 How It Works

```
                     ┌──────────────────┐
                     │   User Code in   │
                     │  Monaco Editor   │
                     └────────┬─────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       ┌───────────────┐             ┌───────────────┐
       │ In-Browser    │             │   Socratic    │
       │ Execution     │             │   AI Mentor   │
       │ Engine        │             │ (Gemini API)  │
       └───────┬───────┘             └───────┬───────┘
               │                             │
               ▼                             ▼
       Test Results &                Progressive Hints
       Hidden Test Cases             & Complexity Review
               │                             │
               └──────────────┬──────────────┘
                              ▼
                     ┌──────────────────┐
                     │ MongoDB / Sync   │
                     │ User Progress,   │
                     │ XP & Heatmap     │
                     └──────────────────┘
```

---

## 🛠️ Tech Stack

<table width="100%">
<tr>
<td valign="top" width="33%">

**🎨 Frontend**
- React 19 + TypeScript
- Vite
- Monaco Editor (`@monaco-editor/react`)
- Tailwind CSS v4
- Framer Motion
- Recharts
- react-router-dom v7
- react-hot-toast
- Lucide React

</td>
<td valign="top" width="33%">

**⚙️ Backend**
- Node.js + Express 5 (ESM)
- MongoDB + Mongoose
- Local JSON Fallback Storage
- JWT (`jsonwebtoken`)
- `bcryptjs`
- CORS
- `concurrently`

</td>
<td valign="top" width="33%">

**🤖 AI & Execution**
- Google Gemini API
- Structured prompt templates
- Rule-based fallback analyzer
- In-browser test runner
- Monaco Editor

</td>
</tr>
</table>

---

## 🏗️ Architecture

<details>
<summary><b>📁 Project structure (click to expand)</b></summary>

```
CodeMentor_AI/
├── server/                          # Express + MongoDB backend
│   ├── models/                      # User, Submission, Progress, CodeDraft, UserStats
│   ├── routes/auth.js               # Login, Register, Profile, Sync (JWT)
│   ├── fallbackStorage.js           # Seamless offline local JSON storage
│   └── index.js                     # Submissions, progress, drafts, stats, leaderboard, bulk sync
│
└── src/                             # React + TypeScript frontend
    ├── components/                  # ContributionHeatmap, Navbar, Badges, ...
    ├── data/
    │   ├── problems.ts              # 305 curated problems, tests, starter templates
    │   └── mockAI.ts                # Offline hints and fallback responses
    ├── pages/
    │   ├── ProblemWorkspace.tsx     # Editor + Judge + Test Cases
    │   ├── AICodeMentor.tsx         # Step-by-step AI guidance
    │   ├── Dashboard.tsx            # Charts, activity heatmap, topic mastery, badges
    │   ├── ProblemList.tsx          # 305 problems, pagination, filters by difficulty / topic / status
    │   ├── Leaderboard.tsx          # Weekly, monthly, and all-time rankings
    │   ├── Profile.tsx              # User info, avatar, achievements, stats
    │   └── Login.tsx / Register.tsx
    ├── services/
    │   ├── executionEngine.ts       # Client-side test evaluator (Java & Python)
    │   ├── geminiService.ts         # Gemini client for reviews & hints
    │   ├── aiAnalyzer.ts            # Logic error and complexity analyzer
    │   ├── customProblemService.ts  # AI problem generator
    │   └── storageService.ts        # LocalStorage + MongoDB sync
    ├── store/
    │   ├── AppContext.tsx           # Submissions, drafts, problem stats, XP scoring
    │   └── AuthContext.tsx          # Auth session
    └── types/index.ts               # Strict TypeScript types
```

</details>

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas URI) — *optional, runs seamlessly in local fallback mode if offline*
- *(Optional)* a [Google Gemini API key](https://aistudio.google.com/). Without one, the offline mentor is used.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kanishka-K07/CodeMentor_AI.git
cd CodeMentor_AI

# 2. Install dependencies
npm install

# 3. Configure environment variables (see below)
cp .env.example .env

# 4. Start frontend + backend together
npm run dev
```

### 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# Backend & Database
PORT=5000
SERVER_PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/codementor_ai
JWT_SECRET=your_super_secret_jwt_key

# AI Mentor (optional: falls back to offline mentor if empty)
VITE_GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ **Never commit your `.env` file.** Make sure it is listed in `.gitignore`.

---

## 🗺️ Roadmap

- [x] Monaco workspace with Java and Python
- [x] Socratic 3-tier AI hints
- [x] Offline fallback mentor
- [x] Dashboard, 365-day heatmap and streaks
- [x] AI custom problem generator
- [x] 300+ Curated DSA Problems across 15 categories
- [x] Weekly, Monthly, and All-Time Leaderboards
- [x] Milestone achievement badges (10, 25, 50, 100, 200, 300 problems)
- [ ] More languages (C++, JavaScript)
- [ ] Server-side sandboxed code execution
- [ ] Contest mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">

**Built with ❤️ by [Kanishka](https://github.com/Kanishka-K07)**

⭐ If you found this useful, please star the repo!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:06b6d4&height=100&section=footer" alt="footer" />

</div>
