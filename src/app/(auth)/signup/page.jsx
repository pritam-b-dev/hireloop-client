"use client";

import React, { useState } from "react";
import { Input, Button, Card, Link, Spinner } from "@heroui/react";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signUp } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // পাসওয়ার্ড ম্যাচিং চেক
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Better-Auth এর সাইন-আপ মেথড
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image,
      });

      if (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong. Try again!");
        setLoading(false);
        return;
      }
      if (data) {
        toast.success(`Welcome ${data.user.name}! Account created.`);

        setTimeout(() => {
          router.push("/");
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
    <div className="flex mt-20 min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-2 shadow-lg">
        <div className="flex flex-col items-center gap-1 pb-4 pt-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="text-small text-default-500">Enter your information</p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              required
              label="Full Name"
              name="name"
              placeholder="Enter your name"
              type="text"
              variant="bordered"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Profile Image URL"
              name="image"
              placeholder="https://example.com/your-photo.jpg"
              type="url"
              value={formData.image}
              onChange={handleChange}
            />

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

            <Input
              required
              label="Confirm password"
              name="confirmPassword"
              placeholder="confirm password"
              variant="bordered"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
            />

            {/* role based control  */}
            <div className="flex flex-col gap-4">
              <Label>Subscription plan</Label>
              <RadioGroup
                defaultValue="pro"
                name="plan-orientation"
                orientation="horizontal"
              >
                <Radio value="starter">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Starter</Label>
                    <Description>For side projects</Description>
                  </Radio.Content>
                </Radio>
                <Radio value="pro">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Pro</Label>
                    <Description>Advanced reporting</Description>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            <Button
              isDisabled={loading}
              color="primary"
              type="submit"
              className="w-full font-medium"
            >
              {loading ? <Spinner color="white" size="sm" /> : "Sign Up"}
            </Button>

            <p className="text-center text-small text-default-500 mt-2">
              Already have an account?{" "}
              <Link href="/signin" size="sm">
                Sign In Here!
              </Link>
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
}
