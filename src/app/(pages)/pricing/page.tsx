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

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { authStatus } = useAuth();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'scale'>("growth");

  const subscriptionPlans = {
    starter: {
      name: "Starter",
      tagline: "SME-Friendly",
      target: "Startups, solo entrepreneurs, first-time outsourcers",
      pricing: {
        monthly: { price: 50, discount: 0, total: 50 },
        quarterly: { price: 144, discount: 5, total: 48 },
        annual: { price: 528, discount: 12, total: 44 },
      },
      features: [
        "Up to 5 Job Postings & 9 Contact Unlocks",
        "Basic Performance Tracking (Simple activity reports)",
        "Basic Goal Setting & Task Allocation",
        "In-Platform Direct Messaging (Standard)",
        "14-Day Risk-Free Trial & Two Replacement Guarantees",
      ],
    },
    growth: {
      name: "Growth",
      tagline: "Most Popular",
      target: "Growing companies, agencies, 10-50 employees",
      pricing: {
        monthly: { price: 80, discount: 0, total: 80 },
        quarterly: { price: 228, discount: 5, total: 76 },
        annual: { price: 840, discount: 12, total: 70 },
      },
      features: [
        "Up to 12 Job Postings & 30 Contact Unlocks",
        "Advanced Performance Dashboard (Detailed metrics & analytics)",
        "Dedicated Account Manager & Weekly Check-ins (Hands-on support)",
        "Dedicated Account Manager Access (Priority channel access)",
        "Priority Replacements within 48 Hours",
      ],
    },
    scale: {
      name: "Scale",
      tagline: "Enterprise-Ready",
      target: "Established companies, teams of 50+, high-volume needs",
      pricing: {
        monthly: { price: 150, discount: 0, total: 150 },
        quarterly: { price: 143, discount: 5, total: 429 },
        annual: { price: 132, discount: 12, total: 1584 },
      },
      features: [
        "Unlimited Job Postings & Unlimited Contact Unlocks (Maximum Volume)",
        "API Access & Integration with Third-Party Monitoring (Time tracking, screenshots,etc.)",
        "Quarterly Business Reviews (QBR) & Automated Payroll/Invoicing Generation",
        "White-Label Option (Custom-branded platform)",
        "Instant Replacements within 24 Hours & Custom SLA Agreement & Compliance Documentation Access",
      ],
    },
  };

  const payAsYouGoRates = [
    { service: "Project Posting Fee", price: "Free" },
    { service: "Client Unlock Fee", price: "$20" },
  ];

  const handleSubscription = () => {
    if (!authStatus) {
      router.push("/client/signup")
    } else {
      alert("Handle Payment by Stripe")
    }
  }

  const handleContactUs = () => {
    alert("Contact us via Calendly")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBillingLabel = (cycle: string) => {
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
    <div className="pt-10 pb-16 px-6">
      <div className="max-w-7xl pt-20 mx-auto">
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
          <div className="lg:inline-flex flex flex-wrap items-center bg-gray-100 rounded-lg lg:rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
                }`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("quarterly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === "quarterly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
                }`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Quarterly
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                5% off
              </span>
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === "annual"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
                }`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Annual
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                12% off
              </span>
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {Object.entries(subscriptionPlans).map(([planKey, plan]) => (
            <div
              key={planKey}
              className={`relative bg-white border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${planKey === "growth"
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
                      Save {plan.pricing[billingCycle].discount}% • {" "}
                      {formatPrice(plan.pricing[billingCycle].total)} monthly
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
                onClick={handleSubscription}
                className={`w-full py-4 px-6 rounded-lg cursor-pointer font-semibold transition-colors flex items-center justify-center ${planKey === "growth"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </button>
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
              Perfect for project-based work or testing our talent before committing to a subscription. With our transparent pricing, you only pay for the services you need.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black">
                  <tr>
                    <th
                      className="w-1/2 px-6 py-4 text-center text-sm font-semibold text-white"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      Service
                    </th>
                    <th
                      className="w-1/2 px-6 py-4 text-center text-sm font-semibold text-white"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payAsYouGoRates.map((tier, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td
                        className="px-6 py-4 text-center text-sm text-gray-900"
                        style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      >
                        {tier.service}
                      </td>
                      <td
                        className="px-6 py-4 text-center text-sm text-gray-900 font-bold"
                        style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      >
                        {tier.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {!authStatus && (
            <div className="mt-8 text-center">
              <button
                onClick={() => router.push("/client/signup")}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Start Project-Based Hire
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          )}
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
            <a
              href="https://calendly.com/info-bmeson/30min"
              target="_blank"
              className="bg-white text-gray-900 px-8 py-4 cursor-pointer rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Build Your Team
              <ArrowRight size={20} className="ml-2" />
            </a>
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
            href="https://calendly.com/info-bmeson/30min"
            target="_blank"
            className="bg-gray-900 hover:bg-gray-800 cursor-pointer text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Contact Us
            <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
