"use client";

import { useState, useEffect } from "react";
import {
  PlusCircle,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  User,
  Calendar,
  TrendingUp,
} from "lucide-react";

type RecentActivityType = {
    id: number;
    type: string;
    title: string;
    timestamp: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function Dashboard() {
  const [recentActivity, setRecentActivity] = useState<RecentActivityType[]>([]);

  // Sample recent activity data
  useEffect(() => {
    setRecentActivity([
      {
        id: 1,
        type: "job_posted",
        title: "Senior React Developer position posted",
        timestamp: "2 hours ago",
        icon: Briefcase,
      },
      {
        id: 2,
        type: "candidate_applied",
        title: "New candidate applied for UI/UX Designer",
        timestamp: "4 hours ago",
        icon: User,
      },
      {
        id: 3,
        type: "interview_scheduled",
        title: "Interview scheduled with Sarah Johnson",
        timestamp: "1 day ago",
        icon: Calendar,
      },
      {
        id: 4,
        type: "talent_hired",
        title: "John Doe hired for Backend Developer role",
        timestamp: "2 days ago",
        icon: Users,
      },
      {
        id: 5,
        type: "goal_completed",
        title: "Q4 hiring goal reached - 85% completion",
        timestamp: "3 days ago",
        icon: TrendingUp,
      },
    ]);
  }, []);

  const mainActionCards = [
    {
      title: "Hire Now",
      description:
        "Post a new job and get matched with qualified candidates within 48 hours",
      href: "/client/hire-now",
      icon: PlusCircle,
      color: "bg-[#007bff]",
    },
    {
      title: "Browse Talent",
      description:
        "Explore our verified pool of African talent across various specialties",
      href: "/client/browse-talent",
      icon: Users,
      color: "bg-[#007bff]",
    },
    {
      title: "Active Jobs",
      description:
        "Manage your current job postings and review incoming applications",
      href: "/client/active-jobs",
      icon: Briefcase,
      color: "bg-[#007bff]",
    },
  ];

  const quickActions = [
    {
      name: "Personnel Details",
      href: "/client/personnel-details",
      icon: Users,
    },
    { name: "Analytics", href: "/client/analytics", icon: BarChart3 },
    { name: "Account Settings", href: "/client/settings", icon: Settings },
  ];

  return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, Client
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your job posts, view matches, and hire verified African
            talent.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainActionCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {card.description}
                </p>
                <div className="absolute bottom-4 right-4 text-[#007bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <a
                    key={action.name}
                    href={action.href}
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <IconComponent size={16} className="text-[#007bff]" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {action.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <IconComponent size={16} className="text-[#007bff]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
