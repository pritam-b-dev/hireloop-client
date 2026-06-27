"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@heroui/react";
import JobFilterBar from "./JobFilterBar";
import JobCard from "./JobCard";
import { useRouter } from "next/navigation";

export default function JobContainer({ searchQuery, jobs, total }) {
  const [page, setPage] = useState(searchQuery.page || 1);
  const router = useRouter();

  const totalItems = total;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const [filters, setFilters] = useState({
    search: searchQuery.search,
    jobType: searchQuery.jobType || "all",
    category: searchQuery.jobCategory || "all",
  });
  useEffect(() => {
    const sp = new URLSearchParams();

    if (filters.search) {
      sp.set("search", filters.search);
    }

    if (filters.jobType !== "all") {
      sp.set("jobType", filters.jobType);
    }
    if (filters.category !== "all") {
      sp.set("jobCategory", filters.category);
    }
    if (page) {
      sp.set("page", page);
    }

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, filters.jobType, filters.category, filters.search, page]);

  // ফিল্টারিং লজিক
  // const filteredJobs = (initialJobs || []).filter((job) => {
  //   const title = job?.jobTitle || "";
  //   const company = job?.companyName || "";
  //   const searchKeyword = filters?.search || "";

  //   const matchesSearch =
  //     title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  //     company.toLowerCase().includes(searchKeyword.toLowerCase());

  //   const matchesType =
  //     filters.jobType === "all" || job?.jobType === filters.jobType;

  //   const matchesCategory =
  //     filters.category === "all" || job?.jobCategory === filters.category;

  //   return matchesSearch && matchesType && matchesCategory;
  // });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ফিল্টার বার */}
      <JobFilterBar
        onFilterChange={setFilters}
        initialValues={{
          search: filters.search,
          jobType: filters.jobType,
          category: filters.category,
        }}
      />

      {/* জবের লিস্ট রেন্ডার */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-items-center">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-zinc-500 col-span-full text-center py-10 text-sm">
            No jobs found matching your criteria.
          </p>
        )}
      </div>
      {jobs.length > 0 && (
        <Pagination className="w-full">
          <Pagination.Summary>
            Showing {startItem}-{endItem} of {totalItems} results
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => p - 1)}
              >
                <Pagination.PreviousIcon />
                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>
            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => p + 1)}
              >
                <span>Next</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      )}
    </div>
  );
}
