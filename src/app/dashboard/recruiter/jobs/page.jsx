import React from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { getCompanyJobs } from "../../../../lib/api/jobs";
import { getLoggedInRecruiterCompany } from "../../../../lib/api/companies";

export default async function ManageJobsTable() {
  let jobsData = [];

  try {
    //  ২. সরাসরি লগইন থাকা কোম্পানির ডাটা আনা হলো
    const company = await getLoggedInRecruiterCompany();

    // কোম্পানি পাওয়া গেলে তার আন্ডারে থাকা সব জবস নিয়ে আসা হলো
    if (company?._id) {
      const response = await getCompanyJobs(company._id);
      jobsData = Array.isArray(response) ? response : [];
    }
  } catch (error) {
    console.error("Problem loading jobs on server:", error);
    jobsData = [];
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Manage Posted Jobs</h3>
      </div>

      <Table className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-2">
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage Jobs Table" className="min-w-150">
            <Table.Header>
              <Table.Column
                isRowHeader
                className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3"
              >
                Job Title
              </Table.Column>
              <Table.Column className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3">
                Category
              </Table.Column>
              <Table.Column className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3">
                Deadline
              </Table.Column>
              <Table.Column className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3">
                Status
              </Table.Column>
              <Table.Column className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {/*  ৩. ডাটা না থাকলে এই মেসেজটি দেখাবে */}
              {jobsData.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={5}
                    className="text-center text-zinc-500 py-8 text-sm"
                  >
                    No jobs found.
                  </Table.Cell>
                </Table.Row>
              ) : (
                // ডাটা থাকলে ম্যাপ হয়ে লুপ চলবে
                jobsData.map((job) => (
                  <Table.Row
                    key={job._id}
                    className="border-b border-zinc-900/50 last:border-0 hover:bg-zinc-800/20 transition-colors"
                  >
                    <Table.Cell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {job.jobTitle}
                        </span>
                        <span className="text-xs text-zinc-500 capitalize mt-0.5">
                          {job.jobType ? job.jobType.replace("-", " ") : ""}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="text-zinc-300 capitalize">
                      {job.jobCategory}
                    </Table.Cell>

                    <Table.Cell className="text-zinc-400">
                      {job.deadline}
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        color={job.status === "active" ? "success" : "default"}
                        size="sm"
                        variant="flat"
                        className="capitalize"
                      >
                        {job.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-white transition"
                          title="View Details"
                        >
                          <Eye width={18} height={18} />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-blue-400 transition"
                          title="Edit"
                        >
                          <Pencil width={18} height={18} />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-red-500 transition"
                          title="Delete"
                        >
                          <TrashBin width={18} height={18} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
