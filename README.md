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

Backend/
├── dist/                    # Compiled JavaScript output
├── src/                    # TypeScript source files
│   ├── Middleware/         # Express middleware functions
│   ├── Routes/            # API route handlers
│   │   ├── AddContent.ts
│   │   ├── AddTags.ts
│   │   ├── DeleteContent.ts
│   │   ├── GetContent.ts
│   │   ├── GetContentByTags.ts
│   │   ├── GetContentOfShareLink.ts
│   │   ├── Login.ts
│   │   ├── Logout.ts
│   │   ├── SearchContent.ts
│   │   └── Signup.ts
│   ├── Z-validation/      # Input validation schemas
│   │   └── ValidationObjects.ts
│   ├── Config.ts          # Application configuration
│   ├── db.ts             # Database connection and models
│   ├── Routes.ts         # Route definitions
│   └── server.ts         # Express server setup
├── .env                  # Environment variables
├── package.json         # Backend dependencies
├── tsconfig.json       # TypeScript configuration
└── tsconfig.tsbuildinfo # TypeScript build info

Frontend/Cache/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── Components/     # Reusable React components
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── NavBar.tsx
│   │   ├── NavBarMobile.tsx
│   │   └── Topbar.tsx
│   ├── Pages/         # Page-level components
│   │   ├── Create.tsx
│   │   └── MainPages.tsx
│   ├── Ui-Components/ # UI-specific components
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── .env.local         # Frontend environment variables
├── package.json      # Frontend dependencies
├── vite.config.ts    # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json    # TypeScript configuration

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
