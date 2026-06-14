"use client";

import React from "react";
import { Table, Chip, Avatar } from "@heroui/react";

// রিয়েল ডেটা এবং কাজ করার মতো ছবির লিংক
const applications = [
  {
    id: 1,
    name: "Julianne Moore",
    email: "julianne@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
    color: "success",
  },
  {
    id: 2,
    name: "Robert Downey",
    email: "robert@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
    color: "default",
  },
  {
    id: 3,
    name: "Emma Stone",
    email: "emma@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
    color: "warning",
  },
  {
    id: 4,
    name: "Chris Pratt",
    email: "chris@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Accepted",
    color: "primary",
  },
  {
    id: 5,
    name: "Scarlett Johansson",
    email: "scarlett@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    role: "Data Scientist",
    date: "Oct 20, 2023",
    experience: "3 years",
    status: "Rejected",
    color: "danger",
  },
];

export default function RecentApplications() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          Recent Applications
        </h3>
        <button className="text-sm text-zinc-400 hover:text-white transition">
          View all
        </button>
      </div>

      <Table className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-2">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Recent Applications Table"
            className="min-w-150"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3"
              >
                Candidate Name
              </Table.Column>
              <Table.Column
                isRowHeader
                className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3"
              >
                Role
              </Table.Column>
              <Table.Column
                isRowHeader
                className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3"
              >
                Date Applied
              </Table.Column>
              <Table.Column
                isRowHeader
                className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3"
              >
                Experience
              </Table.Column>
              <Table.Column
                isRowHeader
                className="text-zinc-400 bg-transparent border-b border-zinc-800/50 pb-3"
              >
                Status
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {applications.map((app) => (
                <Table.Row
                  key={app.id}
                  className="border-b border-zinc-900/50 last:border-0"
                >
                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="sm"
                        className={{
                          base: "bg-zinc-800 text-white text-xs font-semibold",
                        }}
                      >
                        <Avatar.Image src={app.avatar} alt={app.name} />
                        <Avatar.Fallback>{app.name.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-white">
                          {app.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {app.email}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-zinc-300">{app.role}</Table.Cell>
                  <Table.Cell className="text-zinc-400">{app.date}</Table.Cell>
                  <Table.Cell className="text-zinc-400">
                    {app.experience}
                  </Table.Cell>
                  <Table.Cell>
                    <Chip color={app.color} size="sm" variant="flat">
                      {app.status}
                    </Chip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
