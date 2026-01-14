"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useJob } from "@/hooks/queries/useJobs";
import { useJobApplicants, useUpdateApplicationStatus, Talent, Applicant } from "@/hooks/queries/useTalents";

import ConfirmationModal from "@/components/ui/ConfirmationModal";
import Loading from "@/components/ui/Loading";

export default function CandidatesPage() {
  const params = useParams();
  const jobId = Array.isArray(params?.jobId) ? params.jobId[0] : params?.jobId;

  const { data: job, isLoading: isJobLoading } = useJob(jobId as string);
  const { data: applicants, isLoading: isApplicantsLoading } = useJobApplicants(jobId as string);
  const updateStatusMutation = useUpdateApplicationStatus();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("pending");
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'hire' | 'reject' | null;
    candidate: Applicant | null;
  }>({
    isOpen: false,
    type: null,
    candidate: null,
  });

  const handleActionClick = (candidate: Applicant, type: 'hire' | 'reject') => {
    setModalConfig({
      isOpen: true,
      type,
      candidate,
    });
  };

  const handleConfirmAction = () => {
    const { type, candidate } = modalConfig;
    console.log("Candidate:", candidate);
    console.log("Type:", type);
    if (!candidate || !type || !candidate.applicationId) return;

    updateStatusMutation.mutate({
      applicationId: candidate.applicationId,
      status: type === 'hire' ? 'hired' : 'rejected'
    }, {
      onSuccess: () => {
        // Close modal
        setModalConfig({ isOpen: false, type: null, candidate: null });
        // Optional: Show a toast here if we had one. For now, the UI update is enough feedback.
      },
      onError: () => {
        alert(`Failed to ${type} ${candidate.Name}. Please try again.`);
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };



  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCandidatesByStatus = (status: string) => {
    if (!applicants) return [];
    return applicants.filter((candidate) => (candidate.status || "pending") === status);
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const sections = [
    {
      id: "pending",
      name: "Pending Review",
      count: applicants?.filter(a => (a.status || "pending") === "pending").length || 0,
    },
    {
      id: "hired",
      name: "Hired",
      count: applicants?.filter(a => a.status === "hired").length || 0,
    },
    {
      id: "rejected",
      name: "Rejected",
      count: applicants?.filter(a => a.status === "rejected").length || 0,
    },
  ];

  if (isJobLoading || isApplicantsLoading) {
    return <Loading text="Loading candidates..." />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Job Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The job you're looking for doesn't exist.
            </p>
            <Link
              href="/client/active-jobs"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Active Jobs
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/client/active-jobs"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600"
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Candidates for {job.title}
            </h1>
          </div>
        </div>

        {/* Job Info Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {job.description}
              </p>
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {applicants?.length || 0}
              </div>
              <div className="text-sm text-gray-500">
                Total Applicants
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {applicants?.filter(a => a.status === "hired").length || 0}
              </div>
              <div className="text-sm text-gray-500">
                Hired
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {applicants?.filter(a => (a.status || "pending") === "pending").length || 0}
              </div>
              <div className="text-sm text-gray-500">
                Pending Review
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeSection === section.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {section.name}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
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
              key={candidate.userId}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Candidate Info */}
                <div className="flex items-start space-x-4 flex-1">
                  {candidate["Profile Photo"] ? (
                    <img
                      src={candidate["Profile Photo"]}
                      alt={candidate.Name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users size={20} className="text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.Name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      {candidate.Role}
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      {candidate.Location} • {candidate.Experience} experience
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.Skills?.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-primary text-xs rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.Skills?.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                          +{candidate.Skills.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star
                          size={14}
                          className="text-yellow-400 fill-current"
                        />
                        <span>{candidate["Trust Score"]}</span>
                      </div>
                      <span>${candidate.Rates}/hr</span>
                      {/* <span>Applied {formatDate(candidate["Applied Date"])}</span> */}
                    </div>
                  </div>
                </div>

                {/* Match Score & Actions */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getTrustScoreColor(candidate["Trust Score"])}`}
                    >
                      {candidate["Trust Score"]}%
                    </div>
                    <div className="text-sm text-gray-500">
                      Trust Score
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/client/talent/${candidate.userId}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Eye size={14} className="mr-1" />
                      View Profile
                    </Link>

                    {(candidate.status || "pending") === "pending" && (
                      <>
                        <button
                          onClick={() => handleActionClick(candidate, 'hire')}
                          className="inline-flex items-center px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          <ThumbsUp size={14} className="mr-1" />
                          Hire
                        </button>
                        <button
                          onClick={() => handleActionClick(candidate, 'reject')}
                          className="inline-flex items-center px-3 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          <ThumbsDown size={14} className="mr-1" />
                          Reject
                        </button>
                      </>
                    )}

                    {candidate.status === "hired" && (
                      <div className="text-green-600 text-sm font-medium">
                        ✓ Hired
                      </div>
                    )}

                    {candidate.status === "rejected" && (
                      <div className="text-red-600 text-sm">
                        ✗ Rejected
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
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Users size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No candidates in{" "}
              {sections.find((s) => s.id === activeSection)?.name.toLowerCase()}
            </h3>
            <p className="text-gray-600">
              {activeSection === "pending"
                ? "New candidates will appear here as they apply."
                : `No candidates have been ${activeSection} yet.`}
            </p>
          </div>
        )}
      </main>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={modalConfig.type === 'hire' ? 'Hire Candidate' : 'Reject Candidate'}
        message={
          modalConfig.type === 'hire'
            ? `Are you sure you want to hire ${modalConfig.candidate?.Name}? This will mark them as hired.`
            : `Are you sure you want to reject ${modalConfig.candidate?.Name}?`
        }
        confirmText={modalConfig.type === 'hire' ? 'Hire Candidate' : 'Reject Candidate'}
        variant={modalConfig.type === 'hire' ? 'primary' : 'danger'}
        isLoading={updateStatusMutation.isPending}
      />
    </div>
  );
}
