"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ArrowLeft,
} from "lucide-react";
import JobCard from "@/components/JobCard";
import { useJobs, Job } from "@/hooks/queries/useJobs";
import Loading from "@/components/ui/Loading";

export default function ActiveJobsPage() {
  const { data: jobs, isLoading, error } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [workTypeFilter, setWorkTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const statusOptions = ["All", "Active", "Inactive", "Closed"];
  const workTypeOptions = [
    "All",
    "Full Time",
    "Part Time",
    "Contract",
    "Project Based",
  ];
  const locationOptions = ["All", "Remote", "Hybrid", "On-site"];

  // Filter jobs based on searchQuery, statusFilter, workTypeFilter, and locationFilter
  useEffect(() => {
    if (jobs) {
      const filtered = jobs.filter((job: Job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || job.status === statusFilter;

        const matchesWorkType =
          workTypeFilter === "All" || job.workType === workTypeFilter;

        const matchesLocation =
          locationFilter === "All" || job.location === locationFilter;

        return matchesSearch && matchesStatus && matchesWorkType && matchesLocation;
      });
      setFilteredJobs(filtered);
    }

  }, [searchQuery, statusFilter, workTypeFilter, locationFilter, jobs]);

  if (isLoading) {
    return <Loading text="Loading jobs..." />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

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
              <ArrowLeft size={20} className="text-gray-600" />
            </a>
            <h1 className="text-3xl font-bold text-gray-900">Active Jobs</h1>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
              />
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredJobs.map((job: Job) => (
            <JobCard key={job.id} job={job} />
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
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Post New Job
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
