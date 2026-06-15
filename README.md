# n8n-nodes-fedex

[![npm version](https://img.shields.io/npm/v/@nodrel-dev/n8n-nodes-fedex?logo=npm&color=cb3837)](https://www.npmjs.com/package/@nodrel-dev/n8n-nodes-fedex)
[![npm downloads](https://img.shields.io/npm/dm/@nodrel-dev/n8n-nodes-fedex)](https://www.npmjs.com/package/@nodrel-dev/n8n-nodes-fedex)
[![CI](https://github.com/nodrel-dev/n8n-fedex-node/actions/workflows/ci.yml/badge.svg)](https://github.com/nodrel-dev/n8n-fedex-node/actions/workflows/ci.yml)
[![license: MIT](https://img.shields.io/npm/l/@nodrel-dev/n8n-nodes-fedex)](https://www.npmjs.com/package/@nodrel-dev/n8n-nodes-fedex)
[![published with provenance](https://img.shields.io/badge/published%20with-provenance-3b82f6?logo=npm)](https://www.npmjs.com/package/@nodrel-dev/n8n-nodes-fedex#provenance)

This is an [n8n](https://n8n.io/) community node. It lets you use the **FedEx REST API** directly in your n8n workflows — track shipments, validate addresses, quote rates, and create shipping labels against your own FedEx account, with no aggregator in the middle.

Because the node talks straight to FedEx with your API credentials, you get **your own negotiated rates** and your account is billed directly.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. In n8n, go to **Settings → Community Nodes → Install** and enter `@nodrel-dev/n8n-nodes-fedex`.

## Operations

The node exposes two resources: **Shipment** and **Address**.

### Shipment

- **Track** — Get the status and scan history for one or more tracking numbers (`POST /track/v1/trackingnumbers`). Toggle **Track Multiple Numbers** to pass a comma-separated list, and **Include Detailed Scans** for the full scan event history.
- **Get Rates** — Quote negotiated and list rates for available services (`POST /rate/v1/rates/quotes`). Leave **Service Type** as _All Available Services_ to compare every eligible service, or pin a single one. Requires a **Shipping Account Number**.
- **Create** — Buy a shipment and get a printable label plus tracking number (`POST /ship/v1/shipments`). The label is returned as **n8n binary data** (see [Usage](#usage)). Requires a **Shipping Account Number**.

### Address

- **Validate** — Standardize an address and classify it residential vs commercial (`POST /address/v1/addresses/resolve`).

## Credentials

You authenticate with a FedEx **API Key** and **Secret Key** using OAuth2 client-credentials. n8n performs the token exchange and refreshes the ~1 hour token automatically — you never handle tokens yourself.

### Prerequisites

1. Create a free account on the [FedEx Developer Portal](https://developer.fedex.com/).
2. Create a project and add the APIs you need (Track, Address Validation, Rate, Ship).
3. The portal issues an **API Key** (client ID) and **Secret Key** (client secret) for both a **test/sandbox** project and, once approved, a **production** project.
4. For Get Rates and Create you also need your FedEx **shipping account number**.

### Set up the credential in n8n

1. Add a new **FedEx OAuth2 API** credential.
2. Set **Environment** to **Sandbox (Test)** while developing, or **Production (Live)** for real shipments. This single switch points both the OAuth token URL and every API request at the matching FedEx host, so a request can never straddle sandbox and production.
3. Enter your **Client ID** (FedEx API Key) and **Client Secret** (FedEx Secret Key).
4. Save — n8n will fetch a token to confirm the credentials work.

> **Sandbox vs production:** the credential defaults to **Sandbox** on purpose, so a half-configured connection can't hit a live account. Switch to **Production** only when you are ready to create real, billable shipments.

### You will likely need two FedEx projects (and two credentials)

The FedEx Developer Portal provisions the **Track API** in a different group from the **shipping** APIs (Rate, Ship, Address Validation), so a single portal project usually cannot hold all four — each project issues its own API Key / Secret Key.

This node handles that cleanly: create **two** _FedEx OAuth2 API_ credentials in n8n and select the right one per node.

- **Track credential** → from the project that has the Track API → use on **Track** nodes.
- **Shipping credential** → from the project that has Rate + Ship + Address Validation → use on **Get Rates**, **Create**, and **Validate** nodes.

(If your portal account does provision all four APIs in one project, a single credential is fine.)

### Production: Create (Ship) requires FedEx label certification

Sandbox label creation works immediately. **Production** is different: before FedEx authorizes your production credentials to transmit live label transactions, you must complete the [FedEx Shipper Validation](https://developer.fedex.com/) process — generate sample labels, submit them to the FedEx Bar Code Analysis group, and wait for approval (about a three-business-day turnaround). Approval is **per project**. Track, Get Rates, and Validate do not require this; only Ship does.

## Compatibility

- Requires n8n with `n8nNodesApiVersion: 1`.
- Built and tested against the FedEx REST API (Track v1, Address v1, Rate v1, Ship v1).
- The shipping **account number** is never defaulted or hardcoded — it always comes from the node field, and your API keys live only in the credential.

## Security & dependencies

The published package ships only `dist/` with **zero runtime dependencies** (`n8n-workflow` is a peer, provided by your n8n instance). Any `pnpm audit` / Dependabot findings are confined to the build, test, and release tooling or the host-provided peer — none of them reach an installed node. Outstanding upstream advisories (waiting on newer `@n8n/node-cli` and `n8n-workflow` releases) are tracked in [#2](https://github.com/nodrel-dev/n8n-fedex-node/issues/2).

The repository is continuously scanned for vulnerabilities by both **Dependabot** and **[Snyk](https://snyk.io/)** — Snyk checks dependencies and source on every push and pull request, so each release commit is scanned before it ships.

Every release is published to npm with a signed **[provenance](https://docs.npmjs.com/generating-provenance-statements) attestation** through GitHub Actions [OIDC trusted publishing](https://docs.npmjs.com/trusted-publishers): no long-lived npm token is stored in the repo, and anyone can cryptographically verify that a given version was built by this workflow from this exact commit (see the **Provenance** panel on the [npm page](https://www.npmjs.com/package/@nodrel-dev/n8n-nodes-fedex)).

## Usage

### Get Rates and Create

Both operations share the same **Shipper** and **Recipient** address/contact fields, so values carry over when you switch between them. Package dimensions (length/width/height) are optional and only sent to FedEx when all three are greater than zero.

### The label binary (Create)

Create returns the label as proper n8n **binary data** on the output property named `label` — not a base64 string buried in JSON. Choose the format with **Label Format**:

| Label Format | MIME type | Typical use |
|---|---|---|
| PDF | `application/pdf` | Office printers |
| PNG | `image/png` | Preview / embedding |
| Thermal (ZPLII) | `application/octet-stream` | Zebra thermal printers |
| Thermal (EPL2) | `application/octet-stream` | Eltron thermal printers |

The tracking number and rate details are passed through on the main JSON output. Wire the `label` binary into **Write Binary File**, **Send Email** (as an attachment), or any node that consumes binary data.

### Errors and Continue On Fail

FedEx error messages (`errors[].message`) are surfaced directly through n8n's error handling, and the node honors **Continue On Fail** — failed items emit an `error` entry and the workflow keeps processing the rest.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [FedEx Developer Portal](https://developer.fedex.com/)
- [FedEx API documentation](https://developer.fedex.com/api/en-us/catalog.html)

## Version history

### 0.1.1

Supply-chain hardening, no functional node changes: npm publishing moved to keyless **OIDC trusted publishing** with signed provenance, and CI/release workflows run on the Node 24 GitHub Actions runtime.

### 0.1.0

Initial release. Shipment (Track, Get Rates, Create) and Address (Validate) operations, sandbox/production environment switch, and label-as-binary output.
