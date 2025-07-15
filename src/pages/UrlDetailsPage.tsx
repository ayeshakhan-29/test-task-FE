"use client";

import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart3, Loader2 } from "lucide-react";
import { UrlOverviewCard } from "@/components/url-details/url-overview-card";
import { LinkRatioChartCard } from "@/components/url-details/link-ratio-chart-card";
import { BrokenLinksListCard } from "@/components/url-details/broken-links-list-card";
import { motion } from "framer-motion";
import { useAnalyzedUrlById } from "@/hooks/useAnalyzedUrls";

export function UrlDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: urlData, isLoading } = useAnalyzedUrlById(id || "");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!urlData) {
    return (
      <div className="p-4 md:p-6 lg:p-8 text-center text-muted-foreground">
        <p>
          No URL data found. Please select a URL from the Results Dashboard.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8 w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <BarChart3 className="h-6 w-6" />
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            >
              <CardTitle>URL Details</CardTitle>
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <CardDescription className="break-all flex gap-2 mt-2">
              <p className="font-semibold whitespace-nowrap">Page Title:</p>
              <p>{urlData.page_title}</p>
            </CardDescription>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <CardDescription className="break-all flex gap-2">
              <p className="font-semibold">URL:</p>
              <p>{urlData.url}</p>
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent>
          <motion.div
            className="grid gap-6 w-full grid-cols-1 lg:grid-cols-3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <UrlOverviewCard urlData={urlData} delay={0.1} />
            <LinkRatioChartCard urlData={urlData} delay={0.2} />
            <BrokenLinksListCard urlData={urlData} delay={0.3} />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
