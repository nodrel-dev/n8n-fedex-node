# Pure assembly/extraction cores, unit-tested, for the logic declarative routing can't express

Three operations need to place the same shapes into structurally different FedEx request bodies,
and two operations need to reshape FedEx responses. The shared **Address** shape alone lands in
four distinct request paths — `addressesToValidate[0].{field}` (Validate),
`requestedShipment.shipper.address.{field}`, `requestedShipment.recipient.address.{field}` (Rate,
singular), and `requestedShipment.recipients[0].address.{field}` (Ship, array index). Two of those
carry an array index, `recipient` is singular for Rate but a plural array for Ship, and
`residential` is a user **input** flag for a recipient but the **output** of Validate. Per-field
declarative `routing.send` would be brittle and non-uniform across those four shapes.

We assemble these shapes in **pure cores** rather than per-field routing:

- `toFedexAddress(params) → FedexAddress`, `toFedexContact(params) → FedexContact` — plain object
  in, typed FedEx object out. They own the field rules (streetLines split, US country default,
  residential include/omit) and know nothing about n8n.
- A **thin** `preSend` at each call site does the n8n-coupled work: read params via
  `getNodeParameter`, call the pure core, and place the result at that site's request path.
- The label and rate reshaping follow the same pattern: `extractLabel(response, imageType)` (see
  ADR-0002) and `shapeRates(response)` are pure cores behind thin `postReceive` hooks.

A narrow **vitest** runner covers these pure cores with hand-written cases informed by the captured
FedEx OpenAPI specs (`internal/fedex-docs/json-schemas/`). It is scoped to the cores only; it does
not test routing and does not replace sandbox verification.

> **Note (updated 2026-06-15):** two details below drifted from the original draft. (1) The tests
> assert against **inline literal cases**, not loaded fixture files — the schemas inform the cases
> but are not read at test time. (2) The captured specs moved to the private `internal/fedex-docs/`
> companion repo (see ADR/handoff on the docs split), so the path is
> `internal/fedex-docs/json-schemas/`, not `fedex-docs/json-schemas/`.

## Why this is allowed under "declarative-first" (constitution III)

Constitution III permits programmatic code "where a transformation declarative routing cannot
express is required." Assembling one Address into four request positions (two with array indices),
and pairing the Negotiated vs List `rateType` entries out of a nested array, are exactly such
transformations — the same carve-out ADR-0002 used for the base64 label. Field **surface** stays
declarative (`INodeProperties` builders); only the request/response *transform* is programmatic.

## Considered options

- **Per-field `routing.send` in a field builder** (pure declarative, no runner): rejected — relies
  on n8n routing building array-index paths like `recipients[0].address.city`, and would split into
  two mechanisms (simple paths vs array paths), an inconsistent seam. Also leaves the schema-fragile
  logic (Constitution II) with no test surface.
- **Node-coupled cores** (`toFedexAddress(this, prefix)`): rejected — the seam becomes
  `IExecuteFunctions`, which cannot be tested without faking the execution context, forfeiting the
  reason to extract the core at all.
- **Stay manual-only, no runner**: rejected — the cores ARE the schema-fragile logic; manual
  sandbox round-trips are the slowest way to catch a regression in a streetLines split or a MIME
  map. A unit test over a fixture is near-zero cost.

## Consequences

- The constitution's quality-gates section is amended (1.0.0 → 1.1.0) to bring a unit-test runner
  into scope for the pure cores; operation-level verification stays manual against sandbox.
- One `vitest` devDependency. Test files live beside the cores; the runner targets the pure cores
  only and is not a green-toolchain release gate (`pnpm lint` + `pnpm build` remain the gates).
  Lint strictness comes from `n8n.strict: true` in `package.json`, which `n8n-node lint` applies
  automatically — there is **no** `--strict` flag in `@n8n/node-cli` 0.34.0 (an earlier draft and
  CLAUDE.md referenced `lint --strict`, which the CLI rejects as a nonexistent flag).
- The node gains a uniform pattern: a small set of pure, fixture-tested cores
  (`toFedexAddress`, `toFedexContact`, `extractLabel`, `shapeRates`) behind thin preSend/postReceive
  adapters, with declarative routing for everything else. Reusable for a future UPS package.
