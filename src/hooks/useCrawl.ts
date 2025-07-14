import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type CrawlPayload = {
  url: string;
};

export type CrawlResponse = {
  id: string;
  url: string;
  page_title: string;
  created_at: string;
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
};

export type Crawl = Omit<CrawlResponse, "id"> & { id: string };

export const useCrawl = () => {
  return useMutation<CrawlResponse, AxiosError, CrawlPayload>({
    mutationFn: async (data: CrawlPayload) => {
      const response = await api.post("/crawl", data);
      return response.data;
    },
  });
};

export const useFetchCrawls = () => {
  return useQuery<Crawl[], AxiosError>({
    queryKey: ["crawls"],
    queryFn: async () => {
      const response = await api.get<Crawl[]>("/crawls");
      return response.data;
    },
  });
};

export const useDeleteCrawl = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (id: number) => {
      const endpoint = `/delete/${id}`;
      try {
        const response = await api.delete(endpoint);
        return response.data;
      } catch (error: unknown) {
        if (error && typeof error === "object") {
          const axiosError = error as {
            response?: { data?: unknown; status?: number; headers?: unknown };
            request?: unknown;
            message?: string;
          };

          if ("response" in axiosError && axiosError.response) {
          } else if ("request" in axiosError) {
          } else if ("message" in axiosError) {
          }
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crawls"] });
    },
    onError: (error) => {
      console.error("Error deleting crawl ID:", error || "Unknown error");
    },
  });
};

export const useRerunCrawl = () => {
  const queryClient = useQueryClient();

  return useMutation<Crawl, AxiosError, { url: string }>({
    mutationFn: async ({ url }) => {
      try {
        const response = await api.post("/crawl", { url });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["crawls"] });
    },
    onError: (error) => {
      console.error("useRerunCrawl - Mutation error:", error);
    },
  });
};
