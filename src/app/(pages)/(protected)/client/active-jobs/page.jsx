"use client"

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Eye,
  Edit3,
  MoreVertical,
  X,
  Copy,
  Archive,
} from "lucide-react";

export default function ActiveJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [workTypeFilter, setWorkTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const statusOptions = ["All", "Active", "Inactive", "Closed"];
  const workTypeOptions = [
    "All",
    "Full Time",
    "Part Time",
    "Contract",
    "Project Based",
  ];
  const locationOptions = ["All", "Remote", "Hybrid", "On-site"];

  // Sample job data
  useEffect(() => {
    setJobs([
      {
        id: 1,
        title: "Senior React Developer",
        status: "Active",
        workType: "Full Time",
        salary: "$60,000 - $80,000",
        location: "Remote",
        postedDate: "2024-11-20",
        description:
          "Looking for an experienced React developer to join our growing team and help build scalable web applications.",
        pendingApplicants: 12,
        hired: 0,
        rejected: 3,
        matchPercentage: 85,
        experienceLevel: "Senior Level",
        skills: ["React", "Node.js", "TypeScript"],
      },
      {
        id: 2,
        title: "UI/UX Designer",
        status: "Active",
        workType: "Contract",
        salary: "$40,000 - $55,000",
        location: "Hybrid",
        postedDate: "2024-11-18",
        description:
          "Seeking a creative UI/UX designer to redesign our mobile application and improve user experience.",
        pendingApplicants: 8,
        hired: 1,
        rejected: 2,
        matchPercentage: 92,
        experienceLevel: "Mid Level",
        skills: ["Figma", "Adobe XD", "Prototyping"],
      },
      {
        id: 3,
        title: "Data Scientist",
        status: "Inactive",
        workType: "Full Time",
        salary: "$70,000 - $90,000",
        location: "Remote",
        postedDate: "2024-11-15",
        description:
          "Data scientist needed to analyze customer behavior and build machine learning models for predictive analytics.",
        pendingApplicants: 5,
        hired: 0,
        rejected: 7,
        matchPercentage: 78,
        experienceLevel: "Senior Level",
        skills: ["Python", "Machine Learning", "SQL"],
      },
      {
        id: 4,
        title: "Full Stack Developer",
        status: "Active",
        workType: "Part Time",
        salary: "$35/hr",
        location: "Remote",
        postedDate: "2024-11-22",
        description:
          "Part-time full stack developer to help maintain and expand our e-commerce platform.",
        pendingApplicants: 15,
        hired: 0,
        rejected: 1,
        matchPercentage: 89,
        experienceLevel: "Mid Level",
        skills: ["React", "Python", "PostgreSQL"],
      },
      {
        id: 5,
        title: "Digital Marketing Specialist",
        status: "Closed",
        workType: "Contract",
        salary: "$30,000 - $40,000",
        location: "Remote",
        postedDate: "2024-11-10",
        description:
          "Marketing specialist to develop and execute digital marketing campaigns across multiple channels.",
        pendingApplicants: 0,
        hired: 2,
        rejected: 6,
        matchPercentage: 95,
        experienceLevel: "Mid Level",
        skills: ["SEO", "Google Ads", "Content Marketing"],
      },
    ]);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesWorkType =
      workTypeFilter === "All" || job.workType === workTypeFilter;
    const matchesLocation =
      locationFilter === "All" || job.location === locationFilter;

    return matchesSearch && matchesStatus && matchesWorkType && matchesLocation;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Active:
        "bg-green-50 text-green-600 border-green-200",
      Inactive:
        "bg-yellow-50 text-yellow-600 border-yellow-200",
      Closed:
        "bg-gray-50 text-gray-600 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedJob(null);
  };

  const handleDuplicateJob = (job) => {
    const newJob = {
      ...job,
      id: jobs.length + 1,
      title: `${job.title} (Copy)`,
      postedDate: new Date().toISOString().split("T")[0],
      pendingApplicants: 0,
      hired: 0,
      rejected: 0,
    };
    setJobs((prev) => [newJob, ...prev]);
    alert("Job duplicated successfully!");
  };

  const handleCloseJob = (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to close this job posting?",
    );
    if (confirmed) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: "Closed" } : job,
        ),
      );
      alert("Job posting has been closed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/client/dashboard"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600"
              />
            </a>
            <h1 className="text-3xl font-bold text-gray-900">
              Active Jobs
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Manage your current job postings and review incoming applications.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search job titles or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              />
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status} Status
                  </option>
                ))}
              </select>
            </div>

            {/* Work Type Filter */}
            <div className="lg:w-48">
              <select
                value={workTypeFilter}
                onChange={(e) => setWorkTypeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              >
                {workTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type === "All" ? "All Work Types" : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="lg:w-48">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              >
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location === "All" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} job
            {filteredJobs.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Job Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-gray-600 mb-3 max-w-2xl">
                        {job.description}
                      </p>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="relative group">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <MoreVertical size={20} className="text-gray-500" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                        >
                          <Edit3 size={14} />
                          <span>Edit Job</span>
                        </button>
                        <button
                          onClick={() => handleDuplicateJob(job)}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          <Copy size={14} />
                          <span>Duplicate Job Post</span>
                        </button>
                        <button
                          onClick={() => handleCloseJob(job.id)}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 last:rounded-b-lg"
                        >
                          <Archive size={14} />
                          <span>Close Job</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
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

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-[#007bff] text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {job.pendingApplicants}
                      </div>
                      <div className="text-sm text-gray-500">
                        Pending Applicants
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {job.hired}
                      </div>
                      <div className="text-sm text-gray-500">
                        Hired
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">
                        {job.rejected}
                      </div>
                      <div className="text-sm text-gray-500">
                        Rejected
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-[#007bff]">
                        {job.matchPercentage}%
                      </div>
                      <div className="text-sm text-gray-500">
                        Match Percentage
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <a
                  href={`/client/candidates/${job.id}`}
                  className="inline-flex items-center px-4 py-2 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <Eye size={16} className="mr-2" />
                  View Job Posting
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or create a new job posting.
            </p>
            <a
              href="/client/hire-now"
              className="inline-flex items-center px-4 py-2 bg-[#007bff] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Post New Job
            </a>
          </div>
        )}
      </main>

      {/* Edit Job Modal */}
      {isEditModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Job: {selectedJob.title}
              </h3>
              <button
                onClick={closeEditModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    alert("Edit job functionality would open full edit form");
                    closeEditModal();
                  }}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Edit3 size={16} className="mr-2" />
                  <span>Edit Job</span>
                </button>
                <button
                  onClick={() => {
                    handleDuplicateJob(selectedJob);
                    closeEditModal();
                  }}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Copy size={16} className="mr-2" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => {
                    handleCloseJob(selectedJob.id);
                    closeEditModal();
                  }}
                  className="flex items-center justify-center px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <Archive size={16} className="mr-2" />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
