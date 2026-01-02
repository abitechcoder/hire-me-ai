"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TalentCard from "@/components/TalentCard";
import { useTalents } from "@/hooks/queries/useTalents";
import Loading from "@/components/ui/Loading";

export default function BrowseTalentPage() {
  const { data: talents, isLoading, error } = useTalents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredTalents, setFilteredTalents] = useState<any>([]);

  const skillCategories = [
    "Development",
    "Design",
    "Marketing",
    // "Data Science",
    // "Finance",
    // "Mobile Development",
  ];

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    // "Senior Level (6-10 years)",
    // "Expert Level (10+ years)",
  ];

  const locations = [
    "Lagos, Nigeria",
    // "Nairobi, Kenya",
    // "Accra, Ghana",
    // "Cairo, Egypt",
    // "Cape Town, South Africa",
    // "Kigali, Rwanda",
  ];

  useEffect(() => {
    let filtered = talents || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (person: any) =>
          person.fields.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.fields.Role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.fields.Skills.some((skill: any) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((person: any) =>
        person.fields.Category === selectedCategory,
      );
    }

    if (selectedExperience) {
      filtered = filtered.filter(
        (person: any) => person.fields.Experience === selectedExperience,
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (person: any) => person.fields.Location === selectedLocation,
      );
    }

    setFilteredTalents(filtered);
  }, [
    searchTerm,
    selectedCategory,
    selectedExperience,
    selectedLocation,
    talents,
  ]);

  if (isLoading) {
    return <Loading text="Loading talent..." />;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Browse Verified Talent
          </h1>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Discover exceptional African professionals ready to join your
            team. All talent is pre-screened and verified.
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
              >
                <option value="">All Categories</option>
                {skillCategories.map((category) => (
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
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
          <p
            className="text-gray-600"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Showing {filteredTalents.length} verified professionals
          </p>
        </div>

        {/* Talent Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalents.map((person: any) => (
            <TalentCard key={person.id} person={person} />
          ))}
        </div>

        {/* No Results */}
        {filteredTalents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3
              className="text-xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              No talent found
            </h3>
            <p
              className="text-gray-600 mb-6"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Try adjusting your search criteria to find more professionals.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedExperience("");
                setSelectedLocation("");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
