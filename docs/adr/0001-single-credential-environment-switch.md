# Single credential with an Environment switch for sandbox vs production

> **Status (updated 2026-06-15): partially superseded by [ADR-0004](0004-resources-mirror-fedex-projects.md).**
> The "single credential type" decision below no longer holds — FedEx issues disjoint per-project
> entitlements, so the node now ships **two** credential types (`fedexTrackOAuth2Api` and
> `fedexShippingOAuth2Api`), not the one `fedexOAuth2Api` described here. **The Environment switch
> mechanism in this ADR is still in force**: both credentials share it via
> `FEDEX_OAUTH2_PROPERTIES` / `FEDEX_TEST_BASE_URL` in `credentials/fedexOAuth2Shared.ts`, so the
> token URL and the API base URL still derive from one `environment` dropdown (default `sandbox`)
> and can never split hosts. Read the rest of this ADR for the Environment-switch rationale only;
> read ADR-0004 for the credential model.

FedEx exposes separate hosts for sandbox (`apis-sandbox.fedex.com`) and production
(`apis.fedex.com`), and both the OAuth token URL and every API base URL must target the same one.
We use **one** credential type (`fedexOAuth2Api`, extending n8n's `oAuth2Api` with
`grantType: clientCredentials`) carrying a single visible **Environment** dropdown
(`sandbox | production`) that **defaults to sandbox**. The credential's `accessTokenUrl` derives
from that field via a `$self` expression, and the node's request base URL derives from
`$credentials.environment`, so the token exchange and the API calls can never target different
environments.

## Considered Options

- **Two credential types** (sandbox + production): simpler to implement, but the user maintains two
  credentials and can mis-wire a node to the wrong one — and there is no single source of truth.
- **Environment as a node parameter**: rejected — the OAuth token exchange happens at the credential
  layer, which would not see a node-level field, so the token could be fetched from the wrong host.

## Consequences

- Defaulting to sandbox makes a half-configured node fail safe (it cannot accidentally hit a live
  account), satisfying spec SC-006.
- Relies on n8n evaluating expressions in `accessTokenUrl` (via `$self`) and in the node's
  `baseURL` (via `$credentials`). **Both confirmed against first-party n8n-nodes-base code**, so the
  two-credential fallback is no longer needed:
  - `SalesforceOAuth2Api` `extends ['oAuth2Api']`, has an `environment` options field, and sets
    `accessTokenUrl: '={{ $self["environment"] === "sandbox" ? <sandbox token URL> : <prod token URL> }}'`
    — proving n8n's core OAuth2 token fetch resolves `$self` expressions. (Salesforce defaults to
    production; we default to **sandbox** as a deliberate fail-safe for a money/label API.)
  - The declarative `Npm` node sets `requestDefaults.baseURL: '={{ $credentials.registryUrl }}'` —
    proving `requestDefaults.baseURL` resolves `$credentials`. Ours becomes
    `={{ $credentials.environment === "sandbox" ? "https://apis-sandbox.fedex.com" : "https://apis.fedex.com" }}`.
