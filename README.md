# PrepForge — AI Mock Interview Platform

PrepForge is a full-stack AI-powered interview practice platform that turns a candidate's resume into a personalized mock interview experience. It supports resume upload and parsing, role-relevant question generation, timed interview flows, AI-assisted answer evaluation, and structured feedback.

## Why I Built It

Interview preparation is often generic. PrepForge is designed to make practice more relevant by using the candidate's own resume and technical background as context for question generation and evaluation.

The project gave me hands-on experience with:
- AI API integration in a production-style web application
- PDF resume processing
- database-backed interview workflows
- typed full-stack development with Next.js and TypeScript
- Prisma/PostgreSQL data modeling
- authentication-ready application architecture

## Core Features

- Upload resumes in PDF format
- Extract and persist resume text
- Generate personalized technical interview questions using AI
- Run a structured, timed mock interview flow
- Evaluate candidate answers with AI-generated scores and feedback
- Surface improvement suggestions after each response
- Review interview results and performance
- Authentication-ready architecture with NextAuth
- Type-safe server communication using tRPC

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | Next.js server APIs, tRPC |
| Database | PostgreSQL, Prisma ORM |
| Authentication | NextAuth |
| AI | Gemini API, Groq API |
| Tooling | ESLint, npm, Git |

## Application Flow

```text
Resume Upload
     ↓
PDF Text Extraction
     ↓
Resume Context Stored
     ↓
AI Question Generation
     ↓
Timed Interview Session
     ↓
Answer Evaluation
     ↓
Score + Feedback + Improvement Suggestions
     ↓
Results Review
```

## Architecture Overview

PrepForge uses a full-stack Next.js architecture where the UI, API layer, AI integrations, and database workflows are kept in one typed application.

```text
Client UI
  │
  ├── Resume Upload
  ├── Interview Interface
  └── Results
  │
  ▼
Next.js / tRPC Server Layer
  │
  ├── Resume Processing
  ├── Interview Logic
  └── AI Service Calls
  │
  ├──────────────► Gemini / Groq APIs
  │
  ▼
Prisma ORM
  │
  ▼
PostgreSQL
```

## Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── interview/
│   ├── results/
│   └── upload/
├── server/
└── trpc/

prisma/
public/
```

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL database
- Gemini API key
- Groq API key

### Clone

```bash
git clone https://github.com/bytebysatyam/Prepforge-AI-Mock-Interview.git
cd Prepforge-AI-Mock-Interview
```

### Install dependencies

```bash
npm install
```

### Configure environment

Copy the supplied example configuration and add your own credentials.

```bash
cp .env.example .env
```

Core variables include:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/prepforge?schema=public"
GEMINI_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
```

Never commit real API keys or production credentials.

### Prepare the database

```bash
npx prisma generate
npx prisma migrate deploy
```

### Start development

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run db:push
npm run db:migrate
npm run db:studio
```

## Engineering Highlights

- **Resume-driven AI context:** interview questions are generated from uploaded candidate information instead of using only static question banks.
- **Typed full-stack workflow:** TypeScript and tRPC help keep client/server contracts predictable.
- **Database abstraction:** Prisma provides structured access to PostgreSQL and makes schema evolution easier to manage.
- **Multi-provider AI integration:** the project is structured to work with Gemini and Groq-powered features.
- **Environment-safe setup:** secrets are separated from source code through environment configuration and a committed `.env.example`.

## Current Status

The core mock-interview workflow is implemented in the repository. Production deployment requires a hosted PostgreSQL database and valid AI provider credentials.

## Planned Improvements

- Interview history and richer analytics
- Voice-based mock interviews
- Webcam-assisted interview practice
- More detailed performance trends
- Improved responsive/mobile experience
- Production deployment with hosted PostgreSQL

## Security Notes

- Keep `.env` files out of version control.
- Rotate credentials immediately if a real key is ever exposed.
- Validate uploaded files before production use.
- Apply authentication and authorization checks to user-specific interview data before production deployment.

## Author

**Satyam Shukla**  
Full Stack Software Developer

- GitHub: https://github.com/bytebysatyam
- LinkedIn: https://www.linkedin.com/in/satyamshukla10/
- Portfolio: https://satyam-shukla-portfolio-jet.vercel.app/
- Email: shuklasatyam48890@gmail.com
