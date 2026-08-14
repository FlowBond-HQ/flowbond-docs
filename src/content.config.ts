import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** Spec version this page is normative for. Drives the badge. */
        specVersion: z.string().optional(),
        /** Normative force of the page. */
        normative: z.enum(['normative', 'non-normative', 'informative']).optional(),
        /** Stability of the text. */
        status: z.enum(['draft', 'review', 'stable', 'open']).optional(),
        /** Primitive identifier, e.g. FBP-02. */
        fbp: z.string().optional(),
      }),
    }),
  }),
};
