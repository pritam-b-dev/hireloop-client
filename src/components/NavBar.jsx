"use client";

import React, { useState } from "react";
// HeroUI v3 এর শুধুমাত্র প্রধান দুটি উপাদান যা ১০০% কাজ করবে
import { Button, Link } from "@heroui/react";

export default function NavBar() {
  // মোবাইলের ড্রপডাউন মেনু ওপেন/ক্লোজ করার স্টেট
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Browse Jobs", "Company", "Pricing"];

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center w-full px-4">
      {/* মেইন নেভবার কন্টেইনার */}
      <div className="w-full max-w-6xl bg-[#222222] border border-zinc-800/60 shadow-2xl backdrop-blur-md rounded-[20px] h-16 flex items-center justify-between px-6 relative">
        {/* ১. বামপাশে: লোগো (আপনার কাস্টম লোগো এখানে বসিয়ে দেবেন) */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white flex items-center"
          >
            {/* আপনার লোগো ইমেজ বা আইকন এখানে দিন, আমি জাস্ট টেক্সট রাখলাম */}
            <span className="text-[#22a6f2]">hire</span>
            <span className="text-[#f35c23]">Loop</span>
          </Link>
        </div>

        {/* মাঝখানটা আপনার রিকোয়ারমেন্ট অনুযায়ী একদম ফাঁকা থাকবে */}

        {/* ২. ডানপাশে (DESKTOP LAYOUT): লিংক, ডিভাইডার এবং বাটন */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href="#"
              className="text-zinc-300 hover:text-white text-[15px] font-medium transition-colors"
            >
              {item}
            </Link>
          ))}

          {/* ছবির মতো এক্সাক্ট স্লিম ভার্টিক্যাল ডিভাইডার লাইন */}
          <div className="w-px h-5 bg-zinc-600"></div>

          <Link
            href="#"
            className="text-[#6366f1] hover:text-[#818cf8] text-[15px] font-semibold transition-colors"
          >
            Sign In
          </Link>

          <Button
            as={Link}
            href="#"
            className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium px-5 h-10 rounded-[12px] text-[15px] transition-all shadow-lg shadow-indigo-600/20"
          >
            Get Started
          </Button>
        </div>

        {/* ৩. ডানপাশে (MOBILE HAMBURGER MENU): মোবাইলের জন্য কাস্টম হ্যামবার্গার আইকন */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2 transition-transform duration-200 active:scale-95"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              // মেনু ওপেন থাকলে 'X' (Close) আইকন দেখাবে
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // মেনু ক্লোজ থাকলে '≡' (Hamburger) আইকন দেখাবে
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* ৪. মোবাইল রেসপন্সিভ ড্রপডাউন মেনু (মোবাইলে ক্লিক করলে নিচে নামবে) */}
        {isOpen && (
          <div className="absolute top-20 left-0 right-0 bg-[#121214]/98 border border-zinc-800/80 shadow-2xl backdrop-blur-lg rounded-[20px] p-6 flex flex-col gap-4 md:hidden">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-zinc-300 hover:text-white text-[16px] font-medium py-2 border-b border-zinc-800/40 last:border-none block transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}

            {/* মোবাইল মেনুর ভেতরের ডিভাইডার লাইন */}
            <div className="h-[1px] w-full bg-zinc-800/60 my-1"></div>

            <Link
              href="#"
              className="text-[#6366f1] hover:text-[#818cf8] text-[16px] font-semibold py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="#"
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium w-full h-11 rounded-[12px] text-[15px] mt-2 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
