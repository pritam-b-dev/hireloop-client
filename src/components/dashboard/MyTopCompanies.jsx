"use client";
import React from "react";
import { Button, Avatar } from "@heroui/react";

export default function MyTopCompanies() {
  const companies = [
    {
      id: 1,
      name: "Google Inc.",
      meta: "Technology • Mountain View",
      activeJobs: 24,
      // Google logo
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    },
    {
      id: 2,
      name: "Meta Platforms",
      meta: "Social Media • Menlo Park",
      activeJobs: 18,
      // Meta logo
      logo: "https://yt3.googleusercontent.com/iBn9KeDnKNffvLlHQXPjl8VNkhuMp8N7FPxf6n6dwI85cWH6SE4DsuDLchoQNJNb5KB9oIlyzw=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      id: 3,
      name: "Stripe",
      meta: "Fintech • San Francisco",
      activeJobs: 12,
      // Stripe logo
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    },
    {
      id: 4,
      name: "Tesla",
      meta: "Automotive • Austin",
      activeJobs: 31,
      // Tesla logo
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">My Top Companies</h3>
        <button className="text-sm text-zinc-400 hover:text-white transition">
          View all
        </button>
      </div>

      {/* মেইন কন্টেইনার কার্ড */}
      <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-5 flex flex-col gap-5">
        {/* লুপ চালিয়ে কোম্পানিগুলো দেখানো */}
        {companies.map((company) => (
          <div key={company.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* কোম্পানির লোগোর জন্য স্কয়ার সাইজের এভাটার */}
              <Avatar className="bg-zinc-800 text-white">
                {company.logo && (
                  <Avatar.Image
                    alt={company.name}
                    src={company.logo}
                    className="object-contain"
                  />
                )}

                <Avatar.Fallback className="text-xs font-semibold">
                  {company.name ? company.name.charAt(0).toUpperCase() : "C"}
                </Avatar.Fallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {company.name}
                </h4>
                <p className="text-xs text-zinc-500">{company.meta}</p>
              </div>
            </div>

            {/* ডান পাশের একটিভ জব কাউন্ট */}
            <div className="text-right">
              <span className="text-sm font-bold text-white block">
                {company.activeJobs}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Active Jobs
              </span>
            </div>
          </div>
        ))}

        {/* নিচের বড় বাটনটি */}
        <Button
          variant="bordered"
          className="border-zinc-800 text-zinc-300 w-full mt-2 hover:bg-zinc-900"
        >
          View All Companies
        </Button>
      </div>
    </div>
  );
}
