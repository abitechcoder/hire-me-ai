"use client";

import { useState, useEffect } from "react";
import {
    ArrowLeft,
    Star,
    MapPin,
    Clock,
    Shield,
    Calendar,
    Link,
    Mail,
    Phone,
    Linkedin,
    Github,
    Play,
    Video,
    MessageCircle,
    Unlock,
    ExternalLink,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

const TalentProfile = ({ talent }: any) => {
    const { authStatus } = useAuth();
    const [isContactUnlocked, setIsContactUnlocked] = useState(false);

    const handleUnlockContact = () => {
        const confirmed = window.confirm("Unlock contact information for $20?");
        if (confirmed) {
            setIsContactUnlocked(true);
            alert(
                "Contact information unlocked! You can now view full contact details and book meetings.",
            );
        }
    };

    const BlurredText = ({ text, className = "" }: { text: string, className: string }) => (
        <span className={`filter blur-sm select-none ${className}`}>{text}</span>
    );

    const talentData = {
        matchScore: 92,
        about: `I'm a passionate full-stack developer with over 6 years of experience building scalable web applications. 
                 I specialize in React and Node.js ecosystems, with strong expertise in cloud technologies and modern development practices. 
                 I've helped numerous startups and established companies build robust digital solutions.`,
        portfolio: [
            {
                id: 1,
                title: "E-commerce Platform",
                description:
                    "Full-stack e-commerce solution built with React, Node.js, and AWS",
                image:
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400",
                technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
                link: "https://example.com",
            },
            {
                id: 2,
                title: "Task Management App",
                description:
                    "Collaborative project management tool with real-time updates",
                image:
                    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=400",
                technologies: ["React", "Socket.io", "MongoDB"],
                link: "https://example.com",
            },
        ],
        experience_timeline: [
            {
                id: 1,
                company: "TechFlow Solutions",
                role: "Senior Frontend Developer",
                duration: "2022 - Present",
                description:
                    "Led development of customer-facing web applications serving 100K+ users",
            },
            {
                id: 2,
                company: "StartupXYZ",
                role: "Full Stack Developer",
                duration: "2020 - 2022",
                description:
                    "Built core platform features and scaled infrastructure to handle rapid growth",
            },
            {
                id: 3,
                company: "Freelance",
                role: "Web Developer",
                duration: "2019 - 2020",
                description:
                    "Delivered custom web solutions for small to medium businesses",
            },
        ],
        contact: {
            email: "adebayo.johnson@email.com",
            phone: "+234 801 234 5678",
            linkedin: "linkedin.com/in/adebayo-johnson",
            github: "github.com/adebayo-dev",
        },
        videoIntro: "https://example.com/video",
        languages: ["English (Fluent)", "Yoruba (Native)"],
        workStyle: "Remote, Hybrid",
        responseTime: "< 2 hours",
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="text-center mb-6">
                        <div className="relative inline-block mb-4">
                            {/* <img
                                src={talent.avatar}
                                alt={talent.name}
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                            /> */}
                            <div className="w-24 h-24 rounded-full mx-auto bg-blue-50 border-primary flex items-center justify-center text-primary text-4xl font-bold">
                                {talent?.fields?.Name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <Shield size={16} className="text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {talent?.fields?.Name}
                        </h2>
                        <p className="text-gray-600">
                            {talent?.fields?.Role}
                        </p>
                        <p className="text-gray-600 text-sm mb-4">
                            {talent.fields?.Experience}
                        </p>

                        {/* Match Score */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <div className="text-center">
                                <span className="text-2xl font-bold text-green-600">
                                    {Number(talent.fields["Trust Score"])}%
                                </span>
                                <p className="text-sm text-green-600 font-medium">
                                    Match Score
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 mb-1">
                                    <Star
                                        size={16}
                                        className="text-yellow-400 fill-current"
                                    />
                                    <span className="font-medium text-gray-900">
                                        {Number(talent.fields["Trust Score"]) / 20}
                                    </span>
                                </div>
                                {/* <p className="text-xs text-gray-500">
                                    ({talent.totalReviews} reviews)
                                </p> */}
                            </div>
                            <div className="text-center">
                                <p className="font-medium text-gray-900 mb-1">
                                    {talent.fields["Total Placements"]}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Successful Placements
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                            <MapPin size={16} className="mr-3" />
                            {talent.fields.Location}
                        </div>
                        {/* <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                Experience Level
                            </h4>
                            <p className="text-gray-600 text-sm">
                                {talent.fields?.Experience}
                            </p>
                        </div> */}
                        {/* <div className="flex items-center text-sm text-gray-600">
                            <Clock size={16} className="mr-3" />
                            {talentData.availability}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Calendar size={16} className="mr-3" />
                            {talent.timezone}
                        </div> */}
                    </div>

                    {/* Pricing */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                                ${talent.fields.Rates}/hr
                            </p>
                            <p className="text-sm text-gray-500">
                                Hourly Rate
                            </p>
                        </div>
                    </div>

                    {!authStatus ? (
                        <a href="/client/signup"
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                        >
                            Request Talent
                        </a>
                    ) : (
                        <div className="mt-6 space-y-3">
                            {!isContactUnlocked ? (
                                <button
                                    onClick={handleUnlockContact}
                                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    <Unlock size={16} className="mr-2" />
                                    Unlock Contact ($20)
                                </button>
                            ) : (
                                <div className="text-center py-2 bg-green-50 text-green-600 text-sm font-medium rounded-lg">
                                    ✓ Contact Unlocked
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    disabled={!isContactUnlocked}
                                    className={`inline-flex items-center justify-center px-3 py-2 font-medium rounded-lg transition-colors duration-200 ${isContactUnlocked
                                        ? "bg-primary text-white hover:bg-blue-600"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <Video size={14} className="mr-1" />
                                    Book Meet
                                </button>
                                <button
                                    disabled={!isContactUnlocked}
                                    className={`inline-flex items-center justify-center px-3 py-2 font-medium rounded-lg transition-colors duration-200 ${isContactUnlocked
                                        ? "border border-primary text-primary hover:bg-blue-50"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <MessageCircle size={14} className="mr-1" />
                                    Message
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}

                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {talent?.fields?.Skills.map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-primary text-sm rounded-lg"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Contact Information
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center text-sm">
                            <Mail size={16} className="mr-3 text-gray-400" />
                            {isContactUnlocked ? (
                                <a
                                    href={`mailto:${talent?.fields?.Email}`}
                                    className="text-primary hover:underline"
                                >
                                    {talent?.fields?.Email}
                                </a>
                            ) : (
                                <BlurredText
                                    text="adebayo.johnson@email.com"
                                    className="text-gray-600"
                                />
                            )}
                        </div>
                        {talent?.fields["Phone Number"] && (
                            <div className="flex items-center text-sm">
                                <Phone size={16} className="mr-3 text-gray-400" />
                                {isContactUnlocked ? (
                                    <a
                                        href={`tel:${talent.fields["Phone Number"]}`}
                                        className="text-primary hover:underline"
                                    >
                                        {talent.fields["Phone Number"]}
                                    </a>
                                ) : (
                                    <BlurredText
                                        text="+234 801 234 5678"
                                        className="text-gray-600"
                                    />
                                )}
                            </div>
                        )}
                        {talent?.fields["LinkedIn Profile URL"] && (
                            <div className="flex items-center text-sm">
                                <Linkedin size={16} className="mr-3 text-gray-400" />
                                {isContactUnlocked ? (
                                    <a
                                        href={talent.fields["LinkedIn Profile URL"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center"
                                    >
                                        LinkedIn Profile
                                        <ExternalLink size={12} className="ml-1" />
                                    </a>
                                ) : (
                                    <BlurredText
                                        text="LinkedIn Profile"
                                        className="text-gray-600"
                                    />
                                )}
                            </div>
                        )}

                        {talent?.fields["Portfolio Link"] && (
                            <div className="flex items-center text-sm">
                                <Link size={16} className="mr-3 text-gray-400" />
                                {isContactUnlocked ? (
                                    <a
                                        href={talent?.fields["Portfolio Link"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center"
                                    >
                                        Portfolio
                                        <ExternalLink size={12} className="ml-1" />
                                    </a>
                                ) : (
                                    <BlurredText
                                        text="Portfolio"
                                        className="text-gray-600"
                                    />
                                )}
                            </div>
                        )}

                        {talent?.fields["Github URL"] && (
                            <div className="flex items-center text-sm">
                                <Github size={16} className="mr-3 text-gray-400" />
                                {isContactUnlocked ? (
                                    <a
                                        href={talent?.fields["Github URL"]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center"
                                    >
                                        GitHub Profile
                                        <ExternalLink size={12} className="ml-1" />
                                    </a>
                                ) : (
                                    <BlurredText
                                        text="GitHub Profile"
                                        className="text-gray-600"
                                    />
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 space-y-6">
                {/* About Me */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        About Me
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {talent?.fields["Profile Summary (AI)"].value}
                    </p>
                </div>

                {/* Video Introduction */}
                {talent.fields["Video URL"] && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Video Introduction
                        </h3>
                        <div className="relative bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                            <a href={talent.fields["Video URL"]} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                                <Play size={24} />
                                <span>Play Video Introduction</span>
                            </a>
                        </div>
                    </div>
                )}


                {/* Experience Timeline */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Experience
                    </h3>
                    <div className="space-y-6">
                        {talentData?.experience_timeline.map((exp: any, index: number) => (
                            <div key={exp.id} className="relative pl-6">
                                {index !== talentData.experience_timeline.length - 1 && (
                                    <div className="absolute left-2 top-8 bottom-0 w-px bg-gray-200"></div>
                                )}
                                <div className="absolute left-0 top-2 w-4 h-4 bg-primary rounded-full"></div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">
                                        {exp.role}
                                    </h4>
                                    <p className="text-primary font-medium text-sm mb-1">
                                        {exp.company}
                                    </p>
                                    <p className="text-gray-500 text-sm mb-2">
                                        {exp.duration}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Portfolio */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Portfolio
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {talentData?.portfolio.map((project: any) => (
                            <div
                                key={project.id}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">
                                        {project.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project.technologies.map((tech: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={project.link}
                                        className="text-primary hover:underline text-sm flex items-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Project <ExternalLink size={12} className="ml-1" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TalentProfile