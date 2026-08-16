# Cognitive-Load Audit — FedEx node v2 (cross-checked against live n8n docs)

> Run: `/cognitive-load-conversion` skill, 2026-06-20. Arguments: "Be sure to cross-check again up to date n8n docs".
> Scope: all four operations + both credentials, re-audited from source after the previous
> recommendations (operation-ui-1f35, credential-setup-1f36) were shipped.
> n8n docs fetched live via Context7 (`/n8n-io/n8n-docs`) during this run.

## Baseline

All five recommendations from the 2026-06-19 operation audit and all four from the credential
audit are confirmed shipped:

| Previous rec | Status |
|---|---|
| Op #1 — Additional Fields collection (Create + Get Rates) | ✅ shipped |
| Op #2 — Service Type defaults to `FEDEX_GROUND` | ✅ shipped |
| Op #3 — Phone Number description names the FedEx requirement | ✅ shipped |
| Op #4 — Country Code → `COUNTRY_OPTIONS` dropdown, default US | ✅ shipped in `addressFields()` |
| Op #5 — Dimension description on L / W / H | ✅ shipped |
| Op extra — Create cost notice | ✅ shipped |
| Cred #1 — Client ID / Secret relabelled to API Key / Secret Key | ✅ shipped (notice in shared) |
| Cred #2 — Notice: separate keys per project | ✅ shipped (notice in shared) |
| Cred #3 — README `#credentials` anchor | ✅ confirmed valid (line 87) with full walkthrough |
| Cred #4 — Environment description tightened | ✅ shipped |

---

## New Findings

### 1. Extraneous Load

**`validate.ts` Country Code is still a free-text string.**
`addressFields()` in `fields.ts` was updated to emit an `options` dropdown via `COUNTRY_OPTIONS`
(Op #4), but `validate.ts` defines its own isolated `addressCountryCode` field that was not
touched during that fix. The result: three of the four operations present a country dropdown;
Validate Address presents an unstyled text input with no option list and only the tooltip
description "Two-letter ISO country code." A user who learned ISO codes aren't required
on Create (because it's a dropdown) will be confused by the regression, and a user typing
a country code on Validate carries the same recall burden the previous fix intended to eliminate.

---

### 2. Mental Model Gaps

**n8n now documents `hint` as a first-class field property distinct from `description`.**
The live docs (`/integrations/creating-nodes/build/reference/ui-elements.md`) show:

```ts
{
  displayName: 'URL',
  name: 'url',
  type: 'string',
  hint: 'Enter a URL',
  // ...
}
```

`description` renders as a hover tooltip in the NDV. `hint` renders as persistent small text
directly below the field — always visible, no hover required. Fields in the FedEx node that
carry critical inline guidance exclusively in `description` are invisible to users who don't
hover. The most high-value candidates:

| Field | Current guidance | Better placement |
|---|---|---|
| `shipperPhoneNumber` / `recipientPhoneNumber` | "FedEx requires a phone number for the shipment contact" (in `description`) | `hint` |
| `packageLength/Width/Height` | "Dimensions are sent only when L/W/H > 0" (in `description`) | `hint` |
| `Shipper Street Lines` | "Put each additional line on its own line; up to three are sent." (in `description`) | `hint` |

`description` can remain for longer contextual copy (tooltip). `hint` adds the persistent
one-liner. The two properties coexist.

**n8n now documents a node-level `hints` array.**
The live docs show hints defined at the `description` level with `displayCondition`,
`type`, `location`, and `whenToDisplay`:

```ts
description: INodeTypeDescription = {
  hints: [
    {
      message: "This operation buys a real shipment and bills the account.",
      type: 'warning',
      location: 'outputPane',
      whenToDisplay: 'beforeExecution',
      displayCondition: '={{ $parameter["operation"] === "create" }}'
    }
  ]
}
```

The Create cost warning is currently a `type: 'notice'` field at the top of the property list.
That notice sits in the node's input parameter panel and is only visible when the user has
already expanded Create's fields. A node-level hint with `location: 'outputPane'` and
`whenToDisplay: 'beforeExecution'` surfaces the warning in the output panel **before the user
clicks Execute** — more effective for an agentic node where the user might run it without
reading all parameters first. The field-level notice is not wrong, but a node-level hint adds
a second, better-positioned signal.

---

### 3. Offloading Opportunities (ranked)

1. **Apply `COUNTRY_OPTIONS` to `validate.ts` `addressCountryCode`** — direct one-line fix;
   eliminates the ISO recall cost and restores consistency with the other three operations.
2. **Add `hint` property to phone number fields** — one line per field; turns a tooltip into a
   persistent label without removing the description.
3. **Add `hint` to dimension fields** — same; the all-or-nothing rule is currently tooltip-only
   on those three fields.
4. **Add a node-level `hints` entry for Create** — adds the cost warning to the output pane.

---

### 4. Priority Recommendations

| # | Where | Change | Cognitive cost removed | Impact |
|---|---|---|---|---|
| 1 | `nodes/Fedex/resources/shipping/validate.ts` line 27 | Change `addressCountryCode` from `type: 'string'` to `type: 'options'`, `options: COUNTRY_OPTIONS`, import `COUNTRY_OPTIONS` from `../../countries` | Eliminates ISO-code recall on Validate; restores cross-operation consistency | High |
| 2 | `nodes/Fedex/fields.ts`, `contactFields()` | Add `hint: 'FedEx requires a phone number for the shipment contact'` to both `shipperPhoneNumber` and `recipientPhoneNumber` | Makes the requirement permanently visible without hover; reduces "why is this required?" pause | Medium |
| 3 | `nodes/Fedex/fields.ts`, `dimensionEntries` | Add `hint: 'All three dimensions must be > 0 or none are sent'` to `packageLength`, `packageWidth`, `packageHeight` in place of (or alongside) their `description` | Eliminates the need to hover to discover the all-or-nothing rule | Medium |
| 4 | `nodes/Fedex/Fedex.node.ts` | Add a `hints: [...]` entry at description level: `type: 'warning'`, `message: 'Create books a real FedEx shipment. Sandbox is free; Production incurs charges.'`, `location: 'outputPane'`, `whenToDisplay: 'beforeExecution'`, `displayCondition: '={{ $parameter["operation"] === "create" }}'` | Surfaces the billing warning before execution, not only in the parameter list; critical for the `usableAsTool` AI-agent path | Medium |

---

## What NOT to touch

- The previous fixes — all shipped and confirmed. Do not re-open.
- The two-credential architecture (ADR-0004) and hidden `authentication` discriminator —
  correct; not user-visible; intrinsic to FedEx's entitlement model.
- The `Additional Fields` collection shape — correct pattern; field-level defaults applied
  correctly in `shared.ts` readers.
- The README credentials walkthrough — confirmed complete. No gap.
- The dimension entries' order within the collection (D/H/L/W grouped together) — `pnpm lint`
  passes; semantic grouping of related dimensions is acceptable and conventional.
- The `subtitle` expression value-key format (`getRates: shipping`) — matches the n8n docs
  example verbatim; low-value to change.

---

## Verification

After shipping rec #1 (the only code change), run:

```bash
pnpm lint && pnpm build && pnpm test
```

The country dropdown on Validate Address introduces a behavioral difference (Validate now sends
the two-letter code value from the dropdown rather than whatever the user typed), but since the
`toFedexAddress` core is unchanged and the default is `'US'`, existing saved workflows that used
the default are unaffected. Any workflow that previously typed a country code will be migrated
to the dropdown selection on next edit, which is safe.
