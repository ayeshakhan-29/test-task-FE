"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { AnalyzedUrl } from "@/lib/validations/results";
import { motion } from "framer-motion";

interface LinkRatioChartCardProps {
  urlData: AnalyzedUrl;
  delay?: number;
}

const COLORS = ["#82ca9d", "#8884d8"];

export function LinkRatioChartCard({
  urlData,
  delay = 0,
}: LinkRatioChartCardProps) {
  const linkData = [
    { name: "Internal Links", value: urlData.internalLinks },
    { name: "External Links", value: urlData.externalLinks },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="col-span-full md:col-span-1"
    >
      <Card>
        <CardHeader>
          <CardTitle>Link Ratio</CardTitle>
          <CardDescription>Internal vs. External Links</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          {urlData.internalLinks + urlData.externalLinks > 0 ? (
            <ChartContainer
              config={{
                internal: {
                  label: "Internal Links",
                  color: "hsl(var(--chart-1))",
                },
                external: {
                  label: "External Links",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={linkData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                  >
                    {linkData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" />}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p className="text-muted-foreground">No links to display.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
