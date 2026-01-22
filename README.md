# DroneShop — commerce-grade platform for drone retail

**DroneShop** is a full-stack e-commerce platform where catalog speed, secure authentication, and media handling are non‑negotiable. It pairs a NestJS backend with a Next.js frontend to demonstrate production-grade engineering: strict DTO validation, clean domain boundaries, and a predictable client experience.

## Key Features

- JWT authentication with refresh flow and protected admin endpoints.
- Product catalog with categories, sections, and media galleries.
- Image uploads to Cloudinary with database persistence.
- Email confirmation and password recovery flows.
- Feedback system with rate limiting and admin access.
- Swagger documentation for API-first development.

## Tech Stack

**Backend**
- NestJS 11, TypeScript
- Prisma ORM + PostgreSQL
- JWT + Passport
- Swagger, class-validator, class-transformer
- Cloudinary for media
- Nodemailer (local SMTP on port 1025)

**Frontend**
- Next.js 16 (App Router) + React 19
- TypeScript, React Query
- Zod, React Hook Form
- Tailwind CSS, Framer Motion

**Infrastructure / Tooling**
- Docker-friendly separation of backend/frontend
- ESLint, Prettier
- Prisma migrations

## Architecture

The repo is a **monorepo** with two independent apps:

- `/backend` — NestJS API responsible for domain logic and data access.
- `/frontend` — Next.js application for UI, navigation, and client workflows.

Design highlights:
- Clear domain separation: `auth`, `products`, `feedback`, `mail`.
- DTO validation with global pipes for input safety.
- Media stored in Cloudinary; URLs persisted in PostgreSQL.
- JWT auth via cookies, with dedicated refresh/logout endpoints.

## Local Setup & Run

### 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd Nest-Next-Typescript-DroneShop

cd backend
npm install

cd ../frontend
npm install
```

### 2) Database and migrations

Create a PostgreSQL database and run:

```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

### 3) Environment variables

Create `.env` files in `backend/` and `frontend/` (examples below).

### 4) Run the apps

```bash
# Backend
cd backend
npm run start:dev

# Frontend (recommended port 3001)
cd ../frontend
npm run dev -- --port 3001
```

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api`
- Frontend: `http://localhost:3001`

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/droneshop
PORT=3000
FRONTEND_URL=http://localhost:3001
JWT_SECRET_KEY=super-secret-key
BCRYPT_SALT=10

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloud-key
CLOUDINARY_API_SECRET=your-cloud-secret
```

> Email notifications use a local SMTP server at `localhost:1025` (e.g., MailHog).

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_DOC_URL=http://localhost:3000/api
NEXT_PUBLIC_RENDER_NEW_PRODUCT_QUANTITY=4
```

## Core Endpoints / Modules

### Auth
- `POST /auth/send-email-confirm-code`
- `POST /auth/verify-email-confirm-code`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/send-reset-code`
- `POST /auth/verify-reset-code`
- `POST /auth/reset-password`

### Products / Categories
- `GET /products`
- `GET /products/new`
- `GET /products/:slug`
- `POST /products` (admin)
- `PATCH /products/:id` (admin)
- `DELETE /products/:id` (admin)
- `GET /products/categories`
- `POST /products/categories` (admin)
- `PUT /products/:slug/categories` (admin)
- `PATCH /products/:slug/categories` (admin)
- `DELETE /products/categories/:slug` (admin)

### Feedback
- `POST /feedback/send`
- `GET /feedback/get` (admin)

## Screenshots / Demo

This project targets production-quality UI/UX. Run the frontend and open `http://localhost:3001` to explore the interface. API docs are available via Swagger (`/api`).

## Roadmap

- Admin panel for product and order management.
- Full checkout flow with payments.


## Who This Is For

- **Recruiters** — a concise example of a production-ready full-stack product.
- **Senior engineers** — a clean NestJS + Next.js architecture reference.
- **Developers** — a practical base for an e-commerce platform with media and auth.

## Conclusion

DroneShop showcases how a production-grade e-commerce service should look: secure auth, a clean domain model, a predictable API, and a modern frontend. It’s a solid foundation for growth and commercialization.