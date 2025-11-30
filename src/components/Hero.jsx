import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-20 pb-16 md:pb-24 px-6 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <Globe size={16} className="mr-2" />
              Connecting Africa to Global Opportunities
            </div>

            {/* Main Headline */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Hire Verified African Talent in{" "}
              <span className="relative">
                48 Hours
                {/* Decorative underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-4"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 6c50-4 100-4 196 0"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Verified professionals, risk-free hiring, guaranteed delivery.
              Connect with top African talent for your next project.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a
                href="/client/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center group"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Hire Now
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/talent/apply"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Join as Talent
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield size={16} className="mr-2 text-green-500" />
                Risk-free hiring
              </div>
              <div className="flex items-center">
                <Zap size={16} className="mr-2 text-yellow-500" />
                48-hour delivery
              </div>
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-blue-500" />
                Verified professionals
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main image container */}
              <div className="relative bg-linear-to-br from-blue-50 to-green-50 rounded-2xl p-8 lg:p-12">
                <img
                  src="https://images.unsplash.com/photo-1664575198308-3959904fa430?w=600&h=600&fit=crop&crop=face&auto=format&q=80"
                  alt="Professional African talent working on laptop"
                  className="w-full h-auto object-center rounded-xl shadow-2xl"
                />

                {/* Floating cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span
                      className="text-sm font-medium text-gray-900"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      Verified
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold text-blue-600"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      4.9★
                    </div>
                    <div
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      Average Rating
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full border-2 border-blue-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}