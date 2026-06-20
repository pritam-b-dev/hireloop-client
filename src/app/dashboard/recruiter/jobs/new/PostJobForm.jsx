"use client";

import React, { useState } from "react";

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
  toast,
  Spinner,
} from "@heroui/react";

import { Briefcase, Pin, Check, CircleInfo } from "@gravity-ui/icons";
import { createJob } from "../../../../../lib/actions/jobs";
import { useRouter } from "next/navigation";

export default function PostJobForm({ company }) {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recruiterCompany = company;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsLoading(true);

    const formData = new FormData(form);

    const finalJobData = {
      ...Object.fromEntries(formData),
      isRemote: isRemote,
      companyId: recruiterCompany._id,
      companyName: recruiterCompany.name,
      companyLogo: recruiterCompany.logo,
      status: "active",
    };

    try {
      //সরাসরি fetch-এর বদলে  /lib/action/jobs.js থেকে কল করা হলো এবং সেখানে POST method দিয়ে ডাটা চলে গেল ব্যাকএন্ড হয়ে ডাটাবেজে।
      const result = await createJob(finalJobData);

      // যেহেতু action/jobs.js থেকে res.json() রিটার্ন করা হচ্ছে, তাই result এ আমরা তা পেয়ে যাচ্ছি।
      if (result.insertedId) {
        console.log("Published Job Data:", result);
        toast.success("Job Posted Successfully!");
        form.reset();
        router.push("/dashboard/recruiter/jobs");
      } else {
        toast.warning("Failed to post job. Server error.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Something went wrong!");
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

  if (!recruiterCompany?._id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          No Company Profile Found
        </h3>
        <p className="text-zinc-400 max-w-md text-sm">
          Creat a company profile first to post a job!
        </p>
      </div>
    );
  }

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

            {/* নেটিভ HTML সিলেক্ট */}
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

          {/* Location / Remote (Switch) */}
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
            spinner={<Spinner color="current" size="sm" />}
            className="bg-white text-black font-bold hover:bg-zinc-200 px-10 rounded-xl h-10"
          >
            {isLoading ? null : "Post Job Now"}
          </Button>
        </Fieldset.Actions>
      </Form>
    </div>
  );
}
