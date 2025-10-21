import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Modules.css";
import ModernModuleCard from "./ModernModuleCard";
import Layout from "./Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Grid,
  List,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";

// Sample module data - would come from API in production
const moduleData = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    description:
      "Learn the basics of cybersecurity, including key concepts and terminology.",
    difficulty: "Fundamental",
    category: "General",
    progress: 0,
    image: "/module-images/intro.jpg",
    estimatedTime: "3 hours",
    tags: ["beginner", "theory"],
  },
  {
    id: 2,
    title: "Network Security Fundamentals",
    description:
      "Understanding network protocols, architecture and security principles.",
    difficulty: "Easy",
    category: "Defensive",
    progress: 30,
    image: "/module-images/network.jpg",
    estimatedTime: "5 hours",
    tags: ["networking", "protocols", "defensive"],
  },
  {
    id: 3,
    title: "Web Application Pentesting",
    description:
      "Learn methodologies for finding and exploiting web application vulnerabilities.",
    difficulty: "Medium",
    category: "Offensive",
    progress: 0,
    image: "/module-images/webapp.jpg",
    estimatedTime: "8 hours",
    tags: ["pentesting", "web", "offensive"],
  },
  {
    id: 4,
    title: "Advanced Exploitation Techniques",
    description:
      "Advanced methods for exploiting complex vulnerabilities in systems.",
    difficulty: "Hard",
    category: "Offensive",
    progress: 0,
    image: "/module-images/exploit.jpg",
    estimatedTime: "10 hours",
    tags: ["exploitation", "advanced", "offensive"],
  },
  {
    id: 5,
    title: "Digital Forensics",
    description:
      "Methodologies and tools used to investigate cybersecurity incidents.",
    difficulty: "Medium",
    category: "Defensive",
    progress: 15,
    image: "/module-images/forensics.jpg",
    estimatedTime: "7 hours",
    tags: ["forensics", "analysis", "defensive"],
  },
  {
    id: 6,
    title: "Malware Analysis",
    description:
      "Techniques for analyzing malicious software and understanding its behavior.",
    difficulty: "Hard",
    category: "Defensive",
    progress: 0,
    image: "/module-images/malware.jpg",
    estimatedTime: "9 hours",
    tags: ["malware", "analysis", "defensive"],
  },
  {
    id: 7,
    title: "Cloud Security",
    description:
      "Security principles and practices specific to cloud environments.",
    difficulty: "Medium",
    category: "General",
    progress: 0,
    image: "/module-images/cloud.jpg",
    estimatedTime: "6 hours",
    tags: ["cloud", "aws", "azure"],
  },
  {
    id: 8,
    title: "Mobile Application Security",
    description:
      "Understanding vulnerabilities specific to mobile applications.",
    difficulty: "Medium",
    category: "Offensive",
    progress: 0,
    image: "/module-images/mobile.jpg",
    estimatedTime: "6 hours",
    tags: ["mobile", "android", "ios"],
  },
];

const Modules = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [progressFilter, setProgressFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:5001/api/courses", {
          withCredentials: true,
        });
        console.log(data.data.course);
        setData(data.data.course);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // Filter modules based on user selections
  const filteredModules = moduleData.filter((module) => {
    // Search term filtering
    const matchesSearchTerm =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Category filtering
    const matchesCategory =
      categoryFilter === "All" || module.category === categoryFilter;

    // Difficulty filtering
    const matchesDifficulty =
      difficultyFilter === "All" || module.difficulty === difficultyFilter;

    // Progress filtering
    const matchesProgress =
      progressFilter === "All" ||
      (progressFilter === "Completed" && module.progress === 100) ||
      (progressFilter === "In Progress" &&
        module.progress > 0 &&
        module.progress < 100) ||
      (progressFilter === "Not Started" && module.progress === 0);

    return (
      matchesSearchTerm &&
      matchesCategory &&
      matchesDifficulty &&
      matchesProgress
    );
  });

  // Calculate stats
  const totalModules = moduleData.length;
  const completedModules = moduleData.filter((m) => m.progress === 100).length;
  const inProgressModules = moduleData.filter(
    (m) => m.progress > 0 && m.progress < 100
  ).length;
  const avgProgress = Math.round(
    moduleData.reduce((sum, m) => sum + m.progress, 0) / totalModules
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setDifficultyFilter("All");
    setProgressFilter("All");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Hero Header */}
          <div className="mb-8 sm:mb-12">
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Learning Modules
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Master cybersecurity through hands-on modules and interactive
                content
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 justify-center text-center sm:justify-start sm:text-left">
                    <div className="bg-blue-500 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-blue-700">
                        Total Modules
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-900">
                        {totalModules}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 justify-center text-center sm:justify-start sm:text-left">
                    <div className="bg-green-500 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-green-700">
                        Completed
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-green-900">
                        {completedModules}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 justify-center text-center sm:justify-start sm:text-left">
                    <div className="bg-yellow-500 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-yellow-700">
                        In Progress
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-900">
                        {inProgressModules}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 justify-center text-center sm:justify-start sm:text-left">
                    <div className="bg-purple-500 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-purple-700">
                        Avg Progress
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-900">
                        {avgProgress}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Filter Section */}
          <Card className="mb-6 sm:mb-8 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg sm:text-xl text-gray-900 text-left">
                    Find Your Perfect Module
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600 text-left">
                    Search and filter to discover modules that match your
                    learning goals
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="flex items-center gap-2 px-4 py-2 font-semibold text-sm shadow-sm transition-all hover:shadow-md"
                  >
                    <Grid className="w-4 h-4" />
                    <span className="hidden sm:inline tracking-wide">
                      Grid View
                    </span>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="flex items-center gap-2 px-4 py-2 font-semibold text-sm shadow-sm transition-all hover:shadow-md"
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline tracking-wide">
                      List View
                    </span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search modules, descriptions, or tags..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 h-11 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={toggleFilters}
                  className="h-12 px-6 bg-white border-2 border-gray-300 text-gray-800 font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                >
                  <Filter className="w-5 h-5 mr-3" />
                  <span className="whitespace-nowrap tracking-wide">
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </span>
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Advanced Filters
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-all hover:shadow-sm"
                    >
                      Clear All Filters
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-800 block tracking-wide">
                        Category
                      </label>
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger className="w-full h-12 bg-white text-gray-900 font-bold border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm transition-all">
                          <SelectValue
                            placeholder="Select category"
                            className="text-gray-900 font-bold"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-gray-200 shadow-lg rounded-lg p-1">
                          {["All", "Offensive", "Defensive", "General"].map(
                            (category) => (
                              <SelectItem
                                key={category}
                                value={category}
                                className="text-gray-900 font-semibold hover:bg-blue-100 hover:text-blue-900 px-4 py-3 cursor-pointer rounded-md transition-colors data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900"
                              >
                                {category}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-800 block tracking-wide">
                        Difficulty
                      </label>
                      <Select
                        value={difficultyFilter}
                        onValueChange={setDifficultyFilter}
                      >
                        <SelectTrigger className="w-full h-12 bg-white text-gray-900 font-bold border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm transition-all">
                          <SelectValue
                            placeholder="Select difficulty"
                            className="text-gray-900 font-bold"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-gray-200 shadow-lg rounded-lg p-1">
                          {["All", "Fundamental", "Easy", "Medium", "Hard"].map(
                            (difficulty) => (
                              <SelectItem
                                key={difficulty}
                                value={difficulty}
                                className="text-gray-900 font-semibold hover:bg-green-100 hover:text-green-900 px-4 py-3 cursor-pointer rounded-md transition-colors data-[highlighted]:bg-green-100 data-[highlighted]:text-green-900"
                              >
                                {difficulty}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-800 block tracking-wide">
                        Progress
                      </label>
                      <Select
                        value={progressFilter}
                        onValueChange={setProgressFilter}
                      >
                        <SelectTrigger className="w-full h-12 bg-white text-gray-900 font-bold border-2 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm transition-all">
                          <SelectValue
                            placeholder="Select progress"
                            className="text-gray-900 font-bold"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-gray-200 shadow-lg rounded-lg p-1">
                          {[
                            "All",
                            "Not Started",
                            "In Progress",
                            "Completed",
                          ].map((progress) => (
                            <SelectItem
                              key={progress}
                              value={progress}
                              className="text-gray-900 font-semibold hover:bg-purple-100 hover:text-purple-900 px-4 py-3 cursor-pointer rounded-md transition-colors data-[highlighted]:bg-purple-100 data-[highlighted]:text-purple-900"
                            >
                              {progress}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {(categoryFilter !== "All" ||
                    difficultyFilter !== "All" ||
                    progressFilter !== "All") && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-700">
                        Active filters:
                      </span>
                      {categoryFilter !== "All" && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2 bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 font-medium shadow-sm"
                        >
                          <span className="font-semibold">Category:</span>{" "}
                          {categoryFilter}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-1 hover:bg-blue-200 rounded-full text-blue-700 hover:text-blue-900 font-bold transition-all"
                            onClick={() => setCategoryFilter("All")}
                          >
                            <span className="text-lg leading-none">×</span>
                          </Button>
                        </Badge>
                      )}
                      {difficultyFilter !== "All" && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2 bg-green-50 text-green-900 hover:bg-green-100 border border-green-200 px-3 py-1.5 font-medium shadow-sm"
                        >
                          <span className="font-semibold">Difficulty:</span>{" "}
                          {difficultyFilter}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-1 hover:bg-green-200 rounded-full text-green-700 hover:text-green-900 font-bold transition-all"
                            onClick={() => setDifficultyFilter("All")}
                          >
                            <span className="text-lg leading-none">×</span>
                          </Button>
                        </Badge>
                      )}
                      {progressFilter !== "All" && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2 bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 font-medium shadow-sm"
                        >
                          <span className="font-semibold">Progress:</span>{" "}
                          {progressFilter}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-1 hover:bg-purple-200 rounded-full text-purple-700 hover:text-purple-900 font-bold transition-all"
                            onClick={() => setProgressFilter("All")}
                          >
                            <span className="text-lg leading-none">×</span>
                          </Button>
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {filteredModules.length}{" "}
                {filteredModules.length === 1 ? "Module" : "Modules"} Found
              </h2>
              {filteredModules.length !== totalModules && (
                <Badge
                  variant="outline"
                  className="text-gray-600 border-gray-300 w-fit"
                >
                  {totalModules - filteredModules.length} filtered out
                </Badge>
              )}
            </div>
          </div>

          {/* Modules Grid */}
          {filteredModules.length > 0 ? (
            <div
              className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              <ModernModuleCard module={data} viewMode={viewMode} />
            </div>
          ) : (
            <Card className="text-center py-12 sm:py-16 shadow-md">
              <CardContent>
                <div className="flex flex-col items-center space-y-4 max-w-md mx-auto text-center">
                  <div className="bg-gray-100 rounded-full p-6">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      No modules match your criteria
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Try adjusting your filters or search terms to find
                      relevant content.
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Reset All Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Modules;
