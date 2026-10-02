# arasydafa.github.io

Personal portfolio of Arasy Dafa Sulistya Kurniawan, SOC Engineer. Live at
https://arasydafa.github.io.

Built with React, Vite, Tailwind, and [@omega-os/ui](https://github.com/arasydafa/omega-os)
(light first with dark toggle, Plus Jakarta Sans + JetBrains Mono, lucide icons only).

## Local dev

Requires the omega-os checkout next to this repo (`Personal/portfolio` +
`Project/omega-os`), same layout the CI uses.

```sh
npm.cmd install
npm.cmd run dev   # http://localhost:5174
```

## Content

Almost everything lives in `src/data/placeholder.ts`: profile, experience,
skills, projects, writeups, publications, credentials, challenge work, and the
detection casefile. Edit that file, the layout follows.

The casefile sample (logs, Sigma rules, runbook) is written fresh for this
page. Employer detection content never ships here.

## Deploy

Push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
The workflow checks out this repo plus `arasydafa/omega-os` and builds both.

## Versioning

See [CHANGELOG.md](CHANGELOG.md). Bump the version in `package.json` (shown in
the site footer) with every meaningful change.
