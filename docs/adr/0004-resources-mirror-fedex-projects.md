# Resources mirror FedEx dev-portal projects (Tracking vs Shipping)

FedEx provisions APIs in **projects**, and each project issues its own API Key / Secret Key
(client_id / client_secret). The entitlements are **disjoint**: a token minted for one project
returns HTTP 403 on another project's endpoints. Two projects matter for this node:

- **Track project** — the Track API alone. Its own client_id/secret.
- **Shipping project** — bundles the Rate (Rates and Transit Times), Ship, and Address Validation
  APIs (plus Pickup, Consolidation, Locations, Postal Code Validation) behind a **single**
  client_id/secret. Confirmed in the dev portal: enabling the shipping project lights up all of
  these together under one credential.

This split supersedes ADR-0001's "one credential" assumption: the single-host Environment switch
from ADR-0001 still applies, but there are now **two** credential types, not one.

## Decision

Model the node so **each resource maps 1:1 to a FedEx project and binds that project's credential**:

| Resource     | Operations                                   | Credential               | FedEx project |
| ------------ | -------------------------------------------- | ------------------------ | ------------- |
| **Tracking** | Track                                        | `fedexTrackOAuth2Api`    | Track         |
| **Shipping** | Get Rates, Create, Validate                  | `fedexShippingOAuth2Api` | Shipping      |

Credentials are selected by a hidden **`authentication`** parameter whose value (the credential
name, `fedexTrackOAuth2Api` / `fedexShippingOAuth2Api`) is derived from `operation` via
per-operation `displayOptions` defaults. The credentials are gated on
`displayOptions.show.authentication`, not on `operation` directly. Each credential carries its
**own** `test` request against an endpoint it is actually entitled to call
(Track → `/track/v1/trackingnumbers`; Shipping → `/address/v1/addresses/resolve`, which needs no
account number), so a wrong key fails the credential test instead of failing later mid-workflow.

> **Why `authentication`, not `operation` (ADR amendment, 0.2.1).** The node originally gated the
> two credentials directly on `displayOptions.show.operation`. That works for normal execution but
> **breaks when the node runs as an AI-Agent tool**: n8n's declarative routing engine
> (`routing-node` `prepareCredentials`) disambiguates among 2+ credentials by reading a parameter
> *literally named* `authentication` and matching each credential's
> `displayOptions.show.authentication`. With no such parameter, the tool-execution path threw
> `Could not get parameter: authentication` (the agent then retried to max iterations). The fix
> adds a hidden `authentication` parameter, derived from `operation`, so the value resolves
> automatically on both the normal and tool paths with no manual auth pick. The `operation` values
> are still globally unique; `authentication` is purely the routing engine's required discriminator.

## Considered Options

- **One resource ("Shipment") holding Track + Get Rates + Create, plus a separate "Address"
  resource** (the original layout): rejected. It put Track — which needs the Track credential —
  in the same resource as operations needing the Shipping credential, so the required credential
  silently changed between operations within one resource. The resource boundary cut across the
  credential/project boundary, which is confusing and misrepresents how FedEx issues access.
- **Three resources (Tracking / Shipment / Address)**: keeps noun-pure names, but splits the one
  Shipping project across two resources for no functional gain. Rejected in favor of the 1:1:1
  mapping, which makes "which key does this need" obvious from the resource alone.

## Consequences

- A user who only has Track access selects the **Tracking** resource and needs only the Track
  credential; everything under **Shipping** needs the shipping credential. No operation in a
  resource ever needs a different key than its siblings.
- `nodes/Fedex/resources/` has one folder per resource: `tracking/` (Track) and `shipping/`
  (Get Rates, Create, Validate). Resource = folder, operation = file.
- This renamed the `resource` parameter values (`shipment`/`address` → `tracking`/`shipping`).
  Done pre-verification/pre-adoption, so the break is acceptable; operation values are unchanged,
  so routing and credential binding are unaffected.
