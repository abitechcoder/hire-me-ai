"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Filter,
  Search,
} from "lucide-react";

export default function CandidatesPage({ params }) {
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("pending");

  const jobId = params?.jobId;

  // Sample job and candidate data
  useEffect(() => {
    setTimeout(() => {
      // Sample job data
      const jobData = {
        1: {
          id: 1,
          title: "Senior React Developer",
          workType: "Full Time",
          salary: "$60,000 - $80,000",
          location: "Remote",
          postedDate: "2024-11-20",
          description:
            "Looking for an experienced React developer to join our growing team and help build scalable web applications.",
          requirements: [
            "5+ years React experience",
            "TypeScript proficiency",
            "Team leadership experience",
          ],
          skills: ["React", "Node.js", "TypeScript", "AWS"],
        },
        2: {
          id: 2,
          title: "UI/UX Designer",
          workType: "Contract",
          salary: "$40,000 - $55,000",
          location: "Hybrid",
          postedDate: "2024-11-18",
          description:
            "Seeking a creative UI/UX designer to redesign our mobile application and improve user experience.",
          requirements: [
            "3+ years UX design",
            "Figma expertise",
            "Mobile design experience",
          ],
          skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        },
      };

      // Sample candidates data
      const candidatesData = [
        {
          id: 1,
          name: "Adebayo Johnson",
          role: "Senior React Developer",
          location: "Lagos, Nigeria",
          avatar:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
          skills: ["React", "Node.js", "TypeScript", "AWS"],
          experience: "6 years",
          rating: 4.9,
          matchScore: 95,
          status: "pending",
          appliedDate: "2024-11-22",
          lastActive: "2 hours ago",
          hourlyRate: "$45/hr",
          availability: "Available Now",
        },
        {
          id: 2,
          name: "Sarah Ndung'u",
          role: "Full Stack Developer",
          location: "Nairobi, Kenya",
          avatar:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
          skills: ["React", "Python", "Django", "PostgreSQL"],
          experience: "4 years",
          rating: 4.7,
          matchScore: 88,
          status: "pending",
          appliedDate: "2024-11-21",
          lastActive: "1 day ago",
          hourlyRate: "$40/hr",
          availability: "Available in 2 weeks",
        },
        {
          id: 3,
          name: "Kwame Asante",
          role: "Frontend Developer",
          location: "Accra, Ghana",
          avatar:
            "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
          skills: ["React", "Vue.js", "JavaScript", "CSS"],
          experience: "3 years",
          rating: 4.6,
          matchScore: 82,
          status: "pending",
          appliedDate: "2024-11-20",
          lastActive: "5 hours ago",
          hourlyRate: "$35/hr",
          availability: "Available Now",
        },
        {
          id: 4,
          name: "Amina Hassan",
          role: "Full Stack Developer",
          location: "Cairo, Egypt",
          avatar:
            "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
          skills: ["React", "Node.js", "MongoDB", "Express"],
          experience: "5 years",
          rating: 4.8,
          matchScore: 90,
          status: "hired",
          appliedDate: "2024-11-19",
          lastActive: "1 hour ago",
          hourlyRate: "$42/hr",
          availability: "Available Now",
          hiredDate: "2024-11-23",
        },
        {
          id: 5,
          name: "Thabo Mthembu",
          role: "Backend Developer",
          location: "Cape Town, South Africa",
          avatar:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
          skills: ["Node.js", "Python", "Java", "PostgreSQL"],
          experience: "4 years",
          rating: 4.5,
          matchScore: 70,
          status: "rejected",
          appliedDate: "2024-11-18",
          lastActive: "3 days ago",
          hourlyRate: "$38/hr",
          availability: "Available in 1 week",
          rejectedDate: "2024-11-22",
          rejectedReason: "Skills mismatch - more backend focused",
        },
        {
          id: 6,
          name: "Fatima Al-Rashid",
          role: "React Developer",
          location: "Casablanca, Morocco",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
          skills: ["React", "JavaScript", "HTML/CSS", "Git"],
          experience: "2 years",
          rating: 4.4,
          matchScore: 65,
          status: "rejected",
          appliedDate: "2024-11-17",
          lastActive: "1 week ago",
          hourlyRate: "$30/hr",
          availability: "Available Now",
          rejectedDate: "2024-11-21",
          rejectedReason: "Insufficient experience level",
        },
      ];

      setJob(jobData[jobId] || null);
      setCandidates(candidatesData);
      setIsLoading(false);
    }, 500);
  }, [jobId]);

  const moveCandidateToStatus = (candidateId, newStatus) => {
    setCandidates((prev) =>
      prev.map((candidate) => {
        if (candidate.id === candidateId) {
          const updatedCandidate = { ...candidate, status: newStatus };

          if (newStatus === "hired") {
            updatedCandidate.hiredDate = new Date().toISOString().split("T")[0];
          } else if (newStatus === "rejected") {
            updatedCandidate.rejectedDate = new Date()
              .toISOString()
              .split("T")[0];
            const reason = window.prompt("Rejection reason (optional):");
            if (reason) updatedCandidate.rejectedReason = reason;
          }

          return updatedCandidate;
        }
        return candidate;
      }),
    );
  };

  const handleHire = (candidate) => {
    const confirmed = window.confirm(
      `Are you sure you want to hire ${candidate.name}?`,
    );
    if (confirmed) {
      moveCandidateToStatus(candidate.id, "hired");
      alert(`${candidate.name} has been hired!`);
    }
  };

  const handleReject = (candidate) => {
    const confirmed = window.confirm(
      `Are you sure you want to reject ${candidate.name}?`,
    );
    if (confirmed) {
      moveCandidateToStatus(candidate.id, "rejected");
      alert(`${candidate.name} has been rejected.`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCandidatesByStatus = (status) => {
    return candidates.filter((candidate) => candidate.status === status);
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 80) return "text-blue-600 dark:text-blue-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const sections = [
    {
      id: "pending",
      name: "Pending Review",
      count: getCandidatesByStatus("pending").length,
    },
    {
      id: "hired",
      name: "Hired",
      count: getCandidatesByStatus("hired").length,
    },
    {
      id: "rejected",
      name: "Rejected",
      count: getCandidatesByStatus("rejected").length,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6 w-1/3"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Job Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The job you're looking for doesn't exist.
            </p>
            <a
              href="/portal/active-jobs"
              className="inline-flex items-center px-4 py-2 bg-[#007bff] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Active Jobs
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/portal/active-jobs"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600 dark:text-gray-400"
              />
            </a>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Candidates for {job.title}
            </h1>
          </div>
        </div>

        {/* Job Info Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {job.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{job.workType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign size={16} />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Posted {formatDate(job.postedDate)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {candidates.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Applicants
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {getCandidatesByStatus("hired").length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hired
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {getCandidatesByStatus("pending").length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Pending Review
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeSection === section.id
                      ? "border-[#007bff] text-[#007bff]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {section.name}
                  <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                    {section.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {getCandidatesByStatus(activeSection).map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Candidate Info */}
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {candidate.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                      {candidate.role}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      {candidate.location} • {candidate.experience} experience
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-[#007bff] text-xs rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                          +{candidate.skills.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Star
                          size={14}
                          className="text-yellow-400 fill-current"
                        />
                        <span>{candidate.rating}</span>
                      </div>
                      <span>{candidate.hourlyRate}</span>
                      <span>Applied {formatDate(candidate.appliedDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Match Score & Actions */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getMatchScoreColor(candidate.matchScore)}`}
                    >
                      {candidate.matchScore}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Match
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href={`/portal/talent/${candidate.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Eye size={14} className="mr-1" />
                      View Profile
                    </a>

                    {candidate.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleHire(candidate)}
                          className="inline-flex items-center px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          <ThumbsUp size={14} className="mr-1" />
                          Hire
                        </button>
                        <button
                          onClick={() => handleReject(candidate)}
                          className="inline-flex items-center px-3 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          <ThumbsDown size={14} className="mr-1" />
                          Reject
                        </button>
                      </>
                    )}

                    {candidate.status === "hired" && candidate.hiredDate && (
                      <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                        ✓ Hired on {formatDate(candidate.hiredDate)}
                      </div>
                    )}

                    {candidate.status === "rejected" &&
                      candidate.rejectedDate && (
                        <div className="text-red-600 dark:text-red-400 text-sm">
                          ✗ Rejected on {formatDate(candidate.rejectedDate)}
                          {candidate.rejectedReason && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {candidate.rejectedReason}
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getCandidatesByStatus(activeSection).length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Users size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No candidates in{" "}
              {sections.find((s) => s.id === activeSection)?.name.toLowerCase()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {activeSection === "pending"
                ? "New candidates will appear here as they apply."
                : `No candidates have been ${activeSection} yet.`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
