"use client";
import React, { useState, useEffect } from "react";
import { TextField, Label, Input, Select, ListBox } from "@heroui/react";

export default function JobFilterBar({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("all");

  // ডাটার সাথে ম্যাচ রেখে স্টেট পরিবর্তনের ইফেক্ট
  useEffect(() => {
    onFilterChange({
      search,
      jobType: jobType || "all",
      category: category || "all",
    });
  }, [search, jobType, category, onFilterChange]);

  return (
    <div className="w-full bg-[#121212] border border-zinc-800/80 rounded-3xl p-4 md:p-6 mb-8 flex flex-col gap-4 lg:flex-row lg:items-end justify-between shadow-2xl">
      {/* ১. সার্চ ইনপুট (TextField) */}
      <TextField
        value={search}
        onChange={setSearch}
        className="flex-1 flex flex-col gap-1.5 w-full"
      >
        <Label className="text-zinc-400 text-xs md:text-sm font-medium pl-1">
          Search Jobs
        </Label>
        <div className="relative w-full">
          <Input
            placeholder="Search by title, company..."
            className="w-full bg-[#1a1a1a] text-white placeholder-zinc-500 border border-zinc-800/60 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-fuchsia-500 transition-all duration-200"
          />
          <svg
            className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </TextField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
        {/* ফিল্টার ১: Job Type (full-time, part-time, contract) */}
        <Select
          value={jobType}
          onChange={setJobType}
          className="flex flex-col gap-1.5 min-w-[150px]"
        >
          <Label className="text-zinc-400 text-xs md:text-sm font-medium pl-1">
            Job Type
          </Label>
          <Select.Trigger className="w-full flex items-center justify-between bg-[#1a1a1a] text-white border border-zinc-800/60 rounded-2xl px-4 py-3 text-sm hover:border-zinc-700 transition-all capitalize">
            <Select.Value placeholder="All Types" />
            <Select.Indicator className="text-zinc-500 w-4 h-4 ml-2" />
          </Select.Trigger>
          <Select.Popover className="bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl min-w-[160px] p-1.5 z-50">
            <ListBox>
              <ListBox.Item
                id="all"
                textValue="All Types"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>All Types</Label>
              </ListBox.Item>
              <ListBox.Item
                id="full-time"
                textValue="Full-time"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>Full-time</Label>
              </ListBox.Item>
              <ListBox.Item
                id="part-time"
                textValue="Part-time"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>Part-time</Label>
              </ListBox.Item>
              <ListBox.Item
                id="contract"
                textValue="Contract"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>Contract</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* ফিল্টার ২: Category (engineering, management, design) */}
        <Select
          value={category}
          onChange={setCategory}
          className="flex flex-col gap-1.5 min-w-[160px]"
        >
          <Label className="text-zinc-400 text-xs md:text-sm font-medium pl-1">
            Category
          </Label>
          <Select.Trigger className="w-full flex items-center justify-between bg-[#1a1a1a] text-white border border-zinc-800/60 rounded-2xl px-4 py-3 text-sm hover:border-zinc-700 transition-all capitalize">
            <Select.Value placeholder="All Categories" />
            <Select.Indicator className="text-zinc-500 w-4 h-4 ml-2" />
          </Select.Trigger>
          <Select.Popover className="bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl min-w-[180px] p-1.5 z-50">
            <ListBox>
              <ListBox.Item
                id="all"
                textValue="All Categories"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>All Categories</Label>
              </ListBox.Item>
              <ListBox.Item
                id="engineering"
                textValue="Engineering"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>Engineering</Label>
              </ListBox.Item>
              <ListBox.Item
                id="management"
                textValue="Management"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>Management</Label>
              </ListBox.Item>
              <ListBox.Item
                id="design"
                textValue="Design"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-3 py-2 text-sm cursor-pointer"
              >
                <Label>Design</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
