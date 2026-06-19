# n8n & FedEx Gotchas — Hard-Won Lessons

> Read this before touching the node, credentials, build, or release flow. Every item
> here is a trap that already cost real time. They are not theoretical — each one bit us,
> usually with a misleading error message. Cross-references point at the ADRs and `CLAUDE.md`
> sections that hold the deeper rationale.

**Audience:** the next agent (or human) working on `n8n-nodes-fedex`.
**Last updated:** 2026-06-15 (node at npm `0.2.1`).

---

## TL;DR — the five that hurt most

1. **Multi-credential nodes must gate creds on a parameter literally named `authentication`** —
   gating on `operation` works for normal runs but breaks AI-Agent **tool** execution. (§1)
2. **FedEx `client_credentials` rejects an explicit `scope`** — must be empty string, not `CXS`. (§2)
3. **FedEx sandbox keys are per-project** — the Track key 403s on Ship/Rate/Validate and vice-versa. (§3)
4. **Under `n8n-node dev` the node type is `CUSTOM.fedex`**, not `n8n-nodes-fedex.fedex`. (§4)
5. **Release publish must be `n8n-node release`, never raw `npm publish`** — a `prepublishOnly`
   guard `exit(1)`s otherwise. (§7)

---

## 1. The AI-Agent tool credential bug (the big one)

**Symptom:** node works fine as a normal node, but used as an **n8n AI-Agent tool** it throws
`Could not get parameter: authentication` (`extra.parameterName: "authentication"`), and the agent
retries to its max iterations (10).

**Root cause:** n8n's declarative routing engine (`n8n-core` `routing-node.ts` →
`prepareCredentials`) disambiguates among a node's credentials — when there are **2 or more** — by
reading a node parameter **literally named `authentication`** and matching each credential's
`displayOptions.show.authentication`. We had gated our two credentials on
`displayOptions.show.operation` instead. Normal execution binds a credential in the editor, which
short-circuits the `authentication` read; the **tool-execution path** (SupplyDataContext /
PartialExecutionToolExecutor) hits the multi-credential branch, finds no `authentication` param, and
`getNodeParameter('authentication', 0)` throws because no fallback was passed.

**Fix (shipped in 0.2.1, `nodes/Fedex/Fedex.node.ts`):**
- Gate both credentials on `displayOptions: { show: { authentication: ['<credName>'] } }`, where the
  values equal the credential **names** (`fedexTrackOAuth2Api`, `fedexShippingOAuth2Api`).
- Add a **hidden** `authentication` property declared **twice**, each with a different `default` and
  **disjoint** `displayOptions.show.operation` (track → `fedexTrackOAuth2Api`;
  getRates/create/validate → `fedexShippingOAuth2Api`). The `Workflow` constructor materializes the
  matching default into `node.parameters` before execution, so it resolves on **both** the normal and
  tool paths with no manual auth pick.

**Why this is safe lint-wise:** declaring the same param name twice with disjoint `displayOptions` is
a first-class n8n pattern (e.g. GoogleTranslate keys on `@version`). It passes strict lint.

**Takeaways for the next agent:**
- If you ever add a third operation/credential or split resources further, **keep the `authentication`
  param mechanism**. Do not "simplify" it back to gating on `operation` — it will silently break tool
  use again.
- Always test new operations through the **AI-Agent tool path**, not just as a normal node. The two
  paths exercise different credential-resolution code.

See ADR-0004 (amendment) and the `CLAUDE.md` credential-keying paragraph.

---

## 2. FedEx OAuth scope MUST be empty

**Symptom:** token exchange fails with HTTP 400
`BAD.REQUEST.ERROR: No registered scope value for this client has been requested`.

**Cause:** FedEx's `client_credentials` flow derives the scope from the client's registration and
**rejects an explicit `scope` param**. The credential class originally defaulted `scope: 'CXS'` (per
`authorization.json`) — that broke every token exchange.

**Fix:** `scope` default is `''` (empty). FedEx returns the *effective* scope (e.g. `CXS-TP`) on a
successful token response — that is informational, do not feed it back in.

**Takeaway:** do not trust `authorization.json`'s implication that `CXS` is required. Verified against
sandbox 2026-06-14 (commit 56df32c). Never re-add a scope default.

---

## 3. FedEx sandbox keys are per-project / per-entitlement

**Symptom:** a perfectly valid token gets **403** on an endpoint — misleading, looks like an auth bug.

**Cause:** FedEx issues **disjoint per-project entitlements**. The **Track** key returns 403 on
Validate/Rate/Ship; the **Ship** key returns 403 on Track. This is exactly why the node ships **two**
credential classes (ADR-0004):
- `fedexTrackOAuth2Api` → Track only.
- `fedexShippingOAuth2Api` → Rate / Ship / Validate (the shipping project bundles all three).

**Takeaways:**
- When testing end-to-end, point **Track** at the track credential and
  **Validate / Get Rates / Create** at the ship credential — otherwise you chase a phantom auth bug.
- `.env.local` holds both: `FEDEX_CLIENT_ID_SANDBOX` (track) and `FEDEX_CLIENT_ID_SHIP_SANDBOX`
  (ship/rate/validate), plus `FEDEX_ACCOUNT_NUMBER_SANDBOX`.
- **Always exercise the real through-n8n token exchange**, not a direct `curl`/script. The earlier
  "confirmed" runs used a no-scope direct script, so both §2 and §3 were invisible until the node ran
  through live `n8n-node dev`.

---

## 4. Dev node type is `CUSTOM.fedex`, not `n8n-nodes-fedex.fedex`

Under `n8n-node dev`, the CLI symlinks the package into n8n's custom-extensions dir
(`~/.n8n-node-cli/.n8n/custom/node_modules/n8n-nodes-fedex`). n8n loads it via `CustomDirectoryLoader`,
which sets `packageName = 'CUSTOM'`. Node type = `packageName.nodeName`, so the **live dev type is
`CUSTOM.fedex`** (the credential type stays `fedexOAuth2Api`, unprefixed).

**Consequence:** a workflow created via the n8n public API for dev testing must use `"type":
"CUSTOM.fedex"`. Using the published-package type `n8n-nodes-fedex.fedex` makes nodes render as "?"
with "Install the package to use this node." Once published to npm and installed normally, the real
type is `n8n-nodes-fedex.fedex`.

---

## 5. `n8n-node dev` environment setup traps

- **Node.js must be `>=22.22`.** The machine defaulted to 22.16.0, which n8n rejects. Fix:
  `nvm install 22` → 22.22.x, and make sure the dev shell has it on PATH.
- **Corrupt npx cache** surfaces as `Error: Cannot find module 'winston'` from the npx-installed n8n.
  Fix: `rm -rf ~/.npm/_npx/<hash>` for the n8n entry, then relaunch (it re-downloads clean).
- The dev server runs n8n at **http://localhost:5678** with `N8N_USER_FOLDER=~/.n8n-node-cli` (its
  DB/credentials/workflows live in `~/.n8n-node-cli/.n8n/`, separate from `~/.n8n`) and
  `N8N_DEV_RELOAD=true`.
- There is **no `--strict` flag** in `@n8n/node-cli` 0.34.0 (the CLI rejects it). Lint strictness comes
  from `n8n.strict: true` in `package.json`, which plain `n8n-node lint` applies.

---

## 6. Driving the n8n public REST API (and why it can't do everything)

The local n8n exposes a public REST API (prefer `curl` over the n8n MCP for this). Auth:
`X-N8N-API-KEY: <key>`; key + base URL are in `.env.local` as `N8N_API_KEY` / `N8N_BASE_URL`.

Quirks:
- `GET /api/v1/credentials` lists credentials (id, name, type) but **never returns secret values**.
- **No node-types endpoint** on the public API; `/types/nodes.json` needs a browser session (401 with
  API key).
- `PUT /api/v1/workflows/{id}` requires the **full** body and accepts only `name, nodes, connections,
  settings`. `settings` is **strict** — extra props (e.g. `binaryMode`) are rejected with
  `must NOT have additional properties`. Send just `{"executionOrder":"v1"}`.
- **No "execute" endpoint** for manual-trigger workflows on the public API — runs happen via the UI
  button (or the CLI method in §9).

---

## 7. npm publishing traps

- **Auth is npm OIDC Trusted Publishing — no token/secret.** Configured on npmjs.com (package →
  Settings → Trusted Publisher → GitHub Actions). The workflow needs `id-token: write` + npm
  `>= 11.5.1`. The old `NPM_TOKEN` repo secret was deleted once OIDC was verified.
- **The publish step MUST be `pnpm run release` (= `n8n-node release`), NOT raw `npm publish`.**
  `package.json` wires `prepublishOnly: "n8n-node prerelease"`, a guard that `process.exit(1)`s unless
  `RELEASE_MODE` is set. Only `n8n-node release` sets it. A raw `npm publish --provenance` **failed**
  the 0.1.4 run (build passed, prepublishOnly exited 1).
- **`404 PUT @nodrel-dev/...` means the publish ran unauthenticated** — npm returns 404 (not 401) for
  an unauthorized PUT to a scoped package. Check the trusted publisher config / OIDC.
- **First-publish CDN propagation lag is real:** after `+ pkg@version` logs success, the read CDN can
  404 for ~5 min. `npm access list packages @nodrel-dev` (write path) confirms existence immediately.
- **Retry escape hatch:** if a publish fails *after* release-please already tagged the release (so the
  `release_created` gate won't re-fire), run `gh workflow run publish.yml --ref main` — the
  `workflow_dispatch` path publishes the current `package.json` version.
- **Build/packaging trap (RESOLVED, do not reintroduce):** with a `rimraf dist` + `tsc` build, **keep
  `incremental` OFF**. An external `tsBuildInfoFile` survived the rimraf → tsc skipped re-emitting
  unchanged files → incomplete `dist` that failed at load with `Cannot find module '../shared'`. CI was
  unaffected (fresh checkout = full emit), so this only bites local incremental rebuilds. Real fix:
  remove `incremental` + `tsBuildInfoFile` entirely. Always `npm pack --dry-run` to confirm the tarball
  is LICENSE + README + dist only.

---

## 8. n8n Creator Portal review

- The Creator Portal (creators.n8n.io/nodes) ties a submission to the **version submitted** and has
  **no self-serve way to change it**. Re-submitting a newer version returns "package is already
  submitted for verification."
- **RESOLVED — no swap needed:** n8n support confirmed reviewers **always pull the latest published
  npm version at review time**. So just keep the latest fix on npm and record the demo against it.
  (Old workaround, now moot: email `help@n8n.io` / Discord `#community-nodes` to pull a specific
  version.)

---

## 9. Verifying a fix without the editor (the reliable harness)

The chat webhook is unreliable headless. The verification harness that actually worked:

- Verify n8n runs in **Docker container `n8n-fedex-verify`** (n8n `:latest`, volume `n8n_fedex_verify`
  → `/home/node/.n8n`), **not** `n8n-node dev`. The community package is installed from npm.
- To test an unpublished `dist/`: `docker cp dist` + `package.json` into
  `/home/node/.n8n/nodes/node_modules/@nodrel-dev/n8n-nodes-fedex`, then `docker restart
  n8n-fedex-verify`.
- The owner account exists but its creds are unknown → can't use the `/rest` editor API or Playwright
  login, and the public API has no execute endpoint. So run **headlessly via the CLI**, giving it its
  own broker port so it doesn't collide with the live instance:
  ```
  docker exec -e N8N_RUNNERS_BROKER_PORT=5699 \
    -e N8N_RUNNERS_BROKER_LISTEN_ADDRESS=127.0.0.1 \
    n8n-fedex-verify n8n execute --id <workflowId>
  ```
  Plain `n8n execute` exits 1 with "Task Broker port 5679 in use".
- The load-success signal reviewers care about (seen with `N8N_LOG_LEVEL=debug`):
  `Loaded all credentials and nodes from @nodrel-dev/n8n-nodes-fedex {"credentials":2,"nodes":1}`.

---

## 10. Security / secrets hygiene (a real burn)

- The manual-review video script once had **real FedEx sandbox creds** (2 client_id/secret pairs +
  the sandbox account number) hardcoded. They were redacted to `<PLACEHOLDER>` and the private repo's
  git history was reset + force-pushed — but **GitHub can retain orphaned commits by SHA until GC**.
- **Lesson:** never hardcode creds in docs or scripts. `.env.local` (gitignored) is the *only* place
  for secrets. If creds ever land in any committed/pushed file, **rotate them** in the FedEx Developer
  Portal — redaction after the fact is not enough.

---

## Where the deeper context lives

- **Spec & acceptance criteria** → `internal/fedex-node-build-brief.md`
- **All doc URLs, confirmed endpoints/enums, OAuth shape** → `documentation.yaml`
- **FedEx request/response shapes** → `internal/fedex-docs/json-schemas/*.json` (OpenAPI,
  authoritative); prose in `internal/fedex-docs/*.md`
- **Architecture decisions** → `docs/adr/` (esp. ADR-0001 env switch, ADR-0004 resource/credential
  model)
- **Project guardrails** → `CLAUDE.md`; n8n build guidance → `AGENTS.md` + `.agents/*.md`
