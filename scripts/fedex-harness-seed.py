#!/usr/bin/env python3
"""Seed the FedEx test harness: log in, (re)create both sandbox credentials from .env.local,
and (re)create the four test workflows. Idempotent — deletes any existing harness objects by
name first, so re-running always yields a clean, known set. Invoked by fedex-test-harness.sh."""
import json
import os
import urllib.error
import urllib.request

BASE = os.environ["HARNESS_BASE"]
EMAIL = os.environ["HARNESS_EMAIL"]
PASSWORD = os.environ["HARNESS_PASSWORD"]
ENV_FILE = os.environ["HARNESS_ENV_FILE"]

# Sandbox account + canonical test inputs proven to return real data against apis-sandbox.fedex.com.
ACCOUNT = "130125136"
SHIPPER = {
    "shipperStreetLines": "3610 Hacks Cross Rd", "shipperCity": "Memphis",
    "shipperStateOrProvinceCode": "TN", "shipperPostalCode": "38125", "shipperCountryCode": "US",
    "shipperPersonName": "Test Shipper", "shipperPhoneNumber": "9015551234",
}
RECIPIENT = {
    "recipientStreetLines": "1600 Amphitheatre Pkwy", "recipientCity": "Mountain View",
    "recipientStateOrProvinceCode": "CA", "recipientPostalCode": "94043", "recipientCountryCode": "US",
    "recipientPersonName": "Test Recipient", "recipientPhoneNumber": "6505551234",
}

SHIP_CRED_NAME = "FedEx Shipping — Sandbox (harness)"
TRACK_CRED_NAME = "FedEx Track — Sandbox (harness)"

_cookie = None


def _load_env():
    env = {}
    with open(ENV_FILE) as fh:
        for line in fh:
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                env[k] = v
    for key in ("TRACK_API_CLIENT", "TRACK_API_SECRET", "SHIP_API_CLIENT", "SHIP_API_SECRET"):
        if not env.get(key):
            raise SystemExit(f"✖ {key} missing from {ENV_FILE}")
    return env


def call(method, path, data=None):
    global _cookie
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(BASE + path, data=body, method=method)
    req.add_header("Content-Type", "application/json")
    if _cookie:
        req.add_header("Cookie", _cookie)
    try:
        resp = urllib.request.urlopen(req)
        sc = resp.headers.get_all("Set-Cookie")
        if sc:
            _cookie = "; ".join(c.split(";")[0] for c in sc)
        raw = resp.read().decode() or "{}"
        return resp.status, json.loads(raw)
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode()[:200]


def login():
    # n8n restarts (install step) flip /healthz to 200 before REST routes are mounted, so
    # /rest/login can briefly 404/401 — retry past that race.
    import time
    last = None
    for _ in range(30):
        sc, _r = call("POST", "/rest/login", {"emailOrLdapLoginId": EMAIL, "password": PASSWORD})
        if sc == 200:
            return
        last = sc
        time.sleep(1)
    raise SystemExit(f"✖ login failed (last={last}) — is the owner seeded?")


def delete_existing(names):
    """Remove any credentials/workflows whose name is in `names` so re-seeding is clean."""
    _, creds = call("GET", "/rest/credentials")
    for c in creds.get("data", []) if isinstance(creds, dict) else []:
        if c["name"] in names:
            call("DELETE", f"/rest/credentials/{c['id']}")
    _, wfs = call("GET", "/rest/workflows")
    for w in wfs.get("data", []) if isinstance(wfs, dict) else []:
        if w["name"] in names:
            # n8n 2.x requires a workflow be archived before it can be deleted.
            call("POST", f"/rest/workflows/{w['id']}/archive")
            call("DELETE", f"/rest/workflows/{w['id']}")


def make_cred(name, ctype, client_id, secret):
    data = {
        "environment": "sandbox", "clientId": client_id, "clientSecret": secret,
        "grantType": "clientCredentials",
        "accessTokenUrl": "https://apis-sandbox.fedex.com/oauth/token",
        "scope": "", "authQueryParameters": "", "authentication": "body",
    }
    sc, r = call("POST", "/rest/credentials", {"name": name, "type": ctype, "data": data})
    if sc != 200:
        raise SystemExit(f"✖ credential '{name}' failed ({sc}): {r}")
    print(f"  ✓ credential: {name}")
    return r["data"]["id"]


def fedex_node(params, cred_type, cred_id, cred_name):
    return {
        "parameters": params, "id": "b2222222-2222-2222-2222-222222222222", "name": "FedEx",
        "type": "@nodrel-dev/n8n-nodes-fedex.fedex", "typeVersion": 1, "position": [560, 300],
        "credentials": {cred_type: {"id": cred_id, "name": cred_name}},
    }


def make_workflow(name, node):
    trigger = {
        "parameters": {}, "id": "a1111111-1111-1111-1111-111111111111",
        "name": "When clicking 'Test workflow'", "type": "n8n-nodes-base.manualTrigger",
        "typeVersion": 1, "position": [300, 300],
    }
    body = {
        "name": name, "nodes": [trigger, node],
        "connections": {"When clicking 'Test workflow'": {"main": [[{"node": "FedEx", "type": "main", "index": 0}]]}},
        "settings": {"executionOrder": "v1"},
    }
    sc, r = call("POST", "/rest/workflows", body)
    if sc != 200:
        raise SystemExit(f"✖ workflow '{name}' failed ({sc}): {r}")
    print(f"  ✓ workflow:   {name}  → {BASE}/workflow/{r['data']['id']}")


def main():
    env = _load_env()
    login()
    delete_existing({SHIP_CRED_NAME, TRACK_CRED_NAME,
                     "FedEx 1 — Track shipment", "FedEx 2 — Validate address",
                     "FedEx 3 — Get rates", "FedEx 4 — Create shipment + label"})

    ship_id = make_cred(SHIP_CRED_NAME, "fedexShippingOAuth2Api",
                        env["SHIP_API_CLIENT"], env["SHIP_API_SECRET"])
    track_id = make_cred(TRACK_CRED_NAME, "fedexTrackOAuth2Api",
                         env["TRACK_API_CLIENT"], env["TRACK_API_SECRET"])

    make_workflow("FedEx 1 — Track shipment", fedex_node(
        {"resource": "tracking", "operation": "track", "authentication": "fedexTrackOAuth2Api",
         "trackingMultiple": False, "trackingNumber": "123456789012", "includeDetailedScans": True},
        "fedexTrackOAuth2Api", track_id, TRACK_CRED_NAME))

    make_workflow("FedEx 2 — Validate address", fedex_node(
        {"resource": "shipping", "operation": "validate", "authentication": "fedexShippingOAuth2Api",
         "addressStreetLines": "7372 PARKRIDGE BLVD", "addressCity": "IRVING",
         "addressStateOrProvinceCode": "TX", "addressPostalCode": "75063", "addressCountryCode": "US"},
        "fedexShippingOAuth2Api", ship_id, SHIP_CRED_NAME))

    make_workflow("FedEx 3 — Get rates", fedex_node(
        {"resource": "shipping", "operation": "getRates", "authentication": "fedexShippingOAuth2Api",
         "shippingAccountNumber": ACCOUNT, **SHIPPER, **RECIPIENT,
         "serviceType": "", "packageWeight": 5, "weightUnit": "LB", "additionalFields": {}},
        "fedexShippingOAuth2Api", ship_id, SHIP_CRED_NAME))

    make_workflow("FedEx 4 — Create shipment + label", fedex_node(
        {"resource": "shipping", "operation": "create", "authentication": "fedexShippingOAuth2Api",
         "shippingAccountNumber": ACCOUNT, **SHIPPER, **RECIPIENT, "serviceType": "FEDEX_GROUND",
         "packageWeight": 5, "weightUnit": "LB", "labelImageType": "PDF", "additionalFields": {}},
        "fedexShippingOAuth2Api", ship_id, SHIP_CRED_NAME))


if __name__ == "__main__":
    main()
