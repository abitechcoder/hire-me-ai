"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, DollarSign, Calendar, Briefcase, CheckCircle } from "lucide-react";
import { useJob, useApplyJob } from "@/hooks/queries/useJobs";
import { useMyApplications } from "@/hooks/queries/useApplications";
import useAuth from "@/hooks/useAuth";
import appwriteService from "@/appwrite/config";
import { Loader2 } from "lucide-react";

export default function TalentJobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = Array.isArray(params?.jobId) ? params.jobId[0] : params?.jobId;
    const { authStatus } = useAuth();
    const [user, setUser] = useState<{ name: string; $id: string } | null>(null);

    const { data: job, isLoading: isJobLoading } = useJob(jobId as string);
    const { data: myApplications, isLoading: isAppsLoading } = useMyApplications(user?.$id || "");
    const applyMutation = useApplyJob();

    useEffect(() => {
        appwriteService.getCurrentUser().then((userData) => {
            if (userData) {
                setUser(userData);
            }
        });
    }, []);

    const hasApplied = myApplications?.some(app => app.jobId === jobId);

    const handleApply = () => {
        if (!user || !jobId) return;

        applyMutation.mutate({
            jobId: jobId as string,
            talentId: user.$id
        }, {
            onSuccess: () => {
                // Show success message or toast
                alert("Application submitted successfully!");
            },
            onError: (error: any) => {
                alert(error?.response?.data?.error || "Failed to apply. Please try again.");
            }
        });
    };

    if (isJobLoading || isAppsLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 pb-12">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
                    <Link href="/talent/dashboard" className="text-blue-600 hover:underline">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/talent/dashboard"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Briefcase size={16} />
                                        <span>{job.workType}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={16} />
                                        <span>{job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {hasApplied ? (
                                <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-lg font-medium border border-green-200">
                                    <CheckCircle size={20} />
                                    Applied
                                </div>
                            ) : (
                                <button
                                    onClick={handleApply}
                                    disabled={applyMutation.isPending}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {applyMutation.isPending ? 'Applying...' : 'Apply Now'}
                                </button>
                            )}
                        </div>

                        <div className="prose max-w-none text-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                            <p className="whitespace-pre-wrap mb-8">{job.description}</p>

                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {job.skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
