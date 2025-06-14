# Healing with Layla Monorepo

This monorepo contains the frontend and backend projects for Healing with Layla, a therapy blog built with Astro and Sanity.

## Repo Structure

```plaintext
/ (root)
├── frontend/                 # Astro frontend site
│   ├── cypress/              # Cypress end-to-end tests for frontend
│   ├── src/
│   │   ├── components/       # React & Astro components
│   │   ├── pages/            # Astro pages
│   │   ├── sanity/           # Sanity client code & libs for frontend
│   │   │   └── lib/
│   │   │       └── sanityClient.ts
│   │   ├── utils/            # Other utilities
│   │   ├── public/           # Static assets & pagefind index
│   │   └── ...
│   ├── package.json          # Frontend dependencies and scripts
│   └── ...
├── backend/                  # Sanity backend studio & config
│   ├── sanity/               # Sanity config and libs
│   │   ├── lib/              # Shared libraries for backend
│   │   └── schemaTypes/      # Sanity content schemas
│   ├── sanity.config.ts             # Sanity studio code & config
│   ├── package.json          # Backend dependencies and scripts
│   └── ...
├── README.md                 # This root README
└── ...

```

## Frontend (Astro)

The frontend is an Astro project enhanced with React, integrated with Sanity as the headless CMS.

### How to run

```bash
cd frontend
npm install
npm run dev
```

### How to preview

```
npm run preview    # Preview the built site locally
```

## Backend (Sanity)

The backend is a Sanity Studio project managing your content schemas and CMS.

### How to run

```bash
cd backend
npm install
npm run dev        # Run Sanity studio locally (default localhost:3333)
```

### How to build and deploy

```bash
npm run build      # Build Sanity studio for production
npm run deploy     # Deploy Sanity studio (to configured Sanity project)
```

## Environment Variables

Both projects use environment variables for configuration, set via .env files or Netlify environment variables.

Typical variables include:

`PUBLIC_SANITY_PROJECT_ID`,

`PUBLIC_SANITY_DATASET`,

`PUBLIC_USE_CDN`,

`PUBLIC_SITE_URL`.

## Deployment

- **Frontend:** Deployed to Netlify using the `@astrojs/netlify` adapter.

- **Backend (Sanity Studio):** Deployed as a separate site on Netlify.

## Notes

You can run both frontend and backend servers locally to test full integration.

Keep queries and client config in sync between frontend and backend.

The pagefind integration runs as part of the frontend build for search functionality.
