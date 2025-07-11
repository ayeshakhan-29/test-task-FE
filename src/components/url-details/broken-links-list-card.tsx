"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { AnalyzedUrl } from "@/lib/validations/results";
import { motion } from "framer-motion"; // Import motion

interface BrokenLinksListCardProps {
  urlData: AnalyzedUrl;
  delay?: number; // Add delay prop
}

export function BrokenLinksListCard({
  urlData,
  delay = 0,
}: BrokenLinksListCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="col-span-full md:col-span-1"
    >
      <Card>
        <CardHeader>
          <CardTitle>Broken Links</CardTitle>
          <CardDescription>List of detected broken links</CardDescription>
        </CardHeader>
        <CardContent>
          {urlData.brokenLinksList && urlData.brokenLinksList.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {urlData.brokenLinksList.map((link, index) => (
                <li key={index} className="break-all">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No broken links detected.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
