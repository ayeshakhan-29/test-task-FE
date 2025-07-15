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
                onClick={() => onSort("page_title")}
                className="px-0 hover:bg-transparent"
              >
                Title {getSortIcon("page_title")}
              </Button>
              <Input
                placeholder="Filter title"
                value={filters.page_title}
                onChange={(e) => onFilterChange("page_title", e.target.value)}
                className="h-8 my-1 placeholder:text-sm lg:placeholder:text-base"
              />
            </TableHead>
            <TableHead className="min-w-[80px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("h1")}
                className="px-0 hover:bg-transparent"
              >
                H1 {getSortIcon("h1")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[80px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("h2")}
                className="px-0 hover:bg-transparent"
              >
                H2 {getSortIcon("h2")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[80px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("h3")}
                className="px-0 hover:bg-transparent"
              >
                H3 {getSortIcon("h3")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[80px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("h4")}
                className="px-0 hover:bg-transparent"
              >
                H4 {getSortIcon("h4")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[80px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("h5")}
                className="px-0 hover:bg-transparent"
              >
                H5 {getSortIcon("h5")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[80px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("h6")}
                className="px-0 hover:bg-transparent"
              >
                H6 {getSortIcon("h6")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[120px]">
              <Button
                variant="ghost"
                onClick={() => onSort("html_version")}
                className="px-0 hover:bg-transparent"
              >
                HTML Version {getSortIcon("html_version")}
              </Button>
              <Input
                placeholder="Filter version"
                value={filters.html_version}
                onChange={(e) => onFilterChange("html_version", e.target.value)}
                className="h-8 my-1 placeholder:text-sm lg:placeholder:text-base"
              />
            </TableHead>
            <TableHead className="min-w-[100px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("internal_links")}
                className="px-0 hover:bg-transparent"
              >
                Internal <LinkIcon className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("internal_links")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[100px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("external_links")}
                className="px-0 hover:bg-transparent"
              >
                External <ExternalLink className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("external_links")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[100px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("inaccessible_links")}
                className="px-0 hover:bg-transparent"
              >
                Broken <XCircle className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("inaccessible_links")}
              </Button>
              <div className="h-8 my-1" />
            </TableHead>
            <TableHead className="min-w-[120px] text-center">
              <Button
                variant="ghost"
                onClick={() => onSort("has_login_form")}
                className="px-0 hover:bg-transparent"
              >
                Login Form <Lock className="ml-1 h-4 w-4" />{" "}
                {getSortIcon("has_login_form")}
              </Button>
              <Select
                value={filters.has_login_form}
                onValueChange={(value) =>
                  onFilterChange("has_login_form", value)
                }
              >
                <SelectTrigger className="h-8 my-1">
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
                colSpan={12}
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
                <TableCell className="font-medium">
                  {item.page_title.length > 50
                    ? `${item.page_title.substring(0, 40)}...`
                    : item.page_title}
                </TableCell>
                <TableCell className="text-center">{item.h1}</TableCell>
                <TableCell className="text-center">{item.h2}</TableCell>
                <TableCell className="text-center">{item.h3}</TableCell>
                <TableCell className="text-center">{item.h4}</TableCell>
                <TableCell className="text-center">{item.h5}</TableCell>
                <TableCell className="text-center">{item.h6}</TableCell>
                <TableCell>{item.html_version}</TableCell>
                <TableCell className="text-center">
                  {item.internal_links}
                </TableCell>
                <TableCell className="text-center">
                  {item.external_links}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "font-medium",
                      (item.inaccessible_links?.length || 0) > 0
                        ? "text-red-600"
                        : "text-green-600"
                    )}
                  >
                    {item.inaccessible_links?.length || 0}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-md",
                      item.has_login_form
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    )}
                  >
                    {item.has_login_form ? "Yes" : "No"}
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
