# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A publishable **n8n community node** (`n8n-nodes-fedex`) that talks **directly** to the FedEx
REST API — no aggregator middleman. The value prop: businesses with their own negotiated FedEx
accounts hit the carrier API with their own rates. npm has no direct FedEx node today.

**Status:** shipped — npm `0.2.0` is the current release (declarative/custom template,
`@n8n/node-cli` 0.34.0). All **four real operations are implemented** across two resources
(Tracking: Track; Shipping: Get Rates, Create, Validate) with their two credentials; the
placeholder `User`/`Company` scaffold resources are gone. `pnpm build` + `pnpm lint` + `pnpm test`
are green. Remaining work is operation-level sandbox verification and hardening, not initial build.
The full spec, decided scope, API map, and acceptance criteria live in
**`internal/fedex-node-build-brief.md`** (read it first). All doc links are centralized in
**`documentation.yaml`** — consult it before web-searching for any FedEx or n8n reference. The
scaffold's own n8n build guidance lives in **`AGENTS.md`** + **`.agents/*.md`** (load the relevant
`.agents/` file before editing nodes/credentials — see the table in `AGENTS.md`).

**The FedEx docs are captured locally in `internal/fedex-docs/` — do not web-search FedEx, read these.**
The `.md` files are the portal prose; **`internal/fedex-docs/json-schemas/*.json` are the OpenAPI specs and
are AUTHORITATIVE** for request/response field names, enums, and nesting. `documentation.yaml`
maps each operation to its `local_md` + `local_schema` and lists the confirmed Ship label enums
and a MIME map. The portal pages require login, so the captured specs are the working source.

## Scope (v1, decided — do not re-litigate)

Single declarative-style **FedEx** node, four operations. Build in this order (simplest first;
verify each in `n8n-node dev` against the FedEx **sandbox** before moving on):

1. **Track shipment** — `POST /track/v1/trackingnumbers` (read-only; proves auth + base-URL plumbing)
2. **Validate address** — `POST /address/v1/addresses/resolve`
3. **Get rates** — `POST /rate/v1/rates/quotes` (needs account number)
4. **Create shipment / label** — `POST /ship/v1/shipments` (hardest; do last)

## Toolchain & commands

The node is scaffolded and driven by the official n8n CLI (`n8n-node`, from `@n8n/node-cli`,
installed globally via pnpm). **Always run via pnpm — npm installs fail** (n8n enforces it with an
`only-allow` postinstall).

```bash
# One-time scaffold (declarative/custom template = best fit for a REST API):
n8n-node new n8n-nodes-fedex --template declarative/custom

# Inside the repo:
n8n-node dev      # run n8n locally with the node loaded + live rebuild (manual testing)
n8n-node build    # compile + copy assets (icons etc.)
n8n-node lint      # lint (strict by default — reads n8n.strict:true in package.json)
n8n-node lint --fix      # lint with auto-fix
pnpm test         # vitest — unit tests for the pure cores (see ADR-0003)
n8n-node release  # publish to npm / n8n community registry
```

> There is **no** `--strict` flag in `@n8n/node-cli` 0.34.0 (the CLI rejects it as nonexistent).
> Lint strictness — including the "eslint config unchanged from default" check — comes from
> `n8n.strict: true` in `package.json`, which plain `n8n-node lint` applies. The CI gates are
> `pnpm lint` + `pnpm build`.

A narrow **vitest** runner (`pnpm test`) covers the pure assembly/extraction cores
(`toFedexAddress`, `toFedexContact`, `extractLabel`, `shapeRates`) — see ADR-0003. It is not a
release gate and does not replace **manual operation-level verification** via `n8n-node dev`
against the FedEx sandbox (sandbox tracking numbers + test account numbers are in the portal docs).

## Releases & versioning (CI/CD — do NOT bump manually)

**release-please drives versioning from Conventional Commits — never hand-edit the version.**
`.github/workflows/publish.yml` runs on every push to `main`: it reads commit messages
(`fix:` / `feat:` / `feat!:`) and maintains a standing **release PR** that bumps `package.json` +
`CHANGELOG.md`. **Merging that release PR** cuts the git tag + GitHub Release, which triggers the
`publish` job → `pnpm run release` → npm via **OIDC Trusted Publishing** (no `NPM_TOKEN`). Do **not**
run `n8n-node release` locally or bump `package.json` / `.release-please-manifest.json` by hand — the
pipeline owns all of it.

- **Pre-1.0 bump rules** (`release-please-config.json`): `fix:` → patch, `feat:` → patch
  (`bump-patch-for-minor-pre-major`), `feat!:` / `BREAKING CHANGE` → minor. So everything is a patch
  until 1.0.
- **To ship a change:** land it on `main` with the right Conventional Commit type (a metadata-only
  edit like the `Fedex.node.json` codex still counts as `fix:` — the registry consumes it), then
  merge the release PR release-please opens.
- **`publish.yml` filename is load-bearing:** npm Trusted Publishing is bound to this exact filename.
  Don't rename it even though it now also runs release-please.
- **Retry escape hatch:** if a publish fails *after* the tag/Release already exist, `workflow_dispatch`
  the Release workflow to publish the version currently in `package.json` (release-please won't
  re-emit an existing tag).

## Architecture (the non-obvious parts)

**Declarative vs programmatic — decide per operation.** Use **declarative** routing (in the node
description) for Track / Validate / Rate, where the response maps cleanly to JSON. **Create
shipment** needs a **programmatic `execute()`** (or a declarative `postReceive` hook) because it
must pull the base64 label out of the deeply nested JSON response and emit it as **n8n binary
data** — not a base64 string dumped into JSON. Mixing styles in one node is fine.

**Label → binary (the crux of Create shipment).** FedEx returns the encoded label at
`output.transactionShipments[].pieceResponses[].packageDocuments[].encodedLabel` (confirmed
against `ship.json` — the leaf is `LabelResponseVO`, which also carries `trackingNumber`,
`contentType`, `docType`, `url`). Decode the base64 and attach as binary with the MIME type from
the chosen `imageType` (`PDF`→`application/pdf`, `PNG`→`image/png`, `ZPLII`/`EPL2`→
`application/octet-stream`) and a sensible filename (e.g. `label-<trackingNumber>.pdf`). Pass the
JSON (tracking number, rates) through on the main output. Send `labelResponseOptions: LABEL` to get
the base64 inline (vs `URL_ONLY`). The full confirmed enum lists are in `documentation.yaml`.

**Auth — n8n's built-in OAuth2, two credential types.** FedEx issues disjoint per-project
entitlements (a token for one project gets 403 on another's endpoints — ADR-0004), so the node
ships **two** credential classes, both `extends ['oAuth2Api']` with `grantType: clientCredentials`:
- `FedexTrackOAuth2Api` (`credentials/FedexTrackOAuth2Api.credentials.ts`, name `fedexTrackOAuth2Api`) — Track.
- `FedexShippingOAuth2Api` (`credentials/FedexShippingOAuth2Api.credentials.ts`, name `fedexShippingOAuth2Api`) — Rate / Ship / Validate.

Everything they share (the `environment` dropdown, hidden OAuth fields, the env-derived
`accessTokenUrl`) lives in `credentials/fedexOAuth2Shared.ts` as `FEDEX_OAUTH2_PROPERTIES` /
`FEDEX_TEST_BASE_URL`; each class adds only its own `test` request against an endpoint it is
entitled to call. n8n performs the token exchange and **caches/refreshes the ~1h token natively**
— do NOT hand-roll token code. The original scaffold open items are all resolved:
- `scope` is **empty** ✓. FedEx's `client_credentials` flow derives the scope from the client's
  registration and **rejects an explicit `scope` param** (`BAD.REQUEST.ERROR: No registered scope
  value for this client has been requested`, HTTP 400). Sending `CXS` (despite what
  `authorization.json` implies) breaks token exchange; verified against sandbox 2026-06-14. FedEx
  returns the effective scope (e.g. `CXS-TP`) on a successful token response.
- `accessTokenUrl` and the node's `requestDefaults.baseURL` both **derive from the single
  `environment` field** (`sandbox` default → `apis-sandbox.fedex.com`; `production` →
  `apis.fedex.com`), so token exchange and API calls can never split hosts (ADR-0001).
- The **`icon`** property is set on both credentials.

`client_id`/`client_secret` map to the FedEx **API Key / Secret Key**. FedEx errors: surface
`errors[].message`; treat `4xx` validation distinctly. Exact OAuth shape: `documentation.yaml` → `fedex.auth`.

**Account number is sensitive and required for Rate + Ship.** Source it from the credential or a
node field — never a default, never hardcoded. Same for API keys and base URLs.

**File layout.** Package lives at repo root. Most docs are **public, in this repo** (they never ship
to npm — `files: ["dist"]` — but version alongside the code): `docs/adr/`, `CONTEXT.md`,
`documentation.yaml`, `AGENTS.md` + `.agents/`, `specs/`. Only two things stay **private** under
**`internal/`** (its own private repo `nodrel-dev/n8n-fedex-node-internal`, gitignored here, restored
on a fresh clone via `./bootstrap-internal.sh`): `internal/fedex-docs/` (FedEx's copyrighted captured
specs) and `internal/fedex-node-build-brief.md` (commercial strategy). Never commit secrets to
either repo. The node is `nodes/Fedex/Fedex.node.ts`; per-resource
descriptions live in `nodes/Fedex/resources/<resource>/`. The two resources **mirror the two FedEx
dev-portal projects / credentials** (ADR-0004): `tracking/` holding **Track** (binds
`fedexTrackOAuth2Api`), and `shipping/` holding **Get Rates**, **Create**, and **Validate** (binds
`fedexShippingOAuth2Api` — the shipping project bundles Rate + Ship + Address Validation under one
key). Resource = FedEx project, operation = verb. Credentials are selected by a hidden
`authentication` parameter derived per-operation (gated on `displayOptions.show.authentication`,
**not** on `operation` directly): n8n's declarative routing resolves multi-credential nodes only via
a parameter literally named `authentication`, and gating on `operation` broke AI-Agent **tool**
execution with `Could not get parameter: authentication` (fixed 0.2.1 — see ADR-0004). Keep files
focused (<800 lines), one resource per folder, so operations stay
independent and the pattern is reusable for a future UPS package. The rationale behind the resource
model and the sandbox/production credential design is captured in the public `docs/adr/` notes; the
captured FedEx specs they reference live in the private `internal/fedex-docs/`.

## Hard constraints (these will fail the build / lint if violated)

- **pnpm only.** npm breaks the install.
- **Do not modify the eslint config** — `n8n-node lint` (strict via `n8n.strict:true`) fails if it differs from default.
- **Verify FedEx field names / paths against live docs** before coding each operation — versions
  drift. `documentation.yaml` flags which entries need re-verification (`verify: true`).
- Surface the real FedEx error (`errors[].message`) via `NodeApiError` / `NodeOperationError`;
  honor n8n's **Continue On Fail**.
- Package must be named `n8n-nodes-fedex`, include the `n8n-community-node-package` keyword, and
  declare the `n8n` config block pointing at built nodes + credentials.

## Reference shortcuts

- **n8n/FedEx gotchas & burns (read before editing the node, creds, build, or release)** → `docs/n8n-gotchas.md`
- Full spec & acceptance criteria → `internal/fedex-node-build-brief.md`
- All doc URLs, local doc map, confirmed endpoints/enums, OAuth shape → `documentation.yaml`
- FedEx request/response shapes → `internal/fedex-docs/json-schemas/*.json` (OpenAPI, authoritative);
  prose → `internal/fedex-docs/*.md`. Operation→file mapping is in `documentation.yaml`.
- Live n8n SDK types (`INodeType`, `INodeTypeDescription`, `IExecuteFunctions`, `ICredentialType`)
  → prefer the n8n-mcp (MCP_DOCKER) or Context7 MCP tools over recalling from memory.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
