"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LinkIcon,
  ExternalLink,
  XCircle,
  Lock,
  Code,
  Server,
} from "lucide-react";
import type { AnalyzedUrl } from "@/lib/validations/results";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // Import motion

interface UrlOverviewCardProps {
  urlData: AnalyzedUrl;
  delay?: number; // Add delay prop
}

export function UrlOverviewCard({ urlData, delay = 0 }: UrlOverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="col-span-full lg:col-span-1"
    >
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <strong>HTML Version:</strong> {urlData.htmlVersion}
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              <strong>Status Code:</strong>{" "}
              <span
                className={cn(
                  "font-medium",
                  urlData.statusCode >= 200 &&
                    urlData.statusCode < 300 &&
                    "text-green-600",
                  urlData.statusCode >= 400 &&
                    urlData.statusCode < 500 &&
                    "text-yellow-600",
                  urlData.statusCode >= 500 && "text-red-600"
                )}
              >
                {urlData.statusCode}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <strong>Login Form Found:</strong>{" "}
              <span
                className={cn(
                  urlData.hasLoginForm ? "text-green-600" : "text-red-600"
                )}
              >
                {urlData.hasLoginForm ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <strong>Internal Links:</strong> {urlData.internalLinks}
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <strong>External Links:</strong> {urlData.externalLinks}
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-muted-foreground" />
              <strong>Broken Links:</strong>{" "}
              <span
                className={cn(
                  urlData.brokenLinks > 0 ? "text-red-600" : "text-green-600"
                )}
              >
                {urlData.brokenLinks}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
