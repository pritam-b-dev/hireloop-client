"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function Navbar() {
  const text = "Find your next big move...";

  return (
    <div className="w-full p-3 mt-1 bg-[#222222] border border-zinc-800/60 shadow-2xl backdrop-blur-md rounded-[20px] flex items-center gap-4">
      {/* লোগো */}
      <Link
        href="/"
        className="inline-flex text-2xl font-bold tracking-tight shrink-0"
      >
        <span className="text-[#22a6f2]">hire</span>
        <span className="text-[#f35c23]">Loop</span>
      </Link>

      {/* আধুনিক টাইপিং টেক্সট (কোনো useEffect বা স্টেট ছাড়া) */}
      <div className="text-zinc-400 text-xs sm:text-sm font-medium border-l border-zinc-700 pl-3 sm:pl-4 flex items-center flex-wrap">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.04,
              ease: "easeIn",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
