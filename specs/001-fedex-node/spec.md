# Feature Specification: FedEx Community Node

**Feature Branch**: `001-fedex-node`

**Created**: 2026-06-13

**Status**: Draft

**Input**: Build brief: "A publishable n8n community node (`n8n-nodes-fedex`) that talks directly to
the FedEx REST API — no aggregator middleman — exposing Track shipment, Validate address, Get
rates, and Create shipment/label, authenticated with the user's own FedEx account."

## Clarifications

### Session 2026-06-13

- Q: For v1 Create shipment, what package scope should it support? → A: Single-package only — one
  package per shipment yielding one label and one tracking number; multi-package deferred to v2.
- Q: For v1 Get rates and Create shipment, which shipment geography is in scope? → A: Domestic only
  — no customs/commodity data required; international Rate/Ship deferred to v2. Track and Validate
  address remain usable for any address.
- Q: What price(s) should Get rates surface? → A: Both the account's negotiated rate and FedEx's
  standard list rate per service, when FedEx returns both, so users see their discount.
- Q: For v1 Create shipment, who pays the freight (billing model)? → A: Hardcode
  `paymentType: SENDER` — the shipment always bills the configured Shipping Account; no payment UI
  and no payor block. RECIPIENT / THIRD_PARTY (and their required payor.responsibleParty surface)
  and COLLECT are deferred to v2.
- Q: For Track, what input cardinality should v1 support? → A: Both — a single tracking-number
  field plus an optional "multiple" mode that accepts a list and batches it into one FedEx call.
  Per-item failures are still reported individually under Continue-On-Fail.
- Q: For Track, how much scan detail should be returned? → A: Detailed scan history by default,
  with a toggle to opt out for a lighter status-only response.
- Q: For Get Rates and Create shipment, are package dimensions required? → A: Package weight is
  required; dimensions are optional for both operations (FedEx rates/ships on weight alone;
  dimensions refine dimensional-weight pricing when supplied).
- Q: What measurement units should weight and dimensions use? → A: Expose a weight-unit selector
  (default LB, KG option) and a dimension-unit selector (default IN, CM option), rather than
  hardcoding US units.
- Q: What shape should the Get Rates output take? → A: A flattened result with one item per
  available service, each carrying the service, its Negotiated Rate, and its List Rate (when FedEx
  returns it) plus currency — not FedEx's raw nested `rateReplyDetails` / `rateType` array, so the
  discount is readable without the caller walking FedEx's taxonomy.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Track a shipment using my own FedEx account (Priority: P1)

A logistics operator building an automation connects their existing FedEx account to the node,
then looks up the current status of a parcel by its tracking number so a downstream workflow step
can act on whether it is in transit, delivered, or exception.

**Why this priority**: Tracking is read-only and the simplest operation, so it is the fastest path
to a working, demonstrable node. Crucially, it exercises the full account-connection and request
chain end to end — proving the credential works before any money operation depends on it. This is
the MVP slice: connect an account + get a real answer back from FedEx.

**Independent Test**: With a valid FedEx account connected, run the node against a known FedEx
sandbox tracking number and confirm the workflow receives the shipment's status and scan history.
A bad/expired connection or unknown tracking number returns a clear, actionable message.

**Acceptance Scenarios**:

1. **Given** a connected FedEx account and a valid tracking number, **When** the operator runs the
   Track operation, **Then** the workflow receives the shipment's latest status and tracking detail.
2. **Given** a connected account and an unknown or malformed tracking number, **When** Track runs,
   **Then** the operator sees the specific reason FedEx rejected it, not a generic failure.
3. **Given** an account that has not been connected or whose connection is invalid, **When** any
   operation runs, **Then** the operator is told the connection is the problem and how to fix it.
4. **Given** the operator has chosen the test/sandbox environment, **When** Track runs, **Then** the
   request goes to FedEx's sandbox and not to the live production account.
5. **Given** the operator enables the multiple-tracking-number mode and supplies a list, **When**
   Track runs, **Then** the workflow receives a status result for each number, and any individually
   unresolvable number is flagged without failing the rest.

---

### User Story 2 - Validate and correct a delivery address (Priority: P2)

Before generating a label or quoting a rate, the operator checks a recipient address to learn
whether it is deliverable, whether it is residential or commercial, and what the standardized/
corrected form is, so bad addresses are caught early.

**Why this priority**: Address validation is cheap, useful on its own, and improves the quality of
the rate and shipment operations that follow. It is low-risk and reinforces the request chain.

**Independent Test**: Submit a deliberately messy but real address and confirm the node returns a
classification (residential vs commercial) and a corrected/standardized version, plus a clear flag
when the address cannot be resolved.

**Acceptance Scenarios**:

1. **Given** a connected account and a resolvable address, **When** Validate address runs, **Then**
   the operator receives the standardized address and its residential/commercial classification.
2. **Given** an unresolvable or incomplete address, **When** Validate address runs, **Then** the
   operator receives an explicit indication that it could not be validated and why.

---

### User Story 3 - Get rate quotes for a shipment (Priority: P3)

The operator supplies shipment details (origin, destination, package weight/dimensions) and their
FedEx account number to receive available service options and the negotiated prices for each, so a
workflow can choose a service by cost or speed.

**Why this priority**: Rating delivers direct business value (their own negotiated prices, no
markup) and is a prerequisite mindset for shipping, but it requires more input fields than tracking
or validation, so it follows them.

**Independent Test**: With a connected account and a valid account number, request rates for a
defined origin/destination/parcel and confirm the node returns one or more service options each with
a price; a request missing the account number is rejected with a clear message.

**Acceptance Scenarios**:

1. **Given** a connected account, a valid account number, and complete shipment details, **When**
   Get rates runs, **Then** the operator receives a list of available services, each showing the
   account's negotiated price (and the list price where FedEx returns it).
2. **Given** a request with no account number supplied, **When** Get rates runs, **Then** the
   operator is told the account number is required before the request is sent.
3. **Given** shipment details FedEx considers invalid (e.g. impossible weight), **When** Get rates
   runs, **Then** the operator sees the specific validation reason returned by FedEx.

---

### User Story 4 - Create a shipment and get a printable label (Priority: P4)

The operator generates an actual shipping label by submitting shipment details and their account
number, selecting the label format (PDF, PNG, or thermal/ZPL), and receives a downloadable label
file plus the assigned tracking number, so a workflow can email, print, or store the label.

**Why this priority**: This is the highest-value "money" operation but also the most complex and
the one with real-world consequences (a created shipment). It depends on the patterns proven by the
earlier operations, so it is built and verified last.

**Independent Test**: With a connected account and valid account number, create a shipment in the
sandbox, choose a label format, and confirm the workflow receives a downloadable label file in the
chosen format (openable/printable) together with the tracking number — not an encoded text blob.

**Acceptance Scenarios**:

1. **Given** a connected account, a valid account number, and complete shipment details, **When**
   Create shipment runs, **Then** the operator receives the assigned tracking number and a label
   delivered as a downloadable file attachment.
2. **Given** the operator selects a label format (PDF / PNG / thermal), **When** Create shipment
   runs, **Then** the returned label file is in that format and named recognizably.
3. **Given** invalid or incomplete shipment details, **When** Create shipment runs, **Then** no
   shipment is created and the operator sees the specific FedEx validation reason.

---

### Edge Cases

- **Expired session**: the operator's authorization with FedEx lapses mid-use — the next operation
  must transparently re-establish it without the operator re-entering credentials.
- **Continue-on-fail batches**: when processing many items with "continue on fail" enabled, one
  failing item (e.g. one bad address) must not abort the whole run; failures are reported per item.
- **Sandbox vs production confusion**: the operator must always know, and be able to choose, which
  environment a request targets so a test does not hit the live account.
- **Sensitive data**: the account number and account keys must never appear hardcoded, logged in
  plain output, or shipped as defaults.
- **Large/zero results**: tracking a number with no events, or rating with no eligible services,
  returns an empty-but-clear result rather than an error.
- **Unsupported label format**: requesting a format FedEx does not support returns a clear message.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The node MUST let a user connect their own FedEx account by supplying their FedEx API
  credentials, and MUST authenticate every request as that account with no intermediary service.
- **FR-002**: The connection MUST let the user choose between a test (sandbox) and a production
  environment, and all requests MUST be routed to the chosen environment.
- **FR-003**: The connection MUST offer a "test connection" action that gives the user immediate
  pass/fail feedback on whether their credentials work.
- **FR-004**: The node MUST keep the authorization session alive across requests and renew it
  automatically when it expires, without requiring the user to re-enter credentials per request.
- **FR-005**: The node MUST provide a **Track shipment** operation that returns a shipment's status
  and tracking detail given a tracking number. The operation MUST accept a single tracking number
  and MUST also offer an optional mode that accepts a list of tracking numbers resolved in one
  request; either way, a result that cannot be resolved is reported per tracking number without
  failing the others. Track MUST return detailed scan history by default, and MUST expose a toggle
  to opt out of scan detail for a lighter status-only response.
- **FR-006**: The node MUST provide a **Validate address** operation that returns a standardized
  address and a residential/commercial classification, or a clear unresolved indication.
- **FR-007**: The node MUST provide a **Get rates** operation that returns available service options
  with their prices for supplied shipment details and account number. Each service option MUST
  surface the account's **negotiated rate** and, when FedEx also returns it, the standard **list
  rate**, so the user can see their discount. The operation MUST emit a **flattened** result — one
  item per available service, each carrying the service, its negotiated rate, its list rate (when
  returned), and currency — rather than passing through FedEx's raw nested rate structure. v1 covers
  **domestic shipments**; international rating (with customs/commodity data) is out of scope for v1.
- **FR-008**: The node MUST provide a **Create shipment** operation that returns the assigned
  tracking number and a shipping label. v1 supports a **single package per shipment** (one label,
  one tracking number) for **domestic shipments**; multi-package and international shipments (which
  require customs/commodity data) are out of scope for v1.
- **FR-008a**: For Create shipment, v1 MUST bill the shipment to the sender's configured Shipping
  Account (`paymentType: SENDER`) with no payment/payor user input. Billing the recipient or a third
  party (which requires a separate payor identity) is out of scope for v1.
- **FR-009**: For Create shipment, the user MUST be able to select the label format (at minimum PDF,
  PNG, and a thermal/ZPL option), and the label MUST be delivered as a downloadable file attachment
  in that format — never as an encoded text string embedded in the data output.
- **FR-010**: Operations that require an account number (Get rates, Create shipment) MUST obtain it
  from user-supplied configuration and MUST reject the request with a clear message if it is absent.
- **FR-011**: The node MUST never hardcode, default, or expose account numbers, API keys, or
  environment URLs in code or output; all such values come from the user's connection/configuration.
- **FR-012**: When FedEx returns an error, the node MUST surface FedEx's specific error message to
  the user, distinguishing input/validation problems from connection/authorization problems.
- **FR-013**: The node MUST honor the workflow's "continue on fail" setting, reporting per-item
  failures without aborting the entire run when that setting is enabled.
- **FR-014**: The node MUST validate user-supplied input at its boundary and fail fast with a clear
  message when required fields are missing or malformed, before contacting FedEx.
- **FR-014a**: For Get Rates and Create shipment, package **weight** MUST be required and package
  **dimensions** MUST be optional; when dimensions are supplied they are passed through to refine
  dimensional-weight pricing, and when omitted the request still proceeds on weight alone.
- **FR-014b**: The node MUST let the user select the weight unit (default **LB**, with **KG**) and
  the dimension unit (default **IN**, with **CM**) for Get Rates and Create shipment, and MUST send
  the selected units to FedEx rather than assuming fixed units.
- **FR-015**: The package MUST be installable from the public community registry as a community node
  and include the documentation a user needs to obtain FedEx credentials and use each operation.

### Key Entities *(include if feature involves data)*

- **FedEx Account Connection**: The user's credentials and environment choice (test/production) that
  authorize requests; sensitive; the basis of every operation.
- **Shipment Tracking Result**: Current status plus history/detail for a tracking number.
- **Address Validation Result**: A standardized address, a residential/commercial classification,
  and a resolvable/unresolvable indication.
- **Rate Quote**: A set of available service options, each with a service level, the account's
  negotiated price, and (when provided by FedEx) the standard list price for comparison.
- **Shipment / Label**: A created shipment carrying an assigned tracking number and a label file in
  a user-chosen format.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can connect their FedEx account and confirm it works (test action passes)
  without writing any code or editing configuration files.
- **SC-002**: All four operations return correct results when run against the FedEx sandbox using
  FedEx-published test tracking numbers and account numbers.
- **SC-003**: A user can track a shipment and read its status within one node run, with no separate
  manual authorization step after the account is connected.
- **SC-004**: A created shipment yields a label the user can open/print directly as a file in the
  format they selected, plus the tracking number, on the first successful attempt.
- **SC-005**: Every failed request shows the user the actual FedEx-provided reason, such that the
  user can correct the input or connection without external support.
- **SC-006**: A test request never reaches the production account, and a production request never
  silently runs against the sandbox — the targeted environment always matches the user's choice.
- **SC-007**: In a batch with "continue on fail" enabled, a single bad item is reported individually
  and the remaining items still process to completion.

## Assumptions

- The user already has, or can self-register for, a FedEx developer account and obtain API
  credentials; provisioning a FedEx account is outside this feature.
- The four listed operations define v1 scope. Pickup scheduling, void/cancel label, proof of
  delivery, freight/LTL, multi-package shipments, and international Rate/Ship (and the customs
  documentation it requires) are explicitly out of scope and noted as "planned" only. Track and
  Validate address are not geography-restricted.
- Verification is performed manually against the FedEx sandbox; FedEx publishes the sandbox tracking
  numbers and test account numbers used for that verification.
- The node targets the n8n workflow-automation environment and its credential/connection model;
  users interact with it as a node in their workflows, not via a separate UI.
- FedEx's negotiated pricing is tied to the user's own account, so rate amounts shown are whatever
  FedEx returns for that account, with no markup added by this node.
- One package equals one carrier (FedEx); a future UPS package is a separate effort, but patterns
  should remain reusable.
