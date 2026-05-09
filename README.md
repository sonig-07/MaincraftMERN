# MERN Multi-User Notes Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application with JWT Authentication, Role-Based Access Control, and a secure multi-user Notes Management System.

Users can register, login securely, create personal notes, search notes, paginate results, and manage their own content through protected APIs.

Admins can view all user notes through a dedicated admin panel.

---

# Features

## Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Logout Functionality
- Owner-Based Authorization
- Role-Based Access Control (User/Admin)

---

## Notes Management

- Create Notes
- View Personal Notes
- Edit Notes
- Delete Notes
- Multi-User Note Isolation
- Notes linked to specific owners

---

## Advanced Features

- Search Notes
- Pagination
- Validation Middleware
- Admin Notes Panel
- Protected Admin Routes

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Middleware Architecture

---

## Database

- MongoDB Atlas
- Mongoose

---

# Project Structure

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
│   ├── AdminNotes.js
│   └── App.css

backend/
│
├── middleware/
│   ├── auth.js
│   ├── admin.js
│   └── validateNote.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── authRoutes.js
│   └── noteRoutes.js
│
├── server.js
└── .env
```

---

# Run Locally

## Backend

```bash
cd backend
npm install
node server.js
```

Backend runs at:

```bash
http://localhost:5000
```

---

## Frontend

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

# Authentication Routes

## Register User

```http
POST /register
```

---

## Login User

```http
POST /login
```

---

# Notes Routes

## Create Note

```http
POST /notes
```

---

## Get Notes

```http
GET /notes
```

Supports:

- Search
- Pagination

Example:

```http
/notes?search=react&page=1
```

---

## Update Note

```http
PUT /notes/:id
```

---

## Delete Note

```http
DELETE /notes/:id
```

---

# Admin Routes

## View All Notes

```http
GET /admin/notes
```

Accessible only by admin users.

---

# Environment Variables

Create `.env` inside backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Security Features

- JWT Token Verification
- Protected APIs
- Owner-Based Authorization
- Role-Based Authorization
- Password Hashing
- Validation Middleware

---

# Future Improvements

- Rich Text Notes Editor
- Dark Mode
- File/Image Uploads
- Note Categories
- Email Notifications
- Cloud Deployment
- Responsive Mobile UI

---

# Author

Soni G
