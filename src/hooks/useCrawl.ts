import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Request body
export type CrawlPayload = {
  url: string;
};

// Response structure
export type CrawlResponse = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  url: string;
  html_version: string;
  page_title: string;
  headings: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  internal_links: number;
  external_links: number;
  inaccessible_links: number;
  has_login_form: boolean;
  user_id: number;
};

export const useCrawl = () => {
  return useMutation<CrawlResponse, AxiosError, CrawlPayload>({
    mutationFn: async (data: CrawlPayload) => {
      const response = await api.post("/crawl", data);
      return response.data;
    },
  });
};
