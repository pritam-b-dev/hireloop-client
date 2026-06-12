"use client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Card, Input, Spinner, Link } from "@heroui/react";
import React, { useState } from "react";
import { signIn } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignInPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Better-Auth এর সাইন-ইন মেথড
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
      });

      if (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong. Try again!");
        setLoading(false);
        return;
      }
      if (data) {
        toast.success(`Welcome ${data.user.name}!`);

        setTimeout(() => {
          window.location.href = "/";
          router.refresh();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again later");
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-2 shadow-lg">
        <div className="flex flex-col items-center gap-1 pb-4 pt-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Sign In</h1>
          <p className="text-small text-default-500">
            Enter Email and Password
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              required
              label="Email Address"
              name="email"
              placeholder="example@mail.com"
              type="email"
              variant="bordered"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="relative w-full flex items-center">
              <Input
                required
                label="Password"
                name="password"
                placeholder="Enter password"
                variant="bordered"
                value={formData.password}
                onChange={handleChange}
                type={isVisible ? "text" : "password"}
                className="w-full"
              />
              {/* আইকন বাটনটিকে absolute পজিশন দেওয়া হয়েছে */}
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none flex items-center justify-center z-10"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlash
                    size={20}
                    className="text-zinc-400 pointer-events-none"
                  />
                ) : (
                  <Eye
                    size={20}
                    className="text-zinc-400 pointer-events-none"
                  />
                )}
              </button>
            </div>

            <Button
              isDisabled={loading}
              color="primary"
              type="submit"
              className="w-full font-medium"
            >
              {loading ? <Spinner color="white" size="sm" /> : "Sign In"}
            </Button>

            <p className="text-center text-small text-default-500 mt-2">
              Create a new account?{" "}
              <Link href="/auth/signup" size="sm">
                Click Here!
              </Link>
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
