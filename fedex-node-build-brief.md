# Build an n8n community node for FedEx (`n8n-nodes-fedex`)

> **How to use this file:** Start a fresh Claude Code session in the directory where the
> node repo should live, then paste: *"Read `fedex-node-build-brief.md` and build it."*
> This brief is self-contained — it carries all the context, decisions, API references,
> and acceptance criteria needed to build the node from zero.

---

## 1. Your role

You are building a **publishable n8n community node** that talks **directly** to the FedEx
REST API. This is its **own dedicated repo** (one package = one repo, per n8n convention).
The goal is a **polished, community-published** package — not a local-only hack.

## 2. Why this exists (already decided — do not re-litigate)

- npm has **no direct FedEx node**. `n8n-nodes-fedex` returns a confirmed **404**. Same for
  `n8n-nodes-ups`, `n8n-nodes-dhl`, `n8n-nodes-usps`.
- The only shipping nodes that exist are **aggregators** (`n8n-nodes-shippo`,
  `n8n-nodes-shipstation`) — middlemen that require *their* paid accounts and add per-label
  markup.
- **The value proposition:** businesses with their *own* negotiated FedEx accounts want to hit
  the carrier API directly, using *their own rates*, with **no middleman markup**. That gap is
  wide open and worth publishing into.

## 3. Scope (v1) — DECIDED

Build a single declarative-style node, **FedEx**, with these four operations:

| Operation | FedEx API | Notes |
|---|---|---|
| **Track shipment** | Track API | By tracking number. Read-only. Build/test this first — simplest. |
| **Get rates** | Rate & Transit Times API | Rate quote for a shipment → service options + prices. |
| **Create shipment / label** | Ship API | The money operation. Returns the label as **binary** (PDF/PNG/ZPL). Most complex. |
| **Validate address** | Address Validation API | Residential vs commercial classification + correction. Cheap, useful. |

Out of scope for v1 (note in README as "planned"): Pickup scheduling, void/cancel label,
Proof of Delivery, freight/LTL, international customs docs beyond the minimum.

## 4. Tooling & how to scaffold

The official n8n node CLI is installed globally (`n8n-node`, via pnpm — the package
**enforces pnpm**, npm installs will fail). It lives at `~/Library/pnpm/n8n-node`.

```bash
# Scaffold a NEW repo dir. Use the declarative/custom template (best fit for a REST API).
n8n-node new n8n-nodes-fedex --template declarative/custom
cd n8n-nodes-fedex
```

CLI commands you'll use:
- `n8n-node dev` — runs n8n locally with the node loaded + live rebuild on change (manual testing)
- `n8n-node build` — compiles + copies assets
- `n8n-node lint` — lints (auto-fix); **strict mode also verifies the eslint config is unchanged from default — do not modify it**
- `n8n-node release` — publishes the package

**Always run via pnpm**, not npm, for anything in this repo.

### Declarative vs programmatic
Use the **declarative** style (routing in the node description) for Track / Rate / Validate.
The **Create shipment / label** operation likely needs a `programmatic` `execute()` path (or a
declarative `postReceive` hook) because it must take the base64 label out of the JSON response
and emit it as **n8n binary data**. Decide per-operation; mixing is fine, but prefer declarative
wherever the response maps cleanly.

## 5. FedEx API — reference

> ⚠️ **VERIFY EVERYTHING IN THIS SECTION against the live docs before coding.** API versions and
> field names change. The developer portal requires a (free) login and has an interactive
> "API Reference" with request/response schemas and a sandbox try-it console. Treat the values
> below as a strong starting map, not gospel.

**Primary documentation:**
- Developer portal home: https://developer.fedex.com/api/en-us/home.html
- Get started / onboarding: https://developer.fedex.com/api/en-us/get-started.html
- Catalog of all APIs: https://developer.fedex.com/api/en-us/catalog.html
- OAuth / API Authorization: https://developer.fedex.com/api/en-us/catalog/authorization/docs.html
- Track API: https://developer.fedex.com/api/en-us/catalog/track/v1/docs.html
- Rate & Transit Times API: https://developer.fedex.com/api/en-us/catalog/rate/v1/docs.html
- Ship API: https://developer.fedex.com/api/en-us/catalog/ship/v1/docs.html
- Address Validation API: https://developer.fedex.com/api/en-us/catalog/address-validation/v1/docs.html

### Base URLs
| Env | Base URL |
|---|---|
| Sandbox / test | `https://apis-sandbox.fedex.com` |
| Production | `https://apis.fedex.com` |

The credential **must let the user choose sandbox vs production** (a dropdown that sets the base URL).

### Authentication — OAuth2 client credentials
FedEx uses **OAuth2 `client_credentials`**. The user registers an app in the FedEx developer
portal and gets a **API Key (client_id)** and **Secret Key (client_secret)**.

```
POST {baseURL}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=<API_KEY>&client_secret=<SECRET_KEY>
```

Response (verify exact shape):
```json
{ "access_token": "<jwt>", "token_type": "bearer", "expires_in": 3599 }
```

- Token lifetime ≈ **1 hour**. Cache and refresh; do **not** fetch a new token per request.
- All API calls send `Authorization: Bearer <access_token>`.
- Common headers: `Content-Type: application/json`, optional `X-locale: en_US`.

**Implementation guidance:** model this as an n8n **OAuth2-style credential or a custom
credential with a token-exchange step.** n8n's `genericAuth`/`httpRequest` supports a credential
type that performs the client-credentials grant; if the declarative routing can't do the token
exchange cleanly, implement an `authenticate` + `preAuthentication`/`credentialTest` on a custom
credential class. Check current n8n SDK docs (below) for the supported pattern.

### Endpoints (verify each)
| Operation | Method + Path | Body root |
|---|---|---|
| Track by number | `POST /track/v1/trackingnumbers` | `{ trackingInfo: [{ trackingNumberInfo: { trackingNumber } }], includeDetailedScans }` |
| Get rates | `POST /rate/v1/rates/quotes` | `{ accountNumber: { value }, requestedShipment: {...} }` |
| Create shipment | `POST /ship/v1/shipments` | `{ labelResponseOptions, requestedShipment: {...}, accountNumber: { value } }` |
| Validate address | `POST /address/v1/addresses/resolve` | `{ addressesToValidate: [{ address: {...} }] }` |

### Label handling (Create shipment)
- Set `labelResponseOptions` to control format. Options include returning the label **inline as
  base64** in the JSON (`URL_ONLY` vs `LABEL` — verify) and the image type (`PDF`, `PNG`,
  `ZPLII`, etc.) + stock type.
- The response nests the encoded label deep in
  `output.transactionShipments[].pieceResponses[].packageDocuments[].encodedLabel` (verify the
  exact path — it changes by version).
- **Decode the base64 and attach it as n8n binary data** with the correct MIME type
  (`application/pdf`, `image/png`, or `application/octet-stream` for ZPL) and a sensible filename
  (e.g. `label-<trackingNumber>.pdf`). Also pass through the JSON (tracking number, rates) on the
  main output.

### Error handling
FedEx returns structured errors:
```json
{ "errors": [{ "code": "...", "message": "..." }], "transactionId": "..." }
```
Surface `errors[].message` in the thrown `NodeApiError` so users see the real reason. Respect
n8n's **Continue On Fail** setting. Handle `401` (expired/invalid token → refresh once) distinctly
from `4xx` validation errors.

## 6. n8n development references (read these)

- Community node docs hub: https://docs.n8n.io/integrations/community-nodes/
- Build a declarative-style node (tutorial): https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/
- Build a programmatic-style node: https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/
- Node base files / structure reference: https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/
- Credentials file reference: https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/
- HTTP request helpers / routing: https://docs.n8n.io/integrations/creating-nodes/build/reference/http-request-helpers/
- Handling binary data: https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/ (and binary helpers)
- Verification & submission to the n8n community registry: https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/
- The `@n8n/node-cli` package: https://www.npmjs.com/package/@n8n/node-cli
- **Use the n8n-mcp / Context7 MCP tools if available** to pull current node SDK type signatures
  (`INodeType`, `INodeTypeDescription`, `IExecuteFunctions`, `ICredentialType`) rather than
  guessing from memory.

## 7. Repo / package requirements for community publishing

To be installable and (optionally) verified by n8n, the package must:
- Be named `n8n-nodes-fedex` and include the keyword **`n8n-community-node-package`** in
  `package.json` `keywords`.
- Declare `n8n` config block in `package.json` pointing at the built nodes + credentials.
- Target the **n8n nodes API version** the CLI scaffolds (don't downgrade).
- Pass `n8n-node lint` in **strict mode** with **no eslint config changes**.
- Include: `README.md` (operations, credential setup walkthrough with screenshots of the FedEx
  portal steps, sandbox vs prod), `LICENSE` (MIT), a FedEx node SVG icon.
- Use **no runtime secrets in code**; everything comes from the credential.

## 8. Build order (do this incrementally — verify each stage in `n8n-node dev`)

1. **Scaffold** the repo with the declarative/custom template. Commit the clean scaffold.
2. **Credential** (`FedexApi`): apiKey, secretKey, environment dropdown (sandbox/prod).
   Implement the OAuth2 client-credentials token exchange + a `credentialTest` that calls a cheap
   endpoint (e.g. an address validate or a token fetch) so the user can click "Test" and get
   real feedback.
3. **Track** operation (read-only, simplest) → confirm auth + base URL plumbing works end to end.
4. **Validate address** operation.
5. **Get rates** operation.
6. **Create shipment / label** — including base64 → **binary** conversion. Hardest; do last.
7. **Polish:** README with portal setup walkthrough, icon, error messages, examples. Lint strict.
8. **Test plan:** manual runs in `n8n-node dev` against the **FedEx sandbox** for each operation;
   document sample inputs. (FedEx publishes sandbox tracking numbers and test account numbers —
   find the current list in the portal docs.)
9. **Publish** with `n8n-node release` once green.

## 9. Hard constraints / gotchas

- **pnpm only** in this repo. npm will break the install (n8n enforces it via an `only-allow`
  postinstall).
- **Do not modify the eslint config** — `n8n-node lint --strict` fails if it differs from default.
- **Cache the OAuth token** (~1h); never request one per call.
- **Never hardcode** API keys, account numbers, or base URLs — all from the credential / node
  params. Validate user input at the node boundary.
- The **account number** is required for Rate and Ship and is sensitive — source it from the
  credential or a node field, never a default.
- Emit labels as **binary**, not a base64 string dumped into JSON.
- Keep files focused (<800 lines); split operation definitions into per-resource description
  files.
- Respect **Continue On Fail**; throw `NodeApiError`/`NodeOperationError` with the real FedEx
  error message.

## 10. Definition of done

- [ ] `n8n-nodes-fedex` scaffolded as its own git repo, clean initial commit.
- [ ] `FedexApi` credential with sandbox/prod switch + working "Test" button.
- [ ] All four operations implemented and **manually verified against the FedEx sandbox**.
- [ ] Create-shipment returns the label as proper n8n **binary** (PDF/PNG/ZPL selectable).
- [ ] Structured FedEx error messages surfaced to the user; Continue-On-Fail honored.
- [ ] `n8n-node lint` passes strict; `n8n-node build` succeeds.
- [ ] README with FedEx portal credential walkthrough, per-operation field docs, and sandbox test
      examples; MIT LICENSE; node icon.
- [ ] `package.json` has `n8n-community-node-package` keyword + correct `n8n` config block.
- [ ] Published via `n8n-node release` (or staged ready to publish, pending the user's npm login).

---

### Decisions already made (carrier, scope, distribution)
- **Carrier:** FedEx (first; UPS is a likely follow-up package later — keep code patterns reusable).
- **Operations:** Track, Get rates, Create shipment/label, Validate address.
- **Distribution:** Publish to the npm + n8n community registry.
- **Style:** declarative where the response maps cleanly; programmatic `execute()` for the
  label-to-binary step.
