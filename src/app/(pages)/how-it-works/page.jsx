"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Clock,
  CheckCircle,
  Mail,
  FileText,
  MessageCircle,
  CreditCard,
  Star,
  Shield,
  Target,
  Video,
  Calendar,
  PlayCircle,
  UserCheck,
  Briefcase,
  Award,
  DollarSign,
} from "lucide-react";

export default function HowItWorksPage() {
  const [activeFlow, setActiveFlow] = useState("client");

  const clientSteps = [
    {
      step: 1,
      title: "Discovery",
      duration: "2 minutes",
      icon: <Target size={24} />,
      description: "Visit HireMe AI and discover verified African talent",
      details: [
        "Land on hiremeai.com with clear value proposition",
        "See key benefits: 60% cost savings, performance guaranteed",
        "Browse social proof from 12+ US companies",
        "Click 'Find Your Perfect Match'",
      ],
    },
    {
      step: 2,
      title: "Sign-Up",
      duration: "2 minutes",
      icon: <FileText size={24} />,
      description: "Quick form to understand your needs",
      details: [
        "Company name and contact details",
        "Role needed (Developer, Designer, etc.)",
        "Skills required and budget range",
        "Preferred start date",
        "Get confirmation: '3 matches in 48 hours'",
      ],
    },
    {
      step: 3,
      title: "Receive Matches",
      duration: "24-48 hours",
      icon: <Mail size={24} />,
      description: "Get 3 pre-verified candidates via email",
      details: [
        "Personalized email with candidate profiles",
        "Each candidate shows Trust Score (89-94/100)",
        "Direct links to detailed profiles",
        "Side-by-side comparison available",
      ],
    },
    {
      step: 4,
      title: "Profile Review",
      duration: "5 minutes",
      icon: <UserCheck size={24} />,
      description: "Review detailed candidate profiles",
      details: [
        "Video introductions from candidates",
        "Skills breakdown and work samples",
        "Previous client reviews and ratings",
        "Availability, rates, and time zones",
        "Click 'Hire' to proceed",
      ],
    },
    {
      step: 5,
      title: "Hiring & Payment",
      duration: "2 minutes",
      icon: <CreditCard size={24} />,
      description: "Secure contract and escrow payment",
      details: [
        "Auto-generated contract with clear terms",
        "14-day trial and performance guarantee",
        "Secure payment held in escrow",
        "E-signature via PandaDoc integration",
      ],
    },
    {
      step: 6,
      title: "Onboarding",
      duration: "Day 1",
      icon: <Calendar size={24} />,
      description: "Get started with your new team member",
      details: [
        "Scheduled onboarding call (we facilitate)",
        "Add talent to your tools (Slack, Asana)",
        "Set expectations and first tasks",
        "Receive onboarding checklist",
      ],
    },
    {
      step: 7,
      title: "Ongoing Management",
      duration: "Weeks 1-4",
      icon: <MessageCircle size={24} />,
      description: "Continuous support during trial period",
      details: [
        "Regular check-ins at Day 3, 7, 14, 21",
        "Performance surveys and feedback",
        "Mid-trial review call",
        "Decision point: Continue or replace",
      ],
    },
    {
      step: 8,
      title: "Retention",
      duration: "Month 2+",
      icon: <Award size={24} />,
      description: "Long-term success and growth",
      details: [
        "Monthly performance dashboards",
        "Quarterly business reviews",
        "Upselling opportunities",
        "Continued support and optimization",
      ],
    },
  ];

  const talentSteps = [
    {
      step: 1,
      title: "Discovery",
      duration: "5 minutes",
      icon: <Target size={24} />,
      description: "Learn about HireMe AI and premium opportunities",
      details: [
        "Discover via LinkedIn, referrals, or tech communities",
        "Visit hiremeai.com/talent",
        "See benefits: USD earnings, verified clients, remote work",
        "Click 'Apply to Join'",
      ],
    },
    {
      step: 2,
      title: "Application",
      duration: "10 minutes",
      icon: <FileText size={24} />,
      description: "Submit your professional profile",
      details: [
        "Complete detailed application form",
        "Upload resume and portfolio links",
        "Record 3-minute intro video",
        "Answer: 'Why work with US clients?'",
        "Get confirmation: Review in 5 days",
      ],
    },
    {
      step: 3,
      title: "Vetting Process",
      duration: "1 week",
      icon: <Shield size={24} />,
      description: "Complete our rigorous screening",
      details: [
        "Skills test (HackerRank or design brief)",
        "Availability and commitment survey",
        "Reference checks with 2 contacts",
        "Decision communicated in 3 days",
      ],
    },
    {
      step: 4,
      title: "Video Interview",
      duration: "30 minutes",
      icon: <Video size={24} />,
      description: "Personal interview with our team",
      details: [
        "Identity verification on camera",
        "Portfolio walkthrough and demo",
        "Communication assessment",
        "Culture fit and expectations discussion",
      ],
    },
    {
      step: 5,
      title: "Onboarding Academy",
      duration: "1 week",
      icon: <PlayCircle size={24} />,
      description: "Complete certification program",
      details: [
        "US Business Culture 101 training",
        "Client communication best practices",
        "Tools training (Slack, Asana, Zoom)",
        "Platform rules and guidelines",
        "Pass final quiz (85%+ required)",
      ],
    },
    {
      step: 6,
      title: "Profile Activation",
      duration: "Instant",
      icon: <UserCheck size={24} />,
      description: "Go live on the platform",
      details: [
        "Receive 'HireMe AI Certified' badge",
        "Profile goes live for client matching",
        "Access to talent portal dashboard",
        "Set rates and availability preferences",
      ],
    },
    {
      step: 7,
      title: "First Match",
      duration: "When selected",
      icon: <Star size={24} />,
      description: "Get matched with your first client",
      details: [
        "Receive match notification via email",
        "Review client company and project details",
        "Accept or decline the opportunity",
        "E-sign contract if accepting",
      ],
    },
    {
      step: 8,
      title: "Client Onboarding",
      duration: "Week 1",
      icon: <MessageCircle size={24} />,
      description: "Start working with your new client",
      details: [
        "Join facilitated kickoff call",
        "Get added to client's tools and systems",
        "Receive first assignments",
        "Daily check-ins during first week",
      ],
    },
    {
      step: 9,
      title: "Getting Paid",
      duration: "Monthly",
      icon: <DollarSign size={24} />,
      description: "Secure, reliable USD payments",
      details: [
        "Payment released after trial completion",
        "Funds sent to Payoneer account (3-5 days)",
        "Auto-payments on 1st of each month",
        "Full payment transparency",
      ],
    },
    {
      step: 10,
      title: "Building Reputation",
      duration: "Ongoing",
      icon: <Award size={24} />,
      description: "Grow your career and earnings",
      details: [
        "Client ratings improve Trust Score",
        "Top performers get 'Top Talent' badge",
        "Higher scores unlock better opportunities",
        "Mutual rating system for accountability",
      ],
    },
  ];

  // Animation Variants
  const stepVariants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and slightly below
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Fade in and slide up
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
            How It Works
          </h1>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Simple, transparent process to connect you with verified African
            talent. From discovery to long-term success, we guide you every
            step of the way.
          </p>

          {/* Flow Toggle */}
          <div className="inline-flex items-center bg-gray-200 rounded-full p-1 mb-12">
            <button
              onClick={() => setActiveFlow("client")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors flex items-center ${activeFlow === "client"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
                }`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <Briefcase size={16} className="mr-2" />
              For Clients
            </button>
            <button
              onClick={() => setActiveFlow("talent")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors flex items-center ${activeFlow === "talent"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
                }`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <Users size={16} className="mr-2" />
              For Talent
            </button>
          </div>
        </div>

        {/* Client Flow */}
        {activeFlow === "client" && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Client Journey: From Discovery to Success
              </h2>
              <p
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Your complete hiring experience, designed for speed and
                confidence.
              </p>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-200 hidden md:block"></div>

              {/* Process Steps */}
              <div className="space-y-12">
                {clientSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-start md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    variants={stepVariants} // Apply animation variants
                    initial="hidden" // Initial state
                    whileInView="visible" // Animate when in view
                    viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the step is visible
                  >
                    {/* Step Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="text-blue-600">{step.icon}</div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div
                      className={`relative w-full lg:w-[45%] bg-gray-50 rounded-2xl p-6 shadow-md ${index % 2 === 0 ? "md:ml-12" : "md:mr-12"
                        }`}
                    >
                      <h3
                        className="text-lg md:text-xl font-bold text-gray-900 mb-2"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        Step {step.step}: {step.title}
                      </h3>
                      <p
                        className="text-gray-600 text-base md:text-lg mb-4"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircle
                              size={16}
                              className="text-green-500 mr-3 mt-0.5 shrink-0"
                            />
                            <span
                              className="text-gray-700 text-base"
                              style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                              }}
                            >
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="absolute top-0 right-3 flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mt-4">
                        <Clock size={14} className="mr-1" />
                        {step.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Client CTA */}
            <div className="text-center mt-16">
              <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white">
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Ready to Hire Your Perfect Match?
                </h3>
                <p
                  className="text-lg mb-8 opacity-90"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Join 12+ US companies who've found their ideal team members
                  through HireMe AI
                </p>
                <a
                  href="/client/signup"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Start Your 14-Day Risk-Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Talent Flow */}
        {activeFlow === "talent" && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Talent Journey: From Application to Success
              </h2>
              <p
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Your path to verified status and premium USD opportunities with top US companies.
              </p>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-200 hidden md:block"></div>

              {/* Process Steps */}
              <div className="space-y-12">
                {talentSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-start md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    variants={stepVariants} // Apply animation variants
                    initial="hidden" // Initial state
                    whileInView="visible" // Animate when in view
                    viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the step is visible
                  >
                    {/* Step Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="text-green-600">{step.icon}</div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div
                      className={`relative w-full md:w-[45%] bg-gray-50 rounded-2xl p-6 shadow-md ${index % 2 === 0 ? "md:ml-12" : "md:mr-12"
                        }`}
                    >
                      <h3
                        className="text-lg md:text-xl font-bold text-gray-900 mb-2 mt-8 lg:mt-2"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        Step {step.step}: {step.title}
                      </h3>
                      <p
                        className="text-gray-600 text-base md:text-lg mb-4"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircle
                              size={16}
                              className="text-green-500 mr-3 mt-0.5 shrink-0"
                            />
                            <span
                              className="text-gray-700 text-base"
                              style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                              }}
                            >
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="absolute top-0 right-3 flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mt-4">
                        <Clock size={14} className="mr-1" />
                        {step.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Talent CTA */}
            <div className="text-center mt-16">
              <div className="bg-linear-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Ready to Join Our Elite Talent Network?
                </h3>
                <p
                  className="text-lg mb-8 opacity-90"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Get verified, access premium clients, and earn in USD while working remotely.
                </p>
                <a
                  href="/talent/apply"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Apply to Join Now
                  <ArrowRight size={20} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
