"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TalentCard from "../../components/TalentCard";

export default function BrowseTalentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [talent, setTalent] = useState<any>([]);
  const [filteredTalent, setFilteredTalent] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

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
    const fetchTalents = async () => {
      try {
        // setLoading(true);
        // setError(null);

        const response = await fetch("/api/talents");
        const result = await response.json();
        console.log("Fetched talent data:", result);

        if (result.success) {
          setTalent(result.data);
          setFilteredTalent(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Error fetching talent:", err);
        setError("Failed to load talent. Please try again later.");
        // Fallback to sample data if API fails
        const sampleTalent = [
          {
            id: "recFDCYDoYQk0FU3K",
            fields: {
              Name: "Adedoyin Adebayo",
              Email: "adedoyinadebayo@gmail.com",
              Role: "Full Stack Developer",
              Skills: ["React", "Node.js", "Python", "AWS"],
              // experience: "Senior Level (6-10 years)",
              // location: "Lagos, Nigeria",
              Rates: 49,
              // hourlyRate: "$45-65",
              Availability: "Available",
              // image:
              //   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
              "Verification Status": "Verified",
              // completedProjects: 45,
              // bio: "Experienced full-stack developer with expertise in building scalable web applications. Specialized in React, Node.js, and cloud architecture.",
            }
          },
          // ... other sample talent data
        ];
        setTalent(sampleTalent);
        setFilteredTalent(sampleTalent);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  useEffect(() => {
    let filtered = talent;

    if (searchTerm) {
      filtered = filtered.filter(
        (person: any) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.skills.some((skill: any) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((person: any) =>
        person.title
          .toLowerCase()
          .includes(selectedCategory.toLowerCase().replace(" development", "")),
      );
    }

    if (selectedExperience) {
      filtered = filtered.filter(
        (person: any) => person.experience === selectedExperience,
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (person: any) => person.location === selectedLocation,
      );
    }

    setFilteredTalent(filtered);
  }, [
    searchTerm,
    selectedCategory,
    selectedExperience,
    selectedLocation,
    talent,
  ]);

  const handleRequestCandidate = async (talentId: any) => {
    try {
      const response = await fetch("/api/placements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          talentId,
          status: "Requested",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `When requesting candidate, the response was [${response.status}] ${response.statusText}`,
        );
      }

      alert("Request sent! We will contact you within 24 hours.");
    } catch (error) {
      console.error("Error requesting candidate:", error);
      alert("There was an error sending your request. Please try again.");
    }
  };

  if (loading) {
    return (
        <div className="pt-20 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-80 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
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

          {/* Filters */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by name or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <option value="">All Categories</option>
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Experience Filter */}
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                <option value="">All Experience Levels</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
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

          {/* Results Count */}
          <div className="mb-6">
            <p
              className="text-gray-600"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Showing {filteredTalent.length} verified professionals
            </p>
          </div>

          {/* Talent Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalent.map((person: any) => (
              <TalentCard key={person.id} person={person}/>
            ))}
          </div>

          {/* No Results */}
          {filteredTalent.length === 0 && (
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
