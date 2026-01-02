"use client";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { useCloseJob, useUpdateJob, Job } from "@/hooks/queries/useJobs";
import ConfirmationModal from "./ui/ConfirmationModal";
import EditJobModal from "./EditJobModal";

const JobCard = ({ job }: { job: Job }) => {
    const router = useRouter();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [jobToClose, setJobToClose] = useState<string | null>(null);

    const closeJobMutation = useCloseJob();
    const updateJobMutation = useUpdateJob();

    const getStatusBadge = (status: string) => {
        const styles: any = {
            Active:
                "bg-green-50 text-green-600 border-green-200",
            Inactive:
                "bg-yellow-50 text-yellow-600 border-yellow-200",
            Closed:
                "bg-gray-50 text-gray-600 border-gray-200",
        };
        return (
            <span
                className={`inline - flex items - center px - 2.5 py - 0.5 rounded - full text - xs font - medium border ${styles[status]} `}
            >
                {status}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleEditJob = (job: Job) => {
        setSelectedJob(job);
        setIsEditModalOpen(true);
    };

    const handleViewJob = (jobId: string) => {
        router.push(`/client/active-jobs/${jobId}`);
    };

    const handleCloseJob = (jobId: string) => {
        setJobToClose(jobId);
        setIsCloseModalOpen(true);
    };

    const confirmCloseJob = () => {
        if (!jobToClose) return;

        closeJobMutation.mutate({
            jobId: jobToClose,
            status: "Closed"
        }, {
            onSuccess: () => {
                setIsCloseModalOpen(false);
                setJobToClose(null);
            },
            onError: () => {
                alert("Failed to close job. Please try again.");
                setIsCloseModalOpen(false);
            }
        });
    };

    const handleUpdateJob = (jobId: string, updates: Partial<Job>) => {
        updateJobMutation.mutate({
            jobId,
            updates
        }, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedJob(null);
            },
            onError: () => {
                alert("Failed to update job. Please try again.");
            }
        });
    };

    return (
        <div
            key={job.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
        >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Job Info */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <h3 className="flex-1 text-xl font-semibold text-gray-900">
                                    {job.title}
                                </h3>
                                <div>{getStatusBadge(job.status)}</div>
                            </div>
                            <p className="text-gray-600">
                                {job.description}
                            </p>
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
                        {job.skills?.map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-primary text-xs rounded-lg"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
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
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="grid grid-cols-2 md:flex md:justify-end pt-4 border-t border-gray-200 gap-4">
                <button
                    onClick={() => handleViewJob(job.id)}
                    className="inline-flex items-center justify-center cursor-pointer px-4 py-2 text-sm bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    <Eye size={16} className="mr-2" />
                    View
                </button>
                {job.status !== 'Closed' && (
                    <>
                        <button
                            onClick={() => handleEditJob(job)}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm bg-primary cursor-pointer text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                            <Edit3 size={16} className="mr-2" />
                            Edit
                        </button>
                        <button
                            onClick={() => handleCloseJob(job.id)}
                            className="col-span-2 inline-flex items-center justify-center px-4 py-2 text-sm bg-red-600 cursor-pointer text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            <Archive size={16} className="mr-2" />
                            Close
                        </button>
                    </>
                )}
            </div>

            <ConfirmationModal
                isOpen={isCloseModalOpen}
                onClose={() => setIsCloseModalOpen(false)}
                onConfirm={confirmCloseJob}
                title="Close Job Posting"
                message="Are you sure you want to close this job posting? This action cannot be easily undone."
                confirmText="Close Job"
                variant="danger"
                isLoading={closeJobMutation.isPending}
            />

            <EditJobModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedJob(null);
                }}
                onSave={handleUpdateJob}
                job={selectedJob}
                isLoading={updateJobMutation.isPending}
            />
        </div>
    )
}

export default JobCard
