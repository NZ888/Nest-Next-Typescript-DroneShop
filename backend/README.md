# DroneShop Backend

NestJS backend for a drone e-commerce store.  
The service implements JWT-based authentication, product management with media uploads to Cloudinary, and provides API documentation via Swagger.

## Stack

- [NestJS 11](https://docs.nestjs.com/) — main framework  
- [Prisma ORM](https://www.prisma.io/) — database ORM for PostgreSQL  
- [JWT](https://jwt.io/) + Passport — authentication  
- [Cloudinary](https://cloudinary.com/) — image storage  
- [class-validator / class-transformer](https://github.com/typestack/class-validator) — DTO validation  
- [Swagger](https://swagger.io/) — API documentation generator  

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Quick Start

```bash
cd backend
npm install
```

1. Create a PostgreSQL database.  
2. Copy the `.env.example` file (or create `.env` manually) and fill in the environment variables from the table below.  
3. Run the migrations and generate Prisma Client:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```

The app will run at `http://localhost:3000`, and Swagger documentation is available at `http://localhost:3000/api`.

## Environment Variables

| Variable | Description |
|-----------|--------------|
| `DATABASE_URL` | PostgreSQL connection string (`postgresql://user:password@host:port/db`). |
| `PORT` | HTTP server port (default `3000`). |
| `FRONTEND_URL` | Allowed CORS origin (e.g. `http://localhost:3001`). |
| `JWT_SECRET_KEY` | Secret key for JWT signing. |
| `BCRYPT_SALT` | Numeric salt rounds for password hashing (e.g. `10`). |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |

## npm Scripts

| Command | Description |
|----------|--------------|
| `npm run start` | Run in production mode (requires `npm run build` first). |
| `npm run start:dev` | Run in development mode with hot reload. |
| `npm run build` | Compile source code into `dist/`. |
| `npm run lint` | Lint source files with ESLint. |
| `npm test` | Run unit tests using Jest. |

## Project Structure

- `src/main.ts` — entry point; sets up Helmet, global pipes, CORS, and Swagger.  
- `src/app.module.ts` — root module of the app.  
- `src/prisma` — Prisma module and service for DB access.  
- `prisma/schema.prisma` — database schema (users, admins, products, sections).  
- `src/auth` — user registration and login, JWT strategy, guards, and role control (`USER`, `ADMIN`).  
- `src/products` — CRUD operations for products, including main image, gallery, and section media uploads.  
- `src/cloudinary` — Cloudinary integration: upload, delete, and `public_id` extraction utilities.  

## Features

### Authentication

- `POST /auth/register` — registers a new user with `USER` or `ADMIN` role; passwords are hashed using bcrypt.  
- `POST /auth/login` — returns a JWT with payload `{ sub, email, role }` and a 20-minute expiration time.  
- `JwtAuthGuard` + `@Roles()` decorator protect admin-only endpoints.  

### Product Management

- `POST /products` — create a new product (admin only). Accepts JSON data (`data`) and file uploads (`mainImage`, `gallery`, `sectionImages`). Files are uploaded to Cloudinary, and URLs are saved in the database.  
- `GET /products` — list of products (name, price, main image, slug).  
- `GET /products/:slug` — single product page.  
- `PATCH /products/:id` — update product, recreate sections, and optionally replace media.  
- `DELETE /products/:id` — delete product and clean up related Cloudinary images and DB records.  

### API Documentation

Swagger is available at `/api`, including DTO schemas (`CreateProductDto`, `RegisterDto`, etc.) for convenient endpoint testing via Swagger UI.  

## Tips

- For local development, set `FRONTEND_URL=http://localhost:3001` if the Next.js frontend runs on port 3001.  
- Make sure test users have proper roles — only `ADMIN` can access product CRUD endpoints.  
- When changing the Prisma schema, always run `npx prisma migrate dev`.  
- You can configure a dedicated Cloudinary folder (e.g. `droneshop/`) and pass it to `upload_stream` in `CloudinaryService` if needed.
