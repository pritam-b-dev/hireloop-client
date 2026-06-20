"use client";
//এই api,  createCompany(finalCompanyData) সব কোম্পানীর ও তার রিক্রুটারের তথ্য আছে।
import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Button,
  Chip,
  Spinner,
  Card,
  toast,
} from "@heroui/react";
import {
  Globe,
  Pin,
  Person,
  FileText,
  Pencil,
  Plus,
  ArrowLeft,
  CircleInfo,
  ArrowUpToLine,
  Factory,
  TrashBin, // 👈 ডিলিট আইকন যোগ করা হয়েছে
} from "@gravity-ui/icons";
import Image from "next/image";
import { createCompany } from "../../../../lib/actions/companies";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  //  ১. কোম্পানি লিস্ট এবং ফর্ম স্টেট
  const [companies, setCompanies] = useState(
    recruiterCompany?._id || recruiterCompany?.id ? [recruiterCompany] : [],
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //  ২. প্রফেশনাল ইমেজ আপলোড স্টেট(ImgBB)
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const inputClass =
    "bg-zinc-900/50 border-zinc-800 text-white rounded-xl focus:border-white";
  const textareaClass =
    "bg-zinc-900/50 border-zinc-800 text-white rounded-xl min-h-[100px] focus:border-white";

  //  ৩. প্রফেশনাল ImgBB ইমেজ আপলোড লজিক
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size is too large! Maximum limit is 5MB.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey =
        process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY";
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      alert("Network error while uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  // ৪. ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const rawCompanyData = Object.fromEntries(formData);

    const finalCompanyData = {
      ...rawCompanyData,
      logo: logoUrl || "https://placehold.co/150?text=No+Logo",
      recruiterId: recruiter.id,
    };

    try {
      if (editingCompany) {
        setCompanies(
          companies.map((c) =>
            c.id === editingCompany.id ? { ...c, ...finalCompanyData } : c,
          ),
        );
        toast.success("Company profile updated successfully!");
      } else {
        //এই api তে createCompany(finalCompanyData) সব কোম্পানীর ও তার রিক্রুটারের তথ্য আছে।
        const responseData = await createCompany(finalCompanyData);
        const savedCompany = responseData?.data || responseData;

        setCompanies([
          ...companies,
          {
            ...finalCompanyData,
            id: savedCompany._id || savedCompany.id || Date.now(),
            status: savedCompany.status || "Pending",
          },
        ]);

        toast.success("Company registered successfully!");
      }

      setTimeout(() => {
        setIsFormOpen(false);
        setEditingCompany(null);
        setLogoUrl("");
      }, 100);
    } catch (error) {
      console.error("Failed to save company details:", error);
      toast.danger("Something went wrong while saving the company.");
    } finally {
      setIsLoading(false);
    }
  };

  // ৫. অ্যাকশন ট্রিগার ফাংশনসমূহ
  const handleAddNewClick = () => {
    setEditingCompany(null);
    setLogoUrl("");
    setIsFormOpen(true);
  };

  const handleEditClick = (comp) => {
    setEditingCompany(comp);
    setLogoUrl(comp.logo);
    setIsFormOpen(true);
  };

  // ডিলিট হ্যান্ডলার ফাংশন
  const handleDeleteClick = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this company profile?",
    );
    if (!isConfirmed) return;

    setCompanies(companies.filter((comp) => comp.id !== id));
    toast.success("Company profile deleted successfully!");
  };

  const getStatusColor = (status) => {
    if (status === "Approved") return "success";
    if (status === "Rejected") return "danger";
    return "warning";
  };

  // ==================== ভিউ রেন্ডারিং লজিক ====================

  if (isLoading && !isFormOpen) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center bg-[#09090b]">
        <Spinner
          label="Loading company profiles..."
          color="primary"
          size="lg"
        />
      </div>
    );
  }

  if (companies.length === 0 && !isFormOpen) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] p-6 bg-[#09090b] text-center">
        <div className="w-16 h-16 border border-zinc-800 bg-zinc-900/40 rounded-2xl flex items-center justify-center mb-6 text-zinc-500">
          <Factory className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No Company Registered Yet
        </h3>
        <p className="text-zinc-400 text-sm max-w-sm mb-6">
          To start posting jobs and managing candidates, you must first register
          your organization profile.
        </p>
        <Button
          onClick={handleAddNewClick}
          className="bg-white text-black font-bold px-6 rounded-xl flex items-center gap-2 h-11 hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-4 h-4" /> Register Company
        </Button>
      </div>
    );
  }

  if (isFormOpen) {
    return (
      <div className="p-4 md:p-8 bg-[#09090b] min-h-screen text-white">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => {
              setIsFormOpen(false);
              setEditingCompany(null);
            }}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Companies
          </button>

          <h2 className="text-2xl font-bold mb-2">
            {editingCompany
              ? "Update Company Profile"
              : "Register Your Company"}
          </h2>
          <p className="text-zinc-400 text-sm mb-8">
            Provide accurate details about your workspace to gain trust from job
            seekers.
          </p>

          <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-zinc-300 text-sm">Company Logo</Label>

              <div className="flex items-center gap-5 p-4 border border-zinc-800 bg-zinc-900/20 rounded-2xl w-full">
                <div className="relative w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                  {logoUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={logoUrl}
                        alt="Logo Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <Factory className="w-8 h-8 text-zinc-600" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <Spinner size="sm" color="white" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start gap-1">
                  <label className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                    <ArrowUpToLine className="w-3.5 h-3.5" />
                    {isUploading ? "Uploading..." : "Upload New Logo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-zinc-500">
                    Supports PNG, JPG up to 5MB. Hosted securely on ImgBB.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                isRequired
                name="name"
                defaultValue={editingCompany?.name}
              >
                <Label className="text-zinc-300 text-sm mb-1.5 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-zinc-500" /> Company Name
                </Label>
                <Input placeholder="e.g. Google Inc." className={inputClass} />
              </TextField>

              <TextField
                isRequired
                name="website"
                type="url"
                defaultValue={editingCompany?.website}
              >
                <Label className="text-zinc-300 text-sm mb-1.5 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-500" /> Website URL
                </Label>
                <Input
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </TextField>

              <TextField
                isRequired
                name="industry"
                defaultValue={editingCompany?.industry}
              >
                <Label className="text-zinc-300 text-sm mb-1.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500" /> Industry Type
                </Label>
                <Input
                  placeholder="e.g. Technology, Finance"
                  className={inputClass}
                />
              </TextField>

              <TextField
                isRequired
                name="location"
                defaultValue={editingCompany?.location}
              >
                <Label className="text-zinc-300 text-sm mb-1.5 flex items-center gap-2">
                  <Pin className="w-4 h-4 text-zinc-500" /> Location
                </Label>
                <Input
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={inputClass}
                />
              </TextField>

              <TextField
                isRequired
                name="employees"
                defaultValue={editingCompany?.employees}
              >
                <Label className="text-zinc-300 text-sm mb-1.5 flex items-center gap-2">
                  <Person className="w-4 h-4 text-zinc-500" /> Employee Count
                </Label>
                <Input
                  placeholder="e.g. 50-100 employees"
                  className={inputClass}
                />
              </TextField>
            </div>

            <TextField
              isRequired
              name="description"
              defaultValue={editingCompany?.description}
            >
              <Label className="text-zinc-300 text-sm mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-500" /> Company
                Description
              </Label>
              <TextArea
                placeholder="Tell us about your company vision and mission..."
                className={textareaClass}
              />
            </TextField>

            <div className="flex justify-end gap-4 pt-6 border-t border-zinc-800/50">
              <Button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingCompany(null);
                }}
                className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-900 border px-6 rounded-xl h-11"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={isUploading}
                spinner={<Spinner color="current" size="sm" />}
                className="bg-white text-black font-bold px-8 rounded-xl h-11 hover:bg-zinc-200"
              >
                {editingCompany ? "Save Changes" : "Submit Details"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#09090b] min-h-screen text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center pb-5 border-b border-zinc-800">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              My Registered Organizations
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Managing {companies.length} company profiles
            </p>
          </div>

          <Button
            onClick={handleAddNewClick}
            className="bg-white text-black font-bold rounded-xl flex items-center gap-2 h-10 px-4 hover:bg-zinc-200 transition-colors"
            size="sm"
          >
            <Plus className="w-4 h-4" /> Add Company
          </Button>
        </div>

        <div className="space-y-4">
          {companies.map((comp) => (
            <Card
              key={comp._id || comp.id}
              className="bg-[#121212] border border-[#222222] rounded-2xl p-6 shadow-none space-y-4"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={comp.logo || "https://placehold.co/150?text=Logo"}
                    alt={`${comp.name} logo`}
                    className="w-14 h-14 rounded-xl object-cover bg-zinc-900 border border-zinc-800 p-1.5"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/150?text=Logo";
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-zinc-100">
                        {comp.name}
                      </h3>
                      <Chip
                        color={getStatusColor(comp.status)}
                        variant="flat"
                        size="sm"
                        className="font-semibold text-[10px]"
                      >
                        {comp.status}
                      </Chip>
                    </div>
                    <a
                      href={comp.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 text-xs flex items-center gap-1 mt-1 hover:underline"
                    >
                      <Globe className="w-3 h-3" /> {comp.website}
                    </a>
                  </div>
                </div>

                {/* Edit এবং Delete  */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={() => handleEditClick(comp)}
                    size="sm"
                    variant="bordered"
                    className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl px-3 h-9"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(comp._id || comp.id)}
                    size="sm"
                    variant="flat"
                    color="danger"
                    className="rounded-xl px-3 h-9 font-semibold text-xs"
                  >
                    <TrashBin className="w-3.5 h-3.5" /> Delete
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
                <p className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-600" />{" "}
                  {comp.industry}
                </p>
                <p className="flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5 text-zinc-600" /> {comp.location}
                </p>
                <p className="flex items-center gap-1.5">
                  <Person className="w-3.5 h-3.5 text-zinc-600" />{" "}
                  {comp.employees}
                </p>
              </div>

              <div className="p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/40 text-xs text-zinc-400 leading-relaxed">
                <p className="line-clamp-2">{comp.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-blue-400 text-xs">
          <CircleInfo width={16} height={16} className="shrink-0" />
          <p>
            Newly added organizations will initially carry a{" "}
            <strong>Pending</strong> status until verified by the HireLoop
            administration panel.
          </p>
        </div>
      </div>
    </div>
  );
}
