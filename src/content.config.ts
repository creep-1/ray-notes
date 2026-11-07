import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.enum(['photo', 'games', 'reading', 'kids'])).min(1).max(2),
    summary: z.string().min(1).max(200),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    spoiler: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { essays };
