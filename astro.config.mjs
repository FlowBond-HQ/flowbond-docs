// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeNormative from './plugins/rehype-normative.mjs';
import { REPO, SITE } from './src/consts.ts';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeNormative],
  },
  integrations: [
    starlight({
      title: 'FlowBond Protocol',
      description:
        'The canonical, versioned specification of the FlowBond Protocol — a Layer 0 of identity, value and intelligence.',
      tagline: 'The protocol beneath the worlds',
      logo: {
        src: './src/assets/mark.svg',
        alt: 'FlowBond',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      editLink: { baseUrl: `${REPO}/edit/main/` },
      lastUpdated: true,
      pagination: true,
      social: [{ icon: 'github', label: 'GitHub', href: REPO }],
      customCss: [
        '@fontsource-variable/fraunces',
        '@fontsource/ibm-plex-sans/400.css',
        '@fontsource/ibm-plex-sans/500.css',
        '@fontsource/ibm-plex-sans/600.css',
        '@fontsource/ibm-plex-mono/400.css',
        '@fontsource/ibm-plex-mono/500.css',
        './src/styles/theme.css',
      ],
      components: {
        PageTitle: './src/components/PageTitle.astro',
        Footer: './src/components/Footer.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#14201E' },
        },
        {
          tag: 'link',
          attrs: { rel: 'alternate', type: 'application/json', href: '/spec.json', title: 'Machine-readable spec index' },
        },
        {
          // Dark is the default look. Starlight falls back to the OS preference when
          // nothing is stored; this pins dark instead, and leaves an explicit choice
          // by the reader untouched.
          tag: 'script',
          content: `try{if(!localStorage.getItem('starlight-theme')){document.documentElement.dataset.theme='dark'}}catch(e){document.documentElement.dataset.theme='dark'}`,
        },
      ],
      sidebar: [
        { label: 'Overview', link: '/' },
        {
          label: 'Specification',
          items: [
            { label: 'How to read this spec', link: '/spec/' },
            { label: '§1 · Architecture — Five Planes', link: '/spec/architecture/' },
            {
              label: 'Primitives',
              items: [
                { label: 'FBP-00 · Ledger', link: '/spec/fbp-00-ledger/' },
                { label: 'FBP-01 · FBID', link: '/spec/fbp-01-fbid/' },
                { label: 'FBP-02 · FlowShare', link: '/spec/fbp-02-flowshare/' },
                { label: 'FBP-03 · StableFlow', link: '/spec/fbp-03-stableflow/' },
                { label: 'FBP-04 · LifeKey', link: '/spec/fbp-04-lifekey/' },
              ],
            },
            {
              label: 'Cross-cutting',
              items: [
                { label: 'Privacy Core (ZK)', link: '/spec/privacy-core/' },
                { label: 'Resilience Transport', link: '/spec/transport/' },
                { label: 'Agent Interface', link: '/spec/agent-interface/' },
              ],
            },
            {
              label: 'Application profiles',
              items: [{ label: 'Passport', link: '/spec/profiles/passport/' }],
            },
            { label: 'License', link: '/spec/license/' },
          ],
        },
        {
          label: 'Governance',
          items: [
            { label: 'Stewardship', link: '/governance/' },
            { label: 'RFC process', link: '/governance/rfc-process/' },
            { label: 'Versioning policy', link: '/governance/versioning/' },
          ],
        },
        {
          label: 'Audit trail',
          items: [
            { label: 'Changelog', link: '/changelog/' },
            { label: 'How to audit', link: '/audit/' },
          ],
        },
        {
          label: 'Non-normative',
          items: [{ label: 'Ecosystem', link: '/ecosystem/' }],
        },
      ],
    }),
  ],
});
