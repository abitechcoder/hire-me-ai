import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Main heading */}
        <h2
          className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          Ready to hire amazing talent?
        </h2>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          Join hundreds of companies that have transformed their hiring process
          with HireMe AI. Get matched with verified African professionals in 48
          hours.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="/client/signup"
            className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center group shadow-xl"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Start Hiring Today
            <ArrowRight
              size={20}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="/browse-talent"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Browse Talent First
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-blue-100 text-sm">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No setup fees
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            48-hour guarantee
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Money-back guarantee
          </div>
        </div>
      </div>
    </section>
  );
}
