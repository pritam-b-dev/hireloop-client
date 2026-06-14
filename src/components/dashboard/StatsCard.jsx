import React from "react";
import { Card } from "@heroui/react";

/**
 * @param {string} title - কার্ডের শিরোনাম (যেমন: "Total Job Posts")
 * @param {string|number} value - মূল সংখ্যা বা ডাটা (যেমন: 48, "1,284")
 * @param {React.ElementType} icon - Gravity UI থেকে আসা নির্দিষ্ট আইকন কম্পোনেন্ট
 */
export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <Card className="bg-[#121212] border border-[#222222] rounded-2xl p-6 shadow-none flex flex-col gap-6">
      {/* 📦 উপরে বাম পাশের আইকন বক্স */}
      <div className="w-12 h-12 border border-[#2a2a2a] bg-[#1a1a1a] rounded-xl flex items-center justify-center">
        {Icon && <Icon className="w-5 h-5 text-[#f4f4f5]" />}
      </div>

      {/* 📝 নিচে লেবেল এবং বড় আকারের মেইন স্ট্যাটাস সংখ্যা */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[#a1a1aa] text-sm font-normal tracking-wide">
          {title}
        </p>
        <h3 className="text-white text-3xl font-semibold tracking-tight">
          {value}
        </h3>
      </div>
    </Card>
  );
}
