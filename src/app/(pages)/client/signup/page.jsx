"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building,
  Mail,
  User,
  DollarSign,
  Link,
  CircleDollarSign,
  LockKeyhole
} from "lucide-react";
import appwriteService from "@/appwrite/config";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function ClientSignupPage() {
  const router = useRouter();
  const { authStatus, setAuthStatus } = useAuth();
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactPerson: "",
    email: "",
    password: "",
    roleRequirements: "",
    budget: "",
    linkedInUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Retail",
    "Education",
    "Other"
  ];

  // const urgencyLevels = [
  //   "ASAP (24-48 hours)",
  //   "Within 1 week",
  //   "Within 2 weeks",
  //   "Within 1 month",
  //   "Flexible timeline",
  // ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    setFormData({ ...formData, budget: value }); // Store the raw numeric value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `When submitting client signup, the response was [${response.status}] ${response.statusText}`,
        );
      }

      const user = await appwriteService.createUser({ email: formData.email, password: formData.password, name: formData.contactPerson });
      if (user) {
        setSubmitted(true);
        setAuthStatus(true);
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect authenticated clients to dashboard when authStatus changes
  useEffect(() => {
    if (authStatus) {
      router.replace('/client/dashboard');
    }
  }, [authStatus, router]);

  if (submitted) {
    return (
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Welcome to HireMe AI!
            </h1>
            <p
              className="text-lg text-gray-600 mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Thank you for signing up. Our team will review your requirements
              and get back to you within 24 hours with qualified candidates.
            </p>
            <div className="space-y-4 text-sm text-gray-500">
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                📧 Check your email for next steps
              </p>
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                📞 Our team will contact you within 24 hours
              </p>
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                🎯 We'll match you with verified talent in 48 hours
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/browse-talent"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Browse Our Talent Pool
                <ArrowRight size={20} className="ml-2" />
              </a>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Go to Dashboard
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Find Your Perfect Hire
          </h1>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Tell us about your hiring needs and we'll connect you with
            verified African professionals in 48 hours.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <Building size={16} className="inline mr-2" />
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your company name"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <DollarSign size={16} className="inline mr-2" />
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Person */}
            <div>
              <label
                htmlFor="contactPerson"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <User size={16} className="inline mr-2" />
                Contact Person *
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                required
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your full name"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <Mail size={16} className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your@company.com"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <LockKeyhole size={16} className="inline mr-2" />
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter password"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>
            </div>

            {/* LinkedIn Link */}
            <div>
              <label
                htmlFor="linkedInUrl"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Link size={16} className="inline mr-2" />
                LinkedIn Profile Link *
              </label>
              <input
                type="text"
                id="linkedInUrl"
                name="linkedInUrl"
                required
                value={formData.linkedInUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Share a link to your LinkedIn profile"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Role Requirements */}
            <div>
              <label
                htmlFor="roleRequirements"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                What type of talent are you looking for? *
              </label>
              <textarea
                id="roleRequirements"
                name="roleRequirements"
                required
                rows={4}
                value={formData.roleRequirements}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Describe the role, required skills, experience level, and any specific requirements..."
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Rates */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <CircleDollarSign size={16} className="inline mr-2" />
                Budget *
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                required
                value={
                  formData.budget
                    ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(formData.budget)
                    : ""
                } // Format the value for display
                onChange={handleBudgetChange} // Use the updated handler
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., $2000, $5000"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Matched in 48 Hours
                    <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div
                  className="text-blue-600 font-bold text-lg"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  48hrs
                </div>
                <div
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Match Guarantee
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-green-600 font-bold text-lg"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  100%
                </div>
                <div
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Verified Talent
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-purple-600 font-bold text-lg"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  30-day
                </div>
                <div
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Money Back
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
