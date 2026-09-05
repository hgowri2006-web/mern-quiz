# MERN Quiz Portal

A full-stack quiz application built using the MERN stack. The application allows users to register, log in, take quizzes by topic and difficulty, view their performance, and provides an authenticated admin panel for managing quiz questions.

## Features

### User Features

* User registration and login
* Secure password hashing using bcrypt
* Quiz categories:

  * Astronomy
  * Aptitude
  * Programming
* Difficulty-based quizzes
* Server-side quiz timer
* Tab-switch detection
* Automatic quiz scoring
* Percentage calculation
* Performance history
* Best score and best percentage tracking

### Admin Features

* Secure admin login using JWT authentication
* Add quiz questions
* View quiz questions
* Edit quiz questions
* Delete quiz questions
* Protected question-management API routes
* Server-side input validation

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* JWT
* bcrypt

### Database

* MongoDB
* Mongoose

## Project Structure

```text
mern-quiz/
├── README.md
├── .env.example
├── backend/
│   ├── server.js
│   └── ...
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── ...
    └── ...
```

## Environment Variables

Create the required environment files using `.env.example` as a reference.

Required variables:

```env
MONGO_URI=
PORT=8080
QUIZ_DURATION=120
VITE_API_URL=
```

Do not commit your actual `.env` files or database credentials to Git.

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd mern-quiz
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file in the backend directory and add your MongoDB connection string and server configuration.

### 4. Start the backend

```bash
npm start
```

The backend runs on:

```text
http://localhost:8080
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure frontend environment variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080
```

### 7. Start the frontend

```bash
npm run dev
```

The Vite development server will provide the frontend URL in the terminal.

## Authentication

Admin question-management routes are protected using JWT authentication.

The admin token is stored on successful login and sent with protected API requests using the `Authorization` header.

## Quiz Flow

1. User logs in.
2. User selects a quiz topic.
3. A quiz session is created on the server.
4. The server provides the quiz expiry time.
5. The user answers the questions.
6. The server validates quiz-session expiry.
7. The final score is calculated and stored.
8. Results are displayed on the user's dashboard.

## API Overview

### Authentication

```text
POST /signup
POST /login
POST /admin/login
```

### Questions

```text
GET    /questions
POST   /questions
PUT    /questions/:id
DELETE /questions/:id
```

Question-management operations require admin authentication.

### Quiz

```text
POST /quiz/start
POST /quiz/answer
POST /quiz/result
```

### Results

```text
GET /quiz/results/:username
```

## Validation

Quiz questions are validated on the server using Mongoose schema validation, including:

* Required question text
* Question length restrictions
* Exactly four non-empty options
* Required answer
* Valid quiz categories

## Future Improvements

* Automated unit and integration tests
* Improved error handling and logging
* Additional quiz categories
* More configurable quiz settings
* Production deployment configuration
