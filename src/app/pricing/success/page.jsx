import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "../../../lib/stripe";
import { createSubscription } from "../../../lib/actions/subscriptions";
import { sub } from "motion/react-client";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    const result = await createSubscription(subsInfo);

    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 antialiased font-sans">
        {/* মেইন কার্ড কন্টেইনার */}
        <div className="relative bg-[#121212] border border-zinc-800/80 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl shadow-emerald-500/5 overflow-hidden">
          {/* গ্লো ইফেক্ট ব্যাকগ্রাউন্ডে */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

          {/* 🟢 সাকসেস চেকমার্ক আইকন */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/10">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* হেডিং */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
            Payment Successful!
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            We appreciate your business! A confirmation email has been sent to{" "}
            <span className="text-indigo-400 font-semibold block mt-1 break-all bg-indigo-500/5 border border-indigo-500/10 py-1 px-2 rounded-lg">
              {customerEmail}
            </span>
          </p>

          {/* সলিড সাপোর্ট বক্স */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 mb-8 text-left text-xs text-zinc-500 leading-relaxed">
            <p>
              If you have any questions or face any technical issues, please
              feel free to reach out to our dedicated support team at{" "}
              <a
                href="mailto:support@example.com"
                className="text-zinc-400 hover:text-indigo-400 font-medium transition-colors underline underline-offset-2"
              >
                support@example.com
              </a>
              .
            </p>
          </div>

          {/* 🚀 মেইন অ্যাকশন বাটন */}
          <Link
            href="/"
            className="w-full block text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }
}
