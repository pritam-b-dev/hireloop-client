"use client";
import React, { useState } from "react";
import JobFilterBar from "./JobFilterBar";
import JobCard from "./JobCard";

export default function JobContainer({ initialJobs }) {
  const [filters, setFilters] = useState({
    search: "",
    jobType: "all",
    category: "all",
  });

  // ফিল্টারিং লজিক
  const filteredJobs = (initialJobs || []).filter((job) => {
    const title = job?.jobTitle || "";
    const company = job?.companyName || "";
    const searchKeyword = filters?.search || "";

    const matchesSearch =
      title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      company.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesType =
      filters.jobType === "all" || job?.jobType === filters.jobType;

    const matchesCategory =
      filters.category === "all" || job?.jobCategory === filters.category;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ফিল্টার বার */}
      <JobFilterBar onFilterChange={setFilters} />

      {/* জবের লিস্ট রেন্ডার */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-items-center">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} /> // 👈 ২. এখানে ডেমো div বাদ দিয়ে আসল JobCard বসিয়ে দিলাম
          ))
        ) : (
          <p className="text-zinc-500 col-span-full text-center py-10 text-sm">
            No jobs found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
