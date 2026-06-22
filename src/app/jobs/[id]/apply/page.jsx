import React from "react";
import { getUserSession } from "../../../../lib/core/session";
import { redirect } from "next/navigation";
import NavBar from "../../../../components/NavBar";
import { getJobById } from "../../../../lib/api/jobs";
import ApplyJob from "./ApplyJob";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }
  if (user?.role !== "seeker") {
    return (
      <>
        <NavBar />
        <div className="mt-30">only job seeker can see this.</div>
      </>
    );
  }

  const job = await getJobById(id);

  return (
    <>
      <NavBar />
      <div className="mt-30">
        <ApplyJob job={job} />
      </div>
    </>
  );
};

export default ApplyPage;
