# Project Guidelines

## Build and Test

This repository is a pnpm workspace, but the root `package.json` does not provide shared `build`, `test`, or `lint` scripts. Before suggesting commands, inspect the target package's own `package.json` and run it with `pnpm --filter <package-name> <script>`.

- Install dependencies: `pnpm install`
- Blog (VuePress): `pnpm --filter blog dev`, `pnpm --filter blog build`
- Nuxt example: `pnpm --filter @boswell/nuxt dev`, `build`, `lint`
- NestJS example: `pnpm --filter @boswell/nestjs start:dev`, `build`, `lint`, `test`, `test:cov`
- React example: `pnpm --filter @boswell/react start`, `build`, `test`
- Vite example: `pnpm --filter vite dev`, `build`, `preview`
- Webpack example: `pnpm --filter @boswell/webpack dev`, `build`, `serve`, `fix`, `format`
- VS Code plugin: `pnpm --filter @vscode/json2tscopy compile`

Only a few packages have tests. Prefer passing file paths or framework flags through to the package test command instead of assuming a repository-level test entry exists.

## Architecture

This is a personal learning monorepo, not a single application. Treat each area as an independent project unless the target package clearly shares code or tooling.

- `packages/*`: independent examples and experiments grouped by topic such as `nuxt`, `nestjs`, `react`, `webpack`, `vite`, `algorithm`
- `slidev/*`: standalone Slidev presentations, each with its own entry and local setup
- `blog/`: root-level VuePress site; content lives under `blog/doc/`
- `vscode/`: standalone tooling and extension code
- `openspec/`: current spec-driven change directory for proposal and spec work

When working in a subproject, look for the nearest local config first instead of assuming root-level conventions apply unchanged.

## Conventions

- Root fallback formatting/style is defined by `.eslintrc.json` and `.prettierrc.json`: TypeScript ESLint, no semicolons, single quotes, 80-column width.
- Many packages override root config. Follow the nearest package-level ESLint, Prettier, TypeScript, or framework config when present.
- Commit messages are validated by `build/verifyCommit.js`. Use Conventional Commit style and keep the subject within the repository rule. Allowed types include `feat`, `fix`, `docs`, `dx`, `style`, `refactor`, `perf`, `test`, `workflow`, `build`, `ci`, `chore`, `types`, `wip`, `release`.
- Root `.npmrc` points to `https://registry.npmmirror.com`; keep that in mind when adding dependencies or reasoning about lockfile changes.

## Documentation

- Start with `readme.md` for the top-level project entry.
- For commit format details, see `.github/commit-convention.md`.
- For spec-driven work, inspect `openspec/config.yaml`, `openspec/changes/`, and `openspec/specs/` before creating new change artifacts.
- Some root documentation still references `.monkeycode/`, but the current spec directory in this workspace is `openspec/`. Prefer the actual filesystem state over outdated doc references.
