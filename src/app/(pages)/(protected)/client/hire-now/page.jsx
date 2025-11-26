"use client";

import { useState } from "react";
import { ArrowLeft, Plus, X, CheckCircle } from "lucide-react";

export default function HireNowPage() {
  const [formData, setFormData] = useState({
    workType: "",
    jobTitle: "",
    jobDescription: "",
    averageHours: "",
    paymentFrequency: "",
    salaryBudget: "",
    experienceLevel: "",
    skillsNeeded: [],
    requirements: "",
    professionalsNeeded: 1,
  });

  const [newSkill, setNewSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const workTypeOptions = [
    "Full Time",
    "Part Time",
    "Contract",
    "Project Based",
  ];
  const paymentFrequencyOptions = [
    "Weekly",
    "Bi-Weekly",
    "Per Milestone",
    "Monthly",
    "Hourly",
  ];
  const experienceLevelOptions = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Lead/Principal",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skillsNeeded.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter(
        (skill) => skill !== skillToRemove,
      ),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.workType) newErrors.workType = "Work type is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!formData.jobDescription)
      newErrors.jobDescription = "Job description is required";
    if (!formData.averageHours)
      newErrors.averageHours = "Average hours is required";
    if (!formData.paymentFrequency)
      newErrors.paymentFrequency = "Payment frequency is required";
    if (!formData.salaryBudget)
      newErrors.salaryBudget = "Salary/Budget is required";
    if (!formData.experienceLevel)
      newErrors.experienceLevel = "Experience level is required";
    if (formData.skillsNeeded.length === 0)
      newErrors.skillsNeeded = "At least one skill is required";
    if (!formData.requirements)
      newErrors.requirements = "Requirements are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success state
      setShowSuccess(true);

      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          workType: "",
          jobTitle: "",
          jobDescription: "",
          averageHours: "",
          paymentFrequency: "",
          salaryBudget: "",
          experienceLevel: "",
          skillsNeeded: [],
          requirements: "",
          professionalsNeeded: 1,
        });
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle
                size={32}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Job Request Submitted Successfully!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We'll start matching you with qualified candidates within 48
              hours. You'll receive an email notification when we have potential
              matches.
            </p>
            <div className="space-x-4">
              <a
                href="/portal"
                className="inline-flex px-6 py-3 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Back to Dashboard
              </a>
              <a
                href="/portal/active-jobs"
                className="inline-flex px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                View Active Jobs
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/client/dashboard"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600 dark:text-gray-400"
              />
            </a>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Post a New Job
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fill out the details below to get matched with qualified candidates
            within 48 hours.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Work Type */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Type *
              </label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.workType
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                <option value="">Select work type</option>
                {workTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.workType && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.workType}
                </p>
              )}
            </div>

            {/* Job Title */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="e.g. Senior React Developer"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.jobTitle
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.jobTitle && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.jobTitle}
                </p>
              )}
            </div>

            {/* Job Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Description / Project Info *
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.jobDescription
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.jobDescription && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.jobDescription}
                </p>
              )}
            </div>

            {/* Average Hours */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Hours Required *
              </label>
              <input
                type="number"
                name="averageHours"
                value={formData.averageHours}
                onChange={handleInputChange}
                min="1"
                max="80"
                placeholder="e.g. 40"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.averageHours
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.averageHours && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.averageHours}
                </p>
              )}
            </div>

            {/* Payment Frequency */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Frequency *
              </label>
              <select
                name="paymentFrequency"
                value={formData.paymentFrequency}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.paymentFrequency
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                <option value="">Select payment frequency</option>
                {paymentFrequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.paymentFrequency && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.paymentFrequency}
                </p>
              )}
            </div>

            {/* Salary/Budget */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Salary/Budget *
              </label>
              <input
                type="text"
                name="salaryBudget"
                value={formData.salaryBudget}
                onChange={handleInputChange}
                placeholder="e.g. $50,000 - $70,000"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.salaryBudget
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.salaryBudget && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.salaryBudget}
                </p>
              )}
            </div>

            {/* Experience Level */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience Level *
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.experienceLevel
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                <option value="">Select experience level</option>
                {experienceLevelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.experienceLevel && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.experienceLevel}
                </p>
              )}
            </div>

            {/* Skills Needed */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills Needed *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skillsNeeded.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#007bff] text-white"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:bg-blue-600 rounded-full p-0.5 transition-colors duration-200"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill(e)}
                  placeholder="Add a skill (e.g. React, Python, etc.)"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-3 bg-[#007bff] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
                >
                  <Plus size={20} />
                </button>
              </div>
              {errors.skillsNeeded && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.skillsNeeded}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Requirements *
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={3}
                placeholder="List specific requirements, qualifications, or must-haves..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors ${
                  errors.requirements
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.requirements}
                </p>
              )}
            </div>

            {/* Number of Professionals */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Professionals Needed
              </label>
              <input
                type="number"
                name="professionalsNeeded"
                value={formData.professionalsNeeded}
                onChange={handleInputChange}
                min="1"
                max="20"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <a
              href="/portal"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </a>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 bg-[#007bff] text-white font-medium rounded-lg transition-all duration-200 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600 hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Get Matched in 48 Hours"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
