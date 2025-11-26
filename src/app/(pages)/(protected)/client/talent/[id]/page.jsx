"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Shield,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Github,
  Play,
  Video,
  MessageCircle,
  Unlock,
  ExternalLink,
} from "lucide-react";

import { useParams } from "next/navigation";

export default function TalentProfilePage() {
  const params = useParams();
  const [talent, setTalent] = useState(null);
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Params:", params);

  const talentId = params?.id;

  // Sample detailed talent data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const talentData = {
        1: {
          id: 1,
          name: "Adebayo Johnson",
          role: "Senior React Developer",
          location: "Lagos, Nigeria",
          timezone: "UTC+1 (West Africa Time)",
          availability: "Available Now",
          skills: [
            "React",
            "Node.js",
            "TypeScript",
            "AWS",
            "Docker",
            "GraphQL",
            "Jest",
            "Git",
          ],
          rating: 4.9,
          totalReviews: 47,
          placements: 23,
          hourlyRate: "$45/hr",
          verified: true,
          avatar:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
          category: "Engineering",
          experience: "Senior Level",
          matchScore: 92,
          about: `I'm a passionate full-stack developer with over 6 years of experience building scalable web applications. 
                 I specialize in React and Node.js ecosystems, with strong expertise in cloud technologies and modern development practices. 
                 I've helped numerous startups and established companies build robust digital solutions.`,
          portfolio: [
            {
              id: 1,
              title: "E-commerce Platform",
              description:
                "Full-stack e-commerce solution built with React, Node.js, and AWS",
              image:
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400",
              technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
              link: "https://example.com",
            },
            {
              id: 2,
              title: "Task Management App",
              description:
                "Collaborative project management tool with real-time updates",
              image:
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=400",
              technologies: ["React", "Socket.io", "MongoDB"],
              link: "https://example.com",
            },
          ],
          experience_timeline: [
            {
              id: 1,
              company: "TechFlow Solutions",
              role: "Senior Frontend Developer",
              duration: "2022 - Present",
              description:
                "Led development of customer-facing web applications serving 100K+ users",
            },
            {
              id: 2,
              company: "StartupXYZ",
              role: "Full Stack Developer",
              duration: "2020 - 2022",
              description:
                "Built core platform features and scaled infrastructure to handle rapid growth",
            },
            {
              id: 3,
              company: "Freelance",
              role: "Web Developer",
              duration: "2019 - 2020",
              description:
                "Delivered custom web solutions for small to medium businesses",
            },
          ],
          contact: {
            email: "adebayo.johnson@email.com",
            phone: "+234 801 234 5678",
            linkedin: "linkedin.com/in/adebayo-johnson",
            github: "github.com/adebayo-dev",
          },
          videoIntro: "https://example.com/video",
          languages: ["English (Fluent)", "Yoruba (Native)"],
          workStyle: "Remote, Hybrid",
          responseTime: "< 2 hours",
        },
        // Add more talent profiles here...
      };

      const foundTalent = talentData[talentId] || null;
      setTalent(foundTalent);
      setIsLoading(false);
    }, 500);
  }, [talentId]);

  const handleUnlockContact = () => {
    const confirmed = window.confirm("Unlock contact information for $20?");
    if (confirmed) {
      setIsContactUnlocked(true);
      alert(
        "Contact information unlocked! You can now view full contact details and book meetings.",
      );
    }
  };

  const BlurredText = ({ text, className = "" }) => (
    <span className={`filter blur-sm select-none ${className}`}>{text}</span>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-6 w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="h-64 bg-gray-300 rounded-xl"></div>
              </div>
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!talent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Talent Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The talent profile you're looking for doesn't exist.
            </p>
            <a
              href="/client/browse-talent"
              className="inline-flex items-center px-4 py-2 bg-[#007bff] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Browse Talent
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/client/browse-talent"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600"
              />
            </a>
            <h1 className="text-3xl font-bold text-gray-900">
              Talent Profile
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  {talent.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#007bff] rounded-full flex items-center justify-center">
                      <Shield size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {talent.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {talent.role}
                </p>

                {/* Match Score */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-green-600">
                      {talent.matchScore}%
                    </span>
                    <p className="text-sm text-green-600 font-medium">
                      Match Score
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="font-medium text-gray-900">
                        {talent.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      ({talent.totalReviews} reviews)
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 mb-1">
                      {talent.placements}
                    </p>
                    <p className="text-xs text-gray-500">
                      Successful Placements
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-3" />
                  {talent.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-3" />
                  {talent.availability}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-3" />
                  {talent.timezone}
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {talent.hourlyRate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Hourly Rate
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {!isContactUnlocked ? (
                  <button
                    onClick={handleUnlockContact}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Unlock size={16} className="mr-2" />
                    Unlock Contact ($20)
                  </button>
                ) : (
                  <div className="text-center py-2 bg-green-50 text-green-600 text-sm font-medium rounded-lg">
                    ✓ Contact Unlocked
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={!isContactUnlocked}
                    className={`inline-flex items-center justify-center px-3 py-2 font-medium rounded-lg transition-colors duration-200 ${
                      isContactUnlocked
                        ? "bg-[#007bff] text-white hover:bg-blue-600"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Video size={14} className="mr-1" />
                    Book Meet
                  </button>
                  <button
                    disabled={!isContactUnlocked}
                    className={`inline-flex items-center justify-center px-3 py-2 font-medium rounded-lg transition-colors duration-200 ${
                      isContactUnlocked
                        ? "border border-[#007bff] text-[#007bff] hover:bg-blue-50"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <MessageCircle size={14} className="mr-1" />
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-[#007bff] text-sm rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail size={16} className="mr-3 text-gray-400" />
                  {isContactUnlocked ? (
                    <a
                      href={`mailto:${talent.contact.email}`}
                      className="text-[#007bff] hover:underline"
                    >
                      {talent.contact.email}
                    </a>
                  ) : (
                    <BlurredText
                      text="adebayo.johnson@email.com"
                      className="text-gray-600"
                    />
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Phone size={16} className="mr-3 text-gray-400" />
                  {isContactUnlocked ? (
                    <a
                      href={`tel:${talent.contact.phone}`}
                      className="text-[#007bff] hover:underline"
                    >
                      {talent.contact.phone}
                    </a>
                  ) : (
                    <BlurredText
                      text="+234 801 234 5678"
                      className="text-gray-600"
                    />
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Linkedin size={16} className="mr-3 text-gray-400" />
                  {isContactUnlocked ? (
                    <a
                      href={`https://${talent.contact.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007bff] hover:underline flex items-center"
                    >
                      LinkedIn Profile
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  ) : (
                    <BlurredText
                      text="LinkedIn Profile"
                      className="text-gray-600"
                    />
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Github size={16} className="mr-3 text-gray-400" />
                  {isContactUnlocked ? (
                    <a
                      href={`https://${talent.contact.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007bff] hover:underline flex items-center"
                    >
                      GitHub Profile
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  ) : (
                    <BlurredText
                      text="GitHub Profile"
                      className="text-gray-600"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                About Me
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {talent.about}
              </p>
            </div>

            {/* Video Introduction */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Video Introduction
              </h3>
              <div className="relative bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#007bff] transition-colors">
                  <Play size={24} />
                  <span>Play Video Introduction</span>
                </button>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Experience
              </h3>
              <div className="space-y-6">
                {talent.experience_timeline.map((exp, index) => (
                  <div key={exp.id} className="relative pl-6">
                    {index !== talent.experience_timeline.length - 1 && (
                      <div className="absolute left-2 top-8 bottom-0 w-px bg-gray-200"></div>
                    )}
                    <div className="absolute left-0 top-2 w-4 h-4 bg-[#007bff] rounded-full"></div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {exp.role}
                      </h4>
                      <p className="text-[#007bff] font-medium text-sm mb-1">
                        {exp.company}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        {exp.duration}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Portfolio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {talent.portfolio.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {project.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        className="text-[#007bff] hover:underline text-sm flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Languages
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {talent.languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Work Style
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {talent.workStyle}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Response Time
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {talent.responseTime}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Experience Level
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {talent.experience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
