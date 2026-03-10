# MERN To-Do Application

A simple full-stack **MERN (MongoDB, Express, React, Node.js)** To-Do application that allows users to manage tasks with full CRUD operations.

## Features

* Add new tasks
* View all tasks
* Edit existing tasks
* Delete tasks
* Tasks stored in MongoDB Atlas

## Tech Stack

Frontend
React, Axios, CSS

Backend
Node.js, Express.js

Database
MongoDB Atlas

## Run Locally

Backend

```
cd backend
npm install
npm run dev
```

Frontend

```
cd frontend
npm install
npm start
```

App runs at:

```
http://localhost:3000
```

## API Routes

POST `/add` → Add new task
GET `/tasks` → Fetch all tasks
PUT `/update/:id` → Update task
DELETE `/delete/:id` → Delete task
