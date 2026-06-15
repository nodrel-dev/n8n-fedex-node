# Architecture Decision Records

These ADRs capture the non-obvious decisions behind `n8n-nodes-fedex` and why the alternatives were
rejected. Each file is the durable record of one decision; later ADRs can supersede earlier ones.

For the synthesized picture, start with the [System Overview](../system-overview.md).

| ADR | Decision (one line) | Status |
| --- | ------------------- | ------ |
| [0001](0001-single-credential-environment-switch.md) | One `Environment` dropdown drives both the OAuth token URL and the API base URL together, defaulting to sandbox, so a request can never straddle sandbox and production. | Active for the environment switch; the "single credential" part is **partially superseded by 0004**. |
| [0002](0002-declarative-node-postreceive-label-binary.md) | Keep the node declarative and turn FedEx's base64 label into n8n binary data in a `postReceive` hook, rather than going fully programmatic. | Active |
| [0003](0003-pure-assembly-cores-with-unit-test-runner.md) | Do the request/response logic routing can't express in pure, n8n-free cores behind thin `preSend`/`postReceive` adapters, covered by a `vitest` unit runner. | Active |
| [0004](0004-resources-mirror-fedex-projects.md) | Each resource maps 1:1 to a FedEx dev-portal project and binds that project's credential — Tracking (Track) and Shipping (Get Rates, Create, Validate) — because the two projects have disjoint entitlements. | Active; supersedes 0001's single-credential assumption. |

## How they relate

- **0001** and **0004** together define authentication: 0001 set up one environment-switched
  credential; 0004 split that into **two** credential types (one per FedEx project) while keeping
  0001's environment-switch mechanism intact.
- **0002** and **0003** together define the code shape: 0002 introduced the `postReceive` carve-out
  for the label binary; 0003 generalized that into the pure-core pattern used by address/contact
  assembly, rate shaping, and label extraction.

## Conventions

- ADRs are immutable records. When a decision changes, add a new ADR and mark the old one superseded
  rather than rewriting history. Factual descriptions inside an ADR may be corrected with a dated
  note.
- New ADRs are numbered sequentially (`000N-short-slug.md`).
