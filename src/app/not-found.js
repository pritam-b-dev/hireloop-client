"use client"; // ফাইলে এই লাইনটি সবার ওপরে থাকা নিশ্চিত করো

import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>
      <p className="text-default-500 mt-2 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link href="/">
        <Button color="primary" className="mt-6 font-medium">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
