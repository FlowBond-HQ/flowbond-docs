# flowbond-docs

The canonical, versioned, auditable specification of the **FlowBond Protocol** —
published at **https://docs.flowbond.life**.

This repository is the artefact of record. The rendered site is built from it; where the
two disagree, the git tag is correct and the site is a defect.

## Stack

- **Astro + Starlight** — static output, built-in search (Pagefind), MD/MDX content.
- **Cloudflare Pages only.** Never Vercel. Deploy via Wrangler.
- Mermaid renders client-side from a local bundle — no CDN, no headless browser at build.

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static output into dist/
pnpm preview
```

Node 20+ and pnpm are required.

## Deploy

Two environments on one Cloudflare Pages project (`flowbond-docs`):

| Environment | Branch | URL |
| --- | --- | --- |
| test | `test` | `https://test.flowbond-docs.pages.dev` |
| production | `main` | `https://docs.flowbond.life` |

```bash
pnpm deploy:test    # build + push to the test preview
pnpm deploy:prod    # build + push to production
```

**Commit before you deploy.** A CLI deploy from a dirty tree is not durable — the next
merge to `main` silently reverts it.

## Auditability

The audit trail is structural, not decorative:

- `CHANGELOG.md` is **append-only**. Entries are never edited and never deleted; a
  mistaken entry is corrected by appending a later one that references it by sequence
  number. `/changelog` renders directly from this file at build time — there is no second
  copy to drift.
- Every normative change requires a changelog entry with date, author and rationale. See
  `/governance/rfc-process`.
- Every release is a git tag. Sign tags where a key is available.
- `/spec.json` is the machine-readable index: every page with its route, version,
  normative status and the SHA-256 of its **source file**. Recompute and compare from a
  checkout — the procedure is on `/audit`.
- `main` must never be force-pushed. Rewriting history destroys the trail.

## Content rules

1. **No product names in the spec body.** The protocol does not know its consumers
   (Rule 01). Named implementations live only in `/ecosystem`, which is non-normative.
2. **Normative keywords in ALL CAPS.** `MUST`, `SHOULD`, `NEVER`, `MAY` and friends are
   auto-styled by `plugins/rehype-normative.mjs` wherever they appear in prose. Lower-case
   uses are ordinary words and are left alone; code and pre blocks are skipped.
3. **Frontmatter drives the badges.** `specVersion`, `normative`, `status` and `fbp` render
   at the top of the page and feed `/spec.json`.
4. **Mermaid takes a `chart` prop, not children.** Inside MDX, children are parsed as JSX
   and mermaid's `<-->` and `<br/>` are not valid JSX:

   ```mdx
   <Mermaid title="What it shows" chart={`
   flowchart LR
     A --> B
   `} />
   ```

## Layout

```
src/
  components/     PageTitle (badges) · Footer (source+history) · PlaneStack · Mermaid · ChangelogFeed
  content/docs/   the specification itself
  pages/          spec.json.ts — the machine-readable index
  styles/         theme.css — brand tokens, dark by default
plugins/          rehype-normative.mjs — RFC-2119 keyword tokens
CHANGELOG.md      append-only audit log
```

## Steward

Author of record and steward: **Steph**. Editor: FlowBond Labs. See `/governance`.
