# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Test

This is a pnpm workspace monorepo. The root `package.json` does not provide shared build/test/lint scripts. Always check the target package's own `package.json` and run commands with:

```bash
pnpm --filter <package-name> <script>
```

### Common Package Commands

| Package | Dev | Build | Test | Lint |
|---------|-----|-------|------|------|
| blog | `pnpm --filter blog dev` | `pnpm --filter blog build` | - | - |
| nuxt | `pnpm --filter @boswell/nuxt dev` | `pnpm --filter @boswell/nuxt build` | - | `pnpm --filter @boswell/nuxt lint` |
| nestjs | `pnpm --filter @boswell/nestjs start:dev` | `pnpm --filter @boswell/nestjs build` | `pnpm --filter @boswell/nestjs test` | `pnpm --filter @boswell/nestjs lint` |
| react | `pnpm --filter @boswell/react start` | `pnpm --filter @boswell/react build` | `pnpm --filter @boswell/react test` | - |
| vite | `pnpm --filter vite dev` | `pnpm --filter vite build` | - | - |
| webpack | `pnpm --filter @boswell/webpack dev` | `pnpm --filter @boswell/webpack build` | - | `pnpm --filter @boswell/webpack fix` |
| nitro | `pnpm --filter @boswell/nitro dev` | `pnpm --filter @boswell/nitro build` | - | - |

Only a few packages have tests. Pass file paths or framework flags directly to the package test command.

## Architecture

This is a personal learning monorepo, not a single application. Treat each area as an independent project.

- `packages/*` - Independent examples and experiments: `nuxt`, `nestjs`, `react`, `webpack`, `vite`, `nitro`, `rollup`, `nodejs`, `algorithm`, `flutter`, etc.
- `slidev/*` - Standalone Slidev presentations, each self-contained
- `packages/blog/doc/` - VuePress blog content organized by topic (vue, react, vite, webpack, nodejs, etc.)
- `packages/nitro/server/` - Nitro server with `api/`, `routes/`, `plugins/`, `utils/`

When working in a subproject, check the nearest local config first instead of assuming root-level conventions apply.

## Conventions

### Code Style
Root fallback defined by `.eslintrc.json` and `.prettierrc.json`:
- TypeScript ESLint with `@typescript-eslint/no-explicit-any: error`
- No semicolons, single quotes, 80-column width, trailing commas omitted

Many packages override root config. Follow the nearest package-level ESLint, Prettier, TypeScript, or framework config.

### Commit Messages
Validated by `build/verifyCommit.js`. Must match:
```
/^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip)(\(.+\))?: .{1,50}/
```

Examples:
- `feat(compiler): add 'comments' option`
- `fix(v-model): handle events on blur`
- `perf(core): improve vdom diffing`

Types that appear in changelog: `feat`, `fix`, `perf`, and any commit with `BREAKING CHANGE`.

### Registry
Root `.npmrc` uses `https://registry.npmmirror.com` as the npm registry.

## Git Hooks

Pre-commit runs lint-staged; commit-msg validates format via `build/verifyCommit.js`. Hooks are installed automatically on `pnpm install`.
