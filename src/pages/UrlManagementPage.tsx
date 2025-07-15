"use client";

import { useState } from "react";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUrlForm } from "@/components/url-management/add-url-form";
import { UrlTable } from "@/components/url-management/url-table";
import { BulkActions } from "@/components/url-management/bulk-actions";
import { useCrawlContext } from "@/context/CrawlContext";
import { motion } from "framer-motion";
import type { UrlItem } from "@/lib/validations/url";
import { useBulkDelete } from "@/hooks/useBulkDelete";

export function UrlManagementScreen() {
  const {
    urls,
    crawledUrls,
    isLoading,
    isError,
    error,
    crawlUrl,
    deleteUrl,
    toggleStatus,
    reRunUrl,
  } = useCrawlContext();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { mutate: bulkDelete } = useBulkDelete();

  const allUrls: UrlItem[] = [...urls];
  crawledUrls.forEach((crawledUrl) => {
    if (!allUrls.some((url) => url.id === crawledUrl.id)) {
      allUrls.push({
        id: crawledUrl.id,
        url: crawledUrl.url,
        status: "Completed",
        isChecked: false,
      });
    }
  });

  const handleToggleCheck = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(allUrls.map((url) => url.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      toast.error("No URLs selected");
      return;
    }

    bulkDelete(
      { ids: selectedIds },
      {
        onSuccess: async () => {
          setSelectedIds([]);
        },
        onError: (error) => {
          toast.error(`Bulk delete failed: ${error.message}`);
        },
      }
    );
  };

  const allUrlsSelected =
    allUrls.length > 0 && allUrls.every((url) => selectedIds.includes(url.id));

  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <LinkIcon className="h-6 w-6" />
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <CardTitle>URL Management</CardTitle>
            </motion.span>
          </motion.div>
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <AddUrlForm onAddUrl={crawlUrl} />
            <BulkActions
              selectedCount={selectedIds.length}
              onBulkDelete={handleBulkDelete}
            />
            <UrlTable
              urls={allUrls}
              selectedIds={selectedIds}
              onToggleStatus={toggleStatus}
              onDeleteUrl={deleteUrl}
              onToggleCheck={handleToggleCheck}
              onToggleSelectAll={handleToggleSelectAll}
              onReRunUrl={reRunUrl}
              allUrlsSelected={allUrlsSelected}
              isLoading={isLoading}
              isError={isError}
              error={error?.message}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
