import { CheckCircle, Clock, Shield, Star, Users, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <CheckCircle size={32} className="text-green-500" />,
      title: "Verified Professionals",
      description:
        "Every talent goes through our rigorous verification process including skills assessment, background checks, and portfolio review.",
    },
    {
      icon: <Clock size={32} className="text-blue-500" />,
      title: "48-Hour Guarantee",
      description:
        "Get matched with qualified candidates within 48 hours or your money back. No lengthy recruitment processes.",
    },
    {
      icon: <Shield size={32} className="text-purple-500" />,
      title: "Risk-Free Hiring",
      description:
        "30-day satisfaction guarantee. If you're not completely satisfied with your hire, we'll find you a replacement at no cost.",
    },
    {
      icon: <Star size={32} className="text-yellow-500" />,
      title: "Top 3% Talent",
      description:
        "Access to the top 3% of African talent across various industries including tech, design, marketing, and finance.",
    },
    {
      icon: <Users size={32} className="text-indigo-500" />,
      title: "Dedicated Support",
      description:
        "Personal account manager to help you throughout the hiring process and ongoing project management support.",
    },
    {
      icon: <Zap size={32} className="text-orange-500" />,
      title: "Seamless Integration",
      description:
        "Easy onboarding process and integration with your existing tools and workflows for maximum productivity.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Why Choose HireMe AI?
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            We've revolutionized the hiring process to connect you with
            exceptional African talent quickly, safely, and efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3
                className="text-xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <div
                className="text-3xl md:text-4xl font-bold text-blue-600 mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                50+
              </div>
              <div
                className="text-gray-600 font-medium"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Verified Professionals
              </div>
            </div>
            {/* <div>
              <div
                className="text-3xl md:text-4xl font-bold text-green-600 mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                500+
              </div>
              <div
                className="text-gray-600 font-medium"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Successful Placements
              </div>
            </div> */}
            <div>
              <div
                className="text-3xl md:text-4xl font-bold text-purple-600 mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                4.9★
              </div>
              <div
                className="text-gray-600 font-medium"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Average Rating
              </div>
            </div>
            <div>
              <div
                className="text-3xl md:text-4xl font-bold text-orange-600 mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                48hrs
              </div>
              <div
                className="text-gray-600 font-medium"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Average Match Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}