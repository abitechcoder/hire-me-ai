"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Briefcase, Calendar, Award, Edit2, Camera } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProfileView() {
  const params = useParams();
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
          console.log(result.data);
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

  const profile = {
    name: "Alex Thompson",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2022",
    bio: "Passionate designer with 8+ years of experience creating user-centered digital experiences. I love solving complex problems through elegant design solutions.",
    stats: {
      projects: 47,
      reviews: 128,
      rating: 4.9
    }
  };

  const skills = [
    "UI/UX Design", "Figma", "Adobe XD", "Prototyping",
    "User Research", "Design Systems", "React", "CSS"
  ];

  const projects = [
    { id: 1, name: "E-commerce Redesign", category: "Web Design", status: "Completed" },
    { id: 2, name: "Mobile Banking App", category: "Mobile", status: "In Progress" },
    { id: 3, name: "Dashboard Analytics", category: "Web Design", status: "Completed" }
  ];

  if (loading) {
    return (
      <div className="pt-20 pb-16">
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
          <div className="max-w-6xl mx-auto p-6">
            <div className="animate-pulse">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                <div className="h-48 bg-gray-200 relative"></div>
                <div className="px-8 pb-8">
                  <div className="flex flex-col -mt-16">
                    <div className="flex flex-col items-center gap-6">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 shadow-xl">
                        </div>
                      </div>

                      {/* Name and Title */}
                      <div className="flex flex-col items-center gap-2 w-1/2 md:w-1/3">
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-8 bg-gray-200 rounded w-full"></div>
                        <div className="h-8 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8">
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='pt-20 pb-16'>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto p-6">

          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Cover Photo */}
            <div className="h-48 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 relative"></div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
              <div className="flex flex-col -mt-16">
                <div className="flex flex-col items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                      {talent?.fields?.Name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    {/* <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition">
                    <Camera size={16} className="text-gray-700" />
                  </button> */}
                  </div>

                  {/* Name and Title */}
                  <div className="text-center mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900">{talent?.fields?.Name}</h1>
                    <p className="text-lg text-gray-600 mt-1">{talent?.fields?.Role}</p>
                    <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
                      <MapPin size={16} />
                      <span>{talent.fields.Location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{talent.fields["Total Placements"]}</div>
                  <div className="text-sm text-gray-600 mt-1">Placements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">${talent.fields.Rates}</div>
                  <div className="text-sm text-gray-600 mt-1">/hour</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{Number(talent.fields["Trust Score"]) / 20}</div>
                  <div className="text-sm text-gray-600 mt-1">Rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="text-gray-900">{`${talent?.fields?.Email.slice(0, 3)}***********@${talent?.fields?.Email.split("@")[1]}`}</div>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-3">
                    <Phone size={20} className="text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="text-gray-900">{profile.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Joined</div>
                      <div className="text-gray-900">{profile.joinDate}</div>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {talent?.fields?.Skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200 mb-6">
                  {['about', 'projects', 'activity'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-2 font-medium transition ${activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                    <p className="text-gray-700 leading-relaxed">{talent?.fields["Profile Summary (AI)"].value}</p>

                    {/* <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Award size={24} className="text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Top Contributor</h4>
                          <p className="text-sm text-gray-600 mt-1">Recognized for outstanding contributions to the design community.</p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h3>
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{project.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{project.category}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 pb-4">
                          <p className="text-gray-900">Completed <span className="font-semibold">E-commerce Redesign</span></p>
                          <p className="text-sm text-gray-600 mt-1">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-2 bg-purple-600 rounded-full"></div>
                        <div className="flex-1 pb-4">
                          <p className="text-gray-900">Started working on <span className="font-semibold">Mobile Banking App</span></p>
                          <p className="text-sm text-gray-600 mt-1">5 days ago</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-2 bg-green-600 rounded-full"></div>
                        <div className="flex-1 pb-4">
                          <p className="text-gray-900">Received 5-star review from client</p>
                          <p className="text-sm text-gray-600 mt-1">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}