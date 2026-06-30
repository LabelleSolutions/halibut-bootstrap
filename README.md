# HALIBUT OS

HALIBUT OS is ViTech Intelligence's operational-intelligence demonstration platform. It provides a unified interface for enterprise signals, decision workflows, human approvals, simulations, incidents, workforce planning, risk, audit, and security operations.

This repository is maintained and deployed directly from GitHub. Lovable is not required in the build path.

## Status

This codebase is a pre-production demonstration intended for product reviews, stakeholder workshops, workflow validation, and controlled previews.

The current sign-in and role controls are browser-based demonstration features. Real deployments require verified identity, server-side permissions, durable data storage, audit controls, monitoring, backups, and formal security review.

## Stack

- React 18 and TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Radix UI and shadcn components
- Recharts
- Vitest and Testing Library

## Local development

Requirements: Node.js 20 or later and npm 10 or later.

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:8080`.

## Validation

Run all repository checks:

```bash
npm run check
```

Or run them separately:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Cloudflare Pages

Use these settings:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

The repository includes `public/_redirects` for React Router fallback and `public/_headers` for baseline browser headers.

## Vercel

Import the repository as a Vite project. The included `vercel.json` provides SPA routing fallback and baseline response headers.

See `docs/DEPLOYMENT.md` for the release checklist and `docs/SECURITY_BOUNDARY.md` for the current demonstration boundary.

## Product modules

- Executive Command Center
- OUPDEL Pipeline
- IDIE Engine
- Trust Score
- Context Graph
- Agent Decision Board
- Human Approvals
- Digital Twin Simulation
- Integrations
- Blueprint AI Builder
- Decision Studio
- Audit Trail
- Scenario Planning
- Risk Radar
- Incident Management
- Workforce Forecast
- Security Operations Center

## Repository workflow

1. Create a branch from `main`.
2. Run `npm run check`.
3. Open a pull request with validation notes.
4. Review security and product claims.
5. Merge to `main` to trigger the connected deployment platform.

HALIBUT OS is a ViTech Intelligence product initiative.
