"use client";
import {
  ArrowUpDown,
  Search,
  ExternalLink,
  LinkIcon,
  XCircle,
  Lock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AnalyzedUrl,
  SortConfig,
  Filters,
} from "@/lib/validations/results";
import { cn } from "@/lib/utils";

interface ResultsTableProps {
  data: AnalyzedUrl[];
  sortConfig: SortConfig;
  onSort: (key: keyof AnalyzedUrl) => void;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | boolean) => void;
  onRowClick: (url: AnalyzedUrl) => void; // Row click handler
  globalSearchTerm: string;
  onGlobalSearchChange: (term: string) => void;
}

export function ResultsTable({
  data,
  sortConfig,
  onSort,
  filters,
  onFilterChange,
  onRowClick,
  globalSearchTerm,
  onGlobalSearchChange,
}: ResultsTableProps) {
  const handleRowClick = (url: AnalyzedUrl) => {
    onRowClick(url);
  };
  const getSortIcon = (key: keyof AnalyzedUrl) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-end">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Global search..."
            value={globalSearchTerm}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">
              <Button
                variant="ghost"
                onClick={() => onSort("title")}
                className="px-0 hover:bg-transparent"
              >
                Title {getSortIcon("title")}
              </Button>
              <Input
                placeholder="Filter title"
                value={filters.title}
                onChange={(e) => onFilterChange("title", e.target.value)}
                className="h-8 my-1 placeholder:text-sm md:placeholder:text-base"
              />
            </TableHead>
            <TableHead className="min-w-[120px]">
              <Button
                variant="ghost"
                onClick={() => onSort("htmlVersion")}
                className="px-0 hover:bg-transparent"
              >
                HTML Version {getSortIcon("htmlVersion")}
              </Button>
              <Input
                placeholder="Filter version"
                value={filters.htmlVersion}
                onChange={(e) => onFilterChange("htmlVersion", e.target.value)}
                className="h-8 my-1 placeholder:text-sm md:placeholder:text-base"
              />
            </TableHead>
            <TableHead className="min-w-[100px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("internalLinks")}
                className="px-0 hover:bg-transparent"
              >
                Internal <LinkIcon className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("internalLinks")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[100px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("externalLinks")}
                className="px-0 hover:bg-transparent"
              >
                External <ExternalLink className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("externalLinks")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[100px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("brokenLinks")}
                className="px-0 hover:bg-transparent"
              >
                Broken <XCircle className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("brokenLinks")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[120px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("hasLoginForm")}
                className="px-0 hover:bg-transparent"
              >
                Login Form <Lock className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("hasLoginForm")}
              </Button>
              <Select
                value={filters.hasLoginForm}
                onValueChange={(value) => onFilterChange("hasLoginForm", value)}
              >
                <SelectTrigger className="h-8 my-1">
                  {" "}
                  {/* Changed to my-1 for top and bottom margin */}
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleRowClick(item)}
              >
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.htmlVersion}</TableCell>
                <TableCell className="text-center">
                  {item.internalLinks}
                </TableCell>
                <TableCell className="text-center">
                  {item.externalLinks}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "font-medium",
                      item.brokenLinks > 0 ? "text-red-600" : "text-green-600"
                    )}
                  >
                    {item.brokenLinks}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-md",
                      item.hasLoginForm
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    )}
                  >
                    {item.hasLoginForm ? "Yes" : "No"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
