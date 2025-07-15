import { z } from "zod";

export const analyzedUrlSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  page_title: z.string(),
  h1: z.number().int().min(0),
  h2: z.number().int().min(0),
  h3: z.number().int().min(0),
  h4: z.number().int().min(0),
  h5: z.number().int().min(0),
  h6: z.number().int().min(0),
  internal_links: z.number().int().min(0),
  external_links: z.number().int().min(0),
  inaccessible_links: z.array(z.string()).min(0),
  has_login_form: z.boolean(),
  created_at: z.string(),
  html_version: z.string().optional(),
  broken_links_list: z.array(z.string()).optional(),
  status_code: z.number().optional(),
});

export type AnalyzedUrl = z.infer<typeof analyzedUrlSchema>;

export const FiltersSchema = z.object({
  page_title: z.string().optional(),
  html_version: z.string().optional(),
  has_login_form: z.enum(["all", "true", "false"]).optional(),
  internal_links: z.number().optional(),
  external_links: z.number().optional(),
  inaccessible_links: z.array(z.string()).optional(),
});

export type Filters = z.infer<typeof FiltersSchema>;

export type SortConfig = {
  key: keyof AnalyzedUrl;
  direction: "asc" | "desc";
};
