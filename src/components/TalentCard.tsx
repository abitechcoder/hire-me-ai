import React from 'react'
import Link from "next/link";
import { useState } from "react";
import {
    Star, MapPin, Clock, Eye, Shield, Unlock,
    Video,
    MessageCircle,
} from "lucide-react";
import useAuth from '@/hooks/useAuth';

const TalentCard = ({ person }: any) => {
    const { authStatus } = useAuth();
    const [unlockedProfiles, setUnlockedProfiles] = useState(new Set());

    const handleUnlockContact = (talentId: any) => {
        // Simulate payment process
        const confirmed = window.confirm("Unlock contact information for $20?");
        if (confirmed) {
            setUnlockedProfiles((prev) => new Set(prev).add(talentId));
            alert(
                "Contact information unlocked! You can now view full contact details and book meetings.",
            );
        }
    };

    const isUnlocked = (talentId: any) => unlockedProfiles.has(talentId);
    return (
        <div
            key={person.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    {/* <img
                        src={person.fields["Profile Photo"][0].url}
                        alt={`${person.name} profile photo`}
                        className="w-16 h-16 rounded-full object-cover object-center mr-4"
                    /> */}
                    <div className="relative w-12 h-12 rounded-full mr-4 border-primary bg-blue-50 border-2 flex items-center justify-center text-primary text-lg font-bold">
                        {person?.fields?.Name.split(' ').map((n: string) => n[0]).join('')}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <Shield size={12} className="text-white" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {person.fields.Name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {person.fields.Role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Location & Availability */}
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-2" />
                    {person.fields.Location}
                </div>
                {/* <div
                    className={`flex items-center ${person.availability === "Available" ? "text-green-600" : "text-orange-600"}`}
                >
                    <Clock size={14} className="mr-1" />
                    {person.fields.Availability}
                </div> */}
            </div>

            {/* Bio */}
            {/* <p
                className="text-gray-600 text-sm mb-4 leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
                {person.fields["Profile Summary (AI)"].value}
            </p> */}

            {/* Skills */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {person.fields.Skills.slice(0, 3).map((skill: string, index: number) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-primary text-xs rounded-lg"
                        >
                            {skill}
                        </span>
                    ))}
                    {person.fields.Skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                            +{person.fields.skills.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">
                            {Number(person.fields["Trust Score"]) / 20}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">
                        Rating
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                        {person.fields["Total Placements"]}
                    </p>
                    <p className="text-xs text-gray-500">
                        Placements
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                        ${person.fields.Rates}/hr
                    </p>
                    <p className="text-xs text-gray-500">
                        Hourly Rate
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <Link href={`/talent/${person.id}`}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                    <Eye size={16} className="mr-2" />
                    View Profile
                </Link>


                {!authStatus ? (<Link href={`/client/signup`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                    Request Talent
                </Link>) : (
                    <div className='space-y-3'>
                        {!isUnlocked(person.id) ? (
                            <>
                                <button
                                    onClick={() => handleUnlockContact(person.id)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    <Unlock size={16} className="mr-2" />
                                    Unlock Contact ($20)
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        disabled
                                        className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                                    >
                                        <Video size={14} className="mr-1" />
                                        Book Meet
                                    </button>
                                    <button
                                        disabled
                                        className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                                    >
                                        <MessageCircle size={14} className="mr-1" />
                                        Message
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <div className="text-center py-2 bg-green-50 text-green-600 text-sm font-medium rounded-lg">
                                    ✓ Contact Unlocked
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="inline-flex items-center justify-center px-3 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200">
                                        <Video size={14} className="mr-1" />
                                        Book Meet
                                    </button>
                                    <button className="inline-flex items-center justify-center px-3 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
                                        <MessageCircle size={14} className="mr-1" />
                                        Message
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TalentCard