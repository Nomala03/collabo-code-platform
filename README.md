# collabo-code-platform

# Collaborative Code Review Platform


This is a starter scaffold for the Collaborative Code Review Platform (Node.js + TypeScript + Postgres + Socket.IO + Prisma).


## Features implemented in scaffold
- Project structure and TypeScript setup
- PostgreSQL connection (Prisma schema + SQL)
- Authentication (register & login) with JWT
- Role-based middleware (Reviewer, Submitter)
- Users CRUD endpoints
- Projects endpoints (create, list, add/remove members)
- Submissions endpoints (create, list by project, view, update status, delete)
- Comments endpoints (add/list/update/delete)
- Simple review actions (approve/request changes)
- Basic WebSocket server (Socket.IO) that emits events when submissions, reviews, or comments are created
- Docker Compose for local dev (app + postgres)


## Getting started (local dev)
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npx prisma migrate dev --name init`
4. `npm run dev`


## Scripts
- `npm run dev` - start dev server with ts-node-dev
- `npm run build` - compile TypeScript
- `npm start` - run compiled code
- `npm run prisma:migrate` - run prisma migrations


## Notes
- This is a scaffold. Add tests, validation rules, and production hardening before using in production.