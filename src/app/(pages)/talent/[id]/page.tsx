"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import TalentProfile from '@/components/TalentProfile';

export default function ProfileView() {
  const params = useParams();
  const router = useRouter()
  const { id } = params;
  const [activeTab, setActiveTab] = useState('about');

  const [talent, setTalent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const response = await fetch(`/api/talents/${id}`);
        const result = await response.json();

        if (result.success) {
          // console.log(result.data);
          setTalent(result.data);
        } else {
          setTalent(null);
          setError("Failed to load talent. Please try again later.");
        }
      } catch (err) {
        setTalent(null);
        setError("Failed to load talent. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTalent();
  }, []);

  const projects = [
    { id: 1, name: "E-commerce Redesign", category: "Web Design", status: "Completed" },
    { id: 2, name: "Mobile Banking App", category: "Mobile", status: "In Progress" },
    { id: 3, name: "Dashboard Analytics", category: "Web Design", status: "Completed" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="w-24 h-24 rounded-full mx-auto bg-gray-300"></div>
                  <div className="mt-4 h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div className="mt-2 h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  <div className='mt-4 gap-4 flex'>
                    <div className='h-20 flex-1 bg-gray-300 rounded-lg'></div>
                    <div className='h-20 flex-1 bg-gray-300 rounded-lg'></div>
                  </div>
                  <div className='h-20 mt-8 bg-gray-300 rounded-lg w-full'></div>
                  <div className='h-24 mt-8 bg-gray-300 rounded-lg w-full'></div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div className='h-40 bg-gray-300 rounded-lg w-full'></div>
                <div className='h-80 bg-gray-300 rounded-lg w-full'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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