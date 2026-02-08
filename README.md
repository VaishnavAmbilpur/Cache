# Cache

Cache is a personal link-management web application that helps users store, organize, and retrieve important links such as YouTube videos, Twitter/X posts, Google Docs, and custom URLs — securely and person-wise.

Each user gets a private workspace where links are cached and categorized for quick access.

---

## Features

- User authentication (Signup, Login, Logout)
- Person-wise link storage with strict data isolation
- Add and delete cached links
- Tag-based categorization
- Retrieve links by tags
- Shareable links with controlled access
- Backend input validation
- Modular and scalable architecture

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT Authentication
- Zod Validation

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

---

## Project Structure

PROJECT-CACHE
├── Backend
│ ├── dist
│ ├── src
│ │ ├── Middleware
│ │ ├── Routes
│ │ ├── Z-validation
│ │ ├── Config.ts
│ │ ├── db.ts
│ │ ├── Routes.ts
│ │ └── server.ts
│ ├── .env
│ ├── package.json
│ └── tsconfig.json
│
├── Frontend/Cache
│ ├── src
│ │ ├── assets
│ │ ├── Components
│ │ ├── Pages
│ │ ├── Ui-Components
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── public
│ ├── .env.local
│ ├── package.json
│ └── vite.config.ts
│
└── README.md

# Authentication Flow

User signs up or logs in

JWT token is issued

Token is verified using middleware

All requests are scoped to the authenticated user

# Future Enhancements

Browser extension for quick link saving

Favorites and pinned links

Full-text search

Team or shared caches

Real-time updates using WebSockets
