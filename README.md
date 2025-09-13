# 🚀 NestJS Starter Template

A **production-ready NestJS template** designed to help developers quickly bootstrap scalable backends.
This repo acts as a **goto place** for starting projects with NestJS.

👉 The `main` branch contains **only documentation**.
👉 Each feature branch contains its own implementation (REST, GraphQL, Sockets, etc.).

---

## 📦 Available Branches

* [`rest-typeorm`](https://github.com/<your-username>/nestjs-template/tree/rest-typeorm)
  ✅ REST API with `TypeORM` and `SQL`
  ✅ Swagger Documentation
  ✅ Global Interceptors & Filters
  ✅ Request Logging

* `graphql` (coming soon)

* `sockets` (coming soon)

* `microservices` (coming soon)

---

## 📂 Project Layout (per branch)

```bash
src/
│── app.module.ts         # Root application module
│── main.ts               # App entry point
│
├── configs/              # Configs (Swagger, Database, etc.)
├── controllers/          # REST API controllers
├── entities/             # TypeORM entities
├── utils/
│   ├── interceptors/     # Global interceptors
│   ├── filters/          # Exception filters
│   └── logger/           # Custom logger
├── routes/               # Route definitions
└── services/             # Business logic
```

---

## ⚙️ Getting Started (Example: `rest-typeorm`)

### 1. Checkout the branch

```bash
git clone https://github.com/<your-username>/nestjs-template.git
cd nestjs-template
git checkout rest-typeorm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env`:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASS=your_password
DATABASE_NAME=your_db
```

### 4. Run the app

```bash
npm run dev
```

API:
👉 `http://localhost:3000`

Swagger Docs:
👉 `http://localhost:3000`

---

## 🌱 Branch Strategy

* `main` → documentation only
* `rest-typeorm` → REST API + SQL
* `graphql` → GraphQL API with Apollo
* `sockets` → WebSockets (chat, live updates, etc.)
* `microservices` → Microservices architecture

---

## 🤝 Contribution

This repo is intended to be a **living template**.

* Found a bug? Open an issue.
* Want to add another branch (Mongo, Kafka, Redis)? Create a PR.
* Planning to extend with new examples? Let’s collaborate 🚀


