# n8n-nodes-fedex

A community n8n node that talks directly to the FedEx REST API so a business can use its own
FedEx account and negotiated rates with no aggregator in between.

## Language

### Operations & resources

The node has **two resources**, named to mirror the two FedEx dev-portal projects (ADR-0004):
**Tracking** (the **Track** operation) and **Shipping** (the **Get Rates**, **Create**, and
**Validate** operations). The nouns below are the domain concepts the operations act on, not the
resource names.

**Shipment**:
The noun for the three shipment verbs — **Track** (status of an existing shipment by tracking
number), **Get Rates** (price a prospective shipment), and **Create** (buy a shipment and get a
label). Track lives under the **Tracking** resource; Get Rates and Create live under **Shipping**.
_Avoid_: parcel, package (a Shipment may contain a package but is not one), order

**Address**:
The thing **Validate** acts on — standardize an address and classify it residential vs commercial.
Validate lives under the **Shipping** resource (it shares the shipping project's credential), and is
independent of any Shipment.
_Avoid_: location, destination (those are roles an Address plays, not the term)

### Rates & labels

**Negotiated Rate**:
The price tied to the user's **Shipping Account** — their actual discounted cost. The node's whole
reason to exist; always surfaced by Get Rates.
_Avoid_: account rate, our rate, discounted rate (use "Negotiated Rate")

**List Rate**:
FedEx's standard published price for the same service, surfaced alongside the Negotiated Rate (when
FedEx returns it) so the user can see their discount. Never the only price shown.
_Avoid_: standard rate, retail rate, published rate (use "List Rate")

**Label**:
The printable shipping document produced by Create — emitted as n8n **binary** (PDF / PNG / thermal
ZPL), never a base64 string in JSON. Carries the tracking number.
_Avoid_: waybill, airbill, document

### Authentication & account

**App Credentials**:
The FedEx **API Key** and **Secret Key** that authenticate the *application* (the OAuth
`client_credentials` pair). They identify the software, not who is shipping.
_Avoid_: API account, login, FedEx account (when you mean the key/secret)

**Shipping Account**:
The FedEx **account number** that identifies *whose* negotiated rates apply and *who* a shipment is
billed to. Required for Get Rates and Create Shipment; irrelevant to Track and Validate Address.
Distinct from the App Credentials.
_Avoid_: account, FedEx account, customer account, account number (prefer "Shipping Account" in
prose; "account number" is fine when naming the literal field)

**Environment**:
Which FedEx host a request targets — **sandbox** (test) or **production** (live). A single
user-facing choice that governs both the OAuth token URL and the API base URL together.
_Avoid_: mode, stage, test/prod (as a schema name)

## External constraints (FedEx portal, not our code)

- **Two projects / two credentials.** The FedEx Developer Portal provisions the **Track API**
  separately from the shipping APIs (Rate, Ship, Address Validation); one project usually can't
  hold all four, and each project issues its own App Credentials. The node ships **two credential
  types** — `fedexTrackOAuth2Api` (Track) and `fedexShippingOAuth2Api` (Get Rates / Create /
  Validate) — and binds the right one per operation automatically (ADR-0004). Documented in the README.
- **Ship label certification (production only).** Before FedEx authorizes *production* credentials
  to transmit live label transactions, the **Create** operation's sample labels must pass the
  FedEx Bar Code Analysis group review (~3 business-day turnaround, approval is per project).
  Sandbox label creation works immediately. Track / Get Rates / Validate are exempt.

## Sandbox verification (2026-06-14)

All four operations confirmed against `apis-sandbox.fedex.com` with the node's exact request
shapes: OAuth `client_credentials` token (**no explicit scope** — FedEx returns `CXS-TP`) ✓,
Track ✓, Validate ✓ (one transient FedEx 500 then 200), Get Rates ✓ (negotiated ACCOUNT rate +
transit times), Create ✓
(`output.transactionShipments[].pieceResponses[].packageDocuments[].encodedLabel` present with a
master tracking number — the path `extractLabel` reads).

## Re-test through running n8n (2026-06-14)

Ran all four operations through the live `n8n-node dev` instance (not just the direct verify
script). This caught a real bug: the credential sent `scope: CXS`, which FedEx's token endpoint
rejects with HTTP 400 — the prior "confirmed" run had used a no-scope direct script, so the
through-n8n token exchange was never actually exercised. Fixed `scope` default to empty.

Entitlement note: sandbox keys are **per-project** — the Track key (`CXS-TP`) returns 403 on
Validate/Rate/Ship, and the Ship key returns 403 on Track. A workspace that uses all four
operations needs **separate credentials per operation group** (the node already supports
per-node credential selection). Verified: Track ✓ (track key), Validate ✓ / Get Rates ✓ (7
services) / Create ✓ (valid 7.4 kB PDF label binary, filename sanitized, no `encodedLabel` leak)
all on the ship key.
