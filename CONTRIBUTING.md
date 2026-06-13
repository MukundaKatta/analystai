# Contributing to Analystai

Thanks for your interest in contributing! Analystai is a Next.js + TypeScript
application that uses Supabase and the OpenAI API. This guide covers how to get
set up and how to submit changes.

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with the environment variables the app needs
   (Supabase URL/keys and an OpenAI API key). Never commit secrets.

## Development

Common scripts (see `package.json`):

```bash
npm run dev     # start the local dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # run ESLint via next lint
npm run test    # run the Vitest test suite
```

Please run `npm run lint`, `npm run build`, and `npm run test` before opening a
pull request, and make sure they all pass.

## Pull Requests

1. Create a feature branch off the default branch (e.g.
   `feature/short-description` or `fix/short-description`).
2. Keep changes focused and additive where possible; avoid unrelated edits.
3. Write a clear PR description explaining the what and why.
4. Add or update tests in `tests/` when changing behavior in `src/`.
5. Ensure CI passes — the workflows in `.github/workflows/` run on every PR.

## Coding Guidelines

- Use TypeScript and keep the build type-safe (no new type errors).
- Follow the existing project structure under `src/`.
- Prefer small, readable functions and meaningful names.
- Keep formatting consistent with the surrounding code.

## Reporting Issues

When filing an issue, please include:

- A clear description of the problem or request.
- Steps to reproduce (for bugs), expected vs. actual behavior.
- Relevant environment details (Node version, OS, browser if applicable).

By contributing, you agree that your contributions will be licensed under the
terms of the repository's [LICENSE](LICENSE).
