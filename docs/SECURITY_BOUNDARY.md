# HALIBUT OS Security Boundary

## Current repository status

This repository is a pre-production demonstration. It provides a realistic product experience, role-filtered navigation, and simulated operational data. It does not yet provide production authentication, server-side authorization, durable tenant isolation, immutable audit storage, or authorized execution against enterprise systems.

## What the current application does

- Stores a demonstration identity in browser local storage.
- Allows the viewer to select a role view.
- Hides or blocks modules based on client-side role permissions.
- Displays simulated operational, workforce, risk, decision, and security data.
- Demonstrates intended human approval and trust concepts.

## What the current application does not do

- Validate passwords, SSO assertions, or identity-provider tokens.
- Resolve tenant membership from a trusted server.
- Protect APIs or data with server-side RBAC/ABAC.
- Execute approved commands against production ERP, CRM, WFM, MES, ITSM, or security systems.
- Provide formal SOC 2, ISO 27001, GDPR, HIPAA, EU AI Act, or Vietnam-law compliance.
- Guarantee that demonstration metrics represent live operations.

## Production security boundary

A production request must pass all of the following controls:

1. Verified identity from an approved identity provider.
2. Server-resolved tenant membership.
3. RBAC and ABAC policy evaluation.
4. Resource, action, environment, and impact authorization.
5. Expected state-version validation.
6. Idempotency and replay protection.
7. Human approval when required by policy.
8. Short-lived, narrowly scoped execution capability.
9. Auditable execution and outcome evidence.

## Required production services

- Identity federation and session service
- Tenant and membership service
- Policy decision and enforcement services
- PASETO capability issuer and verifier
- Decision state machine
- Approval service
- Durable workflow engine
- Append-only evidence ledger
- Tenant-isolated operational stores
- Secrets and key management
- OpenTelemetry collection and alerting
- Incident response and disaster recovery controls

## Data-handling rules

Until the production boundary exists:

- Do not enter real passwords, API keys, private customer records, protected health information, regulated financial information, or confidential employee data.
- Do not connect the demonstration directly to production write credentials.
- Use synthetic or approved anonymized data.
- Keep screenshots and exports classified according to the underlying demonstration content.

## Claim discipline

Product language must distinguish among:

- **implemented demonstration behavior**;
- **production architecture target**;
- **control design intention**;
- **independently certified or audited status**.

Security and compliance certifications may only be claimed after the relevant scope, controls, evidence, and independent review are complete.
