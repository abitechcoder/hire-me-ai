import React from 'react'
import Link from "next/link";
import { Star, MapPin, Clock, Eye } from "lucide-react";

const TalentCard = ({ person }) => {
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
                    <div className="w-16 h-16 rounded-full mr-4 border-white bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-xl">
                      {person?.fields?.Name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                        <div className="flex items-center">
                            <h3
                                className="font-bold text-lg text-gray-900"
                                style={{
                                    fontFamily: "Plus Jakarta Sans, sans-serif",
                                }}
                            >
                                {person.fields.Name}
                            </h3>
                            {person.fields["Verification Status"] === "Verified" && (
                                <div className="ml-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p
                            className="text-gray-600 font-medium"
                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                        >
                            {person.fields.Role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Location & Availability */}
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {person.fields.Location}
                </div>
                <div
                    className={`flex items-center ${person.availability === "Available" ? "text-green-600" : "text-orange-600"}`}
                >
                    <Clock size={14} className="mr-1" />
                    {person.fields.Availability}
                </div>
            </div>

            {/* Bio */}
            <p
                className="text-gray-600 text-sm mb-4 leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
                {person.fields["Profile Summary (AI)"].value}
            </p>

            {/* Skills */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {person.fields.Skills.slice(0, 4).map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                    {person.fields.Skills.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{person.fields.Skills.length - 4} more
                        </span>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                    <div className="flex items-center justify-center">
                        <Star size={16} className="text-yellow-500 mr-1" />
                        <span
                            className="font-bold text-gray-900"
                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                        >
                            {Number(person.fields["Trust Score"]) / 20}
                        </span>
                    </div>
                    <span
                        className="text-xs text-gray-500"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                        Rating
                    </span>
                </div>
                <div>
                    <div
                        className="font-bold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                        {person.fields["Total Placements"]}
                    </div>
                    <span
                        className="text-xs text-gray-500"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                        Placements
                    </span>
                </div>
                <div>
                    <div
                        className="font-bold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                        ${person.fields.Rates}
                    </div>
                    <span
                        className="text-xs text-gray-500"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                        /hour
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
                <Link href={`/browse-talent/${person.id}`}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                    <Eye size={16} className="mr-2" />
                    View Profile
                </Link>
                <button
                    // onClick={() => handleRequestCandidate(person.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                    Request
                </button>
            </div>
        </div>
    )
}

export default TalentCard