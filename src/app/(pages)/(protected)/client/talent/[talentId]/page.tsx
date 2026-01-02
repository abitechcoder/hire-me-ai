"use client";

import { useParams, useRouter } from "next/navigation";
import { useTalent } from "@/hooks/queries/useTalents";
import TalentProfile from "@/components/TalentProfile";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/ui/Loading";

export default function TalentPage() {
    const params = useParams();
    const router = useRouter();
    const talentId = Array.isArray(params?.talentId) ? params.talentId[0] : params?.talentId;

    const { data: talent, isLoading, error } = useTalent(talentId as string);

    if (isLoading) {
        return <Loading text="Loading talent profile..." />;
    }

    if (error || !talent) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Talent Not Found
                        </h1>
                        <p className="text-gray-600 mb-6">
                            The talent profile you're looking for doesn't exist or an error occurred.
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
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="cursor-pointer inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back
                    </button>
                </div>
                <TalentProfile talent={talent} />
            </main>
        </div>
    );
}
