#  Project Title
**Scalable Task Manager Web App**  
_A modern, secure, and responsive task management system built with Next.js, Express, MongoDB, and TailwindCSS._

---

## 🚀 Features
- 🔒 **Authentication**: JWT + bcrypt with OTP fallback  
- ⚡ **Responsive UI**: Built with Next.js + TailwindCSS  
- 📊 **Dashboard**: CRUD operations on tasks (create, update, delete, toggle status)  
- 🔍 **Search & Filter**: Quickly find tasks  
- 👤 **Profile Management**: Fetch and update user profile  
- 🚪 **Logout Flow**: Secure session handling  

---

## 🛠️ Tech Stack
**Frontend**  
- Next.js (React framework)  
- TailwindCSS (UI styling)  
- React Hook Form + Zod (form validation)  

**Backend**  
- Node.js + Express  
- MongoDB Atlas (database)  
- JWT for authentication  
- bcrypt for password hashing  

**Deployment**  
- Frontend: Vercel  
- Backend: Render/Heroku  
- Database: MongoDB Atlas  

---

## 📂 Project Structure

/frontend
  /app
    /login
    /signup
    /contact
    /dashboard
    /tasks
    /profile
  /components
    Navbar.tsx
    Alert.tsx
    TaskCard.tsx

/backend
  /src
    /controllers
    /db
    /middlewares
    /models
    /routes
    /utils
    /validators
    app.js
    script.js

---

## ⚙️ Setup Instructions
### 1. Clone the repo
```bash
git clone https://github.com/AkhilBarige/full-project.git
cd full-project
```

### 2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Environment variables
-Create `.env` files in both frontend and backend:
env
# Backend .env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000

# Frontend .env
NEXT_PUBLIC_API_URL=http://localhost:5000

### 4. Run locally
bash
# Backend
npm run dev

# Frontend
npm run dev

---

## 📬 API Endpoints
- `POST /auth/signup` → Register new user  
- `POST /auth/login` → Login user  
- `GET /profile` → Fetch profile  
- `PUT /profile` → Update profile  
- `GET /tasks` → Fetch tasks  
- `POST /tasks` → Create task  
- `PUT /tasks/:id` → Update task  
- `DELETE /tasks/:id` → Delete task  

---

## 📈 Scalability Notes
- Move file uploads to AWS S3 or Cloudinary  
- Add rate limiting & input sanitization for production security  
- Use microservices for backend scaling  
- Implement CI/CD pipeline for automated deployments  

---

## ✅ Evaluation Criteria
- UI/UX quality & responsiveness  
- Secure authentication & token validation  
- Clean, modular code structure  
- Clear documentation & scalability potential  

---

## 👨‍💻 Developed By
**Akhil Barige**  
- 🎓 B.Tech in Computer Science, Anurag University (Graduated 2024)  
- 💼 Software Development Intern at NullClass  
- 🌐 [LinkedIn](https://www.linkedin.com/in/akhil-barige-59a168233/)  
- 💻 [GitHub](https://github.com/AkhilBarige)  


---

## 🌐 Live Demo
- 🔗 **Frontend (Next.js + TailwindCSS)**: [Live on Vercel](https://your-frontend-demo.vercel.app)
- 🔗 **Backend (Express + MongoDB)**: [Live on Render](https://your-backend-demo.onrender.com)

---