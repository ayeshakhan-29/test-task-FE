"use client";

import { useState, useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ResultsTable } from "@/components/results-dashboard/results-table";
import { PaginationControls } from "@/components/results-dashboard/pagination-controls";
import type {
  AnalyzedUrl,
  SortConfig,
  Filters,
} from "@/lib/validations/results";
import { useAnalyzedUrls } from "@/hooks/useAnalyzedUrls";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";

export function ResultsDashboard() {
  // All hooks must be called at the top level
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "page_title",
    direction: "asc",
  });
  const [filters, setFilters] = useState<Filters>({
    page_title: "",
    html_version: "",
    has_login_form: "all",
  });
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Data fetching hook
  const { data: analyzedUrls = [], isLoading, error } = useAnalyzedUrls();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-destructive">
          Error loading results:{" "}
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </div>
    );
  }

  const handleSort = (key: keyof AnalyzedUrl) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Process and sort the results based on filters and sort config
  const processedResults = useMemo<AnalyzedUrl[]>(() => {
    if (!analyzedUrls || !Array.isArray(analyzedUrls)) {
      console.error("Invalid analyzedUrls data:", analyzedUrls);
      return [];
    }

    // Apply filters
    let results = analyzedUrls.filter((item: AnalyzedUrl) => {
      if (!item) return false;

      try {
        const itemTitle = String(item.page_title || "").toLowerCase();
        const searchTerm = String(globalSearchTerm || "").toLowerCase();
        const filterTitle = String(filters.page_title || "").toLowerCase();

        // Global search across all string fields
        const globalMatch =
          !searchTerm ||
          [item.url || "", item.page_title || ""].some((value) =>
            String(value || "")
              .toLowerCase()
              .includes(searchTerm)
          );

        const titleMatch =
          !filters.page_title || itemTitle.includes(filterTitle);

        const loginFormMatch =
          filters.has_login_form === "all" ||
          (filters.has_login_form === "true"
            ? item.has_login_form
            : !item.has_login_form);

        return globalMatch && titleMatch && loginFormMatch;
      } catch (err) {
        console.error("Error filtering item:", item, err);
        return false;
      }
    });

    // Apply sorting if sortConfig is provided
    if (sortConfig) {
      results = [...results].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle undefined/null values
        if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
        if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;

        // Sort numbers
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        // Sort strings
        const stringA = String(aValue).toLowerCase();
        const stringB = String(bValue).toLowerCase();

        return sortConfig.direction === "asc"
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      });
    }

    return results;
  }, [analyzedUrls, filters, globalSearchTerm, sortConfig]);

  const handleFilterChange = (key: keyof Filters, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleGlobalSearchChange = (term: string) => {
    setGlobalSearchTerm(term);
    setCurrentPage(1); // Reset to first page on global search change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (url: AnalyzedUrl) => {
    navigate(`/details/${url.id}`);
  };

  useEffect(() => {}, [processedResults]);

  const paginatedResults = useMemo(() => {
    if (!processedResults.length) return [];
    const startIndex = (currentPage - 1) * pageSize;
    return processedResults.slice(startIndex, startIndex + pageSize);
  }, [processedResults, currentPage, pageSize]);

  const totalPages = Math.max(1, Math.ceil(processedResults.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);
  const { isSidebarOpen } = useSidebar();

  return (
    <motion.div
      className="min-h-screen p-4 md:p-6 lg:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        className="flex flex-col space-y-4 w-full transition-all duration-200 ease-linear"
        style={{
          maxWidth: isSidebarOpen ? "calc(100vw - 22rem)" : "100vw",
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Results Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {processedResults.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Results</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {processedResults.filter((r) => r.has_login_form).length}
              </div>
              <p className="text-sm text-muted-foreground">With Login Form</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {
                  processedResults.filter(
                    (r) => r.inaccessible_links.length > 0
                  ).length
                }
              </div>
              <p className="text-sm text-muted-foreground">With Broken Links</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {new Date().toLocaleDateString()}
              </div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Crawl Results</h2>
            </div>
            <ResultsTable
              data={paginatedResults}
              sortConfig={sortConfig}
              onSort={handleSort}
              filters={filters}
              onFilterChange={handleFilterChange}
              onRowClick={handleRowClick}
              globalSearchTerm={globalSearchTerm}
              onGlobalSearchChange={handleGlobalSearchChange}
            />

            {paginatedResults.length > 0 ? (
              <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium">
                    {Math.min(
                      (currentPage - 1) * pageSize + 1,
                      processedResults.length
                    )}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, processedResults.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{processedResults.length}</span>{" "}
                  results
                </div>
                <div className="flex items-center space-x-1">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                    onPageSizeChange={(size) => {
                      setPageSize(size);
                      setCurrentPage(1);
                    }}
                    totalItems={processedResults.length}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
