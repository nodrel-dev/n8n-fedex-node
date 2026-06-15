# Security Policy

## Reporting a vulnerability

**Please do not open a public issue for security vulnerabilities.**

Report privately via GitHub's [private vulnerability reporting](https://github.com/nodrel-dev/n8n-fedex-node/security/advisories/new),
or by email to **kytully@gmail.com**. Include a description, affected version, and reproduction
steps. You'll get an acknowledgement within a few days, and a fix or mitigation as quickly as is
practical.

## Supported versions

This is a pre-1.0 package; only the latest published `0.x` release on npm receives security fixes.
Always run the newest version.

## Credential safety (important)

This node talks to the FedEx REST API using **your own** FedEx API Key / Secret Key and account
number, supplied through n8n's encrypted credential store. To keep them safe:

- **Never paste API keys, secret keys, OAuth tokens, or account numbers** into GitHub issues,
  pull requests, discussions, logs, or screenshots. Redact them first.
- Keep credentials in n8n's credential manager (or a local `.env.local` for development) — never
  hardcode them in workflows, code, or committed files.
- The credential defaults to the **sandbox** environment so a half-configured connection cannot
  hit a live account. Switch to production only when you intend to.
- If you believe a key has been exposed, rotate it in the FedEx Developer Portal immediately.

## Supply-chain integrity

Releases are published to npm from GitHub Actions with **npm provenance** (SLSA attestation) over
OIDC Trusted Publishing — no long-lived tokens. You can verify a published version's provenance on
its npm page.
