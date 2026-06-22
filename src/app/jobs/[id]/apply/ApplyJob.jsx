"use client";

import React, { useState } from "react";
import { Button, Input, Card, Spinner, Label, TextArea } from "@heroui/react";
import toast from "react-hot-toast";

const ApplyJob = ({ job }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeLink: "",
    portfolioLink: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      jobId: job?._id || job?.id,
      ...formData,
    };

    console.log("Application Payload:", payload);

    try {
      /*
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // এখানে সম্পূর্ণ ডাটা আইডিসহ পাঠানো হচ্ছে
      });
      */

      // ডামি সাকসেস স্টেট (টেস্টিং এর জন্য)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Application submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        resumeLink: "",
        portfolioLink: "",
        coverLetter: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-zinc-100 font-sans antialiased">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* বামদিকের জব সামারিカード */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-[#121212] border border-zinc-800/60 p-6 rounded-3xl shadow-xl">
            <p className="text-xs text-fuchsia-400 font-semibold tracking-wider uppercase mb-1">
              You are applying for
            </p>
            <h1 className="text-xl font-bold text-white mb-2 leading-tight">
              {job?.jobTitle}
            </h1>
            <p className="text-sm text-zinc-400 font-medium mb-4">
              {job?.companyName}
            </p>

            <div className="space-y-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Job Type:</span>
                <span className="capitalize text-zinc-200">
                  {job?.jobType?.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-zinc-200 truncate max-w-[120px]">
                  {job?.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="text-zinc-200">{job?.jobCategory}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ডানদিকের অ্যাপ্লিকেশন ফর্ম */}
        <div className="lg:col-span-2">
          <Card className="bg-[#121212] border border-zinc-800/60 p-6 md:p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#4f46e5] rounded-full"></span>
              Job Seeker Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  required
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  variant="bordered"
                  className="w-full"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <Input
                  required
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  variant="bordered"
                  className="w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  required
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+880 1xxx xxxxxx"
                  variant="bordered"
                  className="w-full"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Input
                  required
                  label="Resume Link (Google Drive/Dropbox)"
                  name="resumeLink"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  variant="bordered"
                  className="w-full"
                  value={formData.resumeLink}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Portfolio or LinkedIn URL (Optional)"
                name="portfolioLink"
                type="url"
                placeholder="https://linkedin.com/in/..."
                variant="bordered"
                className="w-full"
                value={formData.portfolioLink}
                onChange={handleChange}
              />

              {/* কাভার লেটার */}
              <div className="flex flex-col gap-2 w-full">
                <Label
                  htmlFor="cover-letter"
                  className="text-sm font-medium text-zinc-300"
                >
                  Cover Letter / Message to Hiring Manager
                </Label>
                <TextArea
                  required
                  id="cover-letter"
                  name="coverLetter"
                  placeholder="Briefly explain why you are a good fit for this role..."
                  rows={6}
                  style={{ resize: "vertical" }}
                  className="w-full bg-transparent border border-zinc-800 rounded-xl p-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#4f46e5] min-h-[140px] transition-colors"
                  value={formData.coverLetter}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-2">
                <Button
                  isDisabled={loading}
                  type="submit"
                  className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner color="white" size="sm" />
                      <span>Submitting Application...</span>
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
