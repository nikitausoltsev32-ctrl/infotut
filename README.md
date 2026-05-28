# Infotut.ru

Infotut.ru is a Next.js news site prototype with a custom editorial homepage,
section pages, feedback/newsletter API routes, RSS generation, and local mock
content.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zod
- Feed

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

- `app/` - Next.js app routes, pages, API routes, layout and global styles.
- `components/` - reusable UI components.
- `lib/` - mock data, shared types and helpers.
- `public/` - static images and placeholders.

## Deployment

The project is ready for deployment on Vercel as a standard Next.js app.
