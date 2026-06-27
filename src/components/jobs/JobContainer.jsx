"use client";
import React, { useEffect, useState } from "react";
import JobFilterBar from "./JobFilterBar";
import JobCard from "./JobCard";
import { useRouter } from "next/navigation";

export default function JobContainer({ searchQuery, jobs }) {
  const router = useRouter();
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

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, filters.jobType, filters.category, filters.search]);

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
    </div>
  );
}
