# Capture — FedEx node v2 cognitive-load audit findings

- **Captured:** 2026-06-20
- **Source:** `/cognitive-load-conversion` skill, run 2026-06-20 (args: "Be sure to cross-check again up to date n8n docs"). n8n docs cross-checked live via Context7 `/n8n-io/n8n-docs`.
- **Subject:** Re-audit of the FedEx n8n community node UI (four operations + two credentials) after the 2026-06-19 recommendations shipped. New findings surfaced by cross-checking current n8n docs.
- **Full write-up on disk:** `docs/audits/cognitive-load-fedex-node-v2-20260620-085340-0885.md`

## Cross-cutting notes

- **Baseline confirmed shipped:** all 5 prior operation-UI recs (`operation-ui-1f35`) and all 4 prior credential recs (`credential-setup-1f36`) are verified shipped. Do not re-open them.
- **Explicit "do not touch" list (verbatim from source):**
  - The previous fixes — all shipped and confirmed.
  - The two-credential architecture (`ADR-0004`) and the hidden `authentication` discriminator — correct, not user-visible, intrinsic to FedEx's entitlement model.
  - The `Additional Fields` collection shape — correct pattern; defaults applied correctly in `shared.ts` readers.
  - The README credentials walkthrough — confirmed complete (README line 87), no gap.
  - The dimension entries' order within the collection (D/H/L/W) — `pnpm lint` passes; acceptable.
  - The `subtitle` expression value-key format (`getRates: shipping`) — matches n8n docs verbatim.
- **n8n API facts established this run (load-bearing):**
  - `description` renders as a hover tooltip in the NDV; `hint` renders as persistent inline text below the field. The two coexist.
  - Node-level `hints: []` array exists at `INodeTypeDescription` level, supporting `message`, `type`, `location`, `whenToDisplay`, `displayCondition`.
- **Recommended sequencing (verbatim from source ranking):** rec #1 (validate country dropdown) is the only code change rated High; recs #2–#4 are Medium and independent. Verify with `pnpm lint && pnpm build && pnpm test`.

## Items

### Finding 1 — `validate.ts` Country Code still free-text (Extraneous Load)
- **Rating:** High (priority #1)
- **Changes:** Convert `addressCountryCode` from `type: 'string'` to `type: 'options'` with `options: COUNTRY_OPTIONS`.
- **Why:** The 2026-06-19 country-dropdown fix (Op #4) landed only in `addressFields()` in `fields.ts`; `validate.ts` defines its own isolated field set and was not touched. Validate is now the only operation still requiring ISO-code recall — an inconsistency regression across the four operations.
- **Anchors:** `nodes/Fedex/resources/shipping/validate.ts` line 27 (`addressCountryCode`); import `COUNTRY_OPTIONS` from `../../countries`; pure core `toFedexAddress` (unchanged); default `'US'`.
- **Preconditions:** none stated.
- **Definition of done:** dropdown renders on Validate Address matching the other three operations; `pnpm lint && pnpm build && pnpm test` green.
- **Open questions:** Behavioral diff noted — Validate now sends the dropdown value rather than typed text; source assessed this as safe (default `'US'` unaffected; typed-code workflows migrate to dropdown on next edit).

### Finding 2 — Phone fields carry guidance only in `description` (Mental Model Gap)
- **Rating:** Medium (priority #2)
- **Changes:** Add `hint: 'FedEx requires a phone number for the shipment contact'` to both phone fields (keep existing `description`).
- **Why:** `description` is tooltip-only (requires hover); the FedEx phone requirement is invisible to users who don't hover. `hint` makes it persistently visible.
- **Anchors:** `nodes/Fedex/fields.ts`, `contactFields()`; fields `shipperPhoneNumber`, `recipientPhoneNumber`.
- **Preconditions:** none stated.
- **Definition of done:** open.
- **Open questions:** none flagged.

### Finding 3 — Dimension all-or-nothing rule only in `description` (Mental Model Gap)
- **Rating:** Medium (priority #3)
- **Changes:** Add `hint: 'All three dimensions must be > 0 or none are sent'` to `packageLength`, `packageWidth`, `packageHeight` (in place of or alongside their `description`).
- **Why:** The all-or-nothing dimensions rule is currently tooltip-only on the three fields; users must hover to discover it.
- **Anchors:** `nodes/Fedex/fields.ts`, `dimensionEntries`; fields `packageLength`, `packageWidth`, `packageHeight`.
- **Preconditions:** none stated.
- **Definition of done:** open.
- **Open questions:** none flagged.

### Finding 4 — Create cost notice only in parameter panel (Mental Model Gap)
- **Rating:** Medium (priority #4)
- **Changes:** Add a node-level `hints: [...]` entry: `type: 'warning'`, `message: 'Create books a real FedEx shipment. Sandbox is free; Production incurs charges.'`, `location: 'outputPane'`, `whenToDisplay: 'beforeExecution'`, `displayCondition: '={{ $parameter["operation"] === "create" }}'`.
- **Why:** The current Create cost warning is a field-level `type: 'notice'` buried in the parameter list, only visible once Create's fields are expanded. A node-level hint surfaces the billing warning in the output pane before Execute — critical because the node is `usableAsTool` and an AI agent can invoke Create without reading the parameter form. Source frames this as a second, better-positioned signal, not a replacement for the existing notice.
- **Anchors:** `nodes/Fedex/Fedex.node.ts` (`description` / `INodeTypeDescription` level); existing `createCostNotice` field in `nodes/Fedex/resources/shipping/create.ts`; `usableAsTool: true`.
- **Preconditions:** none stated.
- **Definition of done:** open.
- **Open questions:** none flagged.

## Reference (not actions)

- **Finding 1** — single code change; feeds a normal `fix:` Conventional Commit → release-please patch. Verify with `pnpm lint && pnpm build && pnpm test`. Consider a characterization test mirroring the existing `getRates.presend.test.mts` / `create.presend.test.mts` pattern to lock the emitted Validate request body.
- **Findings 2–4** — UI-copy / metadata changes; each a `fix:` commit (registry consumes metadata edits). No request-body impact, so no presend-test change needed; `pnpm lint && pnpm build` gate.
- Fuller write-up with the n8n-docs code snippets and the verification note lives at `docs/audits/cognitive-load-fedex-node-v2-20260620-085340-0885.md`.
