import { z } from "zod";

export const analyzedUrlSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  htmlVersion: z.string(),
  internalLinks: z.number().int().min(0),
  externalLinks: z.number().int().min(0),
  brokenLinks: z.number().int().min(0),
  brokenLinksList: z.array(z.string()),
  hasLoginForm: z.boolean(),
  statusCode: z.number().int().min(100).max(599), // HTTP status codes range from 100 to 599
});

export type AnalyzedUrl = z.infer<typeof analyzedUrlSchema>;

export type SortConfig = {
  key: keyof AnalyzedUrl;
  direction: "asc" | "desc";
} | null;

export type Filters = {
  title: string;
  htmlVersion: string;
  hasLoginForm: "all" | "true" | "false";
  // Add more filter types as needed for other columns
};
