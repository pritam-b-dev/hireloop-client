import React from "react";
import StatsCard from "./StatsCard"; // আমাদের আগের বানানো কার্ড কম্পোনেন্টটি ইম্পোর্ট করলাম

/**
 * @param {Array} items - ড্যাশবোর্ডের ডাটার অ্যারে (যেমন: recruiterStats, adminStats)
 */
export default function StatsGrid({ items }) {
  // যদি কোনো কারণে ডাটা না থাকে বা খালি অ্যারে আসে, তবে কিছুই দেখাবে না
  if (!items || items.length === 0) return null;

  return (
    /* টেলউইন্ড গ্রিড লেআউটটি এখানেই লক করে দিলাম। 
      এর ফলে সব ড্যাশবোর্ডের কার্ডের সাইজ ও গ্যাপ সবসময় ১০০% এক থাকবে।
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
