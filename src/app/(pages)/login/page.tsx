"use client";

import React, { useState, useEffect } from "react";
import appwriteService from "@/appwrite/config";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
    const router = useRouter();
    const { authStatus, setAuthStatus } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null); // State for error messages
    const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        setError(null); // Clear previous errors
        setIsSubmitting(true); // Set loading state

        try {
            const session = await appwriteService.loginUser(formData);
            if (session) {
                setAuthStatus(true);
                // Redirect to dashboard or protected page after successful login
                router.push("/client/dashboard");
            }
        } catch (error: any) {
            // Handle errors and display appropriate messages
            if (error.message) {
                setError(error.message); // Set error message from the backend
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    // Redirect authenticated clients to dashboard when authStatus changes
      useEffect(() => {
        if (authStatus) {
            router.replace('/client/dashboard');
        }
      }, [authStatus, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    Login
                </h2>
                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
                        {error}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting} // Disable button while submitting
                            className={`w-full ${isSubmitting
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                } text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}