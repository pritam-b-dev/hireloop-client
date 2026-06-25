"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { ShieldExclamation, ArrowLeft, House } from "@gravity-ui/icons";
export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-danger/10 p-4 text-danger animate-bounce">
            <ShieldExclamation style={{ fontSize: "64px" }} />
          </div>
        </div>

        <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
          403 - Access Denied
        </h1>
        <p className="mx-auto mb-8 max-w-md text-default-400 text-sm sm:text-base">
          Sorry! Your account does not have permission to view or access this
          page. Please try again with the correct role.
        </p>

        {/* Hero UI Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="bordered"
            radius="md"
            onPress={() => router.back()}
            startContent={<ArrowLeft />}
            className="text-white border-default-200"
          >
            Go Back
          </Button>

          <Button
            variant="solid"
            radius="md"
            onPress={() => router.push("/")}
            startContent={<House />}
            className="bg-white text-black font-medium hover:bg-default-200"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
