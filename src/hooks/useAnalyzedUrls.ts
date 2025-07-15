import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import type { AnalyzedUrl } from "@/lib/validations/results";

interface Headings {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  [key: string]: number;
}

interface CrawlResponse {
  id: number;
  url: string;
  page_title: string;
  created_at: string;
  headings: Headings;
  internal_links: number;
  external_links: number;
  inaccessible_links: number;
  has_login_form: boolean;
}

export const useAnalyzedUrls = () => {
  return useQuery<AnalyzedUrl[]>({
    queryKey: ["crawls"],
    queryFn: async () => {
      try {
        const response = await api.get<CrawlResponse[]>("/crawls");

        return response.data.map((crawl) => ({
          id: crawl.id.toString(),
          url: crawl.url,
          page_title: crawl.page_title,
          h1: crawl.headings.h1 || 0,
          h2: crawl.headings.h2 || 0,
          h3: crawl.headings.h3 || 0,
          h4: crawl.headings.h4 || 0,
          h5: crawl.headings.h5 || 0,
          h6: crawl.headings.h6 || 0,
          internal_links: crawl.internal_links || 0,
          external_links: crawl.external_links || 0,
          inaccessible_links: crawl.inaccessible_links
            ? [crawl.inaccessible_links.toString()]
            : [],
          has_login_form: Boolean(crawl.has_login_form),
          created_at: new Date(crawl.created_at).toISOString(),
          html_version: "",
          broken_links_list: [],
          status_code: 200,
        }));
      } catch (error) {
        console.error("Error fetching analyzed URLs:", error);
        throw error;
      }
    },
  });
};

export const useAnalyzedUrlById = (id: string) => {
  return useQuery<AnalyzedUrl | null>({
    queryKey: ["analyzed-url", id],
    queryFn: async () => {
      try {
        const response = await api.get<AnalyzedUrl>(`/analyzed-url/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching URL data:", error);
        return null;
      }
    },
    enabled: !!id,
  });
};
