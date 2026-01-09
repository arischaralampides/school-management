# School Management System  
Coding Factory – Final Project

This project is a **full-stack School Management System** developed for the **Coding Factory Final Project**.  
It consists of a **RESTful backend API** and a **React frontend**.

---

## Features

### Backend
- RESTful API using **Node.js** and **Express**
- **MySQL** database
- **Sequelize ORM**
- **Sequelize Migrations** for database schema management
- **JWT Authentication & Authorization**
- Layered architecture:
  - Controllers
  - Services
  - Repositories
- **Swagger API Documentation**

### Frontend
- **React (Vite)**
- Axios for API communication
- JWT-based authentication
- Protected routes
- CRUD management for:
  - Students
  - Teachers
  - Classes
  - Subjects

---

## Technologies Used

### Backend
- Node.js
- Express
- MySQL
- Sequelize
- Sequelize CLI
- JWT
- Swagger

### Frontend
- React
- Vite
- Axios
- React Router

---

## Prerequisites

Before running the project, ensure you have installed:
- Node.js (v16 or newer)
- npm
- MySQL Server

---

## Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install

2. Environment configuration

Create a file backend/.env:
PORT=3000

DB_NAME=school_management
DB_USER=user8
DB_PASS=your_db_password
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql

JWT_SECRET=super_secret_change_me
JWT_EXPIRES_IN=2h

SEED_ADMIN=true
ADMIN_USERNAME=admin
ADMIN_PASSWORD=123456
ADMIN_ROLE=ADMIN

3. Create database and user
4. Run database migrations
5. Run backend
    npm run dev
    Backend runs at:
    API:
    http://localhost:3000
    Swagger UI:

    http://localhost:3000/api-docs
    An admin user is automatically created on first run:
    username: admin
    password: 123456
    API Documentation (Swagger)
    The REST API is documented using Swagger UI.
    Access it at:
    http://localhost:3000/api-docs
    Swagger provides detailed documentation of all endpoints, including request parameters,
    request bodies, authentication requirements, and responses.


Frontend Setup
1. Install dependencies
cd frontend
npm install

2. Environment configuration
Create a file frontend/.env:
VITE_API_URL=http://localhost:3000

3. Run frontend
npm run dev
Frontend runs at:
http://localhost:5173
Authentication
Login endpoint: POST /api/auth/login
Authentication is based on JWT
All protected API endpoints require:
Authorization: Bearer <token>
    

