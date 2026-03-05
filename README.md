# Login Application — React + Node.js/Express

A premium, full-stack login application that features a secure Express-based backend and a React-powered frontend with a modern glassmorphism design.

## Features

- **Secure Login**: Validates credentials using a custom backend API.
- **Modern UI**: Dark-themed, responsive design with smooth animations.
- **Session Persistence**: Remembers your username for future logins using `localStorage`.
- **API Validation**: Handles success (200), unauthorized (401), and bad request (400) status codes.
- **Functional Components**: Built entirely with React Hooks and modern best practices.

## Technologies Used

- **Frontend**: React (Vite), React Router, CSS3 (Glassmorphism).
- **Backend**: Node.js, Express, CORS.

## Project Structure

```text
Assignment/
├── backend/            # Express Server
│   ├── package.json
│   └── server.js      # API logic & endpoints
└── frontend/           # React Application
    ├── package.json
    ├── index.html
    └── src/
        ├── App.jsx     # Routing
        ├── main.jsx    # Entry point
        ├── index.css   # Premium styling
        └── pages/
            ├── Login.jsx   # Login page component
            └── Welcome.jsx # Welcome page component
```

## Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Setting Up the Backend
Open a terminal in the `backend/` directory:
```bash
cd backend
npm install
node server.js
```
The server will start at `http://localhost:5000`.

### 3. Setting Up the Frontend
Open a new terminal in the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

## Authentication Details
- **Test Credentials**:
  - **Username**: `admin`
  - **Password**: `admin`
- **Backend Endpoint**: `POST /login`
  - Validates `{ username, password }` in the JSON body.
