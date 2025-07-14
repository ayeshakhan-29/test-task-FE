"use client";

import {
  Play,
  Square,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { UrlItem, UrlStatus } from "@/lib/validations/url";
import { cn } from "@/lib/utils";

interface UrlTableProps {
  urls: UrlItem[];
  onToggleStatus: (id: string, currentStatus: UrlStatus) => void;
  onDeleteUrl: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onReRunUrl: (id: string) => void;
  allUrlsSelected: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}

export function UrlTable({
  urls,
  onToggleStatus,
  onDeleteUrl,
  onToggleCheck,
  onToggleSelectAll,
  onReRunUrl,
  allUrlsSelected,
  isLoading = false,
  isError = false,
  error,
}: UrlTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading URLs...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-destructive py-8">
        <p>Error loading URLs: {error || "Unknown error occurred"}</p>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No URLs added yet. Start by adding one above!
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={allUrlsSelected}
                onCheckedChange={(checked) =>
                  onToggleSelectAll(Boolean(checked))
                }
                aria-label="Select all URLs"
              />
            </TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="w-[180px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((urlItem) => (
            <TableRow key={urlItem.id}>
              <TableCell>
                <Checkbox
                  checked={urlItem.isChecked}
                  onCheckedChange={() => onToggleCheck(urlItem.id)}
                  aria-label={`Select URL ${urlItem.url}`}
                />
              </TableCell>
              <TableCell className="font-medium break-all">
                {urlItem.url}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                    urlItem.status === "Queued" && "bg-gray-100 text-gray-800",
                    urlItem.status === "Crawling" &&
                      "bg-blue-100 text-blue-800",
                    urlItem.status === "Completed" &&
                      "bg-green-100 text-green-800",
                    urlItem.status === "Stopped" &&
                      "bg-yellow-100 text-yellow-800",
                    urlItem.status === "Error" && "bg-red-100 text-red-800"
                  )}
                >
                  {urlItem.status === "Crawling" && (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  )}
                  {urlItem.status === "Completed" && (
                    <CheckCircle className="h-3 w-3" />
                  )}
                  {urlItem.status === "Error" && (
                    <XCircle className="h-3 w-3" />
                  )}
                  {urlItem.status === "Completed" ? "Done" : urlItem.status}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  {urlItem.status === "Completed" ? (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onReRunUrl(urlItem.id);
                        }}
                        aria-label="Re-run crawl"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDeleteUrl(urlItem.id)}
                        aria-label="Delete URL"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          onToggleStatus(urlItem.id, urlItem.status)
                        }
                        aria-label={
                          urlItem.status === "Crawling"
                            ? "Stop crawling"
                            : "Start crawling"
                        }
                      >
                        {urlItem.status === "Crawling" ? (
                          <Square className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDeleteUrl(urlItem.id)}
                        aria-label="Delete URL"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
