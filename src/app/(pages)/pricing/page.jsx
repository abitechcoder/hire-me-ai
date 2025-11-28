"use client";

import { useState } from "react";
import {
  Check,
  Star,
  Users,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("growth");

  const subscriptionPlans = {
    starter: {
      name: "Starter",
      tagline: "SME-Friendly",
      target: "Startups, solo entrepreneurs, first-time outsourcers",
      pricing: {
        monthly: { price: 2400, discount: 0, total: 2400 },
        quarterly: { price: 2112, discount: 12, total: 6336 },
        annual: { price: 1800, discount: 25, total: 21600 },
      },
      features: [
        "1 verified specialist (junior-mid level)",
        "VA, Content Writer, Graphic Designer, Social Media Manager",
        "160 hours/month (full-time)",
        "30-day risk-free trial",
        "Replacement guarantee",
        "Basic performance tracking",
      ],
      economics: {
        talentPaid: 1400,
        platformMargin: 1000,
        guaranteeFund: 100,
      },
    },
    growth: {
      name: "Growth",
      tagline: "Most Popular",
      target: "Growing companies, agencies, 10-50 employees",
      pricing: {
        monthly: { price: 4800, discount: 0, total: 4800 },
        quarterly: { price: 4224, discount: 12, total: 12672 },
        annual: { price: 3600, discount: 25, total: 43200 },
      },
      features: [
        "1 verified specialist (mid-senior level)",
        "Developer, UI/UX Designer, Digital Marketer, Recruiter",
        "160 hours/month",
        "14-day risk-free trial",
        "Priority replacement (48hrs)",
        "Advanced performance dashboard",
        "Dedicated account manager",
      ],
      economics: {
        talentPaid: 2800,
        platformMargin: 2000,
        guaranteeFund: 200,
      },
    },
    scale: {
      name: "Scale",
      tagline: "Enterprise-Ready",
      target: "Established companies, teams of 50+, high-volume needs",
      pricing: {
        monthly: { price: 6500, discount: 0, total: 6500 },
        quarterly: { price: 5720, discount: 12, total: 17160 },
        annual: { price: 4875, discount: 25, total: 58500 },
      },
      features: [
        "1 verified specialist (senior/expert level)",
        "Senior Developer, Technical Lead, Growth Strategist, Finance Manager",
        "160 hours/month",
        "Instant replacement (24hrs)",
        "Custom SLA agreements",
        "White-label option",
        "Quarterly business reviews",
        "API access",
      ],
      economics: {
        talentPaid: 4000,
        platformMargin: 2500,
        guaranteeFund: 250,
      },
    },
  };

  const payAsYouGoRates = [
    { hours: "20-40 hrs", discount: 0, rate: 55, totalRange: "$1,100-2,200" },
    { hours: "40-80 hrs", discount: 7, rate: 51, totalRange: "$2,040-4,080" },
    { hours: "80-160 hrs", discount: 10, rate: 50, totalRange: "$4,000-8,000" },
    {
      hours: "160-320 hrs",
      discount: 15,
      rate: 47,
      totalRange: "$7,520-15,040",
    },
    { hours: "320+ hrs", discount: 25, rate: 41, totalRange: "$13,120+" },
  ];

  const addOns = [
    {
      name: "Additional Team Member",
      price: "$1,800-6,000/month",
      description: "10% discount when adding 3+ members",
    },
    {
      name: "Overtime Hours",
      price: "$30-50/hour",
      description: "Max 40 hours/month per specialist",
    },
    {
      name: "Rush Replacement",
      price: "$200 one-time",
      description: "12-hour replacement guarantee",
    },
    {
      name: "Premium Support",
      price: "$200/month",
      description: "24/7 support, 1-hour response time, dedicated Slack",
    },
    {
      name: "Custom Vetting",
      price: "$500 one-time",
      description: "Screen candidates outside our talent pool",
    },
    {
      name: "Team Training",
      price: "$100/hour",
      description: "Custom workshops for your talent",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBillingLabel = (cycle) => {
    switch (cycle) {
      case "monthly":
        return "per month";
      case "quarterly":
        return "per quarter";
      case "annual":
        return "per year";
      default:
        return "per month";
    }
  };

  return (
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Simple, Transparent Pricing
            </h1>
            <p
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Choose the perfect plan for your business needs. All plans include
              verified African talent, risk-free trials, and our satisfaction
              guarantee.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-12">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                }`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("quarterly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === "quarterly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                }`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Quarterly
                <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  12% off
                </span>
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === "annual"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                }`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Annual
                <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  25% off
                </span>
              </button>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {Object.entries(subscriptionPlans).map(([planKey, plan]) => (
              <div
                key={planKey}
                className={`relative bg-white border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                  planKey === "growth"
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {planKey === "growth" && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="text-sm text-gray-500 mb-4"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {plan.target}
                  </p>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span
                        className="text-5xl font-bold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {formatPrice(plan.pricing[billingCycle].price)}
                      </span>
                      <span
                        className="text-gray-500 ml-2"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {getBillingLabel(billingCycle)}
                      </span>
                    </div>
                    {plan.pricing[billingCycle].discount > 0 && (
                      <p
                        className="text-sm text-green-600 mt-2"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        Save {plan.pricing[billingCycle].discount}% • Total:{" "}
                        {formatPrice(plan.pricing[billingCycle].total)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check
                        size={20}
                        className="text-green-500 mr-3 mt-0.5 shrink-0"
                      />
                      <span
                        className="text-gray-700"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                    planKey === "growth"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Start Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </button>

                {/* Economics (for transparency) */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p
                    className="text-xs text-gray-500 text-center mb-2"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    Transparent Economics
                  </p>
                  <div
                    className="text-xs text-gray-600 space-y-1"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <div className="flex justify-between">
                      <span>Talent paid:</span>
                      <span>{formatPrice(plan.economics.talentPaid)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform fee:</span>
                      <span>
                        {formatPrice(plan.economics.platformMargin)}/mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guarantee fund:</span>
                      <span>
                        {formatPrice(plan.economics.guaranteeFund)}/mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pay-as-you-go Section */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Pay-As-You-Go
              </h2>
              <p
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Perfect for project-based work or testing our talent before
                committing to a subscription.
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        Hours Purchased
                      </th>
                      <th
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        Discount
                      </th>
                      <th
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        Effective Rate
                      </th>
                      <th
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        Total Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payAsYouGoRates.map((tier, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td
                          className="px-6 py-4 text-sm text-gray-900"
                          style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                          }}
                        >
                          {tier.hours}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              tier.discount > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans, sans-serif",
                            }}
                          >
                            {tier.discount}%
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 text-sm font-semibold text-gray-900"
                          style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                          }}
                        >
                          ${tier.rate}/hr
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-gray-900"
                          style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                          }}
                        >
                          {tier.totalRange}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Start Project-Based Hire
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Multi-Talent Discount */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Multi-Talent Discounts
            </h2>
            <p
              className="text-lg mb-8 opacity-90"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Save more when you scale your team with multiple specialists.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users size={32} className="mx-auto mb-4" />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  2-4 Specialists
                </h3>
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  5% Off
                </p>
                <p
                  className="text-sm opacity-80"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Total subscription
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
                <Zap size={32} className="mx-auto mb-4" />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  5-9 Specialists
                </h3>
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  10% Off
                </p>
                <p
                  className="text-sm opacity-80"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Total subscription
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield size={32} className="mx-auto mb-4" />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  10+ Specialists
                </h3>
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  15% Off
                </p>
                <p
                  className="text-sm opacity-80"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  + Free account manager
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Build Your Team
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>

          {/* FAQ or Contact CTA */}
          <div className="text-center mt-16">
            <h3
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Need a Custom Solution?
            </h3>
            <p
              className="text-lg text-gray-600 mb-6"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Contact our team to discuss enterprise pricing and custom
              arrangements.
            </p>
            <a
              href="/client/signup"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Contact Sales
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
  );
}
