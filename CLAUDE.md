# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A publishable **n8n community node** (`n8n-nodes-fedex`) that talks **directly** to the FedEx
REST API — no aggregator middleman. The value prop: businesses with their own negotiated FedEx
accounts hit the carrier API with their own rates. npm has no direct FedEx node today.

**Status:** scaffolded (declarative/custom template, `@n8n/node-cli` 0.34.0), `pnpm install`
done, `pnpm build` + `pnpm lint` verified green-toolchain. The node still contains the
**placeholder `User`/`Company` resources** — these must be replaced with the four real operations.
The full spec, decided scope, API map, and acceptance criteria live in
**`fedex-node-build-brief.md`** (read it first). All doc links are centralized in
**`documentation.yaml`** — consult it before web-searching for any FedEx or n8n reference. The
scaffold's own n8n build guidance lives in **`AGENTS.md`** + **`.agents/*.md`** (load the relevant
`.agents/` file before editing nodes/credentials — see the table in `AGENTS.md`).

**The FedEx docs are captured locally in `fedex-docs/` — do not web-search FedEx, read these.**
The `.md` files are the portal prose; **`fedex-docs/json-schemas/*.json` are the OpenAPI specs and
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
n8n-node lint      # lint with auto-fix
n8n-node lint --strict   # CI gate: also verifies eslint config is UNCHANGED from default
n8n-node release  # publish to npm / n8n community registry
```

There is no separate unit-test runner in scope; **verification is manual** via `n8n-node dev`
against the FedEx sandbox (sandbox tracking numbers + test account numbers are in the portal docs).

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

**Auth — the scaffold uses n8n's built-in OAuth2.** The generated credential
`FedexOAuth2Api` (`credentials/FedexOAuth2Api.credentials.ts`, credential name `fedexOAuth2Api`)
**`extends ['oAuth2Api']` with `grantType: clientCredentials`**. This means n8n performs the
token exchange and **caches/refreshes the ~1h token natively** — do NOT hand-roll token code.
What still needs fixing before it works:
- `scope` → must be **empty**. FedEx's `client_credentials` flow derives the scope from the
  client's registration and **rejects an explicit `scope` param** (`BAD.REQUEST.ERROR: No
  registered scope value for this client has been requested`, HTTP 400). Sending `CXS` (despite
  what `authorization.json` implies) breaks token exchange; verified against sandbox 2026-06-14.
  FedEx returns the effective scope (e.g. `CXS-TP`) on a successful token response.
- `accessTokenUrl` → currently hardcoded to `api.example.com`. Must become the FedEx token URL,
  and must support **sandbox vs prod** (`apis-sandbox.fedex.com` vs `apis.fedex.com`). Decide how:
  a user-set field on the credential, or two credential variants. This is the open auth design point.
- Add the required **`icon`** property (lint error until then).
- The node's `requestDefaults.baseURL` is likewise hardcoded to prod — tie it to the same env choice.

`client_id`/`client_secret` map to the FedEx **API Key / Secret Key**. FedEx errors: surface
`errors[].message`; treat `4xx` validation distinctly. Exact OAuth shape: `documentation.yaml` → `fedex.auth`.

**Account number is sensitive and required for Rate + Ship.** Source it from the credential or a
node field — never a default, never hardcoded. Same for API keys and base URLs.

**File layout (scaffolded).** Package lives at repo root; reference docs (`fedex-docs/`,
`documentation.yaml`, `fedex-node-build-brief.md`) sit alongside but are excluded from the npm
tarball (`package.json` `files: ["dist"]`). The node is `nodes/Fedex/Fedex.node.ts`; per-resource
descriptions live in `nodes/Fedex/resources/<resource>/` (scaffold ships example `user/` +
`company/` — replace with two noun-resources: `shipment/` holding the **Track**, **Get Rates**, and
**Create** operations, and `address/` holding **Validate**). Resource = noun, operation = verb (n8n
idiom). Keep files focused (<800 lines), one resource per folder, so operations stay independent and
the pattern is reusable for a future UPS package. See `docs/adr/` for the rationale behind the
resource model and the sandbox/production credential design.

## Hard constraints (these will fail the build / lint if violated)

- **pnpm only.** npm breaks the install.
- **Do not modify the eslint config** — `n8n-node lint --strict` fails if it differs from default.
- **Verify FedEx field names / paths against live docs** before coding each operation — versions
  drift. `documentation.yaml` flags which entries need re-verification (`verify: true`).
- Surface the real FedEx error (`errors[].message`) via `NodeApiError` / `NodeOperationError`;
  honor n8n's **Continue On Fail**.
- Package must be named `n8n-nodes-fedex`, include the `n8n-community-node-package` keyword, and
  declare the `n8n` config block pointing at built nodes + credentials.

## Reference shortcuts

- Full spec & acceptance criteria → `fedex-node-build-brief.md`
- All doc URLs, local doc map, confirmed endpoints/enums, OAuth shape → `documentation.yaml`
- FedEx request/response shapes → `fedex-docs/json-schemas/*.json` (OpenAPI, authoritative);
  prose → `fedex-docs/*.md`. Operation→file mapping is in `documentation.yaml`.
- Live n8n SDK types (`INodeType`, `INodeTypeDescription`, `IExecuteFunctions`, `ICredentialType`)
  → prefer the n8n-mcp (MCP_DOCKER) or Context7 MCP tools over recalling from memory.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
