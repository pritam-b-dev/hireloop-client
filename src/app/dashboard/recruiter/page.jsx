"use client";
import React from "react";
import { FileText, Person, Thunderbolt, CircleCheck } from "@gravity-ui/icons";
import { useSession } from "../../../lib/auth-client";
import StatsGrid from "../../../components/dashboard/StatsGrid"; // গ্রিড কম্পোনেন্ট ইম্পোর্ট করো

const RecruiterDashBoardPage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
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
      <div className="text-xl font-medium  p-4 text-zinc-400">
        <h2>welcome back {user?.name}</h2>
      </div>

      <div className="p-6 bg-[#09090b]">
        <h2 className="text-xl font-medium mb-6 text-zinc-400">
          Recruiter Overview
        </h2>

        {/* ম্যাজিক! শুধু ডাটা পাঠিয়ে দিলে কম্পোনেন্ট নিজেই বাকি কাজ করে নিবে */}
        <StatsGrid items={recruiterStats} />
      </div>
    </div>
  );
};

export default RecruiterDashBoardPage;
