import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { SITE, REPO, SPEC_VERSION } from '../consts';

/**
 * Machine-readable index of the specification.
 *
 * Every page is listed with its route, its declared version, its normative status
 * and the SHA-256 of its **source file** — not of the rendered HTML, which changes
 * whenever the theme does. An auditor recomputes these hashes from a git checkout;
 * see /audit.
 */
export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const pages = docs
    .map((entry) => {
      const data = entry.data as typeof entry.data & {
        specVersion?: string;
        normative?: string;
        status?: string;
        fbp?: string;
      };

      const source = entry.filePath ?? '';
      let sha256: string | null = null;
      try {
        sha256 = createHash('sha256').update(readFileSync(source)).digest('hex');
      } catch {
        sha256 = null;
      }

      return {
        route: `/${entry.id}`.replace(/\/index$/, '/').replace(/^\/\/$/, '/'),
        title: data.title,
        fbp: data.fbp ?? null,
        specVersion: data.specVersion ?? null,
        normative: data.normative ?? null,
        status: data.status ?? null,
        source,
        sha256,
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));

  const index = {
    name: 'FlowBond Protocol',
    specVersion: SPEC_VERSION,
    site: SITE,
    repository: REPO,
    changelog: `${SITE}/changelog`,
    audit: `${SITE}/audit`,
    hashAlgorithm: 'sha256',
    hashedOver: 'source file bytes at build time',
    primitives: [
      { id: 'FBP-00', name: 'Ledger', route: '/spec/fbp-00-ledger/' },
      { id: 'FBP-01', name: 'FBID', route: '/spec/fbp-01-fbid/' },
      { id: 'FBP-02', name: 'FlowShare', route: '/spec/fbp-02-flowshare/' },
      { id: 'FBP-03', name: 'StableFlow', route: '/spec/fbp-03-stableflow/' },
      { id: 'FBP-04', name: 'LifeKey', route: '/spec/fbp-04-lifekey/' },
    ],
    planes: [
      { plane: 4, name: 'Applications' },
      { plane: 3, name: 'Companion OS' },
      { plane: 2, name: 'Protocol (Layer 0)' },
      { plane: 1, name: 'Privacy Core' },
      { plane: 0, name: 'Resilience Transport' },
    ],
    pageCount: pages.length,
    pages,
  };

  return new Response(JSON.stringify(index, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
