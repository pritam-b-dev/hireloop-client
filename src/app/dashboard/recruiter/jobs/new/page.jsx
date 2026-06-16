"use client";

import React, { useState } from "react";
// ✅ শুধুমাত্র ভেরিফাইড HeroUI v3 কম্পোনেন্ট, কোনো আন-অফিসিয়াল বা ব্রোকেন ইমপোর্ট নেই!
import {
  Form,
  Fieldset,
  Description,
  TextField,
  Label,
  Input,
  TextArea,
  Button,
  FieldError,
} from "@heroui/react";

import { Briefcase, Pin, Check, CircleInfo } from "@gravity-ui/icons";

export default function PostJobForm() {
  const [isRemote, setIsRemote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recruiterCompany = {
    name: "Google Inc.",
    id: "comp_123",
    status: "Approved",
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const finalJobData = {};
    formData.forEach((value, key) => {
      finalJobData[key] = value.toString();
    });

    finalJobData.isRemote = isRemote;
    finalJobData.companyId = recruiterCompany.id;
    finalJobData.status = "active";

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Published Job Data:", finalJobData);
      alert("Job Posted Successfully! (v3 Compliant)");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // স্টাইলিং
  const labelClass = "text-zinc-300 font-medium text-sm mb-1 block";
  const inputClass =
    "bg-[#222222] border border-zinc-700/50 hover:border-zinc-600 rounded-xl text-white shadow-none focus:border-zinc-500 outline-none transition-colors w-full h-10 px-3";
  const textareaClass =
    "w-full bg-[#222222] border border-zinc-700/50 hover:border-zinc-600 rounded-xl p-3 text-sm text-white outline-none focus:border-zinc-500 transition-colors placeholder-zinc-500 min-h-[100px]";
  const selectClass =
    "bg-[#222222] border border-zinc-700/50 hover:border-zinc-600 rounded-xl text-white outline-none focus:border-zinc-500 transition-colors w-full h-10 px-3 cursor-pointer";

  return (
    <div className="max-w-4xl w-full mx-auto bg-[#18181B] rounded-2xl border border-zinc-800/50 overflow-hidden text-white font-sans shadow-2xl my-10">
      {/* হেডার */}
      <div className="p-8 border-b border-zinc-800/50 bg-[#1c1c1f]">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
          <Briefcase width={24} height={24} className="text-blue-500" />
          Post a New Job
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Fill in the details below to publish your job opening to the HireLoop
          community.
        </p>
      </div>

      <Form onSubmit={onSubmit} className="p-8 flex flex-col gap-10">
        {/* কোম্পানি ইনফো বক্স */}
        <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
              {recruiterCompany.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                Posting as Company
              </p>
              <p className="text-sm font-semibold text-white">
                {recruiterCompany.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
            <Check width={14} height={14} />
            {recruiterCompany.status}
          </div>
        </div>

        {/* সেকশন ১: Job Info */}
        <Fieldset className="w-full flex flex-col gap-4">
          <Fieldset.Legend className="text-lg font-semibold text-white">
            Job Information
          </Fieldset.Legend>
          <Description className="text-xs text-zinc-400">
            Basic details about the role.
          </Description>

          <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <TextField isRequired name="jobTitle">
              <Label className={labelClass}>Job Title</Label>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                className={inputClass}
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            {/* নেটিভ HTML সিলেক্ট (ক্র্যাশ-প্রুফ) */}
            <div className="flex flex-col">
              <label className={labelClass}>
                Job Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                name="jobCategory"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                name="jobType"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select Job Type
                </option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <TextField isRequired name="deadline">
              <Label className={labelClass}>Application Deadline</Label>
              <Input type="date" className={inputClass} />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>
          </Fieldset.Group>

          {/* Salary Range */}
          <Fieldset.Group className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <TextField isRequired name="salaryMin" type="number">
              <Label className={labelClass}>Min Salary</Label>
              <Input placeholder="0" className={inputClass} />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField isRequired name="salaryMax" type="number">
              <Label className={labelClass}>Max Salary</Label>
              <Input placeholder="0" className={inputClass} />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <div className="flex flex-col">
              <label className={labelClass}>
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                required
                name="currency"
                defaultValue="usd"
                className={selectClass}
              >
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="bdt">BDT (৳)</option>
              </select>
            </div>
          </Fieldset.Group>

          {/* Location / Remote (Tailwind Switch) */}
          <div className="mt-6 p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-300 font-medium">
                <Pin width={18} height={18} />
                Location Settings
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-zinc-400">
                  Remote Job
                </span>
              </label>
            </div>

            {!isRemote && (
              <TextField isRequired name="location">
                <Label className={labelClass}>Job Location</Label>
                <Input
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-xs mt-1" />
              </TextField>
            )}
          </div>
        </Fieldset>

        {/* সেকশন ২: Job Description */}
        <Fieldset className="w-full flex flex-col gap-4">
          <Fieldset.Legend className="text-lg font-semibold text-white">
            Job Description
          </Fieldset.Legend>
          <Description className="text-xs text-zinc-400 ">
            Describe the role and what you are looking for.
          </Description>

          <Fieldset.Group className="flex flex-col gap-6 mt-2">
            <TextField isRequired name="responsibilities">
              <Label className={labelClass}>Responsibilities</Label>
              <TextArea
                placeholder="List the key responsibilities for this role..."
                className={textareaClass}
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField isRequired name="requirements">
              <Label className={labelClass}>Requirements</Label>
              <TextArea
                placeholder="What skills and experience are needed?"
                className={textareaClass}
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField name="benefits">
              <Label className={labelClass}>Benefits (Optional)</Label>
              <TextArea
                placeholder="What perks do you offer? (e.g. Health insurance, flexible hours)"
                className={textareaClass}
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>
          </Fieldset.Group>
        </Fieldset>

        {/* ইনফো বক্স */}
        <div className="flex gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-blue-400 text-sm">
          <CircleInfo width={20} height={20} className="shrink-0" />
          <p>
            Once submitted, this job will be immediately visible to candidates.
            You can change the visibility later in your dashboard.
          </p>
        </div>

        {/* ফুটার অ্যাকশন বাটন */}
        <Fieldset.Actions className="flex justify-end gap-4 pt-6 border-t border-zinc-800/50">
          <Button
            type="reset"
            variant="bordered"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-900 px-8 rounded-xl h-10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="bg-white text-black font-bold hover:bg-zinc-200 px-10 rounded-xl h-10"
          >
            {isLoading ? "Posting..." : "Post Job Now"}
          </Button>
        </Fieldset.Actions>
      </Form>
    </div>
  );
}
