"use client";

import React, { useState } from "react";
import { Button, Link, Avatar, Spinner } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // সাইন-আউটের সময় লোডিং দেখানোর জন্য নতুন স্টেট
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuItems = ["Browse Jobs", "Company", "Pricing"];

  const { data: session, isPending } = authClient.useSession();

  // === সাইন-আউট ফাংশন ===
  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    setIsSigningOut(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center w-full px-4">
      <div className="w-full max-w-6xl bg-[#222222] border border-zinc-800/60 shadow-2xl backdrop-blur-md rounded-[20px] h-16 flex items-center justify-between px-6 relative">
        {/* লোগো */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white flex items-center"
          >
            <span className="text-[#22a6f2]">hire</span>
            <span className="text-[#f35c23]">Loop</span>
          </Link>
        </div>

        {/* ডেস্কটপ মেনু লিংকসমূহ */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href="#"
              className="text-zinc-300 hover:text-white text-[15px] font-medium transition-colors"
            >
              {item}
            </Link>
          ))}

          <div className="w-px h-5 bg-zinc-600"></div>

          {/* === ডেস্কটপ লগইন/প্রোফাইল ও সাইন-আউট === */}
          {isPending ? (
            <Spinner size="sm" color="white" />
          ) : session?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar
                  src={session.user.image}
                  name={session.user.name}
                  size="sm"
                />
                <span className="text-white font-medium text-[15px]">
                  {session.user.name}
                </span>
              </div>

              {/* ডেস্কটপ সাইন-আউট বাটন */}
              <Button
                size="sm"
                color="danger"
                variant="flat"
                isDisabled={isSigningOut}
                onClick={handleSignOut}
                className="font-medium px-4"
              >
                {isSigningOut ? (
                  <Spinner size="sm" color="danger" />
                ) : (
                  "Sign Out"
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-[#6366f1] hover:text-[#818cf8] text-[15px] font-semibold transition-colors"
              >
                Sign In
              </Link>
              <Button
                as={Link}
                href="/auth/signup"
                className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium px-5 h-10 rounded-[12px] text-[15px] transition-all shadow-lg shadow-indigo-600/20"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* মোবাইল হ্যামবার্গার বাটন */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2 active:scale-95 transition-transform"
            aria-label="Toggle Menu"
          >
            {isOpen ? <Xmark size={24} /> : <Bars size={24} />}
          </button>
        </div>

        {/* মোবাইল ড্রপডাউন মেনু */}
        {isOpen && (
          <div className="absolute top-20 left-0 right-0 bg-[#121214]/98 border border-zinc-800/80 shadow-2xl backdrop-blur-lg rounded-[20px] p-6 flex flex-col gap-4 md:hidden">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-zinc-300 hover:text-white text-[16px] font-medium py-2 border-b border-zinc-800/40 last:border-none block transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}

            <div className="h-[1px] w-full bg-zinc-800/60 my-1"></div>

            {/* === মোবাইল লগইন/প্রোফাইল ও সাইন-আউট === */}
            {isPending ? (
              <Spinner size="sm" color="white" className="self-start" />
            ) : session?.user ? (
              <div className="flex flex-col gap-4 py-2">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={session.user.image}
                    name={session.user.name}
                    size="md"
                  />
                  <span className="text-white font-semibold text-[16px]">
                    {session.user.name}
                  </span>
                </div>

                {/* মোবাইল সাইন-আউট বাটন */}
                <Button
                  color="danger"
                  variant="flat"
                  isDisabled={isSigningOut}
                  onClick={handleSignOut}
                  className="w-full font-medium text-[15px] mt-1"
                >
                  {isSigningOut ? (
                    <Spinner size="sm" color="danger" />
                  ) : (
                    "Sign Out"
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/signin"
                  className="text-[#6366f1] hover:text-[#818cf8] text-[16px] font-semibold py-2 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  as={Link}
                  href="/auth/signup"
                  className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium w-full h-11 rounded-[12px] text-[15px] shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
