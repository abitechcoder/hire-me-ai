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
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const {setAuthStatus} = useAuth();

  useEffect(() => {
    (async () => {
      const userData = await appwriteService.getCurrentUser();
      setUser(userData);
    })()
  }, []);

  console.log("Current User:", user);

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
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (href === "/client") {
        return currentPath === "/client";
      }
      return currentPath.startsWith(href);
    }
    return false;
  };

  const handleLogout = async () => {
    await appwriteService.logoutUser();
    setAuthStatus(false);
    router.replace("/login");
  };

  return (
    user && (
      <>
        <nav className="bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left Side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#007bff] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  HireMe AI
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveRoute(item.href)
                        ? "text-[#007bff] bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    {item.name}
                    {isActiveRoute(item.href) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#007bff] rounded-full"></div>
                    )}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Side - Profile Dropdown */}
            <div className="flex items-center space-x-4">
              {/* Desktop Profile Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center cursor-pointer space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-[#007bff] rounded-full flex items-center justify-center">
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
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {/* <a
                    href="/client/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Settings size={16} />
                    <span>Account / KYC Settings</span>
                  </a>
                  <a
                    href="/client/help"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <HelpCircle size={16} />
                    <span>Help & Support</span>
                  </a>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" /> */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
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
                className="md:hidden p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveRoute(item.href)
                        ? "text-[#007bff] bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile Profile Options */}
                {/* <hr className="my-4 border-gray-200 dark:border-gray-700" />
              <a
                href="/client/settings"
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings size={16} />
                <span>Account / KYC Settings</span>
              </a>
              <a
                href="/client/help"
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HelpCircle size={16} />
                <span>Help & Support</span>
              </a> */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Overlay for mobile dropdown */}
        {(isMobileMenuOpen || isProfileDropdownOpen) && (
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
