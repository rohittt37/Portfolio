# Rohit Gupta — Portfolio

This repository contains a static React portfolio built with Vite, TypeScript, Tailwind CSS, and GSAP. Profile content and project data are bundled with the frontend; the résumé and profile images are served from `frontend/public`.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

## Build for production

```bash
cd frontend
npm run build
npm run preview
```

## Deploy to Vercel

The Vite app is configured for Vercel in `frontend/vercel.json`. The rewrite serves the React app for client-side routes so refreshing a route does not return a 404.

### Git-based deployment (recommended)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project**, connect your Git provider, and import this repository.
3. Set **Root Directory** to `frontend` and keep the detected Vite defaults: build command `npm run build`, output directory `dist`, and install command `npm install`.
4. Choose **Deploy**. Later pushes to the connected production branch trigger new deployments.

No API server or environment variables are required. The résumé and profile images are included in `frontend/public` and are deployed with the site.

### Deploy with the Vercel CLI

Install and sign in to the Vercel CLI, then run these commands from `frontend`:

```bash
npm install
npm run build
npx vercel
```

Use `npx vercel --prod` for a production deployment after linking the project.

## Update portfolio content

- `frontend/src/data/profile.ts`: bio, contact links, experience, projects, skills, and highlights
- `frontend/public/resume.pdf`: downloadable résumé
- `frontend/public/profile.jpg`: profile photo
- `frontend/src/components/Footer.tsx`: footer runner game and copyright
