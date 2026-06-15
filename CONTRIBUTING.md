# Contributing to n8n-nodes-fedex

Thanks for your interest! This is an [n8n community node](https://docs.n8n.io/integrations/community-nodes/)
that talks directly to the FedEx REST API. Contributions — bug reports, fixes, new operations — are
welcome.

By participating you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Getting set up

**Use [pnpm](https://pnpm.io/).** npm installs are blocked (the toolchain enforces it with an
`only-allow` postinstall). Node.js **22.22+** is required.

```bash
pnpm install
pnpm build      # n8n-node build — compile + copy assets
pnpm lint       # n8n-node lint
pnpm test       # vitest (unit tests for the pure assembly cores)
pnpm dev        # n8n-node dev — runs n8n locally with the node loaded + live rebuild
```

## Testing your change

There are unit tests (`vitest`) for the pure helper "cores", but most behavior is verified
**manually against the FedEx sandbox**:

1. `pnpm dev` to launch n8n with the node loaded.
2. Add a FedEx credential, select the **Sandbox** environment, and use FedEx's sandbox test
   tracking numbers / test account.
3. Exercise the operation you changed end to end.

Please confirm `pnpm build`, `pnpm lint`, and `pnpm test` all pass before opening a PR.

## How the node is organized

- One node, `nodes/Fedex/Fedex.node.ts`, with **two resources that mirror the two FedEx
  developer-portal projects** (and their separate credentials):
  - **Tracking** → Track (uses the Track API credential)
  - **Shipping** → Get Rates, Create, Validate (uses the shipping-project credential: Rate + Ship +
    Address Validation)
- Per-resource descriptions live in `nodes/Fedex/resources/<resource>/`; reusable, context-free
  logic lives in `nodes/Fedex/cores/` (these are what the unit tests cover).
- Architecture decisions are documented in [`docs/adr/`](./docs/adr/). Skim them before larger
  changes.

> Some reference material (FedEx's captured API specs and the commercial brief) lives in a private
> companion repo and isn't needed to contribute code. The public ADRs and `documentation.yaml`
> cover the API shapes you'll need.

## Commits & releases

- Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`,
  `chore:`, `refactor:`, `test:`, `ci:`, and `feat!:` / `BREAKING CHANGE:` for breaking changes.
- Releases are automated by **release-please** from those commit messages, then published to npm
  with provenance — no manual version bumps. Don't edit `package.json` `version` or `CHANGELOG.md`.
- **Don't modify the ESLint config** — CI verifies it is unchanged from the n8n default.

## Pull requests

1. Branch from `main`, make focused commits.
2. Ensure build, lint, and tests pass and you've sandbox-tested the change.
3. Fill out the PR template, including confirming **no credentials/secrets** are included.
4. Link any related issue.

## Security & credentials

Never commit or paste FedEx API keys, secret keys, or account numbers anywhere in the repo, issues,
or PRs. See [SECURITY.md](./SECURITY.md). Keep secrets in n8n's credential store or a local
`.env.local` (gitignored).
