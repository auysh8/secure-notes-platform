# Notes App

A full-stack notes application with JWT authentication, built with React and Node.js.

## Live Demo

[https://auysh8.github.io/notes-app/](https://auysh8.github.io/notes-app/)

## Screenshots

![Login Page](screenshots/login.png)
![Notes Grid](screenshots/notes.png)

## Features

- Register and login with JWT authentication
- Create, edit, and delete notes
- Pin, archive, and trash notes
- Search notes by title or content
- Color coded notes
- Responsive masonry grid layout
- Notes linked to individual users

## Tech Stack

**Frontend**

- React + TypeScript
- Framer Motion
- Axios
- React Router DOM

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```
notes-app/
├── src/
│   ├── components/
│   ├── hooks/
│   │   └── useNotes.ts
│   ├── pages/
│   │   └── AuthPage.tsx
│   ├── services/
│   │   └── notesApi.ts
│   └── types/
└── server/
    ├── middleware/
    │   └── auth.middleware.js
    ├── models/
    │   ├── note.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   └── notes.routes.js
    └── index.js
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account

### Installation

**Clone the repo**

```bash
git clone https://github.com/auysh8/notes-app.git
cd notes-app
```

**Install frontend dependencies**

```bash
npm install
```

**Install backend dependencies**

```bash
cd server
npm install
```

**Set up environment variables**

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_uri
JWT=your_jwt_secret
PORT=5000
```

### Running the App

**Start the backend**

```bash
cd server
node index.js
```

**Start the frontend**

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## Deployment

- **Backend** — deployed on [Render](https://render.com)
- **Frontend** — deployed on [GitHub Pages](https://pages.github.com)

## License

MIT
