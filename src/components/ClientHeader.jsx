"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import appwriteService from "@/appwrite/config";
import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { setAuthStatus } = useAuth();

  useEffect(() => {
    (async () => {
      const userData = await appwriteService.getCurrentUser();
      setUser(userData);
    })()
  }, []);

  const navigationItems = [
    { name: "Dashboard", href: "/client/dashboard", key: "dashboard" },
    {
      name: "Browse Talent",
      href: "/client/browse-talent",
      key: "browse-talent",
    },
    { name: "Active Jobs", href: "/client/active-jobs", key: "active-jobs" },
    { name: "Personnel", href: "/client/personnel-details", key: "personnel" },
  ];

  const isActiveRoute = (href) => {
    if (href === "/client") {
      return pathname === "/client";
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = async () => {
    await appwriteService.logoutUser();
    setAuthStatus(false);
    router.replace("/login");
  };

  return (
    user && (
      <>
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left Side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  HireMe AI
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveRoute(item.href)
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    {item.name}
                    {isActiveRoute(item.href) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Side - Profile Dropdown */}
            <div className="flex items-center space-x-4">
              {/* Desktop Profile Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center cursor-pointer space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-sm">{user.name?.split(" ")[0]}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/client/settings"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </Link>
                    <Link
                      href="/client/help"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <HelpCircle size={16} />
                      <span>Help & Support</span>
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-600" />
                ) : (
                  <Menu size={24} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveRoute(item.href)
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Profile Options */}
                <hr className="my-4 border-gray-200" />
                <Link
                  href="/client/settings"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings size={16} />
                  <span>Account Settings</span>
                </Link>
                <Link
                  href="/client/help"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Overlay for mobile dropdown */}
        {(isProfileDropdownOpen) && (
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsProfileDropdownOpen(false);
            }}
          />
        )}
      </>
    )
  );
}
