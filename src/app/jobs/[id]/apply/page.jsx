import React from "react";
import { getUserSession } from "../../../../lib/core/session";
import { redirect } from "next/navigation";
import NavBar from "../../../../components/NavBar";
import { getJobById } from "../../../../lib/api/jobs";
import ApplyJob from "./ApplyJob";
import { getApplicationByApplicant } from "../../../../lib/api/applications";

import Link from "next/link";

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
        <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased mt-20">
          <div className="max-w-xl mx-auto mt-24 px-4 text-center">
            <div className="bg-[#121212] border border-red-500/20 rounded-3xl p-8 shadow-xl">
              <p className="text-red-400 font-semibold text-lg mb-2">
                Access Denied
              </p>
              <p className="text-zinc-400 text-sm">
                Only job seekers can access this application page.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const rawApplications = await getApplicationByApplicant(
    user?._id || user?.id,
  );
  const applications = rawApplications || [];

  const plan = {
    name: "Free",
    maxApplicationsPerMonth: 3,
  };

  const job = await getJobById(id);
  const isLimitReached = applications.length >= plan.maxApplicationsPerMonth;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased pb-12 mt-25">
        <div className="max-w-5xl mx-auto mt-12 px-4">
          <div className="mb-8 p-6 bg-[#121212] border border-zinc-800/60 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider px-2.5 py-1 bg-indigo-500/10 rounded-full">
                {plan.name} Plan
              </span>
              <h2 className="text-lg font-bold text-white mt-2">
                Monthly Job Application Tracker
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl">
              <p className="text-sm font-medium text-zinc-400">
                Applied:{" "}
                <span
                  className={`font-bold ${isLimitReached ? "text-amber-400" : "text-emerald-400"}`}
                >
                  {applications.length}
                </span>{" "}
                / {plan.maxApplicationsPerMonth}
              </p>
              <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
            </div>
          </div>

          {isLimitReached ? (
            <div className="bg-[#121212] border border-amber-500/20 rounded-3xl p-8 text-center shadow-xl max-w-2xl mx-auto my-12">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ⚠️
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Application Limit Reached!
              </h3>
              <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
                You have already used your {plan.maxApplicationsPerMonth} free
                job applications for this month. Upgrade your plan to unlock
                unlimited job applications!
              </p>

              <Link
                href="/pricing"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/10 text-sm antialiased"
              >
                Upgrade to Premium
              </Link>
            </div>
          ) : (
            <ApplyJob applicant={user} job={job} />
          )}
        </div>
      </div>
    </>
  );
};

export default ApplyPage;
