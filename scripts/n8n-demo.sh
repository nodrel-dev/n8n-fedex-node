#!/usr/bin/env bash
#
# n8n-demo.sh — spin up a throwaway local n8n in Docker for testing / recording
# the FedEx community node. Install the node from npm via the n8n UI once it's up.
#
# Usage:
#   ./scripts/n8n-demo.sh up        # create + start the instance (idempotent)
#   ./scripts/n8n-demo.sh open      # print/open the URL
#   ./scripts/n8n-demo.sh logs      # tail logs
#   ./scripts/n8n-demo.sh stop      # stop (data persists)
#   ./scripts/n8n-demo.sh start     # resume after stop
#   ./scripts/n8n-demo.sh status    # show container + volume state
#   ./scripts/n8n-demo.sh reset     # remove container + volume (fresh "install from npm" take)
#
set -euo pipefail

NAME="${N8N_DEMO_NAME:-n8n-fedex}"
PORT="${N8N_DEMO_PORT:-5678}"
VOLUME="${N8N_DEMO_VOLUME:-n8n_fedex_demo}"
IMAGE="${N8N_DEMO_IMAGE:-docker.n8n.io/n8nio/n8n}"
URL="http://localhost:${PORT}"

die() { echo "✖ $*" >&2; exit 1; }
need_docker() {
  command -v docker >/dev/null 2>&1 || die "Docker not found. Install Docker Desktop."
  docker info >/dev/null 2>&1 || die "Docker daemon not running. Start Docker Desktop."
}
container_exists() { docker ps -a --format '{{.Names}}' | grep -qx "$NAME"; }
container_running() { docker ps --format '{{.Names}}' | grep -qx "$NAME"; }

cmd_up() {
  need_docker
  if container_running; then echo "✓ '$NAME' already running → $URL"; return; fi
  if container_exists; then echo "↻ starting existing '$NAME'…"; docker start "$NAME" >/dev/null; print_ready; return; fi

  echo "⬆ creating '$NAME' on port $PORT (volume: $VOLUME)…"
  docker volume create "$VOLUME" >/dev/null
  docker run -d --name "$NAME" \
    -p "${PORT}:5678" \
    -v "${VOLUME}:/home/node/.n8n" \
    -e N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true \
    "$IMAGE" >/dev/null
  print_ready
}

print_ready() {
  cat <<EOF
✓ n8n is starting → $URL  (first boot ~10-20s; 'logs' to watch)

Next:
  1. Open $URL and create the owner account (first run only).
  2. Settings → Community Nodes → Install → @nodrel-dev/n8n-nodes-fedex (confirm 0.1.2).
  3. Follow docs/manual-review-video-script.md.

Note: N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true is set, so the FedEx
node can be used as an AI-Agent tool (required for the video's step 5).
EOF
}

cmd_open()   { command -v open >/dev/null 2>&1 && open "$URL" || echo "$URL"; }
cmd_logs()   { need_docker; docker logs -f "$NAME"; }
cmd_stop()   { need_docker; docker stop "$NAME" >/dev/null && echo "■ stopped '$NAME' (data kept in volume '$VOLUME')"; }
cmd_start()  { need_docker; docker start "$NAME" >/dev/null && print_ready; }
cmd_status() {
  need_docker
  echo "container: $(container_running && echo running || { container_exists && echo stopped || echo absent; })"
  echo "volume:    $(docker volume ls --format '{{.Name}}' | grep -qx "$VOLUME" && echo "$VOLUME (present)" || echo absent)"
  echo "url:       $URL"
}
cmd_reset() {
  need_docker
  docker rm -f "$NAME" >/dev/null 2>&1 || true
  docker volume rm "$VOLUME" >/dev/null 2>&1 || true
  echo "🗑 removed container + volume — next 'up' is a clean instance."
}

case "${1:-}" in
  up)     cmd_up ;;
  open)   cmd_open ;;
  logs)   cmd_logs ;;
  stop)   cmd_stop ;;
  start)  cmd_start ;;
  status) cmd_status ;;
  reset)  cmd_reset ;;
  *) echo "usage: $0 {up|open|logs|stop|start|status|reset}"; exit 1 ;;
esac
