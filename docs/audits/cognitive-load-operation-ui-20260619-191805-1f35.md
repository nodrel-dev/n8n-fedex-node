# Cognitive-Load / Conversion Audit — FedEx node configuration UI

> **Status: Fixed — 2026-06-20T00:00:00Z**
> All priority recommendations (#1–#5) plus the "worth adding" Create cost notice are **shipped**.
> - #1 — optional params (company, email, residential flag, pickup/packaging/label-stock,
>   parcel dimensions) collapsed into an "Additional Fields" `collection` on Create + Get
>   Rates. Create's flat panel drops from ~31 fields to ~14 + the collection.
> - #2 — Create `Service Type` defaults to `FEDEX_GROUND` (no more blank-but-required).
> - #3 — Phone Number description now states FedEx requires it.
> - #4 — `${role} Country` is now an ISO 3166-1 dropdown (`COUNTRY_OPTIONS`, default US);
>   the value stays the two-letter code, so request bodies are unchanged.
> - #5 — Label Stock Type now has a description; the dimensions all-or-nothing rule is
>   repeated on Length, Width, and Height (was only on Length).
> - "Worth adding" (What NOT to touch #2) — Create now carries an inline `notice` that it
>   books a real shipment and bills the account (free in Sandbox, charged in Production).
>
> Locked by characterization tests (`nodes/Fedex/resources/shipping/getRates.presend.test.mts`,
> `create.presend.test.mts`) proving the emitted FedEx request bodies are byte-identical to
> pre-refactor. `pnpm test` (16/16) / `build` / `lint` all green.

> Source: `/cognitive-load-conversion` skill, run 2026-06-19. Target = the n8n node
> parameter panel as defined by the property builders in `nodes/Fedex/`. The property
> definitions fully determine what n8n renders, so they *are* the screen under review.
> The **Create Shipment** panel carries most findings: it spends real money and renders
> ~31 flat fields.

## Reconstructed screen (what the user sees)

Picking **Shipping → Create** renders one undifferentiated vertical stack of **~31 fields**:

> Account Number · Shipper Street · Shipper City · Shipper State · Shipper Postal ·
> Shipper Country · Shipper Contact Name · Shipper Company · Shipper Phone · Shipper Email ·
> Recipient Street · Recipient City · Recipient State · Recipient Postal · Recipient Country ·
> Recipient Is Residential · Recipient Contact Name · Recipient Company · Recipient Phone ·
> Recipient Email · Service Type · Packaging Type · Pickup Type · Weight · Weight Unit ·
> Length · Width · Height · Dimension Unit · Label Format · Label Stock Type

No section breaks, no collapsing, required and optional at the same visual level. The only
cue separating "Shipper" from "Recipient" is the label prefix on every row.

---

## 1. Extraneous Load Found

- **The flat 31-field wall (Create).** Every field at the same altitude, no grouping. The
  brain segments four logical blocks (sender, recipient, package, label) by parsing label
  prefixes. Largest single source of extraneous load.
- **Required vs. optional are visually indistinguishable.** `Shipper Company`, `Shipper Email`,
  dimensions, `Packaging Type`, `Pickup Type`, `Label Stock Type` (all optional/defaulted)
  interleave with genuinely required fields. The user evaluates all 31.
- **Inconsistent descriptions signal false hierarchy.** `Label Format` has a description;
  `Label Stock Type` directly below has none. `Package Weight` (required) has none; `Length`
  (optional) does. Help text applied without semantic meaning forces the user to reconcile a
  hierarchy that isn't there.
- **Dimension guidance appears on only one of three fields.** The "sent only when length,
  width, and height are all > 0" hint lives on `Length`. A user reading `Width`/`Height` sees
  a bare `0` with no explanation.
- **`Country Code` is free text.** Recalling the ISO-3166 code (GB vs UK, US vs USA) is recall
  work the field could eliminate.

## 2. Mental Model Gaps

- **No "Additional Fields" / "Options" collection — the core n8n convention is absent.**
  Established n8n nodes keep required core params flat and bundle optional ones into a
  collapsible `collection`. Returning users expect that affordance and don't get it. Highest-
  value gap.
- **Phone is required but Name is not.** On a shipping label users expect *name* to be the
  mandatory identity field. `Phone Number` is required while `Contact Name` is optional, with
  no explanation. Real FedEx requirement, but the UI doesn't say so — reads like a bug.
- **`Service Type` on Create defaults to blank-but-required.** Default `''` isn't a listed
  option, so the dropdown opens unselected and errors if skipped, yet looks pre-configured
  like its neighbors. A required dropdown should default to a real common value.
- **`Account Number` is entered on the node though it can live in the credential.** Asking for
  it again as a node field is double-entry against the "I already authenticated" model.

## 3. Offloading Opportunities (ranked)

1. **Collapse optional fields into an "Additional Fields" collection (Create + Get Rates).**
   Cuts visible Create form from ~31 to ~12 fields. Highest impact.
2. **Default `Service Type` to FedEx Ground on Create.** Honest smart default; override only
   if needed instead of a forced cold choice.
3. **Make `Country Code` a dropdown** (default US) — removes ISO-code recall for the US/CA case.
4. **Source `Account Number` from the credential by default**, keep node field as override.
5. **Repeat the dimensions hint** (or hoist to a section notice) so the all-or-nothing rule is
   visible from whichever dimension field the user reads first.

## 4. Priority Recommendations

| # | Change | Cost removed | Impact |
|---|--------|--------------|--------|
| 1 | Group optional params under an "Additional Fields" `collection` on Create and Get Rates (Company, Email, Pickup Type, Packaging Type, dimensions + unit, Label Stock Type, residential). Keep Account/addresses/phone/service/weight/label-format flat. | Collapses 31-field wall to ~12-field core; makes required vs. optional self-evident | High |
| 2 | Default `Service Type` to `FEDEX_GROUND` on Create (drop blank-but-required). | Removes a forced cold decision and a silent skip-error path | High |
| 3 | Add one line to the `Phone Number` description ("FedEx requires a phone number for the shipment contact"). | Resolves the "why phone but not name?" conflict in place | Medium |
| 4 | Convert `Country Code` to a dropdown (default US), or note format in a placeholder. | Eliminates ISO-code recall | Medium |
| 5 | Normalize descriptions — give `Label Stock Type` and `Package Weight` short descriptions; repeat the dimensions rule across L/W/H or hoist to a notice. | Removes false-hierarchy signal | Low–Medium |

---

## What NOT to touch

- The four-operation / two-resource split and the hidden `authentication` discriminator —
  intrinsic to FedEx's entitlement model, invisible to the user, load-bearing (ADR-0004).
- The Create operation's real-money weight. Opposite of load reduction applies: a small inline
  notice that Create buys a live shipment is honest friction worth *adding*.
- The `Track Multiple Numbers` boolean → single-vs-multiline swap. Clean, conventional
  progressive disclosure. Leave it.
