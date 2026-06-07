import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-500 py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* টপ সেকশন: লোগো, ডেসক্রিপশন এবং লিংকস */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* বাম পাশের লোগো ও টেক্সট সেকশন */}
          <div className="md:col-span-5 space-y-5">
            <div className="text-3xl font-bold tracking-tight">
              <span className="text-blue-500">hire</span>
              <span className="text-orange-600">loop</span>
            </div>
            <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* ডান পাশের লিংক সেকশন */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-indigo-500 font-medium text-base">Product</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Job discovery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Worker AI
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Companies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Salary data
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigations Column */}
            <div className="space-y-4">
              <h3 className="text-indigo-500 font-medium text-base">
                Navigations
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Career library
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h3 className="text-indigo-500 font-medium text-base">
                Resources
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Brand Guideline
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Newsroom
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* বটম সেকশন: সোশ্যাল আইকন এবং কপিরাইট */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* সোশ্যাল মিডিয়া আইকন */}
          <div className="flex items-center space-x-3">
            {/* ফেসবুক আইকন */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-zinc-900/50 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <LogoFacebook width={18} height={18} />
            </a>

            {/* মাঝের কাস্টম আইকন  */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-indigo-950/60 rounded-lg text-indigo-400 hover:bg-indigo-900/80 transition border border-indigo-900/50"
            >
              <LogoGithub width={18} height={18} />
            </a>

            {/* লিঙ্কডইন আইকন */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-zinc-900/50 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <LogoLinkedin width={18} height={18} />
            </a>
          </div>

          {/* কপিরাইট ও পলিসি টেক্সট */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-xs text-zinc-500">
            <span>Copyright 2026 — Pritam B</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-zinc-300 transition">
                Terms & Policy
              </a>
              <span>-</span>
              <a href="#" className="hover:text-zinc-300 transition">
                Privacy Guideline
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
