# 🌌 NoteSphere

A modern real-time full-stack MERN Notes Application with authentication, role-based access control, live synchronization, advanced search, pagination, and premium futuristic UI.

Built as part of a MERN Stack Internship project and progressively upgraded into a production-style application.

---

# 🚀 Features

## 🔐 Authentication & Security
- JWT Authentication
- User Login & Registration
- Protected Routes
- Password Hashing using bcrypt
- Role-Based Access Control (Admin/User)
- Helmet.js Security
- Rate Limiting

---

## 📝 Notes Management
- Create Notes
- Read Notes
- Update Notes
- Delete Notes
- Owner-based Note Authorization
- Real-Time Note Synchronization
- Search Notes
- Pagination

---

## ⚡ Real-Time Features
- Socket.io Integration
- Instant Updates Across Tabs/Users
- Live CRUD Synchronization

---

## 🎨 UI/UX Features
- Modern Glassmorphism UI
- Dark / Light Mode
- Responsive Layout
- Toast Notifications
- Loading & Error States
- Animated Edit Modal
- Empty State UI

---

# 🛠 Tech Stack

## Frontend
- React.js
- Axios
- React Router DOM
- Socket.io Client
- React Toastify

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Socket.io
- Helmet.js
- Express Rate Limit

---

# 📂 Project Structure

```bash
frontend/
backend/
```

---

# ⚙️ Environment Variables

Create a `.env` file inside backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
PORT=5000
```

---

# ▶️ Installation & Setup

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔥 Key Concepts Implemented

- JWT Authentication
- Authorization
- RBAC (Role-Based Access Control)
- REST APIs
- Real-Time Architecture
- WebSockets
- Debounced Search
- MongoDB Indexing
- Production Security Practices
- Responsive UI Design

---

# 📸 Screenshots

Add screenshots here after deployment/UI finalization.

---

# 👨‍💻 Author

Soni G

---

# 🌟 Future Improvements

- Cloud Deployment
- Collaborative Editing
- Push Notifications
- File Uploads
- Markdown Notes
- PWA Support
