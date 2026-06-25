import React from "react";
import { getCompanies } from "../../../../lib/api/companies";
import CompaniesTable from "../../../../components/dashboard/CompaniesTable";

const AdminCompaniesPage = async () => {
  // ১. সার্ভার সাইড থেকে ডাটা ফেচিং
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#111113] p-6 text-white sm:p-10 font-sans">
      {/* ২. ফেচ করা ডাটা ক্লায়েন্ট কম্পোনেন্টে প্রপ্স (Props) হিসেবে পাঠিয়ে দিলাম */}
      <CompaniesTable initialCompanies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;
