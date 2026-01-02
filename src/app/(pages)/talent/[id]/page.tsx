"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import TalentProfile from '@/components/TalentProfile';
import { useTalent } from '@/hooks/queries/useTalents';
import Loading from '@/components/ui/Loading';

export default function ProfileView() {
  const params = useParams();
  const talentId = String(params.id)
  const router = useRouter()
  const { data: talent, isLoading, error } = useTalent(talentId);

  console.log("Talent data:", talent);

  if (isLoading) {
    return <Loading text="Loading talent profile..." />;
  }

  if (error) {
    console.error(error);
    return <div>Error: failed to fetch talent</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600"
              />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Talent Profile
            </h1>
          </div>
        </div>
        <TalentProfile talent={talent} />
      </div>
    </div>
  );
}