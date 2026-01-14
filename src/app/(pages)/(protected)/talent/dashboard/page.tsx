"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useMyApplications } from "@/hooks/queries/useApplications";
import { useJobs } from "@/hooks/queries/useJobs";
import TalentJobCard from "@/components/TalentJobCard";
import { Loader2 } from "lucide-react";

export default function TalentDashboard() {
    const router = useRouter();
    const { user } = useAuth();

    const { data: applications, isLoading: appsLoading } = useMyApplications(user?.$id || "");
    const { data: jobs, isLoading: jobsLoading } = useJobs();

    // Filter recommended jobs - for now just take the first 3
    // In a real app, this would be based on skills matching
    const recommendedJobs = jobs?.slice(0, 3) || [];

    console.log("User", user);
    console.log("Applications Loading", appsLoading);
    console.log("Jobs Loading", jobsLoading);

    if (!user || appsLoading || jobsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Good Day! {user?.name}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Welcome back to your dashboard
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/talent/profile")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Manage Profile
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Applications & Jobs */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Applications Section */}
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">My Job Applications</h2>
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    View All
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                {applications && applications.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {applications.slice(0, 5).map((app) => (
                                            <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {/* We need to fetch job details for each application or have it included */}
                                                            Job Application #{app.id.slice(0, 8)}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Applied on {new Date(app.appliedDate || Date.now()).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'Hired' ? 'bg-green-100 text-green-800' :
                                                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {app.status || 'Applied'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        You haven't applied to any jobs yet.
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Recommended Jobs Section */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Jobs For You</h2>
                            <div className="space-y-4">
                                {recommendedJobs.map((job) => (
                                    <TalentJobCard key={job.id} job={job} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar - Profile Stats/Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-500">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <h3 className="font-bold text-gray-900">{user?.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">Talent</p>

                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">Profile Completion: 70%</p>

                                <button
                                    onClick={() => router.push("/talent/profile")}
                                    className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                                >
                                    Complete Profile
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-900 rounded-xl shadow-sm p-6 text-white">
                            <h3 className="font-bold text-lg mb-2">Upgrade to Premium</h3>
                            <p className="text-blue-100 text-sm mb-4">
                                Get noticed by top employers and unlock exclusive features.
                            </p>
                            <button className="w-full bg-white text-blue-900 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
