# ⏱️ TimeKeeper

**TimeKeeper** is a modern full-stack time tracking and project management tool built with **TypeScript**, **Express**, **Drizzle ORM**, **Vite**, and supports cloud-native database backends like **NeonDB** and **Firebase**. It offers a clean and developer-friendly API to manage users, projects, time entries, time-off requests, and notifications.

---

## 🚀 Features

- 🧑‍💼 Client & Project Management
- ⏳ Time Entry Tracking (with approval workflows)
- 🗓️ Time-off Requests (with approvals)
- 📊 Analytics Dashboard (today’s hours, weekly totals, billable time)
- ☁️ Cloud DB support via NeonDB or Firebase

---

## 🛠️ Tech Stack

| Layer              | Tech                      |
|-------------------|---------------------------|
| Backend Framework | Express.js (with TypeScript) |
| ORM               | Drizzle ORM               |
| Database          | NeonDB (PostgreSQL) / Firebase |
| Frontend          | Vite (with TypeScript + React, optional) |
| Hosting           | Local |
| Dev Tools         | tsx, nodemon, dotenv  |

---
TimeKeeper runs as a full-stack application with a TypeScript-powered Express backend and an optional Vite-based frontend. 
The server exposes RESTful API endpoints for managing users, time entries, projects, and approvals. It connects to a NeonDB PostgreSQL database using Drizzle ORM, or alternatively, Firebase via the Admin SDK. 
In development mode, the frontend is served by Vite on port 5173 and the backend API runs on port 5000. All backend routes are prefixed with /api, and logs provide detailed tracking of API requests and responses. 
You can run the project locally using npm run dev after setting up your environment variables.
