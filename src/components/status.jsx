"use client";

import React from "react";

// ১. কার্ডগুলোর জন্য নিখুঁত কাস্টম SVG আইকনসমূহ
const ActiveJobsIcon = () => (
  <svg
    className="w-6 h-6 text-zinc-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const CompaniesIcon = () => (
  <svg
    className="w-6 h-6 text-zinc-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const JobSeekersIcon = () => (
  <svg
    className="w-6 h-6 text-zinc-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7a3 3 0 110 6 3 3 0 010-6z"
    />
  </svg>
);

const SatisfactionIcon = () => (
  <svg
    className="w-6 h-6 text-zinc-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.381-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

export default function Status() {
  // কার্ডের ডাটা অ্যারে
  const statsData = [
    {
      icon: <ActiveJobsIcon />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: <CompaniesIcon />,
      value: "12K",
      label: "Companies",
    },
    {
      icon: <JobSeekersIcon />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: <SatisfactionIcon />,
      value: "97%",
      label: "Satisfaction Rate", // স্পেলিং মিস্টেক ঠিক করে দেওয়া হয়েছে (Satisfication -> Satisfaction)
    },
  ];

  return (
    // সম্পূর্ণ কম্পোনেন্টটি ব্যাকগ্রাউন্ড ট্রান্সপারেন্ট রাখা হয়েছে
    <div className="w-full bg-transparent mb-20 flex flex-col items-center justify-center px-4">
      {/* ১. স্ট্যাটাস সেকশনের মেইন হেডিং শিরোনাম */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-200 tracking-tight text-center max-w-3xl leading-relaxed">
        Assisting over{" "}
        <span className="text-white font-bold">15,000 job seekers</span> find
        their dream positions.
      </h2>

      {/* ২. ৪-কলামের গ্রিড লেআউট (মোবাইলে ১টি, ট্যাবে ২টি, ডেক্সটপে ৪টি কার্ড দেখাবে) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-14">
        {statsData.map((stat, index) => (
          <div
            key={index}
            // গ্লাসি লুক দেওয়ার জন্য bg-[#0d0d0f]/60 এবং backdrop-blur ব্যবহার করা হয়েছে
            className="bg-[#0d0d0f]/60 border border-zinc-800/50 backdrop-blur-md rounded-[22px] p-7 flex flex-col justify-between items-start h-[200px] transition-all duration-300 hover:border-zinc-700/80 shadow-xl"
          >
            {/* আইকন কন্টেইনার */}
            <div className="p-1.5 bg-zinc-900/40 rounded-lg border border-zinc-800/30">
              {stat.icon}
            </div>

            {/* টেক্সট কন্টেইনার (সংখ্যা এবং লেবেল) */}
            <div className="flex flex-col items-start mt-4">
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-zinc-400 mt-2.5 tracking-wide">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
