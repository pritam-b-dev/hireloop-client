import React from "react";

import { getJobs } from "../../lib/api/jobs";
import Navbar from "../../components/AuthNav";
import JobContainer from "../../components/jobs/JobContainer";

export default async function PublicJobsPage() {
  let jobsData = [];

  try {
    jobsData = (await getJobs()) || [];
  } catch (error) {
    console.error("Error loading jobs:", error);
    jobsData = [];
  }

  return (
    <>
      <Navbar />
      <JobContainer initialJobs={jobsData} />
    </>
  );
}
