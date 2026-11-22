# AI CodeMentor 🚀

An intelligent coding practice and interview preparation platform featuring AI-powered mentorship, interactive code execution, progress tracking, and user authentication.

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Verify your `.env` file in the project root:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
SERVER_PORT=5000
JWT_SECRET=your_secret_jwt_key
MONGODB_URI=mongodb://127.0.0.1:27017/codementor_ai
```

### 3. Run Frontend & Backend
Run both the Express backend API (`http://localhost:5000`) and the Vite frontend (`http://localhost:5173`) with a single command:
```bash
npm run dev
```

Or run them individually in separate terminals:
- **Backend API**: `npm run server`
- **Frontend Client**: `npm run dev:client`

---

## 🔐 Authentication & Database

### Seamless Fallback Mode
CodeMentor includes automatic local JSON storage fallback (`server/data/`). If MongoDB is not installed or currently stopped, the backend server will automatically store user accounts, code drafts, and progress locally. The application and authentication will work **100% out of the box without crashing**.

### (Optional) Starting MongoDB on Windows
If you want to use MongoDB persistence:
1. Open PowerShell or Command Prompt **as Administrator**.
2. Run:
   ```cmd
   net start MongoDB
   ```
3. When MongoDB connects, any user accounts created in fallback mode are automatically synchronized to MongoDB.

---

## 🛠 Available Scripts

- `npm run dev`: Runs both the Express server (port 5000) and Vite dev server (port 5173) concurrently.
- `npm run server`: Starts only the Express backend API.
- `npm run dev:client`: Starts only the Vite frontend.
- `npm run build`: Type-checks and builds the frontend for production.
- `npm run preview`: Locally previews the production build.
