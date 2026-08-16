# FedEx node — manual sandbox test guide

Step-by-step by-hand verification of all four operations against the FedEx **sandbox**, plus the
three NDV UX fixes from this session. Every workflow below is **already loaded** in the local n8n
test container with working sandbox credentials attached — you only need to open each and click
**Test workflow**.

> **Credentials:** the two credentials are seeded from sandbox API keys in `.env.local` (Track +
> Ship). They are **sandbox-only** and live only in this local container — never commit them.
> Both pass n8n's "Connection successful!" test. Sandbox is free; nothing here bills a real account.

## One command to start (or rebuild) the harness

```bash
./scripts/fedex-test-harness.sh up
```

This is fully automated and idempotent — it boots the container, **auto-creates the login for you**,
builds + installs this repo's node, and seeds the two credentials + four workflows. Re-run it
anytime to reset to a clean, known set (e.g. after editing the node). Other commands:
`login` (print URL + login), `status`, `logs`, `reset` (wipe and start clean).

## Open the editor

- URL: <http://localhost:5690>
- Login: **`admin@fedex.test`** / **`FedexTest123`** (created automatically by the harness)
- The four workflows appear in the workflow list as **FedEx 1–4**. Credentials already attached:
  - *FedEx Track — Sandbox (harness)* → Track
  - *FedEx Shipping — Sandbox (harness)* → Validate / Get Rates / Create

To run any workflow: open it → click **Test workflow** (bottom center) → click the **FedEx** node
to inspect output. Binary labels appear under the node's **Binary** output tab.

If you ever need to re-import: the JSON files are in `docs/test-workflows/fedex-*.json`
(Workflow menu → *Import from File*). Re-attach the credential after importing if prompted.

---

## Test 1 — Track shipment  (read-only, no account needed)

**Workflow:** `FedEx 1 — Track shipment`  ·  **Credential:** Track

| Field | Value |
|-------|-------|
| Resource | **Tracking** |
| Operation | **Track** |
| Track Multiple Numbers | **off** |
| Tracking Number | **`123456789012`** |
| Include Detailed Scans | **on** |

**Steps:** open → **Test workflow** → inspect FedEx node output.
**Expected:** JSON with `trackResults[0].latestStatusDetail.description = "Ready for pickup"`.

**Other sandbox tracking numbers to try** (swap into Tracking Number):
- `122816215025810` → **Delivered**
- `020207021381215` → **Picked up**

**Multi-number variant:** set *Track Multiple Numbers* **on**, then in *Tracking Numbers* enter
(one per line):

```text
123456789012
122816215025810
```
Expected: two result blocks, one per number.

---

## Test 2 — Validate address  (no account needed)

**Workflow:** `FedEx 2 — Validate address`  ·  **Credential:** Shipping

| Field | Value |
|-------|-------|
| Resource | **Shipping** |
| Operation | **Validate an address** |
| Street Lines | **`7372 PARKRIDGE BLVD`** |
| City | **`IRVING`** |
| State/Province Code | **`TX`** |
| Postal Code | **`75063`** |
| Country | **United States** (`US`) |

**Steps:** open → **Test workflow** → inspect output.
**Expected:** `resolvedAddresses[0]` echoing a standardized address with classification/attributes.
✅ **UX fix check:** the **Country** field is a dropdown (was free text) defaulting to *United States*.

---

## Test 3 — Get rates  (needs sandbox account)

**Workflow:** `FedEx 3 — Get rates`  ·  **Credential:** Shipping

| Field | Value |
|-------|-------|
| Resource | **Shipping** |
| Operation | **Get rates** |
| Shipping Account Number | **`130125136`** |
| Shipper Street Lines | **`3610 Hacks Cross Rd`** |
| Shipper City / State / Postal / Country | **Memphis / TN / 38125 / US** |
| Shipper Contact Name / Phone | **Test Shipper / 9015551234** |
| Recipient Street Lines | **`1600 Amphitheatre Pkwy`** |
| Recipient City / State / Postal / Country | **Mountain View / CA / 94043 / US** |
| Recipient Contact Name / Phone | **Test Recipient / 6505551234** |
| Service Type | **All Available Services** (leave blank) |
| Package Weight / Unit | **5 / LB** |

**Steps:** open → **Test workflow** → inspect output.
**Expected:** multiple `rateReplyDetails` — e.g. `FEDEX_GROUND`, `FEDEX_2_DAY`, `PRIORITY_OVERNIGHT`,
`FIRST_OVERNIGHT`, `FEDEX_EXPRESS_SAVER` — each with rated charges.

---

## Test 4 — Create shipment + label  (needs sandbox account; produces a label)

**Workflow:** `FedEx 4 — Create shipment + label`  ·  **Credential:** Shipping

Same shipper/recipient as Test 3, plus:

| Field | Value |
|-------|-------|
| Operation | **Create a shipment and label** |
| Shipping Account Number | **`130125136`** |
| Service Type | **FedEx Ground** (`FEDEX_GROUND`) |
| Package Weight / Unit | **5 / LB** |
| Label Format | **PDF** |

**Steps:** open → **Test workflow** → inspect output.
**Expected:**
- Main output JSON: a real `trackingNumber` (e.g. `7948…`) + rate/shipment detail.
- **Binary** tab: a `label` file — open/download it; a valid 4×6 PDF shipping label renders.

### UX-fix checks on the Create panel (do these before clicking Test)

1. **One yellow notice, not two (Rec #1).** At the top of the Create parameters you should see a
   **single** yellow block: *"Running this operation books a real FedEx shipment and bills the
   Shipping Account below — free in Sandbox, charged in Production. It needs a **FedEx Shipping
   OAuth2 API** credential; a Track credential will not work here."* The old separate
   credential-fit notice is gone from Create. (Open Test 2 or 3 to confirm that standalone
   credential notice still appears on Validate / Get Rates.)
2. **Node warning copy (Minor #1).** The output pane (before execution) shows the shortened
   *"Create books a real, billable FedEx shipment (free in Sandbox)."* — no longer truncated.
3. **Phone hint vs tooltip (Minor #2).** Under **Shipper/Recipient Phone Number**, the inline hint
   stays terse ("FedEx requires a phone number for the shipment contact"), while hovering the field
   label shows the longer tooltip explaining *why* (delivery exceptions / customs contact).

---

## Quick negative test (optional)

To see the node surface a real FedEx error via `NodeApiError`: in Test 4, blank out the
**Shipping Account Number** and run — FedEx returns a validation error and the node reports the
`errors[].message`. Restore `130125136` afterward.

## Teardown

The container persists across restarts. To remove it entirely:
```bash
docker rm -f n8n-fedex-uxtest
```
