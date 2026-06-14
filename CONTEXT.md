# n8n-nodes-fedex

A community n8n node that talks directly to the FedEx REST API so a business can use its own
FedEx account and negotiated rates with no aggregator in between.

## Language

### Operations & resources

**Shipment**:
The noun for the three shipment verbs — **Track** (status of an existing shipment by tracking
number), **Get Rates** (price a prospective shipment), and **Create** (buy a shipment and get a
label). One of the node's two resources.
_Avoid_: parcel, package (a Shipment may contain a package but is not one), order

**Address**:
The node's second resource, exposing **Validate** — standardize an address and classify it
residential vs commercial. Independent of any Shipment.
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
  hold all four, and each project issues its own App Credentials. n8n supports multiple
  credentials of one type, so the user makes two `fedexOAuth2Api` credentials and selects the
  right one per node — Track on Track nodes, the shipping credential on Get Rates / Create /
  Validate. No code impact; documented in the README.
- **Ship label certification (production only).** Before FedEx authorizes *production* credentials
  to transmit live label transactions, the **Create** operation's sample labels must pass the
  FedEx Bar Code Analysis group review (~3 business-day turnaround, approval is per project).
  Sandbox label creation works immediately. Track / Get Rates / Validate are exempt.

## Sandbox verification (2026-06-14)

All four operations confirmed against `apis-sandbox.fedex.com` with the node's exact request
shapes: OAuth `client_credentials` token (scope `CXS`) ✓, Track ✓, Validate ✓ (one transient
FedEx 500 then 200), Get Rates ✓ (negotiated ACCOUNT rate + transit times), Create ✓
(`output.transactionShipments[].pieceResponses[].packageDocuments[].encodedLabel` present with a
master tracking number — the path `extractLabel` reads).
