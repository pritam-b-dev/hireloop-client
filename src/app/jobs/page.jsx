import React from "react";

import { getJobs } from "../../lib/api/jobs";
import Navbar from "../../components/AuthNav";
import JobContainer from "../../components/jobs/JobContainer";

export default async function PublicJobsPage({ searchParams }) {
  const searchQuery = await searchParams;

  let jobs = [];
  let total = 0;

  const querySearch = new URLSearchParams(searchQuery);
  const queryString = querySearch.toString();

  try {
    const data = await getJobs(queryString);
    if (data) {
      jobs = data.jobs || [];
      total = data.total || 0;
    }
  } catch (error) {
    console.error("Error loading jobs:", error);
    jobs = [];
    total = 0;
  }

  return (
    <>
      <Navbar />
      <JobContainer searchQuery={searchQuery} jobs={jobs} total={total} />
    </>
  );
}
