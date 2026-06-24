#!/usr/bin/env bash
#
# fedex-test-harness.sh — one-command, fully-seeded local n8n for testing the FedEx node.
#
# Unlike n8n-demo.sh (which leaves owner-setup + node install + credentials to you), this
# harness does EVERYTHING automatically and idempotently:
#   • boots a persistent n8n container (pinned encryption key, so credentials survive restarts)
#   • auto-creates a PERMANENT owner login (no manual setup screen — see creds below)
#   • builds + packs THIS repo's node and installs it into the container
#   • seeds both FedEx sandbox credentials from .env.local
#   • loads the four test workflows (Track / Validate / Get Rates / Create)
#
# Permanent login (always created for you):
#   email:    admin@fedex.test
#   password: FedexTest123
#
# Usage:
#   ./scripts/fedex-test-harness.sh up       # provision everything (idempotent; re-run anytime)
#   ./scripts/fedex-test-harness.sh login    # print the URL + login + workflow links
#   ./scripts/fedex-test-harness.sh seed     # re-install node + re-seed creds/workflows only
#   ./scripts/fedex-test-harness.sh status   # container/volume state
#   ./scripts/fedex-test-harness.sh logs     # tail n8n logs
#   ./scripts/fedex-test-harness.sh reset    # remove container + volume (next 'up' is clean)
#
set -euo pipefail

# ── Permanent config (the login is fixed on purpose — never asked for again) ──────────────
OWNER_EMAIL="${HARNESS_EMAIL:-admin@fedex.test}"
OWNER_PASSWORD="${HARNESS_PASSWORD:-FedexTest123}"
OWNER_FIRST="FedEx"
OWNER_LAST="Admin"

NAME="${HARNESS_NAME:-n8n-fedex-uxtest}"
PORT="${HARNESS_PORT:-5690}"
VOLUME="${HARNESS_VOLUME:-n8n-fedex-uxdata}"
IMAGE="${HARNESS_IMAGE:-docker.n8n.io/n8nio/n8n}"
# Pinned so seeded credentials decrypt across restarts/recreation (dev-only key; sandbox creds).
ENC_KEY="${HARNESS_ENC_KEY:-fedex-harness-dev-encryption-key-0001}"

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$REPO_DIR/.env.local"
BASE="http://localhost:${PORT}"

die() { echo "✖ $*" >&2; exit 1; }
need_docker() {
  command -v docker >/dev/null 2>&1 || die "Docker not found. Install Docker Desktop."
  docker info >/dev/null 2>&1 || die "Docker daemon not running. Start Docker Desktop."
}
container_exists()  { docker ps -a --format '{{.Names}}' | grep -qx "$NAME"; }
container_running() { docker ps    --format '{{.Names}}' | grep -qx "$NAME"; }

wait_healthy() {
  echo -n "  waiting for n8n…"
  for _ in $(seq 1 60); do
    if [ "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/healthz" 2>/dev/null)" = "200" ]; then
      echo " ready"; return 0
    fi
    echo -n "."; sleep 1
  done
  die "n8n did not become healthy on $BASE"
}

ensure_container() {
  need_docker
  [ -f "$ENV_FILE" ] || die ".env.local not found — needs TRACK_API_CLIENT/SECRET + SHIP_API_CLIENT/SECRET"
  if container_running; then echo "✓ '$NAME' already running"; return; fi
  if container_exists; then echo "↻ starting existing '$NAME'…"; docker start "$NAME" >/dev/null; wait_healthy; return; fi
  echo "⬆ creating '$NAME' on port $PORT (volume $VOLUME)…"
  docker volume create "$VOLUME" >/dev/null
  docker run -d --name "$NAME" \
    -p "${PORT}:5678" \
    -v "${VOLUME}:/home/node/.n8n" \
    -e N8N_ENCRYPTION_KEY="$ENC_KEY" \
    -e N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true \
    -e N8N_DIAGNOSTICS_ENABLED=false \
    "$IMAGE" >/dev/null
  wait_healthy
}

seed_owner() {
  # /healthz flips to 200 before user-management is ready, so the first owner-setup can fail —
  # retry past that race (known n8n gotcha). Terminal states: setup 200 (created) or login 200
  # (owner already exists on a reused volume).
  local setup login
  for _ in $(seq 1 25); do
    setup=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/rest/owner/setup" \
      -H 'Content-Type: application/json' \
      --data "{\"email\":\"$OWNER_EMAIL\",\"firstName\":\"$OWNER_FIRST\",\"lastName\":\"$OWNER_LAST\",\"password\":\"$OWNER_PASSWORD\"}" || true)
    if [ "$setup" = "200" ]; then echo "✓ owner created: $OWNER_EMAIL"; return; fi
    login=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/rest/login" \
      -H 'Content-Type: application/json' \
      --data "{\"emailOrLdapLoginId\":\"$OWNER_EMAIL\",\"password\":\"$OWNER_PASSWORD\"}" || true)
    if [ "$login" = "200" ]; then echo "✓ owner already set up ($OWNER_EMAIL)"; return; fi
    sleep 1
  done
  die "owner setup did not succeed after retries (setup=$setup login=$login)"
}

install_node() {
  echo "🔧 building + packing the node…"
  # Clear stray *.tgz artifacts (incl. a directory Docker may auto-create from a dangling
  # bind-mount source) so npm pack can write its tarball.
  rm -rf "$REPO_DIR"/*.tgz 2>/dev/null || true
  ( cd "$REPO_DIR" && pnpm build >/dev/null 2>&1 ) || die "pnpm build failed"
  # npm prints the tarball name to stderr in some versions, so derive it deterministically from
  # package.json (npm's scoped-name convention: @scope/name → scope-name-<version>.tgz).
  local tgz; tgz=$(cd "$REPO_DIR" && python3 -c "import json;d=json.load(open('package.json'));print(d['name'].lstrip('@').replace('/','-')+'-'+d['version']+'.tgz')")
  ( cd "$REPO_DIR" && npm pack >/dev/null 2>&1 ) || die "npm pack failed"
  [ -f "$REPO_DIR/$tgz" ] || die "packed tarball not found: $tgz"
  local remote="/tmp/fedex-node-$(date +%s).tgz"
  docker cp "$REPO_DIR/$tgz" "$NAME:$remote" >/dev/null
  echo "📦 installing into container…"
  docker exec "$NAME" sh -c "mkdir -p ~/.n8n/nodes && cd ~/.n8n/nodes && npm install $remote >/dev/null 2>&1" \
    || die "node install failed inside container"
  rm -f "$REPO_DIR/$tgz"
  echo "↻ restarting n8n to load the node…"
  docker restart "$NAME" >/dev/null
  wait_healthy
}

seed_rest() {
  echo "🔑 seeding credentials + workflows…"
  HARNESS_BASE="$BASE" \
  HARNESS_EMAIL="$OWNER_EMAIL" HARNESS_PASSWORD="$OWNER_PASSWORD" \
  HARNESS_ENV_FILE="$ENV_FILE" \
  python3 "$REPO_DIR/scripts/fedex-harness-seed.py"
}

cmd_up()     { ensure_container; seed_owner; install_node; seed_rest; cmd_login; }
cmd_seed()   { ensure_container; seed_owner; install_node; seed_rest; cmd_login; }
cmd_login() {
  cat <<EOF

────────────────────────────────────────────────────────────
✓ FedEx test harness ready
  URL:      $BASE
  Email:    $OWNER_EMAIL
  Password: $OWNER_PASSWORD

  Open any "FedEx 1–4" workflow → click "Test workflow".
  Field values & expected results: docs/test-workflows/MANUAL-TEST-GUIDE.md
────────────────────────────────────────────────────────────
EOF
}
cmd_status() {
  need_docker
  echo "container: $(container_running && echo running || { container_exists && echo stopped || echo absent; })"
  echo "volume:    $(docker volume ls --format '{{.Name}}' | grep -qx "$VOLUME" && echo "$VOLUME (present)" || echo absent)"
  echo "url:       $BASE"
}
cmd_logs()  { need_docker; docker logs -f "$NAME"; }
cmd_reset() {
  need_docker
  docker rm -f "$NAME" >/dev/null 2>&1 || true
  docker volume rm "$VOLUME" >/dev/null 2>&1 || true
  echo "🗑 removed container + volume — next 'up' is a clean, fully-seeded instance."
}

case "${1:-}" in
  up)     cmd_up ;;
  seed)   cmd_seed ;;
  login)  cmd_login ;;
  status) cmd_status ;;
  logs)   cmd_logs ;;
  reset)  cmd_reset ;;
  *) echo "usage: $0 {up|seed|login|status|logs|reset}"; exit 1 ;;
esac
