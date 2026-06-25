"use client";

import React, { useState, useTransition } from "react";
import { Table, Button, Chip } from "@heroui/react";

import toast from "react-hot-toast";
import { updateCompany } from "../../lib/actions/companies";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "text-green-500";
    case "rejected":
      return "text-red-500";
    case "pending":
    default:
      return "text-amber-500";
  }
};

const CompaniesTable = ({ initialCompanies = [] }) => {
  const [companies, setCompanies] = useState(initialCompanies);

  const handleStatusChange = async (companyId, newStatus) => {
    setCompanies((prev) =>
      prev.map((c) => (c._id === companyId ? { ...c, status: newStatus } : c)),
    );

    const updatePromise = updateCompany(companyId, { status: newStatus });

    toast.promise(updatePromise, {
      loading: `Updating status to ${newStatus}...`,
      success: `Company ${newStatus} successfully!`,
      error: "Failed to update status. Please try again.",
    });

    try {
      await updatePromise;
    } catch (error) {
      console.error("Error:", error);
      window.location.reload();
    }
  };

  return (
    <>
      {/* হেডার অংশ */}
      <div className="mb-8 flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
          Companies
        </h1>
        <Chip
          color="default"
          variant="faded"
          size="md"
          className="text-white border-zinc-700 bg-zinc-800/50"
        >
          {companies.length} Total
        </Chip>
      </div>

      <div className="rounded-xl border border-zinc-800/60 bg-[#18181b] p-2 shadow-2xl">
        {companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
            <p className="text-lg">No companies available for review.</p>
          </div>
        ) : (
          <Table variant="secondary" className="dark text-white">
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Admin Companies Table"
                className="min-w-[900px]"
              >
                <Table.Header>
                  <Table.Column
                    isRowHeader
                    className="bg-[#1c1c1f] text-zinc-400 font-semibold text-xs tracking-wide py-4 border-b border-zinc-800/80"
                  >
                    Company Name
                  </Table.Column>
                  <Table.Column className="bg-[#1c1c1f] text-zinc-400 font-semibold text-xs tracking-wide py-4 border-b border-zinc-800/80">
                    Jobs Posted
                  </Table.Column>
                  <Table.Column className="bg-[#1c1c1f] text-zinc-400 font-semibold text-xs tracking-wide py-4 border-b border-zinc-800/80">
                    Industry
                  </Table.Column>
                  <Table.Column className="bg-[#1c1c1f] text-zinc-400 font-semibold text-xs tracking-wide py-4 border-b border-zinc-800/80">
                    Status
                  </Table.Column>
                  <Table.Column className="bg-[#1c1c1f] text-zinc-400 font-semibold text-xs tracking-wide py-4 border-b border-zinc-800/80">
                    Date Submitted
                  </Table.Column>
                  <Table.Column className="bg-[#1c1c1f] text-zinc-400 font-semibold text-xs tracking-wide py-4 border-b border-zinc-800/80 text-right">
                    Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {companies.map((company) => (
                    <Table.Row
                      key={company._id}
                      className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* কোম্পানি লোগো ও নাম */}
                      <Table.Cell className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-9 w-9 rounded-md bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-zinc-700/50">
                            {company.logo ? (
                              <img
                                src={company.logo}
                                alt={company.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold text-zinc-400 uppercase">
                                {company.name?.substring(0, 2)}
                              </span>
                            )}
                          </div>
                          <span className="font-medium text-zinc-200">
                            {company.name}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* রিক্রুটার আইডি */}
                      <Table.Cell>
                        <Chip
                          variant="flat"
                          size="sm"
                          className="bg-zinc-800 text-zinc-300"
                        >
                          {company.jobCount || 0} Jobs
                        </Chip>
                      </Table.Cell>

                      {/* ইন্ডাস্ট্রি */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs px-2"
                        >
                          {company.industry || "N/A"}
                        </Chip>
                      </Table.Cell>

                      {/* স্ট্যাটাস ও গ্লোয়িং ডট */}
                      <Table.Cell>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${company.status === "Approved" ? "bg-green-500" : company.status === "Rejected" ? "bg-red-500" : "bg-amber-500"}`}
                          ></span>
                          <span className={getStatusColor(company.status)}>
                            {company.status}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* সাবমিশনের তারিখ */}
                      <Table.Cell className="text-zinc-400 text-sm">
                        {formatDate(company.createdAt)}
                      </Table.Cell>

                      {/* ডাইনামিক অ্যাকশন বাটনসমূহ */}
                      <Table.Cell className="text-right">
                        <div className="flex justify-end gap-3">
                          {company.status !== "Approved" && (
                            <Button
                              size="sm"
                              variant="bordered"
                              className="border-green-900/60 text-green-500 hover:bg-green-500/10 min-w-[80px]"
                              onClick={() =>
                                handleStatusChange(company._id, "Approved")
                              }
                            >
                              Approve
                            </Button>
                          )}

                          {company.status !== "Rejected" && (
                            <Button
                              size="sm"
                              variant="bordered"
                              className="border-red-900/60 text-red-500 hover:bg-red-500/10 min-w-[80px]"
                              onClick={() =>
                                handleStatusChange(company._id, "Rejected")
                              }
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
      </div>
    </>
  );
};

export default CompaniesTable;
