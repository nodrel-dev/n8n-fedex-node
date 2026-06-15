<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0
Bump rationale: MINOR — a narrow unit-test runner (vitest) is brought into scope for
  the node's pure assembly/extraction cores (toFedexAddress, toFedexContact,
  extractLabel, shapeRates), amending the prior "no unit test runner in scope" gate.
  Sandbox manual verification of operations is unchanged. See docs/adr/0003.
  (1.0.0 initial ratification: placeholders replaced with concrete principles
  derived from fedex-node-build-brief.md + CLAUDE.md.)

Principles defined (all new):
  I.   Direct Carrier Integration — No Middleman
  II.  Schema-Verified API Fidelity (NON-NEGOTIABLE)
  III. Declarative-First, Programmatic Only When Required
  IV.  Secrets & Config From Credentials Only
  V.   Faithful Error Surfacing & Continue-On-Fail

Sections defined:
  + Toolchain & Publishing Standards (Additional Constraints)
  + Development Workflow & Quality Gates
  + Governance

Templates / artifacts reviewed:
  ✅ .specify/templates/plan-template.md — "Constitution Check" gate reads the
       constitution dynamically; no hardcoded principles to update.
  ✅ .specify/templates/spec-template.md — no constitution references; aligned.
  ✅ .specify/templates/tasks-template.md — no constitution references; aligned.
  ✅ CLAUDE.md — consistent with these principles (source of derived constraints).

Deferred TODOs: none.
-->

# n8n-nodes-fedex Constitution

## Core Principles

### I. Direct Carrier Integration — No Middleman

The node MUST talk **directly** to the FedEx REST API. No aggregator or reseller layer
(Shippo, ShipStation, EasyPost, etc.) may sit between the node and FedEx. Every request
authenticates with the **user's own** FedEx credentials and account number, so the user
gets their own negotiated rates with zero per-label markup.

Rationale: The entire reason this package exists is the open gap left by aggregator-only
nodes. Introducing a middleman destroys the value proposition and the differentiation from
existing npm packages.

### II. Schema-Verified API Fidelity (NON-NEGOTIABLE)

Every request field, response path, and enum value MUST be verified against the authoritative
local OpenAPI specs in `fedex-docs/json-schemas/*.json` **before** it is written into code.
`documentation.yaml` is the operation→schema map and the source of truth; entries flagged
`verify: true` MUST be re-confirmed. Field names, nesting, and enums MUST NOT be guessed from
memory or copied from prose without schema confirmation. The deep label path
(`output.transactionShipments[].pieceResponses[].packageDocuments[].encodedLabel`) and all
enum lists MUST match the captured schema exactly.

Rationale: FedEx API versions drift, and a single wrong field name silently breaks an
operation at runtime against the sandbox. The captured specs exist precisely so the build
never depends on guesswork or login-gated portal pages.

### III. Declarative-First, Programmatic Only When Required

Operations MUST use **declarative** routing (in the node description) wherever the response
maps cleanly to JSON — this covers Track, Validate address, and Get rates. A programmatic
`execute()` (or declarative `postReceive` hook) is permitted ONLY where a transformation
declarative routing cannot express is required — specifically Create shipment, which MUST
decode the base64 label and emit it as **n8n binary data** (never a base64 string dumped into
JSON). Mixing styles within the single node is acceptable; programmatic complexity that is not
justified by a real transformation need is not.

Rationale: Declarative routing is simpler, more maintainable, and reusable for a future UPS
package. Programmatic code is reserved for the one place it earns its keep — label-to-binary.

### IV. Secrets & Config From Credentials Only

API Key / Secret Key, account number, scope, token URL, and base URL MUST come from the n8n
credential or a node field — **never** hardcoded, never a default literal, never committed to
source. The credential MUST support a **sandbox vs production** switch that drives both the
OAuth token URL and `requestDefaults.baseURL`. OAuth uses n8n's built-in `oAuth2Api` with
`grantType: clientCredentials`; token exchange, caching, and ~1h refresh are delegated to n8n
natively — token code MUST NOT be hand-rolled. The account number, required for Rate and Ship,
is sensitive and MUST be sourced per-request from credential or node input.

Rationale: Hardcoded secrets and base URLs are a security failure and make sandbox/prod
unusable. Re-implementing OAuth duplicates logic n8n already does correctly.

### V. Faithful Error Surfacing & Continue-On-Fail

When FedEx returns an error, the node MUST surface the real `errors[].message` (and code where
useful) through `NodeApiError` / `NodeOperationError` — not a generic or swallowed error. `4xx`
validation errors MUST be treated distinctly from auth/transport failures. The node MUST honor
n8n's **Continue On Fail** setting, emitting per-item errors instead of aborting the whole
execution when that mode is on.

Rationale: Shipping integrations fail for concrete, fixable reasons (bad address, missing
account permission). Hiding the real FedEx message makes the node undebuggable in production.

## Toolchain & Publishing Standards

- **pnpm only.** npm installs fail (n8n enforces `only-allow`). All repo commands run via pnpm
  and the `n8n-node` CLI (`dev`, `build`, `lint`, `release`).
- **Do not modify the eslint config.** `n8n-node lint --strict` fails if it differs from the
  scaffold default; strict lint is the CI gate.
- **Package contract:** named `n8n-nodes-fedex`, includes the `n8n-community-node-package`
  keyword, declares the `n8n` config block pointing at built nodes + credentials, `files`
  limited to `dist`. Reference docs (`fedex-docs/`, `documentation.yaml`, build brief) stay out
  of the published tarball.
- **File layout:** one resource per folder under `nodes/Fedex/resources/<resource>/`; files
  stay focused (<800 lines) so operations remain independent and the pattern is reusable.
- **Required assets before publish:** `README.md` (operations, FedEx portal credential
  walkthrough, sandbox vs prod), MIT `LICENSE`, and a FedEx node SVG `icon` (the missing icon
  is a lint error until added).

## Development Workflow & Quality Gates

- **Build order is fixed and incremental** (simplest first, each verified before the next):
  (1) Track → (2) Validate address → (3) Get rates → (4) Create shipment / label.
- **Operations are verified manually** via `n8n-node dev` against the FedEx **sandbox**: each
  operation MUST be exercised end-to-end against sandbox tracking numbers / test account numbers
  before it is considered done.
- **Pure cores are additionally unit-tested.** The programmatic assembly/extraction functions
  (e.g. `toFedexAddress`, `toFedexContact`, `extractLabel`, `shapeRates`) MUST be pure
  (plain-in / plain-out, no `IExecuteFunctions` coupling) and MUST carry **vitest** unit tests over
  their interface, asserted against captured `fedex-docs/json-schemas` fixtures. The runner is
  **scoped to these pure cores only** — it does not test the declarative routing and does not
  replace sandbox verification of the operations. See docs/adr/0003.
- **Green-toolchain gate before release:** `n8n-node lint --strict` passes and `n8n-node build`
  succeeds. No `release` while either is red.
- **Definition of done** (per build brief): all four operations verified against sandbox;
  label returned as selectable binary (PDF/PNG/ZPL); structured FedEx errors surfaced;
  Continue-On-Fail honored; README + LICENSE + icon present; `package.json` contract satisfied.

## Governance

This constitution supersedes ad-hoc practice for the `n8n-nodes-fedex` package. The v1 scope
(single FedEx node, four operations, declarative-where-clean) is **decided and MUST NOT be
re-litigated** during implementation; scope changes are amendments, not in-flight decisions.

Amendments MUST be recorded by updating this file, bumping the version per the policy below,
and propagating any affected guidance to dependent templates (`plan-template.md`,
`spec-template.md`, `tasks-template.md`) and `CLAUDE.md`.

Versioning policy (semantic):
- **MAJOR** — a principle is removed or redefined in a backward-incompatible way (e.g.
  allowing an aggregator middleman, or hardcoded config).
- **MINOR** — a new principle or section is added, or guidance is materially expanded.
- **PATCH** — clarifications, wording, or non-semantic refinements.

Compliance expectation: every change to node, credential, or package code MUST be checkable
against these principles. Schema-verification (Principle II) and secrets-from-credentials
(Principle IV) are blocking gates — a violation of either blocks merge/release. Runtime
development guidance lives in `CLAUDE.md` and `AGENTS.md` + `.agents/*.md`; consult them
alongside this constitution.

**Version**: 1.1.0 | **Ratified**: 2026-06-13 | **Last Amended**: 2026-06-14
