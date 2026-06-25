import React from "react";
import { Table, Button, Chip } from "@heroui/react";
import { Calendar, ArrowUpRight, FileText } from "@gravity-ui/icons";
import { getUserSession } from "../../../../lib/core/session";
import { getApplicationByApplicant } from "../../../../lib/api/applications";

// তারিখ সুন্দর করে ফরম্যাট করার সাধারণ ফাংশন
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const JobSeekerApplicationsPage = async () => {
  // সার্ভার সাইড ডেটা ফেচিং
  const user = await getUserSession();
  const jobs = await getApplicationByApplicant(user.id);

  return (
    <div className="min-h-screen bg-black p-6 text-white sm:p-10">
      <div className="mb-8 flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          My Applications
        </h1>
        <Chip
          color="default"
          variant="faded"
          size="md"
          className="text-white border-default-200"
        >
          {jobs.length} Total
        </Chip>
      </div>

      <div className="rounded-xl border border-default-100 bg-neutral-900/20 p-2">
        {!jobs || jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-default-400">
            <p className="text-lg">You havent applied to any jobs yet.</p>
          </div>
        ) : (
          <Table className="dark text-white">
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Job Applications Table"
                className="min-w-[600px]"
              >
                <Table.Header>
                  <Table.Column
                    isRowHeader
                    className="bg-default-100 text-default-600 font-semibold"
                  >
                    JOB TITLE
                  </Table.Column>
                  <Table.Column className="bg-default-100 text-default-600 font-semibold">
                    COMPANY
                  </Table.Column>
                  <Table.Column className="bg-default-100 text-default-600 font-semibold">
                    DATE APPLIED
                  </Table.Column>
                  <Table.Column className="bg-default-100 text-default-600 font-semibold">
                    STATUS
                  </Table.Column>
                  <Table.Column className="bg-default-100 text-default-600 font-semibold text-right">
                    ACTIONS
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {jobs.map((job) => (
                    <Table.Row
                      key={job._id}
                      className="border-b border-default-100 hover:bg-default-50/50 transition-colors"
                    >
                      <Table.Cell className="font-medium text-white">
                        {job.jobTItle || job.jobTitle}
                      </Table.Cell>

                      <Table.Cell className="text-default-400">
                        {job.companyName}
                      </Table.Cell>

                      <Table.Cell className="text-default-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-default-400" />
                          {formatDate(job.createdAt)}
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <Chip size="sm" variant="flat" color="success">
                          Submitted
                        </Chip>
                      </Table.Cell>

                      <Table.Cell className="text-right">
                        <div className="flex justify-end gap-2">
                          {job.resumeLink && (
                            <Button
                              as="a"
                              href={job.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="sm"
                              variant="bordered"
                              radius="sm"
                              className="text-white border-default-200"
                              startContent={<FileText />}
                            >
                              Resume
                            </Button>
                          )}
                          {job.portfolioLink && (
                            <Button
                              as="a"
                              href={job.portfolioLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="sm"
                              variant="flat"
                              radius="sm"
                              className="bg-default-100 text-white hover:bg-default-200"
                              endContent={<ArrowUpRight />}
                            >
                              Portfolio
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
    </div>
  );
};

export default JobSeekerApplicationsPage;
