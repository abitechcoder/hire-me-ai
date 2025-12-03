"use client";

import { useState } from "react";
import {
  ArrowRight,
  User,
  Mail,
  Phone,
  Link,
  Briefcase,
  Plus,
  X,
  MapPin,
  CircleDollarSign
} from "lucide-react";
import SkillDialog from "@/components/SkillDialog"
import Skills from "@/components/Skills";

export default function TalentApplicationPage() {
  const [formData, setFormData] = useState<any>({
    fullName: "",
    email: "",
    phone: "",
    skills: [],
    experienceLevel: "",
    portfolioLink: "",
    githubLink: "",
    linkedInURL: "",
    category: "",
    role: "",
    rates: "",
    location: "",
    // shortBio: "",
    videoLink: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [expertise, setExpertise] = useState([
    "Python",
    "JavaScript",
    "UI/UX",
    "React",
    "Node.js",
    "Django",
    "SQL",
    "AWS",
    "Figma",
    "Project Management",
    "Testing",
  ]);
  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    // "Senior Level (6-10 years)",
    // "Expert Level (10+ years)",
  ];

  const categories = [
    "Development",
    "Design",
    "Marketing",
  ];

  const locations = [
    "Lagos, Nigeria",
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [newSkill, setNewSkill] = useState(""); // State for the new skill input
  const [skillsError, setSkillsError] = useState(false); // State for skills validation error

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatesChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    setFormData({ ...formData, rates: value }); // Store the raw numeric value
  };

  // const handleFileChange = (e: any) => {
  //   setFormData({
  //     ...formData,
  //     resume: e.target.files[0],
  //   });
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate skills
    if (formData.skills.length === 0) {
      setSkillsError(true);
      return;
    } else {
      setSkillsError(false);
    }

    try {
      setIsSubmitting(true);

      // Send POST request to /api/talents
      const response = await fetch("/api/talents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Form submission successful:", result);

      setSubmitted(true); // Mark the form as submitted
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setExpertise([...expertise, newSkill.trim()]);
      setNewSkill("");
      setIsDialogOpen(false); // Close the dialog after adding the skill
    }
  };

  const handleSkillsUpdate = (skill: string) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s: string) => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updatedSkills });
  }


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
              Application Submitted!
            </h1>
            <p
              className="text-lg text-gray-600 mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Thank you for applying to join our talent network. Your
              application is now under review.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3
                className="font-semibold text-blue-900 mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                What happens next?
              </h3>
              <div className="space-y-3 text-sm text-blue-800 text-left">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <span className="text-blue-600 font-bold text-xs">1</span>
                  </div>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    We'll review your application within 48 hours
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <span className="text-blue-600 font-bold text-xs">2</span>
                  </div>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    If selected, you'll receive an assessment link via email
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <span className="text-blue-600 font-bold text-xs">3</span>
                  </div>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    Upon successful verification, you'll gain access to our
                    job portal
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="mt-8">
              <a
                href="/talent/assessment"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Take Assessment Now
                <ArrowRight size={20} className="ml-2" />
              </a>
            </div> */}
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
            Join Our Talent Network
          </h1>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Connect with global opportunities and showcase your skills to
            companies worldwide.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <User size={16} className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your full name"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>

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
                  placeholder="your@email.com"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <Phone size={16} className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="+234 XXX XXX XXXX"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <MapPin size={16} className="inline mr-2" />
                  Location *
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Role *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Frontend Developer, Digital Marketer"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>

              {/* Role Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Role Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  <option value="">Select role category</option>
                  {categories.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Briefcase size={16} className="inline mr-2" />
                Experience Level *
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                required
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <option value="">Select experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <Skills
              title="Skills Needed"
              skills={formData.skills}
              expertise={expertise}
              skillsError={skillsError}
              handleSkillsUpdate={handleSkillsUpdate}
              setIsDialogOpen={setIsDialogOpen} />

            {/* Rates */}
            <div>
              <label
                htmlFor="rates"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <CircleDollarSign size={16} className="inline mr-2" />
                Rates
              </label>
              <input
                type="text"
                id="rates"
                name="rates"
                required
                value={
                  formData.rates
                    ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(formData.rates)
                    : ""
                } // Format the value for display
                onChange={handleRatesChange} // Use the updated handler
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., $20, $50"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Resume Upload */}
            {/* <div>
              <label
                htmlFor="resume"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <FileText size={16} className="inline mr-2" />
                Resume/CV *
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                required
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
              <p
                className="text-sm text-gray-500 mt-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div> */}

            {/* LinkedIn Link */}
            <div>
              <label
                htmlFor="linkedInURL"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Link size={16} className="inline mr-2" />
                LinkedIn Profile Link *
              </label>
              <input
                type="text"
                id="linkedInURL"
                name="linkedInURL"
                required
                value={formData.linkedInURL}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Share a link to your LinkedIn profile"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Intro Video Link */}
            <div>
              <label
                htmlFor="videoLink"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Link size={16} className="inline mr-2" />
                Introduction Video Link *
              </label>
              <input
                type="text"
                id="videoLink"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Share a link to your introductio video"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Portfolio Link */}
            <div>
              <label
                htmlFor="portfolioLink"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Link size={16} className="inline mr-2" />
                Portfolio Link
              </label>
              <input
                type="text"
                id="portfolioLink"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Share a link to your portfolio or personal website"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Github Link */}
            <div>
              <label
                htmlFor="githubLink"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Link size={16} className="inline mr-2" />
                Github Link
              </label>
              <input
                type="text"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Share a link to your Github profile"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div>

            {/* Short Bio */}
            {/* <div>
              <label
                htmlFor="shortBio"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Professional Bio *
              </label>
              <textarea
                id="shortBio"
                name="shortBio"
                required
                rows={4}
                value={formData.shortBio}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Tell us about yourself, your professional background, and what makes you a great hire..."
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
            </div> */}

            {/* Video Submission Link */}
            {/* <div>
              <label
                htmlFor="videoSubmissionLink"
                className="block text-sm font-semibold text-gray-900 mb-3"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <Video size={16} className="inline mr-2" />
                Video Introduction (Optional)
              </label>
              <input
                type="url"
                id="videoSubmissionLink"
                name="videoSubmissionLink"
                value={formData.videoSubmissionLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://youtube.com/watch?v=... or Loom link"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              />
              <p
                className="text-sm text-gray-500 mt-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                2-3 minute video introducing yourself and your skills
                (YouTube, Loom, or similar)
              </p>
            </div> */}

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
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
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
                  Free
                </div>
                <div
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Application
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-green-600 font-bold text-lg"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  48hr
                </div>
                <div
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Response Time
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-purple-600 font-bold text-lg"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Global
                </div>
                <div
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Opportunities
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Add Skill Dialog */}
        {isDialogOpen && (
          <SkillDialog newSkill={newSkill} setNewSkill={setNewSkill} setIsDialogOpen={setIsDialogOpen} handleAddSkill={handleAddSkill} />
        )}
      </div>
    </div>
  );
}
