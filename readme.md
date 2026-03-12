# 🔐 Vaultly

### A secure, minimal password manager built with the MERN stack.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

---

## About

Vaultly is a full-stack password manager that lets users securely store, view, edit, and delete credentials for any service. Built with a focus on simplicity and security — passwords are protected behind authenticated sessions using JWT.

---

## Features

- 🔑 User authentication — signup and login
- 🍪 Session management with JWT
- 🗄️ Save credentials — service, email, and password
- ✏️ Inline edit and delete saved passwords
- 👁️ Toggle password visibility per entry
- 🔒 Protected routes — only authenticated users can access their vault
- 📋 Form validation with React Hook Form + Yup

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Hook Form, Yup |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT |
| Styling | CSS |
| Config | dotenv, CORS |

---

## Project Structure

```
Password-Manager/
├── Backend/
│   ├── Controller/
│   │   ├── savedPasswords.js
│   │   └── User.js            
│   ├── Middleware/
│   │   └── Auth.js          
│   ├── Model/
│   │   ├── savedPasswords.js
│   │   └── User.js          
│   ├── Routes/
│   │   ├── savedPasswords.js
│   │   └── User.js            
│   ├── Services/
│   │   └── Auth.js            
│   ├── .env
│   ├── connect.js             
│   └── index.js               
│
└── Frontend/
    ├── Components/
    │   ├── Dashboard/
    │   │   ├── Dashboard.jsx
    │   │   └── Dashboard.css
    │   ├── Login/
    │   │   ├── Login.jsx
    │   │   └── Login.css
    │   ├── Signup/
    │   │   ├── Signup.jsx
    │   │   └── Signup.css
    │   ├── Navbar.jsx
    │   └── Navbar.css
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    └── index.html
```

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repo

```bash
git clone https://github.com/Wasiqashfaq23/Password-Manger.git
cd Password-Manger
```

2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8001
```

Create a `.env` file in the `Frontend/` folder:

```env
VITE_API_URL=http://localhost:8001
```

Start the backend:

```bash
node index.js
```

3. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```


---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | ❌ |
| POST | `/login` | Login and receive session cookie | ❌ |
| POST | `/logout` | Clear session cookie | ❌ |
| GET | `/me` | Verify session | ✅ |
| GET | `/password` | Get all saved passwords | ✅ |
| POST | `/password` | Save a new password | ✅ |
| PATCH | `/password/:id` | Update a password | ✅ |
| DELETE | `/password/:id` | Delete a password | ✅ |

---

## Security

- Passwords are stored in MongoDB behind authenticated routes
- CORS configured to only allow requests from the frontend origin

---

## Author

**Wasiq**

---