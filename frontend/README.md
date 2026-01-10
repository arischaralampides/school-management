# 📚 School Management System  
**Coding Factory – Final Project**

A **full-stack School Management System** developed as the **Coding Factory Final Project**.  
The application consists of a **RESTful backend API** and a **React frontend** for managing students, teachers, classes, courses, and grades.

---

## ✨ Features

### Backend
- RESTful API built with **Node.js** and **Express**
- **MySQL** relational database
- **Sequelize ORM**
- **JWT Authentication & Authorization**
- Role-based access (Admin)
- Layered architecture:
  - Controllers
  - Services
  - Repositories (DAO)
  - DTOs (Data Transfer Objects)
- **Swagger API Documentation**
- Automatic admin seeding on first run

#### Backend Functionalities
- Full CRUD operations for:
  - Students
  - Teachers
  - Classes
  - Courses (Subjects)
  - Grades
- Student assignment to:
  - Classes (one-to-many)
  - Courses (many-to-many)
- Teacher assignment to classes and courses
- Grade management per student and course
- Statistics endpoints (grades, enrollments)

---

### Frontend
- **React (Vite)**
- **Axios** for API communication
- **React Router** for navigation
- JWT-based authentication
- Protected routes
- Fully functional UI for:
  - Students (CRUD + assign classes & courses)
  - Teachers (CRUD)
  - Classes (CRUD)
  - Courses / Subjects (CRUD)
  - Grades (view & edit)

---

## 🛠 Technologies Used

### Backend
- Node.js
- Express
- MySQL
- Sequelize
- JWT (JSON Web Tokens)
- Swagger (swagger-ui-express, swagger-jsdoc)

### Frontend
- React
- Vite
- Axios
- React Router
- Tailwind CSS
- Framer Motion

---

## 📋 Prerequisites

Before running the project, ensure you have installed:
- **Node.js** v16 or newer
- **npm**
- **MySQL Server**

---

## ⚙️ Backend Setup

### 1. Install dependencies


2. Environment configuration
Create a file frontend/.env:
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

3. Create database
  Tables are created automatically by Sequelize on backend startup.

4. Run backend
  Backend runs at:

API base URL:
http://localhost:3000

Swagger UI:
http://localhost:3000/api-docs


5. Default Admin Account

On first run, an admin user is automatically created:

Username: admin
Password: 123456


API Documentation (Swagger)

The REST API is documented using Swagger UI.

Access it at:

http://localhost:3000/api-docs


Swagger includes:

All endpoints

Request and response schemas

Authentication requirements

Example payloads



🖥 Frontend Setup
1. Install dependencies
2. Environment configuration
Create a file frontend/.env:
VITE_API_URL=http://localhost:3000
3. Run frontend
Frontend runs at:
http://localhost:5173

🔐 Authentication

Login endpoint:

POST /api/auth/login


Authentication is based on JWT

All protected API endpoints require the header:

Authorization: Bearer <token>


The frontend automatically attaches the token after login.

