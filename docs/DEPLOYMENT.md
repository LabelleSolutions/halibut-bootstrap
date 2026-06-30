# HALIBUT OS Deployment Guide

This guide covers the current Vite single-page demonstration. Production services described in the master architecture require separate infrastructure and security reviews.

## Required checks

Before deployment:

```bash
npm ci
npm run check
```

`npm run check` runs linting, TypeScript validation, unit tests, and the production build.

## Cloudflare Pages

Create a Pages project connected directly to this GitHub repository.

Use:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
Node.js: 20 or later
```

The `public/_redirects` file routes React Router paths back to `index.html`. The `public/_headers` file provides a conservative baseline for browser response headers.

Recommended release flow:

1. Open a pull request from a feature branch.
2. Review the preview deployment.
3. Run repository checks.
4. Merge to `main`.
5. Verify the production deployment and deep links such as `/app/incidents`.

## Vercel

Import the repository as a Vite project.

Use:

```text
Build command: npm run build
Output directory: dist
Install command: npm ci
```

The root `vercel.json` provides SPA route fallback and baseline browser headers.

## Environment variables

The current demonstration does not require production secrets.

Do not place API keys or connector credentials in variables prefixed with `VITE_`, because Vite exposes those values to browser code.

When backend services are introduced:

- keep secrets in the deployment platform's server-side secret store;
- expose only non-sensitive configuration to the browser;
- separate preview, staging, and production credentials;
- rotate credentials after accidental exposure.

## DNS and domains

Recommended structure:

```text
halibut.vitechintelligence.com        product or controlled demo
api.halibut.vitechintelligence.com    production API gateway
status.vitechintelligence.com         service status
```

Use a separate preview hostname for pull-request and stakeholder reviews.

## Post-deployment validation

- [ ] Root page loads without console errors
- [ ] Refresh works on nested routes
- [ ] Role selection and sign-out work
- [ ] Restricted modules remain blocked for the selected role
- [ ] Assets load through HTTPS
- [ ] Security headers are present
- [ ] No source maps or secrets are unintentionally public
- [ ] Mobile and desktop layouts are usable
- [ ] Error and not-found routes render correctly
- [ ] Deployment commit matches the approved Git SHA

## Rollback

Use the hosting platform's previous successful deployment or revert the merge commit on `main`. After rollback, verify the root route, nested-route fallback, role behavior, and critical dashboards.

## Future production topology

The target architecture separates the static experience, edge gateway, authenticated APIs, policy services, context graph, decision kernel, agent runtime, workflow execution, tenant data, evidence, and observability. Do not connect the current browser demonstration directly to production write credentials.
