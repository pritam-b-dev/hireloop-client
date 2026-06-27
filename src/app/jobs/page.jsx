import React from "react";

import { getJobs } from "../../lib/api/jobs";
import Navbar from "../../components/AuthNav";
import JobContainer from "../../components/jobs/JobContainer";

export default async function PublicJobsPage({ searchParams }) {
  const searchQuery = await searchParams;

  let jobs = [];

  const querySearch = new URLSearchParams(searchQuery);
  const queryString = querySearch.toString();

  try {
    jobs = (await getJobs(queryString)) || [];
  } catch (error) {
    console.error("Error loading jobs:", error);
    jobs = [];
  }

  return (
    <>
      <Navbar />
      <JobContainer searchQuery={searchQuery} jobs={jobs} />
    </>
  );
}
