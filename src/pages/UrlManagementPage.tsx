"use client";

import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUrlForm } from "@/components/url-management/add-url-form";
import { UrlTable } from "@/components/url-management/url-table";
import { BulkActions } from "@/components/url-management/bulk-actions";
import { useCrawlContext } from "@/context/CrawlContext";
import { motion } from "framer-motion";

export function UrlManagementScreen() {
  const { urls, crawlUrl, deleteUrl, toggleStatus, reRunUrl } =
    useCrawlContext();

  const handleBulkDelete = () => {
    const checkedUrls = urls.filter((url) => url.isChecked);
    if (checkedUrls.length === 0) {
      toast.error("No URLs selected");
      return;
    }
    checkedUrls.forEach((url) => deleteUrl(url.id));
  };

  const handleToggleCheck = (_id: string) => {
    toast.error("Toggle check not implemented in context yet");
  };

  const handleToggleSelectAll = (_checked: boolean) => {
    toast.error("Toggle select all not implemented in context yet");
  };

  const selectedUrlsCount = urls.filter((url) => url.isChecked).length;
  const allUrlsSelected = urls.length > 0 && urls.every((url) => url.isChecked);

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
            <AddUrlForm onAddUrl={crawlUrl} />{" "}
            <BulkActions
              selectedCount={selectedUrlsCount}
              onBulkDelete={handleBulkDelete}
            />
            <UrlTable
              urls={urls}
              onToggleStatus={toggleStatus}
              onDeleteUrl={deleteUrl}
              onToggleCheck={handleToggleCheck}
              onToggleSelectAll={handleToggleSelectAll}
              onReRunUrl={reRunUrl}
              allUrlsSelected={allUrlsSelected}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
