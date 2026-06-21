import React from "react";
import Link from "next/link";
import { getJobById } from "../../../lib/api/jobs";
import Navbar from "../../../components/AuthNav";

const Page = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  // যদি কোনো কারণে ব্যাকএন্ড থেকে জব না পাওয়া যায়
  if (!job || !job.jobTitle) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-semibold text-zinc-400 mb-4">
            Job Details Not Found!
          </h2>
          <Link
            href="/jobs"
            className="text-fuchsia-400 hover:underline text-sm"
          >
            ← Back to All Jobs
          </Link>
        </div>
      </>
    );
  }

  // স্যালারি এবং কারেন্সি ফরম্যাটার
  const currencySymbol = job?.currency?.toLowerCase() === "usd" ? "$" : "৳";
  const formatSalary = (amount) => {
    if (!amount) return "0";
    const num = Number(amount);
    return num >= 1000 ? `${num / 1000}k` : amount;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans antialiased">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* ১. ব্যাক বাটন */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Jobs
          </Link>

          {/* ২. মেইন গ্রিড লেআউট */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* বাম দিকের বড় কলাম: জবের মেইন ডিটেইলস */}
            <div className="lg:col-span-2 space-y-8">
              {/* হেডার সেকশন */}
              <div className="bg-[#121212] border border-zinc-800/60 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  {job.companyLogo && (
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-8 h-8 rounded-xl object-contain bg-zinc-800/40 p-1"
                    />
                  )}
                  <span className="text-zinc-400 text-sm md:text-base font-medium">
                    {job.companyName}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                  {job.jobTitle}
                </h1>

                {/* কুইক ট্যাগস */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 bg-[#1a1a1a] text-zinc-300 text-xs rounded-full border border-zinc-800/40 capitalize">
                    {job.jobType?.replace("-", " ")}
                  </span>
                  <span className="px-3.5 py-1.5 bg-[#1a1a1a] text-zinc-300 text-xs rounded-full border border-zinc-800/40 capitalize">
                    {job.jobCategory}
                  </span>
                  {job.isRemote && (
                    <span className="px-3.5 py-1.5 bg-fuchsia-500/10 text-fuchsia-400 text-xs rounded-full border border-fuchsia-500/20">
                      Remote
                    </span>
                  )}
                </div>
              </div>

              {/* ডেসক্রিপশন ও অন্যান্য সেকশন */}
              <div className="bg-[#121212] border border-zinc-800/60 rounded-3xl p-6 md:p-8 space-y-8">
                {/* Responsibilities */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-fuchsia-500 rounded-full"></span>
                    Job Description & Responsibilities
                  </h3>
                  <p className="text-zinc-400 text-base font-light leading-relaxed whitespace-pre-line">
                    {job.responsibilities}
                  </p>
                </div>

                <hr className="border-zinc-800/60" />

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-fuchsia-500 rounded-full"></span>
                    Requirements
                  </h3>
                  <p className="text-zinc-400 text-base font-light leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>

                {job.benefits && (
                  <>
                    <hr className="border-zinc-800/60" />
                    {/* Benefits */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-fuchsia-500 rounded-full"></span>
                        Benefits & Perks
                      </h3>
                      <p className="text-zinc-400 text-base font-light leading-relaxed whitespace-pre-line">
                        {job.benefits}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ডান দিকের ছোট কলাম: সাইডবার (স্যালারি ও কুইক ইনফো) */}
            <div className="space-y-6">
              {/* স্যালারি ও অ্যাকশন কার্ড */}
              <div className="bg-[#121212] border border-zinc-800/60 rounded-3xl p-6 md:p-8 text-center">
                <p className="text-zinc-500 text-sm font-medium mb-1">
                  Offered Salary
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {currencySymbol}
                  {formatSalary(job.salaryMin)} – {currencySymbol}
                  {formatSalary(job.salaryMax)}
                  <span className="text-sm text-zinc-500 font-light block mt-1">
                    per year
                  </span>
                </h2>

                {/* 🆕 বাটন বদলে Link ট্যাগ যুক্ত করা হলো */}
                <Link
                  href={`/jobs/${job._id}/apply`}
                  className="w-full block text-center bg-white hover:bg-zinc-200 text-black font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-lg active:scale-[0.98]"
                >
                  Apply For This Job
                </Link>
              </div>

              {/* জবের শর্ট ওভারভিউ কার্ড */}
              <div className="bg-[#121212] border border-zinc-800/60 rounded-3xl p-6 space-y-4">
                <h4 className="text-white font-medium text-sm border-b border-zinc-800/60 pb-2">
                  Job Overview
                </h4>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Location</span>
                  <span
                    className="text-zinc-300 font-light text-right max-w-[180px] truncate"
                    title={job.location}
                  >
                    {job.location}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Job Type</span>
                  <span className="text-zinc-300 font-light capitalize">
                    {job.jobType?.replace("-", " ")}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Deadline</span>
                  <span className="text-rose-400 font-medium">
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
