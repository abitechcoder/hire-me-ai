"use client";

import {
    MapPin,
    DollarSign,
    Calendar,
    Briefcase,
    Building
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Job } from "@/hooks/queries/useJobs";

const TalentJobCard = ({ job }: { job: Job }) => {
    const router = useRouter();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleViewJob = (jobId: string) => {
        // Assuming there is a public or talent-facing job details page
        // If not, we might need to create one or point to a placeholder
        router.push(`/talent/jobs/${jobId}`);
    };

    return (
        <div
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {job.title}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm mb-3">
                            {/* Company name is not in Job interface currently, using placeholder or description snippet */}
                            {/* job.companyName || */ "Company Name"}
                        </p>
                    </div>
                    {/* <button className="text-gray-400 hover:text-blue-600">
                        <Heart size={20} />
                    </button> */}
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        <Briefcase size={14} />
                        <span>{job.workType}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        <DollarSign size={14} />
                        <span>{job.salary}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills?.slice(0, 3).map((skill: string, index: number) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                    {job.skills?.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg">
                            +{job.skills.length - 3} more
                        </span>
                    )}
                </div>

                <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(job.postedDate)}
                    </span>
                    <button
                        onClick={() => handleViewJob(job.id)}
                        className="text-blue-600 font-medium text-sm hover:underline"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TalentJobCard;
