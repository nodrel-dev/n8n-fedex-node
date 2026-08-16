# UX Audit — FedEx node, Node Details View (NDV)

> Run: `/ux-audit`, 2026-06-20. Live Playwright audit against a real n8n **2.25.7** editor
> (Docker `n8n-fedex-uxtest`, port 5690) with the **locally-installed**
> `@nodrel-dev/n8n-nodes-fedex@0.2.4` (this session's unreleased changes) — not the published
> registry build. Because this is an n8n community node, the "page" under audit is the NDV
> parameter panel. Findings are split into **node-author-controllable** vs **n8n-platform**
> (which the node's `INodeProperties` cannot change).

## Method

- Seeded-owner n8n container (recipe: persistent volume + 1-year session), node installed from
  packed tgz (`npm install /tmp/pkg.tgz` → `dist` v0.2.4 confirmed in container).
- Audited two operations: **Create a shipment and label** (richest panel; billable) and
  **Validate an address**.
- Viewports: Desktop 1440×900, Tablet 768×1024, Mobile 375×812.
- Verification mixed DOM inspection (`data-test-id`, rendered hint text) with screenshots.

## Change verification — the four fixes from this session

All four render correctly in the live editor:

| # | Fix | Live result |
|---|-----|-------------|
| 1 | Country dropdown (incl. `validate.ts`) | Shipper / Recipient / Validate all render a "United States" combobox (was free text). Compiled `validate.js` references `COUNTRY_OPTIONS`. |
| 2 | Phone parameter hint | "FedEx requires a phone number for the shipment contact" renders as persistent text below both phone fields. |
| 3 | Dimension parameter hint | Adding **Length** shows "All three dimensions must be > 0 or none are sent". |
| 4 | Node-level Create warning | Yellow warning in the **output pane**; correctly **gated to Create only** (absent on Validate). `displayCondition` works. |

## Critical Issues (must fix)

None. No usability- or accessibility-breaking defects in the node-author-controlled surface.

## Recommended Improvements

1. **Yellow-callout overload on Create (node-author-controllable).**
   Opening Create stacks **two yellow notices back-to-back** — the credential-fit notice
   (`shippingCredentialNotice`) and the cost notice (`createCostNotice`) — *before the first
   input*, plus the node warning in the output pane: three yellow alerts at once. This invites
   banner-blindness and dilutes the high-stakes billing warning.
   - Suggested direction: keep the **cost** notice inline (highest stakes); demote the
     **credential-fit** guidance to the credential field's description / docs so only one yellow
     block remains on the parameters side. Anchors: `nodes/Fedex/Fedex.node.ts`
     (`shippingCredentialNotice`), `nodes/Fedex/resources/shipping/create.ts` (`createCostNotice`).

2. **No Operation selector in the NDV (verify; likely n8n platform, NOT this session's change).**
   The NDV exposes **Resource** (`parameter-input-resource`) but **no Operation dropdown**
   (`parameter-input-operation` absent; no "Operation" label in the dialog). A user who added
   "Create" cannot switch to Get Rates / Validate without deleting and re-adding the node.
   Appears tied to n8n's action-based add flow, not to the country/hint/warning edits. Action:
   confirm against n8n docs / another declarative node; if reproducible, report upstream rather
   than patching the node.

## Minor Polish

1. **Tablet (768): node warning truncates** in the narrow output pane
   ("Create books a re… charges."). Shortening the `hints[].message` (e.g. "Create books a real,
   billable FedEx shipment (free in Sandbox).") fits better. Anchor: `nodes/Fedex/Fedex.node.ts`
   `hints[0].message`. Partly node-controllable.
2. **Phone hint == description string.** `hint` and `description` are identical text on the phone
   fields. Acceptable (different visibility layers), but the tooltip could carry a longer
   explanation while the hint stays terse to avoid exact duplication. Anchor:
   `nodes/Fedex/fields.ts` `contactFields()`.

## What's Working Well

1. **Smart, honest defaults** — Country → United States, Service Type → FedEx Ground, Weight →
   1 LB, Label → PDF. The form is usable on open with no cold-start blanks.
2. **Progressive disclosure** — optional params correctly collapsed under "Additional Fields",
   keeping the Create core lean; Validate is a clean 5-field form.
3. **Output-pane pre-execution warning** is the right pattern for a billable, `usableAsTool`
   action — visible before Execute and correctly scoped to Create only.

## Out of scope (n8n platform — not node-author-controllable)

- **Mobile (375): the NDV does not reflow.** Labels truncate to "R.", "Wei…", "L…". n8n's editor
  is desktop-only; nothing in the node's `INodeProperties` can fix this. Recorded for context only.

## Summary

- Nodes/operations audited: **2** (Create, Validate)
- Viewports tested: Desktop (1440), Tablet (768), Mobile (375)
- Critical issues: **0**
- Recommended improvements: **2** (1 node-controllable, 1 to verify as platform)
- Minor polish: **2**
- All four session changes: **verified working live**

## Screenshots

Captured in the Playwright container (`.playwright-mcp/`):
`ux-create-desktop-1440`, `ux-create-desktop-phone-hint`, `ux-create-dimension-hint`,
`ux-create-additional-fields`, `ux-create-tablet-768`, `ux-create-mobile-375`,
`ux-validate-ndv`.

## Test harness

n8n container `n8n-fedex-uxtest` (port 5690), owner `admin@fedex.test` / `FedexTest123`,
volume `n8n-fedex-uxdata` (persists). Stop with `docker rm -f n8n-fedex-uxtest`.
