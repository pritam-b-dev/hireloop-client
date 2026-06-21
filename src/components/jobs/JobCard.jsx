import React from "react";

export default function JobCard({ job = {} }) {
  const currencySymbol = job?.currency?.toLowerCase() === "usd" ? "$" : "৳";

  const formatSalary = (amount) => {
    if (!amount) return "0";
    const num = Number(amount);
    return num >= 1000 ? `${num / 1000}k` : amount;
  };

  return (
    <div className="w-full max-w-md bg-[#121212] border border-zinc-800/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300">
      {/* ১. হেডার পার্ট: টাইটেল ও ডেসক্রিপশন */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
          {job.jobTitle || "Frontend Developer"}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-6 line-clamp-2">
          {job.responsibilities ||
            "Showcase your commitment to diversity and inclusion by highlighting initiatives"}
        </p>

        {/* ২. চিপস/ট্যাগস পার্ট (Flex Wrap ব্যবহার করা হয়েছে যাতে রেসপনসিভ হয়) */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {/* লোকেশন ট্যাগ */}
          <div className="inline-flex items-center gap-1.5 bg-[#1a1a1a] text-zinc-300 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border border-zinc-800/40">
            <svg
              className="w-4 h-4 text-fuchsia-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate max-w-[150px]">
              {job.location || "New York, USA"}
            </span>
          </div>

          {/* জব টাইপ ট্যাগ */}
          <div className="inline-flex items-center gap-1.5 bg-[#1a1a1a] text-zinc-300 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border border-zinc-800/40 capitalize">
            <svg
              className="w-4 h-4 text-fuchsia-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {job.jobType ? job.jobType.replace("-", " ") : "Hybrid"}
          </div>

          {/* স্যালারি ট্যাগ */}
          <div className="inline-flex items-center gap-1.5 bg-[#1a1a1a] text-zinc-300 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border border-zinc-800/40">
            <svg
              className="w-4 h-4 text-fuchsia-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {job.salaryMin && job.salaryMax ? (
              <span>
                {currencySymbol}
                {formatSalary(job.salaryMin)}–{currencySymbol}
                {formatSalary(job.salaryMax)}/year
              </span>
            ) : (
              <span>€25–€40/hour</span>
            )}
          </div>
        </div>
      </div>

      {/* ৩. অ্যাকশন পার্ট: Apply Now বাটন */}
      <div>
        <button className="inline-flex items-center gap-2 text-white hover:text-zinc-300 font-medium text-base md:text-lg transition-colors group">
          Apply Now
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
