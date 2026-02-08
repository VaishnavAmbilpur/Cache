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
│
├── Backend
│ ├── dist/ # Compiled JavaScript output
│ ├── src/
│ │ ├── Middleware/ # Authentication & request middleware
│ │ ├── Routes/ # API route handlers
│ │ │ ├── AddContent.ts
│ │ │ ├── AddTags.ts
│ │ │ ├── DeleteContent.ts
│ │ │ ├── GetContent.ts
│ │ │ ├── GetContentByTags.ts
│ │ │ ├── GetContentOfShareLink.ts
│ │ │ ├── Login.ts
│ │ │ ├── Logout.ts
│ │ │ ├── SearchContent.ts
│ │ │ └── Signup.ts
│ │ ├── Z-validation/ # Zod validation schemas
│ │ │ └── ValidationObjects.ts
│ │ ├── Config.ts # App configuration
│ │ ├── db.ts # Database connection
│ │ ├── Routes.ts # Route aggregator
│ │ └── server.ts # Server entry point
│ ├── .env # Environment variables
│ ├── package.json
│ ├── tsconfig.json
│ └── tsconfig.tsbuildinfo
│
├── Frontend/Cache
│ ├── public/ # Static public files
│ ├── src/
│ │ ├── assets/ # Images and static assets
│ │ ├── Components/ # Reusable components
│ │ │ ├── Login.tsx
│ │ │ ├── Signup.tsx
│ │ │ ├── NavBar.tsx
│ │ │ ├── NavBarMobile.tsx
│ │ │ └── Topbar.tsx
│ │ ├── Pages/ # Application pages
│ │ │ ├── Create.tsx
│ │ │ └── MainPages.tsx
│ │ ├── Ui-Components/ # Shared UI elements
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ ├── .env.local # Frontend environment variables
│ ├── package.json
│ ├── vite.config.ts
│ ├── tailwind.config.js
│ └── tsconfig.json
│
├── .gitignore
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
