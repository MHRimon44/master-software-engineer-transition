# Day 52 — DevFlow Tasks

Learn Next.js 15 App Router Server Actions, FormData, Zod validation, useActionState, useFormStatus, and revalidatePath.

## Run

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Visit http://localhost:3000

## Test manually

1. Submit title shorter than three characters: validation should block it.
2. Add a valid task: it appears in the list.
3. Toggle a task: the completed count updates.
4. Delete a task: it disappears.
5. Restart the server: data resets (in-memory educational store).

## Important limitations

This demo has **no authentication, authorization, durable database, or concurrency-safe storage**. Never use these mutation actions for production user data without checking identity and resource ownership server-side. The in-memory store is not reliable across serverless instances, deployments, or restarts. For a real app, use a database and authorization checks. `revalidatePath('/')` invalidates route data but does not provide database persistence.
