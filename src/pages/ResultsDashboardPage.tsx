"use client";

import { useState, useMemo } from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultsTable } from "@/components/results-dashboard/results-table";
import { PaginationControls } from "@/components/results-dashboard/pagination-controls";
import type {
  AnalyzedUrl,
  SortConfig,
  Filters,
} from "@/lib/validations/results";

import { useNavigate } from "react-router-dom";
import { dummyResults } from "@/lib/data/results-data";
import { motion } from "framer-motion";

const ALL_RESULTS = dummyResults; // Use the pre-generated dummy results

export function ResultsDashboard() {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [filters, setFilters] = useState<Filters>({
    title: "",
    htmlVersion: "",
    hasLoginForm: "all",
  });
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

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

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page on page size change
  };

  const handleRowClick = (url: AnalyzedUrl) => {
    console.log("Clicked URL for details:", url);
    navigate(`/details/${url.id}`); // Navigate to the details page
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = ALL_RESULTS.filter((item) => {
      // Global search
      const globalMatch = globalSearchTerm
        ? Object.values(item).some((value) =>
            String(value).toLowerCase().includes(globalSearchTerm.toLowerCase())
          )
        : true;

      // Per-column filters
      const titleMatch = item.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      const htmlVersionMatch = item.htmlVersion
        .toLowerCase()
        .includes(filters.htmlVersion.toLowerCase());
      const loginFormMatch =
        filters.hasLoginForm === "all"
          ? true
          : filters.hasLoginForm === "true"
          ? item.hasLoginForm
          : !item.hasLoginForm;

      return globalMatch && titleMatch && htmlVersionMatch && loginFormMatch;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          // Sort booleans: false before true for asc, true before false for desc
          if (sortConfig.direction === "asc") {
            return aValue === bValue ? 0 : aValue ? 1 : -1;
          } else {
            return aValue === bValue ? 0 : aValue ? -1 : 1;
          }
        }
        return 0;
      });
    }

    return filtered;
  }, [globalSearchTerm, filters, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

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
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <BarChart3 className="h-6 w-6" />
            </motion.div>
            <motion.h2
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Results Dashboard
            </motion.h2>
          </motion.div>
        </CardHeader>

        <CardContent>
          <ResultsTable
            data={paginatedData}
            sortConfig={sortConfig}
            onSort={handleSort}
            filters={filters}
            onFilterChange={handleFilterChange}
            onRowClick={handleRowClick}
            globalSearchTerm={globalSearchTerm}
            onGlobalSearchChange={handleGlobalSearchChange}
          />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            totalItems={filteredAndSortedData.length}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
