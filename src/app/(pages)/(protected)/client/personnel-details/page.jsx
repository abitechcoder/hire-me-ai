"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  Briefcase,
  Plus,
  Star,
  TrendingUp,
  AlertTriangle,
  X,
  Clock,
  Target,
  CheckCircle,
  Users as UsersIcon,
  Filter,
  Search,
} from "lucide-react";

export default function PersonnelManagementPage() {
  const [activeTab, setActiveTab] = useState("personnel");
  const [personnel, setPersonnel] = useState([]);
  const [weeklyCheckins, setWeeklyCheckins] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState("");

  // Sample personnel data
  useEffect(() => {
    setPersonnel([
      {
        id: 1,
        name: "Adebayo Johnson",
        role: "Senior React Developer",
        phone: "+234 801 234 5678",
        email: "adebayo.johnson@company.com",
        paymentInfo: "$70,000/year",
        contractStatus: "Full-time",
        startDate: "2023-06-15",
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
        skills: ["React", "Node.js", "TypeScript"],
        deliverables: "Frontend architecture, code reviews, mentoring",
        workSchedule: "Mon-Fri, 9 AM - 6 PM UTC+1",
        currentProject: "E-commerce Platform Redesign",
      },
      {
        id: 2,
        name: "Amina Hassan",
        role: "UI/UX Designer",
        phone: "+20 100 234 5678",
        email: "amina.hassan@company.com",
        paymentInfo: "$45/hour",
        contractStatus: "Contract",
        startDate: "2023-09-01",
        avatar:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
        skills: ["Figma", "Adobe XD", "Prototyping"],
        deliverables: "UI designs, user research, prototypes",
        workSchedule: "Flexible, 30 hours/week",
        currentProject: "Mobile App UX Improvements",
      },
      {
        id: 3,
        name: "Kwame Asante",
        role: "Full Stack Developer",
        phone: "+233 24 234 5678",
        email: "kwame.asante@company.com",
        paymentInfo: "$65,000/year",
        contractStatus: "Full-time",
        startDate: "2023-03-10",
        avatar:
          "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
        skills: ["Python", "Django", "React"],
        deliverables: "Backend APIs, database design, frontend integration",
        workSchedule: "Mon-Fri, 8 AM - 5 PM GMT",
        currentProject: "Data Analytics Dashboard",
      },
    ]);

    // Sample weekly check-ins data
    setWeeklyCheckins([
      {
        id: 1,
        employeeId: 1,
        employeeName: "Adebayo Johnson",
        week: "Nov 18-24, 2024",
        hoursWorked: 42,
        goalsAchieved: [
          "Completed user authentication module",
          "Fixed 15 critical bugs",
          "Mentored 2 junior developers",
        ],
        goalsPlanned: [
          "Implement payment gateway integration",
          "Optimize application performance",
          "Prepare technical documentation",
        ],
        alignment: {
          monthly: "On track for Q4 feature delivery",
          yearly: "Contributing to 25% performance improvement goal",
        },
        submittedDate: "2024-11-24",
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: "Amina Hassan",
        week: "Nov 18-24, 2024",
        hoursWorked: 28,
        goalsAchieved: [
          "Designed 5 new UI components",
          "Conducted user interviews",
          "Created clickable prototype",
        ],
        goalsPlanned: [
          "Finalize mobile wireframes",
          "Present design system updates",
          "Collaborate with developers on implementation",
        ],
        alignment: {
          monthly: "Ahead of schedule for mobile redesign",
          yearly: "Supporting user experience improvement initiatives",
        },
        submittedDate: "2024-11-23",
      },
    ]);

    // Sample projects data
    setProjects([
      {
        id: 1,
        title: "E-commerce Platform Redesign",
        description:
          "Complete overhaul of the e-commerce platform with modern design and improved performance",
        kpis: [
          "Page load time < 2s",
          "Conversion rate > 3.5%",
          "User satisfaction > 4.5/5",
        ],
        progress: 75,
        teamMembers: ["Adebayo Johnson", "Amina Hassan"],
        timeline: "Sep 2024 - Jan 2025",
        dueDate: "2025-01-31",
        status: "In Progress",
      },
      {
        id: 2,
        title: "Mobile App UX Improvements",
        description:
          "Enhance mobile application user experience based on user feedback and analytics",
        kpis: [
          "App store rating > 4.7",
          "User retention > 80%",
          "Task completion rate > 95%",
        ],
        progress: 60,
        teamMembers: ["Amina Hassan"],
        timeline: "Oct 2024 - Dec 2024",
        dueDate: "2024-12-15",
        status: "In Progress",
      },
      {
        id: 3,
        title: "Data Analytics Dashboard",
        description:
          "Build comprehensive analytics dashboard for business intelligence and reporting",
        kpis: [
          "Real-time data updates",
          "Dashboard load time < 3s",
          "15+ visualization types",
        ],
        progress: 40,
        teamMembers: ["Kwame Asante"],
        timeline: "Nov 2024 - Mar 2025",
        dueDate: "2025-03-30",
        status: "In Progress",
      },
    ]);
  }, []);

  const tabs = [
    { id: "personnel", name: "Personnel Details", icon: User },
    { id: "checkins", name: "Weekly Check-ins", icon: Calendar },
    { id: "projects", name: "Projects", icon: Briefcase },
  ];

  const handleEmployeeAction = (employee, action) => {
    setSelectedEmployee(employee);
    setActionType(action);
    setIsActionModalOpen(true);
  };

  const closeActionModal = () => {
    setIsActionModalOpen(false);
    setSelectedEmployee(null);
    setActionType("");
  };

  const handleCreateNew = (type) => {
    setCreateType(type);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateType("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getContractStatusColor = (status) => {
    const colors = {
      "Full-time":
        "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400",
      Contract:
        "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
      "Part-time":
        "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400",
    };
    return (
      colors[status] ||
      "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/client/dashboard"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600 dark:text-gray-400"
              />
            </a>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Personnel Management
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your team members, track progress, and oversee projects.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "border-[#007bff] text-[#007bff]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "personnel" && (
          <div>
            {/* Personnel Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Payment Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {personnel.map((employee) => (
                      <tr
                        key={employee.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsEmployeeModalOpen(true);
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={employee.avatar}
                              alt={employee.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {employee.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {employee.role}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {employee.phone}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {employee.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {employee.paymentInfo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getContractStatusColor(employee.contractStatus)}`}
                          >
                            {employee.contractStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatDate(employee.startDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmployeeAction(employee, "rate");
                              }}
                              className="text-[#007bff] hover:text-blue-600 font-medium"
                            >
                              Rate
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmployeeAction(employee, "promote");
                              }}
                              className="text-green-600 hover:text-green-700 font-medium"
                            >
                              Promote
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmployeeAction(employee, "warn");
                              }}
                              className="text-yellow-600 hover:text-yellow-700 font-medium"
                            >
                              Warn
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmployeeAction(employee, "terminate");
                              }}
                              className="text-red-600 hover:text-red-700 font-medium"
                            >
                              Terminate
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "checkins" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Weekly Check-ins
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Review team progress and upcoming plans
                </p>
              </div>
              <button
                onClick={() => handleCreateNew("checkin")}
                className="inline-flex items-center px-4 py-2 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus size={16} className="mr-2" />
                Create New Check-in
              </button>
            </div>

            <div className="space-y-6">
              {weeklyCheckins.map((checkin) => (
                <div
                  key={checkin.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {checkin.employeeName} - {checkin.week}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Submitted on {formatDate(checkin.submittedDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#007bff]">
                        {checkin.hoursWorked}hrs
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Hours Worked
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <CheckCircle
                          size={16}
                          className="mr-2 text-green-600"
                        />
                        Goals Achieved
                      </h5>
                      <ul className="space-y-2">
                        {checkin.goalsAchieved.map((goal, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                          >
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Target size={16} className="mr-2 text-blue-600" />
                        Goals Planned
                      </h5>
                      <ul className="space-y-2">
                        {checkin.goalsPlanned.map((goal, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                          >
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Company Alignment
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                          Monthly Goals
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-400">
                          {checkin.alignment.monthly}
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                          Yearly Objectives
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-400">
                          {checkin.alignment.yearly}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Projects
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track project progress and team assignments
                </p>
              </div>
              <button
                onClick={() => handleCreateNew("project")}
                className="inline-flex items-center px-4 py-2 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus size={16} className="mr-2" />
                Create New Project
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{project.timeline}</span>
                      <span>Due: {formatDate(project.dueDate)}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressBarColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      Key Performance Indicators
                    </h5>
                    <ul className="space-y-1">
                      {project.kpis.map((kpi, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
                        >
                          <TrendingUp
                            size={14}
                            className="mr-2 text-green-500"
                          />
                          {kpi}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Team Members */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                      <UsersIcon size={16} className="mr-2" />
                      Team Members ({project.teamMembers.length})
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.teamMembers.map((member, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-lg"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        project.status === "In Progress"
                          ? "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:text-green-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Employee Detail Modal */}
      {isEmployeeModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Employee Details
              </h3>
              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedEmployee.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedEmployee.role}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Contact Information
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Phone:</strong> {selectedEmployee.phone}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedEmployee.email}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Contract Details
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Payment:</strong> {selectedEmployee.paymentInfo}
                    </div>
                    <div>
                      <strong>Status:</strong> {selectedEmployee.contractStatus}
                    </div>
                    <div>
                      <strong>Start Date:</strong>{" "}
                      {formatDate(selectedEmployee.startDate)}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Work Schedule
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedEmployee.workSchedule}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Current Deliverables
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedEmployee.deliverables}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Current Project
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedEmployee.currentProject}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {isActionModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {actionType.charAt(0).toUpperCase() + actionType.slice(1)}{" "}
                Employee
              </h3>
              <button
                onClick={closeActionModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You are about to {actionType}{" "}
              <strong>{selectedEmployee.name}</strong>.
              {actionType === "terminate" && " This action cannot be undone."}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert(
                    `${actionType} action for ${selectedEmployee.name} has been recorded.`,
                  );
                  closeActionModal();
                }}
                className={`flex-1 px-4 py-2 font-medium rounded-lg transition-colors duration-200 ${
                  actionType === "terminate"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-[#007bff] text-white hover:bg-blue-600"
                }`}
              >
                Confirm{" "}
                {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
              </button>
              <button
                onClick={closeActionModal}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New {createType === "checkin" ? "Check-in" : "Project"}
              </h3>
              <button
                onClick={closeCreateModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {createType === "checkin"
                ? "Create a new weekly check-in form for team members to fill out."
                : "Create a new project to track progress and assign team members."}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert(`New ${createType} creation flow would open here.`);
                  closeCreateModal();
                }}
                className="flex-1 px-4 py-2 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Create {createType === "checkin" ? "Check-in" : "Project"}
              </button>
              <button
                onClick={closeCreateModal}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
