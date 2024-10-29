import { z } from "zod";

export const editPageSchema = z.object({
  label: z.string(),
  markdown: z.string(),
  icon: z.string().optional(),
  slug: z.string(),
});

export type EditPageSchema = z.infer<typeof editPageSchema>;
