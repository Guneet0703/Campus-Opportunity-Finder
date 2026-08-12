# Campus Opportunity Finder

A full-stack **MERN** (MongoDB, Express, React, Node.js) application that helps
students discover internships, hackathons, workshops, coding contests,
scholarships, and other opportunities in one place, and lets an administrator
manage the listings through a dedicated dashboard.

---

## Tech Stack

**Frontend:** React 18 + Vite, React Router v6, Context API, Axios, React Icons, plain CSS
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
**Architecture:** MVC (backend) + component-based, service-layer architecture (frontend)

---

## Project Structure

```
campus-opportunity-finder/
├── backend/
│   ├── config/            # MongoDB connection
│   ├── controllers/       # Route handler logic
│   ├── middleware/         # Auth, admin, validation, error handling
│   ├── models/             # Mongoose schemas (User, Admin, Opportunity, Bookmark)
│   ├── routes/             # Express routers
│   ├── seed/                # Default admin seed script
│   ├── utils/               # asyncHandler, generateToken
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    └── src/
        ├── assets/
        ├── components/      # Reusable UI components
        ├── context/         # AuthContext (global auth state)
        ├── data/            # Category constants
        ├── hooks/           # useDebouncedValue
        ├── pages/           # One folder per page/route
        ├── services/        # Axios API layer
        ├── utils/           # Formatting & validation helpers
        ├── App.jsx
        └── main.jsx
```

---

## Prerequisites

- Node.js 18+ and npm
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier works fine)
  1. Create a cluster in Atlas.
  2. Under **Database Access**, create a database user with a username/password.
  3. Under **Network Access**, add your current IP address (or `0.0.0.0/0` for
     unrestricted access during local development).
  4. Under **Database > Connect > Drivers**, copy the connection string —
     you'll use it as `MONGODB_URI` below.

---

## 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your own values (replace `MONGODB_URI` with the
connection string copied from Atlas, including your database user's
username and password):

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-address>/campus-opportunity-finder?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=replace_this_with_a_long_random_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Campus Admin
ADMIN_EMAIL=admin@campusopportunityfinder.com
ADMIN_PASSWORD=Admin@12345
```

Seed the default administrator account (creates it in MongoDB Atlas using the
`ADMIN_*` values above):

```bash
npm run seed:admin
```

Start the backend in development mode (auto-restarts on file changes):

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`. Health check:
`GET http://localhost:5000/api/health`.

---

## 2. Frontend Setup

In a **new terminal**:

```bash
cd frontend
npm install
cp .env.example .env
```

The default `.env` already points at the local backend:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 3. Logging In

**Student account:** register a new account from the "Register" page, then log in.

**Admin account:** go to `/admin-login` and use the credentials from your `.env`
file (`ADMIN_EMAIL` / `ADMIN_PASSWORD`), by default:

```
Email:    admin@campusopportunityfinder.com
Password: Admin@12345
```

> Administrator accounts are never created through public registration — only
> through the `npm run seed:admin` script — per the project specification.

---

## Features Implemented

- Student registration, login, and logout (JWT-based)
- Separate, isolated administrator login and dashboard
- Public browsing of opportunities with **search** (title/organizer) and
  **category filtering**
- Opportunity details page with a direct registration link
- Bookmarking opportunities (add/remove) — students only
- Student profile page
- Admin dashboard: add, edit, and delete opportunities (full CRUD)
- Protected routes on both the frontend (React Router guards) and backend
  (JWT + role-based middleware)
- Loading, empty, and error states on every data-driven page
- Client-side and server-side validation on every form
- Fully responsive layout (desktop, tablet, mobile)
- Centralized error handling and consistent API response shapes

---

## API Overview

| Method | Endpoint                          | Access        | Description                     |
|--------|-----------------------------------|---------------|----------------------------------|
| POST   | /api/auth/register                | Public        | Register a student account       |
| POST   | /api/auth/login                   | Public        | Student login                    |
| POST   | /api/auth/admin/login             | Public        | Admin login                      |
| GET    | /api/auth/me                      | Private       | Get current account              |
| GET    | /api/opportunities                | Public        | List opportunities (search/filter)|
| GET    | /api/opportunities/:id            | Public        | Get one opportunity              |
| POST   | /api/opportunities                | Admin only    | Create an opportunity            |
| PUT    | /api/opportunities/:id            | Admin only    | Update an opportunity            |
| DELETE | /api/opportunities/:id            | Admin only    | Delete an opportunity            |
| GET    | /api/bookmarks                    | Student only  | List bookmarked opportunities    |
| GET    | /api/bookmarks/ids                | Student only  | List bookmarked opportunity ids  |
| POST   | /api/bookmarks/:opportunityId     | Student only  | Bookmark an opportunity          |
| DELETE | /api/bookmarks/:opportunityId     | Student only  | Remove a bookmark                |

---

## Building for Production

```bash
# Frontend
cd frontend
npm run build   # outputs static files to frontend/dist

# Backend
cd backend
NODE_ENV=production npm start
```

Serve `frontend/dist` with any static host (Vercel, Netlify, Nginx, etc.) and
point `VITE_API_BASE_URL` at your deployed backend URL before building.
