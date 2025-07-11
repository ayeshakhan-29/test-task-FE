"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart3, Loader2 } from "lucide-react";
import type { AnalyzedUrl } from "@/lib/validations/results";

import { UrlOverviewCard } from "@/components/url-details/url-overview-card";
import { LinkRatioChartCard } from "@/components/url-details/link-ratio-chart-card";
import { BrokenLinksListCard } from "@/components/url-details/broken-links-list-card";
import { dummyResults } from "@/lib/data/results-data";

export function UrlDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [urlData, setUrlData] = useState<AnalyzedUrl | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a small delay
    const timer = setTimeout(() => {
      const foundUrl = dummyResults.find(url => url.id === id) || null;
      setUrlData(foundUrl);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

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
    <div className="p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" /> URL Details: {urlData.title}
          </CardTitle>
          <CardDescription className="break-all">{urlData.url}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UrlOverviewCard urlData={urlData} delay={0.1} />
          <LinkRatioChartCard urlData={urlData} delay={0.2} />
          <BrokenLinksListCard urlData={urlData} delay={0.3} />
        </CardContent>
      </Card>
    </div>
  );
}
