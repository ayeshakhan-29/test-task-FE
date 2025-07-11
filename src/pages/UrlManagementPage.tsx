"use client";

import { useReducer, useRef } from "react";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUrlForm } from "@/components/url-management/add-url-form";
import { UrlTable } from "@/components/url-management/url-table";
import { BulkActions } from "@/components/url-management/bulk-actions";
import type { UrlItem, UrlStatus } from "@/lib/validations/url";

// Reducer for managing URL items
type UrlAction =
  | { type: "ADD_URL"; payload: { url: string } }
  | { type: "DELETE_URL"; payload: { id: string } }
  | { type: "TOGGLE_STATUS"; payload: { id: string; newStatus: UrlStatus } }
  | { type: "TOGGLE_CHECK"; payload: { id: string } }
  | { type: "TOGGLE_SELECT_ALL"; payload: { checked: boolean } }
  | { type: "BULK_DELETE" };

const urlReducer = (state: UrlItem[], action: UrlAction): UrlItem[] => {
  switch (action.type) {
    case "ADD_URL":
      const newUrl: UrlItem = {
        id: crypto.randomUUID(), // Unique ID for each URL
        url: action.payload.url,
        status: "Queued",
        isChecked: false,
      };
      return [...state, newUrl];
    case "DELETE_URL":
      return state.filter((url) => url.id !== action.payload.id);
    case "TOGGLE_STATUS":
      return state.map((url) =>
        url.id === action.payload.id
          ? { ...url, status: action.payload.newStatus }
          : url
      );
    case "TOGGLE_CHECK":
      return state.map((url) =>
        url.id === action.payload.id
          ? { ...url, isChecked: !url.isChecked }
          : url
      );
    case "TOGGLE_SELECT_ALL":
      return state.map((url) => ({
        ...url,
        isChecked: action.payload.checked,
      }));
    case "BULK_DELETE":
      return state.filter((url) => !url.isChecked);
    default:
      return state;
  }
};

export function UrlManagementScreen() {
  const [urls, dispatch] = useReducer(urlReducer, []);
  const crawlTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const clearCrawlTimer = (id: string) => {
    if (crawlTimers.current.has(id)) {
      clearTimeout(crawlTimers.current.get(id)!);
      crawlTimers.current.delete(id);
    }
  };

  const handleAddUrl = (url: string) => {
    dispatch({ type: "ADD_URL", payload: { url } });
  };

  const handleToggleStatus = (id: string, currentStatus: UrlStatus) => {
    let newStatus: UrlStatus;
    if (currentStatus === "Crawling") {
      newStatus = "Stopped";
      clearCrawlTimer(id);
    } else if (
      currentStatus === "Stopped" ||
      currentStatus === "Queued" ||
      currentStatus === "Error"
    ) {
      newStatus = "Crawling";
      const timer = setTimeout(() => {
        dispatch({
          type: "TOGGLE_STATUS",
          payload: { id, newStatus: "Completed" },
        });
        // Show toast when crawl completes
        toast.success("Crawl Completed!", {
          description:
            "Crawled successfully, go to results dashboard for details.",
          duration: 5000,
        });
        crawlTimers.current.delete(id);
      }, 10000); // 10 seconds
      crawlTimers.current.set(id, timer);
    } else {
      newStatus = currentStatus;
    }
    dispatch({ type: "TOGGLE_STATUS", payload: { id, newStatus } });
  };

  const handleDeleteUrl = (id: string) => {
    clearCrawlTimer(id);
    dispatch({ type: "DELETE_URL", payload: { id } });
  };

  const handleToggleCheck = (id: string) => {
    dispatch({ type: "TOGGLE_CHECK", payload: { id } });
  };

  const handleToggleSelectAll = (checked: boolean) => {
    dispatch({ type: "TOGGLE_SELECT_ALL", payload: { checked } });
  };

  const handleBulkDelete = () => {
    urls
      .filter((url) => url.isChecked)
      .forEach((url) => clearCrawlTimer(url.id));
    dispatch({ type: "BULK_DELETE" });
  };

  const handleReRunUrl = (id: string) => {
    clearCrawlTimer(id);
    dispatch({ type: "TOGGLE_STATUS", payload: { id, newStatus: "Queued" } });
    console.log(`Re-running URL: ${id}`);
    alert(`Simulated re-run for URL: ${id}. Status set to Queued.`);
  };

  const selectedUrlsCount = urls.filter((url) => url.isChecked).length;
  const allUrlsSelected = urls.length > 0 && urls.every((url) => url.isChecked);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-6 w-6" /> URL Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddUrlForm onAddUrl={handleAddUrl} />
          <BulkActions
            selectedCount={selectedUrlsCount}
            onBulkDelete={handleBulkDelete}
          />
          <UrlTable
            urls={urls}
            onToggleStatus={handleToggleStatus}
            onDeleteUrl={handleDeleteUrl}
            onToggleCheck={handleToggleCheck}
            onToggleSelectAll={handleToggleSelectAll}
            onReRunUrl={handleReRunUrl}
            allUrlsSelected={allUrlsSelected}
          />
        </CardContent>
      </Card>
    </div>
  );
}
