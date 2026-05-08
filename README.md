# MERN Authenticated To-Do Application

A full-stack MERN (MongoDB, Express, React, Node.js) application with JWT Authentication and CRUD-based task management.

Users can register, login securely, and manage their personal tasks through a protected dashboard.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Token Authentication
- Password Hashing using bcryptjs
- Logout Functionality
- Protected Dashboard

### Task Management
- Add new tasks
- View all tasks
- Edit tasks
- Delete tasks
- MongoDB Atlas integration

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas

---

## Project Structure

```bash
frontend/
│
├── src/
│   ├── App.js
│   ├── Landing.js
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── Features.jsx
│   └── App.css

backend/
│
├── models/
│   ├── Task.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── server.js
└── .env
```

---

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```bash
http://localhost:5000
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```bash
http://localhost:3000
```

---

## Authentication Routes

POST `/register`
→ Register new user

POST `/login`
→ Login existing user

---

## Task Routes

GET `/tasks` → Fetch all tasks

POST `/add` → Add new task

PUT `/update/:id` → Update task

DELETE `/delete/:id` → Delete task

---

## Environment Variables

Create `.env` inside backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Future Improvements

- User-specific tasks
- Dark mode
- Task completion status
- Due dates
- Deployment on Render/Vercel

---

## Author

Soni G
