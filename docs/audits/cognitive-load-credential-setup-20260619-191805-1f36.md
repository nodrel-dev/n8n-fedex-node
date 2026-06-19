# Cognitive-Load Audit — Credential setup screen

> Run 2026-06-19. Target = the n8n credential config for `FedexTrackOAuth2Api` /
> `FedexShippingOAuth2Api`. This is the first-run gate: a user who can't configure a
> credential never reaches a single operation.

## Reconstructed screen

Both classes `extends ['oAuth2Api']` and hide Grant Type / Access Token URL / Scope /
Auth params, so the user sees a short 3-field form:

> **Environment** (Sandbox/Production, default Sandbox) · **Client ID** (text) ·
> **Client Secret** (password)

Short is good. The problems are conceptual, not volume.

## 1. Extraneous Load Found

- **Credential display names carry jargon noise.** `FedEx Track OAuth2 API` /
  `FedEx Shipping OAuth2 API` — the "OAuth2 API" suffix is meaningless to the end user; the
  load-bearing words are "Track" and "Shipping." Follows n8n convention, so low priority.
- **`Environment` description is slightly abstract** — "...so a half-configured connection
  cannot hit a live account" makes the user picture a failure mode instead of the action.

## 2. Mental Model Gaps (the real damage)

- **Label mismatch: "Client ID / Client Secret" vs. FedEx's "API Key / Secret Key."** Highest-
  cost issue on the onboarding path. The user has the FedEx portal open showing **API Key** and
  **Secret Key** and an n8n form asking for **Client ID** and **Client Secret**, with no on-
  screen confirmation they're the same thing. CLAUDE.md documents this mapping; the user never
  sees it.
- **No signal that two separate credentials with two separate key pairs are required.** A
  first-timer expects one "FedEx" credential, creates Track, then Get Rates fails demanding a
  credential they didn't make. Reusing the *same* API Key for the Shipping credential yields
  silent **403s** (disjoint entitlements, ADR-0004) with nothing explaining why.

## 3. Offloading Opportunities (ranked)

1. **Relabel `Client ID` → "API Key" and `Client Secret` → "Secret Key"** (or, if overriding
   inherited fields is risky, add a `notice` mapping them). Removes the term-translation step.
2. **Add a `notice`** stating which FedEx project the keys come from and that Track and Shipping
   use different keys. Pre-empts the 403 dead-end.
3. **Confirm `documentationUrl` (`#credentials`) anchor exists** in the README and walks through
   getting keys. If it's a dead anchor, the form's only built-in help is broken.

## 4. Priority Recommendations

| # | Change | Cost removed | Impact |
|---|--------|--------------|--------|
| 1 | Relabel Client ID/Secret to **API Key / Secret Key** in both credentials (verify the inherited-field override doesn't break the OAuth flow; fall back to a `notice` if it does). | The FedEx-portal → n8n term-translation tax on every new user | High |
| 2 | Add a `notice` to each credential: which FedEx project the keys come from + "Track and Shipping need separate keys." | The silent-403 reuse trap and the "why do I need two?" stall | Med–High |
| 3 | Verify/repair the `#credentials` README anchor with a get-your-keys walkthrough. | Makes the form's only built-in help actually deliver | Medium |
| 4 | Tighten `Environment` copy: "Defaults to **Sandbox** for safe testing. Switch to **Production** to bill your live account." | Front-loads the action over the failure mode | Low |

## What NOT to touch

- The two-credential split — intrinsic to FedEx's per-project entitlements (ADR-0004). Don't
  merge them; explain them.
- Sandbox-as-default — an honest default that keeps an unconfigured connection off a live
  account. Keep it.
