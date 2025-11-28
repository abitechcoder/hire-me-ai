"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname for route detection
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  // Function to check if the link is active
  const isActive = (href) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              HireMe AI
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/browse-talent"
              className={`${
                isActive("/browse-talent")
                  ? "text-blue-700 font-bold"
                  : "text-gray-700"
              } hover:text-blue-700 font-medium transition-colors`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Browse Talent
            </a>
            <a
              href="/how-it-works"
              className={`${
                isActive("/how-it-works")
                  ? "text-blue-700 font-bold"
                  : "text-gray-700"
              } hover:text-blue-700 font-medium transition-colors`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              How It Works
            </a>
            <a
              href="/pricing"
              className={`${
                isActive("/pricing") ? "text-blue-700 font-bold" : "text-gray-700"
              } hover:text-blue-700 font-medium transition-colors`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Pricing
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className={`${
                isActive("/login") ? "text-blue-700 font-bold" : "text-gray-700"
              } hover:text-blue-700 font-medium transition-colors`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Login
            </a>
            <a
              href="/talent/apply"
              className={`${
                isActive("/talent/apply")
                  ? "text-blue-700 font-bold"
                  : "text-gray-700"
              } hover:text-blue-700 font-medium transition-colors`}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Join as Talent
            </a>
            <a
              href="/client/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Hire Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a
                href="/browse-talent"
                className={`${
                  isActive("/browse-talent")
                    ? "text-blue-700 font-bold"
                    : "text-gray-700"
                } hover:text-blue-700 font-medium`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Browse Talent
              </a>
              <a
                href="/how-it-works"
                className={`${
                  isActive("/how-it-works")
                    ? "text-blue-700 font-bold"
                    : "text-gray-700"
                } hover:text-blue-700 font-medium`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                How It Works
              </a>
              <a
                href="/pricing"
                className={`${
                  isActive("/pricing")
                    ? "text-blue-700 font-bold"
                    : "text-gray-700"
                } hover:text-blue-700 font-medium`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Pricing
              </a>
              <a
                href="/login"
                className={`${
                  isActive("/login") ? "text-blue-700 font-bold" : "text-gray-700"
                } hover:text-blue-700 font-medium`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Login
              </a>
              <a
                href="/talent/apply"
                className={`${
                  isActive("/talent/apply")
                    ? "text-blue-700 font-bold"
                    : "text-gray-700"
                } hover:text-blue-700 font-medium`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Join as Talent
              </a>
              <a
                href="/client/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-center transition-colors"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Hire Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
