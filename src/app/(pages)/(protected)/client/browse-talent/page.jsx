"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Shield,
  Eye,
  Unlock,
  Video,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

export default function BrowseTalentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [talents, setTalents] = useState([]);
  const [unlockedProfiles, setUnlockedProfiles] = useState(new Set());

  const categories = [
    "All",
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Data Science",
    "Product",
  ];
  const experienceLevels = [
    "All",
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Lead/Principal",
  ];
  const locations = [
    "All",
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "Egypt",
    "Morocco",
  ];

  // Sample talent data
  useEffect(() => {
    setTalents([
      {
        id: 1,
        name: "Adebayo Johnson",
        role: "Senior React Developer",
        location: "Lagos, Nigeria",
        availability: "Available Now",
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        rating: 4.9,
        placements: 23,
        hourlyRate: "$45/hr",
        verified: true,
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Engineering",
      },
      {
        id: 2,
        name: "Amina Hassan",
        role: "UI/UX Designer",
        location: "Cairo, Egypt",
        availability: "Available in 2 weeks",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        rating: 5.0,
        placements: 18,
        hourlyRate: "$40/hr",
        verified: true,
        avatar:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Design",
      },
      {
        id: 3,
        name: "Kwame Asante",
        role: "Full Stack Engineer",
        location: "Accra, Ghana",
        availability: "Available Now",
        skills: ["Python", "Django", "React", "PostgreSQL"],
        rating: 4.8,
        placements: 31,
        hourlyRate: "$50/hr",
        verified: true,
        avatar:
          "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Engineering",
      },
      {
        id: 4,
        name: "Sarah Ndung'u",
        role: "Digital Marketing Specialist",
        location: "Nairobi, Kenya",
        availability: "Available Now",
        skills: ["SEO", "Google Ads", "Content Marketing", "Analytics"],
        rating: 4.7,
        placements: 15,
        hourlyRate: "$35/hr",
        verified: true,
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Marketing",
      },
      {
        id: 5,
        name: "Thabo Mthembu",
        role: "Data Scientist",
        location: "Cape Town, South Africa",
        availability: "Available in 1 week",
        skills: ["Python", "Machine Learning", "SQL", "Tableau"],
        rating: 4.9,
        placements: 20,
        hourlyRate: "$55/hr",
        verified: true,
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Data Science",
      },
      {
        id: 6,
        name: "Fatima Al-Rashid",
        role: "Product Manager",
        location: "Casablanca, Morocco",
        availability: "Available Now",
        skills: ["Product Strategy", "Agile", "User Research", "Analytics"],
        rating: 4.8,
        placements: 12,
        hourlyRate: "$60/hr",
        verified: true,
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Product",
      },
    ]);
  }, []);

  const filteredTalents = talents.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "All" ||
      talent.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "" ||
      selectedLocation === "All" ||
      talent.location.includes(selectedLocation);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleUnlockContact = (talentId) => {
    // Simulate payment process
    const confirmed = window.confirm("Unlock contact information for $20?");
    if (confirmed) {
      setUnlockedProfiles((prev) => new Set(prev).add(talentId));
      alert(
        "Contact information unlocked! You can now view full contact details and book meetings.",
      );
    }
  };

  const isUnlocked = (talentId) => unlockedProfiles.has(talentId);

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="/client/dashboard"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft
                size={20}
                className="text-gray-600"
              />
            </a>
            <h1 className="text-3xl font-bold text-gray-900">
              Browse Talent
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover verified African talent across various specialties. Unlock
            profiles to access contact information.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by name, role, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div className="lg:w-48">
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              >
                <option value="">All Experience</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="lg:w-48">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent bg-white text-gray-900"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTalents.length} talents
          </p>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalents.map((talent) => (
            <div
              key={talent.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {talent.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#007bff] rounded-full flex items-center justify-center">
                      <Shield size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {talent.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {talent.role}
                  </p>
                </div>
              </div>

              {/* Location & Availability */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  {talent.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={14} className="mr-2" />
                  {talent.availability}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {talent.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-[#007bff] text-xs rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                  {talent.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                      +{talent.skills.length - 3} more
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
                      {talent.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Rating
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {talent.placements}
                  </p>
                  <p className="text-xs text-gray-500">
                    Placements
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {talent.hourlyRate}
                  </p>
                  <p className="text-xs text-gray-500">
                    Hourly Rate
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`/client/talent/${talent.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Eye size={16} className="mr-2" />
                  View Profile
                </a>

                {!isUnlocked(talent.id) ? (
                  <>
                    <button
                      onClick={() => handleUnlockContact(talent.id)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
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
                      <button className="inline-flex items-center justify-center px-3 py-2 bg-[#007bff] text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200">
                        <Video size={14} className="mr-1" />
                        Book Meet
                      </button>
                      <button className="inline-flex items-center justify-center px-3 py-2 border border-[#007bff] text-[#007bff] font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
                        <MessageCircle size={14} className="mr-1" />
                        Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No talents found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all available talent.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
