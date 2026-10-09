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

## Deploy to Netlify

This project is configured for Netlify in the repository-root `netlify.toml`:

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist` (inside `frontend`)
- SPA fallback: requests such as `/anything` serve `index.html`
- Node.js: version 20

### Git-based deployment (recommended)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Netlify, choose **Add new project → Import an existing project**, authorize your Git provider, and select this repository.
3. Keep the build settings from `netlify.toml` and choose **Deploy**. Netlify will build the `frontend` app and publish it; later pushes to the connected production branch trigger new deployments.

No API server or environment variables are required. The résumé and profile images are included in `frontend/public` and are deployed with the site.

### Deploy without connecting Git

From the `frontend` directory, run `npm run build`, then deploy the generated `frontend/dist` directory using Netlify Drop or the Netlify CLI. Manual uploads do not automatically deploy later code changes.

## Update portfolio content

- `frontend/src/data/profile.ts`: bio, contact links, experience, projects, skills, and highlights
- `frontend/public/resume.pdf`: downloadable résumé
- `frontend/public/profile.jpg`: profile photo
- `frontend/src/components/Footer.tsx`: footer runner game and copyright
