"use client";

import { AxiosError } from "axios";
import {
  createContext,
  useContext,
  useReducer,
  useRef,
  type ReactNode,
  useCallback,
} from "react";
import { toast } from "sonner";
import type { UrlItem, UrlStatus } from "@/lib/validations/url";
import {
  useCrawl,
  useFetchCrawls,
  useDeleteCrawl,
  useRerunCrawl,
  type Crawl,
} from "@/hooks/useCrawl";
import { config } from "@/config";

interface CrawlContextType {
  urls: UrlItem[];
  crawledUrls: Crawl[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetchCrawls: () => Promise<void>;
  crawlUrl: (url: string) => void;
  deleteUrl: (id: string) => Promise<void>;
  toggleStatus: (id: string, currentStatus: UrlStatus) => void;
  reRunUrl: (id: string) => void;
}

const CrawlContext = createContext<CrawlContextType | undefined>(undefined);

// Reducer
type UrlAction =
  | { type: "ADD_URL"; payload: UrlItem }
  | { type: "DELETE_URL"; payload: { id: string } }
  | { type: "TOGGLE_STATUS"; payload: { id: string; newStatus: UrlStatus } };

function urlReducer(state: UrlItem[], action: UrlAction): UrlItem[] {
  switch (action.type) {
    case "ADD_URL":
      return [...state, action.payload];
    case "DELETE_URL":
      return state.filter((url) => url.id !== action.payload.id);
    case "TOGGLE_STATUS":
      return state.map((url) =>
        url.id === action.payload.id
          ? { ...url, status: action.payload.newStatus }
          : url
      );
    default:
      return state;
  }
}

export function CrawlProvider({ children }: { children: ReactNode }) {
  const [urls, dispatch] = useReducer(urlReducer, []);
  const {
    data: crawledUrls = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchCrawls();
  const { mutate: crawlSite } = useCrawl();
  const { mutate: deleteCrawl } = useDeleteCrawl();
  useRerunCrawl();
  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const refetchCrawls = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { message?: string };
      const errorMessage =
        errorData?.message ||
        axiosError.message ||
        "Failed to fetch crawled URLs";
      toast.error(`Error: ${errorMessage}`);
      throw error;
    }
  }, [refetch]);

  const crawlUrl = (url: string) => {
    if (!localStorage.getItem(config.auth.tokenKey)) {
      toast.error("Please login before crawling URLs");
      return;
    }

    const tempId = crypto.randomUUID();
    const newUrlItem: UrlItem = {
      id: tempId,
      url,
      status: "Crawling",
      isChecked: false,
    };
    dispatch({ type: "ADD_URL", payload: newUrlItem });

    crawlSite(
      { url },
      {
        onSuccess: (_res) => {
          dispatch({
            type: "TOGGLE_STATUS",
            payload: { id: tempId, newStatus: "Completed" },
          });
          toast.success("Crawl completed!");
        },
        onError: (error: AxiosError) => {
          dispatch({
            type: "TOGGLE_STATUS",
            payload: { id: tempId, newStatus: "Error" },
          });
          const errorData = error.response?.data as { message?: string };
          const errorMessage =
            errorData?.message || error.message || "Unknown error occurred";
          toast.error(`Crawl failed: ${errorMessage}`);
        },
      }
    );
  };

  const deleteUrl = async (id: string) => {
    try {
      if (timers.current.has(id)) {
        clearTimeout(timers.current.get(id));
        timers.current.delete(id);
      }

      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        dispatch({ type: "DELETE_URL", payload: { id } });
        return;
      }

      await deleteCrawl(numericId, {
        onSuccess: () => {
          dispatch({ type: "DELETE_URL", payload: { id } });
          toast.success("URL deleted successfully");
        },
        onError: (error: AxiosError) => {
          const errorData = error.response?.data as { message?: string };
          const errorMessage =
            errorData?.message || error.message || "Failed to delete URL";
          toast.error(`Delete failed: ${errorMessage}`);
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { message?: string };
      const errorMessage =
        errorData?.message || axiosError.message || "Failed to delete URL";

      toast.error(`Delete failed: ${errorMessage}`);
      throw error;
    }
  };

  const toggleStatus = useCallback((id: string, currentStatus: UrlStatus) => {
    if (currentStatus === "Crawling") {
      dispatch({
        type: "TOGGLE_STATUS",
        payload: { id, newStatus: "Stopped" },
      });
      if (timers.current.has(id)) {
        clearTimeout(timers.current.get(id));
        timers.current.delete(id);
      }
    } else {
      dispatch({
        type: "TOGGLE_STATUS",
        payload: { id, newStatus: "Crawling" },
      });
      const timer = setTimeout(() => {
        dispatch({
          type: "TOGGLE_STATUS",
          payload: { id, newStatus: "Completed" },
        });
        toast.success("Crawl completed!");
        timers.current.delete(id);
      }, 10000);
      timers.current.set(id, timer);
    }
  }, []);

  const reRunUrl = (id: string) => {
    let urlToRerun = urls.find((url) => url.id === id);

    if (!urlToRerun) {
      const crawledUrl = (crawledUrls || []).find((crawl) => crawl.id === id);
      if (crawledUrl) {
        urlToRerun = {
          id: crawledUrl.id,
          url: crawledUrl.url,
          status: "Queued" as const,
          isChecked: false,
        };
        dispatch({ type: "ADD_URL", payload: urlToRerun });
      } else {
        return;
      }
    }

    if (timers.current.has(id)) {
      clearTimeout(timers.current.get(id));
      timers.current.delete(id);
    }

    dispatch({ type: "TOGGLE_STATUS", payload: { id, newStatus: "Crawling" } });

    crawlSite(
      { url: urlToRerun.url },
      {
        onSuccess: () => {
          const timer = setTimeout(() => {
            dispatch({
              type: "TOGGLE_STATUS",
              payload: { id, newStatus: "Completed" },
            });
            toast.success("Re-crawl completed!");
            timers.current.delete(id);
            refetch();
          }, 10000);
          timers.current.set(id, timer);
        },
        onError: (error: AxiosError) => {
          dispatch({
            type: "TOGGLE_STATUS",
            payload: { id, newStatus: "Error" },
          });
          const errorData = error.response?.data as { message?: string };
          const errorMessage =
            errorData?.message || error.message || "Failed to re-run crawl";
          toast.error(`Re-crawl failed: ${errorMessage}`);
        },
      }
    );
  };

  return (
    <CrawlContext.Provider
      value={{
        urls,
        crawledUrls,
        isLoading,
        isError,
        error,
        refetchCrawls,
        crawlUrl,
        deleteUrl,
        toggleStatus,
        reRunUrl,
      }}
    >
      {children}
    </CrawlContext.Provider>
  );
}

export function useCrawlContext() {
  const context = useContext(CrawlContext);
  if (!context) {
    throw new Error("useCrawlContext must be used within CrawlProvider");
  }
  return context;
}
