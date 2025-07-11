import { z } from "zod";

export const urlInputSchema = z.object({
  url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
});

export type UrlInputFormData = z.infer<typeof urlInputSchema>;

export type UrlStatus =
  | "Pending"
  | "Crawling"
  | "Completed"
  | "Stopped"
  | "Error";

export interface UrlItem {
  id: string;
  url: string;
  status: UrlStatus;
  isChecked: boolean;
}
