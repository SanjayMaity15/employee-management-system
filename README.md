
# 📘 Employee Management System (EMS)

## 📌 Description

The **Employee Management System (EMS)** is a full-stack MERN web application designed to manage employee records efficiently. The application includes secure JWT-based authentication, role-based access control, and RESTful APIs to perform complete CRUD operations on employee data. The system helps organizations digitize employee information and streamline internal management processes.

---

## 🗂 Project Structure

```
employee-management-system/
│
├── frontend/     # React client
└── backend/      # Node.js & Express server
```

---

## 🚀 Features

* JWT-based authentication and authorization
* Role-based access control
* Create, read, update, and delete employee records
* RESTful API architecture
* Secure data storage with MongoDB
* Responsive and user-friendly interface

---

## 🛠 Tech Stack

**Frontend:** React.js, HTML, CSS, Tailwind CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Authentication:** JWT
**Tools:** Git, GitHub, Postman, MongoDB Compass

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

Backend API will run at:

```
http://localhost:5000
```

---

## 📌 Use Case

Used by organizations to manage employee profiles, roles, and records in a centralized and secure manner.

