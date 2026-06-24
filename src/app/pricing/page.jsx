"use client";

import React, { useState } from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar";

const PricingPage = () => {
  // Job Seeker এবং Recruiter ট্যাব সুইচের জন্য স্টেট
  const [activeTab, setActiveTab] = useState("seeker");

  // FAQ অ্যাকোর্ডিয়ন ওপেন/ক্লোজ করার জন্য স্টেট
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Job Seeker প্ল্যান ডাটা
  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "/forever",
      description: "Great for getting started and exploring opportunities.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile visibility",
        "Standard email alerts",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "$19",
      period: "/month",
      description: "Perfect for active job seekers looking for an edge.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Advanced application tracking",
        "Salary insights & benchmarks",
      ],
      buttonText: "Upgrade to Pro",
      popular: true, // এটাকে হাইলাইট করা হবে
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "$39",
      period: "/month",
      description: "The ultimate package for maximum visibility and speed.",
      features: [
        "Everything in Pro",
        "Unlimited job applications",
        "Profile boost to top recruiters",
        "Early access to newly posted jobs",
        "Priority 24/7 support",
      ],
      buttonText: "Go Premium",
      popular: false,
    },
  ];

  // Recruiter প্ল্যান ডাটা
  const recruiterPlans = [
    {
      name: "Free",
      id: "recruiter_free",
      price: "$0",
      period: "/forever",
      description:
        "Great for a company's first year of hiring and basic needs.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
      buttonText: "Start Free",
      popular: false,
    },
    {
      name: "Growth",
      id: "recruiter_growth",
      price: "$49",
      period: "/month",
      description: "Best for growing teams with consistent hiring needs.",
      features: [
        "Up to 10 active job posts",
        "Advanced applicant tracking system",
        "Basic analytics & performance reports",
        "Standard email support",
      ],
      buttonText: "Choose Growth",
      popular: true,
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "$149",
      period: "/month",
      description: "For large organizations demanding full power and branding.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings (Top of search)",
        "Team collaboration tools",
        "Custom company branding",
        "Dedicated priority support",
      ],
      buttonText: "Contact Enterprise",
      popular: false,
    },
  ];

  // FAQ ডাটা
  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, absolutely! You can cancel your subscription at any time from your account settings. You will retain access to your premium features until the end of your current billing cycle.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all our paid plans if you are not satisfied with the service. Just reach out to our support team.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major international credit/debit cards (Visa, Mastercard, Amex) and popular local digital payment gateways.",
    },
    {
      question: "Can I switch between plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When upgrading, your remaining balance will be prorated automatically towards the new plan.",
    },
  ];

  const currentPlans = activeTab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased pb-24 mt-15">
        <div className="max-w-6xl mx-auto px-4 pt-16 text-center">
          {/* হেডার সেকশন */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg mb-10">
            Choose the plan that fits your journey. Whether you are looking for
            your dream job or building a world-class team, we've got you
            covered.
          </p>

          {/* ট্যাব সুইচ টগলার */}
          <div className="inline-flex p-1.5 bg-[#121212] border border-zinc-800 rounded-2xl mb-16 shadow-inner">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "seeker"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "recruiter"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              For Recruiters
            </button>
          </div>

          {/* প্রাইসিং কার্ড গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-left mb-24">
            {currentPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-[#121212] border rounded-3xl p-8 shadow-xl flex flex-col h-full transition-all duration-300 hover:border-zinc-700 ${
                  plan.popular
                    ? "border-indigo-500 md:-translate-y-4 ring-1 ring-indigo-500/30"
                    : "border-zinc-800/80"
                }`}
              >
                {/* পপুলার ব্যাজ */}
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* ফিচার লিস্ট */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <span className="text-indigo-400 mt-0.5 shrink-0 font-bold">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* অ্যাকশন বাটন */}
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <section>
                    <button
                      type="submit"
                      role="link"
                      className={`w-full cursor-pointer block text-center py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 antialiased ${
                        plan.popular
                          ? "bg-indigo-500 hover:bg-indigo-600 text-zinc-950 shadow-lg shadow-indigo-500/10"
                          : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700/50"
                      }`}
                    >
                      Checkout
                    </button>
                  </section>
                </form>
              </div>
            ))}
          </div>

          {/* FAQ অ্যাকোর্ডিয়ন সেকশন */}
          <div className="max-w-3xl mx-auto mt-16 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-sm text-center mb-10">
              Got questions about our plans? We have answers.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#121212] border border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left font-semibold text-white hover:text-indigo-400 transition-colors"
                  >
                    <span className="text-base pr-4">{faq.question}</span>
                    <span
                      className={`text-xl transition-transform duration-200 shrink-0 ${
                        openFaq === index
                          ? "rotate-45 text-indigo-400"
                          : "text-zinc-500"
                      }`}
                    >
                      ＋
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openFaq === index
                        ? "max-h-[200px] border-t border-zinc-800/50"
                        : "max-h-0"
                    }`}
                  >
                    <p className="p-6 text-sm text-zinc-400 leading-relaxed bg-zinc-900/20">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
