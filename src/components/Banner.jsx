"use client";

import React from "react";
// HeroUI v3 এর নিরাপদ মডিউল
import { Button } from "@heroui/react";

// ব্যানার ডিজাইনের জন্য প্রয়োজনীয় কাস্টম আইকনসমূহ (SVGs)
const BriefcaseIcon = () => (
  <svg
    className="w-4 h-4 text-amber-600 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-zinc-500 mr-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-5 h-5 text-zinc-500 mr-3"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
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
);

export default function Banner() {
  const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ];

  return (
    // আপনার রিকোয়ারমেন্ট অনুযায়ী ব্যাকগ্রাউন্ড সম্পূর্ণ transparent রাখা হয়েছে
    // pt-36 দেওয়া হয়েছে যাতে ফিক্সড নেভবারের নিচে কন্টেন্ট সুন্দর স্পেসিং পায়
    <div className="w-full bg-transparent mt-40 flex flex-col items-center justify-center text-center px-4">
      {/* ১. টপ ক্যাপসুল ব্যাজ (50,000+ New Jobs) */}
      <div className="inline-flex items-center bg-[#18181c]/60 border border-zinc-800/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-xl">
        <BriefcaseIcon />
        <span className="text-sm font-semibold text-white mr-1.5">50,000+</span>
        <span className="text-sm font-medium text-zinc-400 tracking-wider text-[12px] uppercase">
          New Jobs This Month
        </span>
      </div>

      {/* ২. মেইন বড় হেডিং */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mt-8 max-w-4xl leading-[1.15]">
        Find Your Dream Job Today
      </h1>

      {/* ৩. সাবহেডিং ডিসক্রিপশন */}
      <p className="text-zinc-400 text-base sm:text-lg mt-5 max-w-2xl leading-relaxed font-normal">
        HireLoop connects top talent with world-class companies. Browse
        thousands of curated opportunities and land your next role — faster.
      </p>

      {/* ৪. সার্চ বার কন্টেইনার (ইমেজের মতো হুবহু গ্লসি ডার্ক বার) */}
      <div className="w-full max-w-3xl mt-10 bg-[#121214]/80 border border-zinc-850/80 rounded-2xl md:rounded-full p-2.5 flex flex-col md:flex-row items-center shadow-2xl backdrop-blur-md gap-3 md:gap-0">
        {/* জব টাইটেল ইনপুট */}
        <div className="flex items-center w-full flex-1 px-4 py-2 md:py-0">
          <SearchIcon />
          <input
            type="text"
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-[15px]"
          />
        </div>

        {/* মাঝখানের স্লিম ডিভাইডার লাইন */}
        <div className="hidden md:block w-[1px] h-8 bg-zinc-800 mx-2"></div>

        {/* লোকেশন ইনপুট */}
        <div className="flex items-center w-full flex-1 px-4 py-2 md:py-0">
          <LocationIcon />
          <input
            type="text"
            placeholder="Location or Remote"
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-[15px]"
          />
        </div>

        {/* সার্চ বাটন (ইমেজের মতো ব্রাইট পার্পল-ব্লু শেড) */}
        <Button
          isIconOnly
          className="w-full md:w-12 h-12 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl md:rounded-full shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center shrink-0"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Button>
      </div>

      {/* ৫. ট্রেন্ডিং পজিশন ট্যাগসমূহ */}
      <div className=" md:flex md:flex-wrap md:items-center md:justify-center gap-3 mt-6 text-sm space-y-2">
        <div className="text-emerald-300 font-bold mr-1">Trending Position</div>
        {trendingPositions.map((position, index) => (
          <div
            key={index}
            className="px-4 py-1.5 bg-[#18181b]/40 border border-zinc-850 rounded-full text-zinc-300 text-xs sm:text-sm hover:border-zinc-700 transition-colors cursor-pointer select-none"
          >
            {position}
          </div>
        ))}
      </div>
    </div>
  );
}
