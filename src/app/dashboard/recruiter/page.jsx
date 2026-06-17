"use client";
import React from "react";
import { FileText, Person, Thunderbolt, CircleCheck } from "@gravity-ui/icons";
import { useSession } from "../../../lib/auth-client";
import StatsGrid from "../../../components/dashboard/StatsGrid"; // গ্রিড কম্পোনেন্ট ইম্পোর্ট করো
import RecentApplications from "../../../components/dashboard/RecentApplications";
import MyTopCompanies from "../../../components/dashboard/MyTopCompanies";
import { Spinner } from "@heroui/react";

const RecruiterDashBoardPage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center bg-[#09090b]">
        <Spinner label="Loading dashboard..." color="primary" size="lg" />
      </div>
    );
  }
  const user = session?.user;
  console.log("data from recruiter page:", session);

  // শুধুমাত্র রিক্রুটারের ডাটা ফিড
  const recruiterStats = [
    { title: "Total Job Posts", value: "48", icon: FileText },
    { title: "Total Applicants", value: "1,284", icon: Person },
    { title: "Active Jobs", value: "18", icon: Thunderbolt },
    { title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];

  return (
    <div>
      <div className="text-xl font-medium px-4 py-3 md:px-6 md:py-4 text-zinc-400">
        <h2>welcome back {user?.name}</h2>
      </div>

      <div className="p-4 md:p-6 bg-[#09090b]">
        <h2 className="text-xl font-medium mb-6 text-zinc-400">
          Recruiter Overview
        </h2>

        {/* ম্যাজিক! শুধু ডাটা পাঠিয়ে দিলে কম্পোনেন্ট নিজেই বাকি কাজ করে নিবে */}
        <StatsGrid items={recruiterStats} />
      </div>

      {/* page.jsx এর ভেতরে স্ট্যাটাসের ঠিক নিচে বসবে: */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 p-4 md:p-6 bg-[#09090b]">
        {/* বাম পাশের বড় অংশ: টেবিল সেকশন (৩ ভাগের ২ ভাগ জায়গা নেবে) */}
        <div className="lg:col-span-2">
          <RecentApplications />
        </div>

        {/* ডান পাশের ছোট অংশ: টপ কোম্পানি সেকশন (৩ ভাগের ১ ভাগ জায়গা নেবে) */}
        <div>
          <MyTopCompanies />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashBoardPage;
