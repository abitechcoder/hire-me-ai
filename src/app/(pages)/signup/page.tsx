"use client";

import React from "react";
import Link from "next/link";
import { User, Briefcase } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Create your Account
                    </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Job Seeker Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center h-full">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 mb-6">
                                <User className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Talent
                            </h3>
                            <p className="text-gray-500 mb-8 flex-grow">
                                Are you looking to earn in USD?
                                <br />
                                Join our elite talent network at HireMe AI.
                            </p>
                            <Link
                                href="/talent/apply"
                                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign up as a Talent
                            </Link>
                        </div>
                    </div>

                    {/* Employer Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center h-full">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 mb-6">
                                <Briefcase className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Client
                            </h3>
                            <p className="text-gray-500 mb-8 flex-grow">
                                Are you looking for verified African professionals?
                                <br />
                                Discover verified African talents with HireMe AI
                            </p>
                            <Link
                                href="/client/signup"
                                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign up as a Client
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
