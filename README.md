# Prepforge AI Mock Interview

Prepforge is an AI-powered mock interview platform that helps users practice technical interviews with resume-based question generation, answer evaluation, and score tracking.

## Features

- Upload a resume in PDF format
- Extract and store resume text
- Generate personalized technical interview questions using AI
- Practice through a timed mock interview flow
- Evaluate answers with AI-generated score, feedback, and improvement suggestions
- Track interview performance on a results page
- Authentication-ready project structure with NextAuth

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Prisma
- SQLite
- tRPC
- NextAuth
- Gemini API
- Groq API
- Tailwind CSS

## Project Flow

1. Upload a PDF resume
2. Parse and store the resume text
3. Generate technical interview questions based on the resume
4. Answer questions in the mock interview interface
5. Evaluate responses using AI
6. Review scores and feedback on the results page

## Folder Structure

```bash
src/
  app/
    api/
    interview/
    results/
    upload/
  server/
  trpc/
prisma/
public/
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bytebysatyam/Prepforge-AI-Mock-Interview.git
cd Prepforge-AI-Mock-Interview
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="file:./prisma/dev.db"
GEMINI_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Database Setup

Run Prisma migration:

```bash
npx prisma migrate dev
```

If needed, generate the Prisma client:

```bash
npx prisma generate
```

## Run the Project

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Deployment

Recommended setup:

- Host the app on Vercel
- Use a hosted PostgreSQL database such as Neon, Supabase, or Prisma Postgres

Required production environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/prepforge?schema=public"
GEMINI_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
```

Suggested deployment flow:

1. Create a hosted PostgreSQL database
2. Add the production `DATABASE_URL`, `GEMINI_API_KEY`, and `GROQ_API_KEY` in your hosting dashboard
3. Run your Prisma migration against the production database
4. Import the GitHub repository into Vercel and deploy

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

## Notes

- `generated/prisma/` is ignored and can be regenerated locally
- `prisma/dev.db` is ignored and should not be committed
- Valid API keys are required for Gemini and Groq-powered features

## Future Improvements

- Better interview analytics dashboard
- Persistent interview history per user
- Voice-based interview mode
- Webcam-based answer recording
- Improved mobile responsiveness
- Production deployment support with a hosted database

## Author

Built by [Satyam](https://github.com/bytebysatyam)
