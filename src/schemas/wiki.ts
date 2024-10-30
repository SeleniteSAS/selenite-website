import { z } from "zod";

export const createUpdateWikiPage = z.object({
  label: z.string(),
  markdown: z.string(),
  icon: z.string().optional(),
  slug: z.string(),
});

export type CreateUpdateWikiPage = z.infer<typeof createUpdateWikiPage>;
