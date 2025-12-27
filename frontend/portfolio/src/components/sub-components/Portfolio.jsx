import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Github, Loader } from "lucide-react";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/projects/getall",
          { withCredentials: true }
        );
        setProjects(data.projects || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getMyProjects();
  }, []);

  // Handle project card click
  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  // Handle link click (stop propagation to prevent card click)
  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        {/* Lightning effect container */}
        <div className="relative mb-12">
          <div className="absolute -top-12 left-10 w-24 h-20">
            <div className="absolute top-0 left-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />
          </div>

          <div className="absolute -top-12 right-10 w-24 h-20">
            <div
              className="absolute top-0 right-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-8 right-1/2 transform translate-x-1/2 w-20 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          {/* Title */}
          <div className="relative">
            <h1 className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mx-auto w-fit font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect font-extrabold">
                PORTFOLIO
              </span>
            </h1>
            <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-sky-400 mx-auto mb-4" />
            <p className="text-gray-300 font-tech-body">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        <div className="relative">
          <div className="relative">
            <h1 className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mx-auto w-fit font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect font-extrabold">
                PORTFOLIO
              </span>
            </h1>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto text-red-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L4.242 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            Error Loading Projects
          </h3>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        {/* Lightning effect container */}
        <div className="relative mb-12">
          <div className="absolute -top-12 left-10 w-24 h-20">
            <div className="absolute top-0 left-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />
          </div>

          <div className="absolute -top-12 right-10 w-24 h-20">
            <div
              className="absolute top-0 right-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-8 right-1/2 transform translate-x-1/2 w-20 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          {/* Title */}
          <div className="relative">
            <h1 className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mx-auto w-fit font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect font-extrabold">
                PORTFOLIO
              </span>
            </h1>
            <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto text-gray-400 mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No Projects Found
          </h3>
          <p className="text-gray-400">You haven't added any projects yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
      {/* Lightning effect container */}
      <div className="relative mb-12">
        {/* Background lightning bolts */}
        <div className="absolute -top-12 left-10 w-24 h-20">
          <div className="absolute top-0 left-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />
        </div>

        <div className="absolute -top-12 right-10 w-24 h-20">
          <div
            className="absolute top-0 right-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-8 right-1/2 transform translate-x-1/2 w-20 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Title with enhanced lightning effect */}
        <div className="relative">
          {/* Main title */}
          <h1 className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mx-auto w-fit font-tech-heading tracking-[0.2em] relative z-10">
            <span className="text-tubeLight-effect font-extrabold">
              PORTFOLIO
            </span>
          </h1>

          {/* Electric energy field behind title */}
          <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />

          {/* Lightning bolt effect through text */}
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent animate-pulse z-0" />

          {/* Spark particles around title */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-sky-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 120 - 10}%`,
                left: `${Math.random() * 120 - 10}%`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: "0 0 10px 2px rgba(56, 189, 248, 0.8)",
              }}
            />
          ))}

          {/* Animated border line */}
          <div className="absolute w-full h-1 top-12 z-[-1]" />
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {(viewAll ? projects : projects.slice(0, 9)).map((element) => {
          return (
            <div
              key={element._id}
              className="relative group cursor-pointer"
              onClick={() => handleProjectClick(element._id)}
            >
              {/* Energy pulse effect on hover */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 blur-sm" />

              <Card className="glass-space border border-sky-500/20 shadow-lg overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:border-sky-400/40 group-hover:shadow-sky-900/40 h-full relative">
                {/* Glowing corner effect */}
                <div className="absolute top-0 right-0 w-6 h-6">
                  <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-sky-400/30 blur-sm" />
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-sky-400/20 blur-sm" />
                </div>

                {/* Project image with overlay */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10" />
                  {element.projectBanner?.url ? (
                    <img
                      src={element.projectBanner.url}
                      alt={element.title}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-56 bg-gray-800/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="absolute bottom-2 left-2 z-20 flex flex-wrap gap-2">
                    {element.technologies &&
                      element.technologies
                        .split(", ")
                        .slice(0, 3)
                        .map((tech, index) => (
                          <Badge
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-900/80 text-sky-300 border border-sky-500/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                  </div>

                  {/* View button overlay */}
                  <div className="absolute inset-0 bg-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                    <div className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg text-white font-tech-subheading animate-pulse">
                      VIEW PROJECT →
                    </div>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-tech-heading group-hover:text-sky-300 transition-colors duration-300">
                    {element.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 font-tech-body line-clamp-2">
                    {element.description}
                  </p>

                  {/* Project metadata */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <Badge
                        className={`px-3 py-1 rounded-full text-xs font-tech-mono ${
                          element.deployed === "Yes"
                            ? "bg-green-900/30 text-green-300 border border-green-500/30"
                            : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        {element.deployed === "Yes"
                          ? "🚀 Live"
                          : "🔧 In Progress"}
                      </Badge>
                      <span className="text-sky-400 font-tech-mono">
                        {element.stack}
                      </span>
                    </div>

                    {/* Quick links */}
                    <div className="flex gap-2">
                      {element.gitRepoLink && (
                        <button
                          onClick={(e) =>
                            handleLinkClick(e, element.gitRepoLink)
                          }
                          className="p-2 bg-gray-800/50 rounded-lg hover:bg-sky-900/50 transition-colors duration-300"
                          aria-label="View GitHub Repository"
                        >
                          <Github size={16} className="text-sky-300" />
                        </button>
                      )}
                      {element.projectLink && element.deployed === "Yes" && (
                        <button
                          onClick={(e) =>
                            handleLinkClick(e, element.projectLink)
                          }
                          className="p-2 bg-gray-800/50 rounded-lg hover:bg-sky-900/50 transition-colors duration-300"
                          aria-label="View Live Project"
                        >
                          <ExternalLink size={16} className="text-sky-300" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-sky-500/30 transition-all duration-500" />
              </Card>
            </div>
          );
        })}
      </div>

      {/* Show More/Less button */}
      {projects.length > 9 && (
        <div className="w-full text-center my-12">
          <Button
            className="btn-space px-8 py-6 text-lg font-tech-heading tracking-wider relative group bg-sky-600 hover:bg-sky-700"
            onClick={() => setViewAll(!viewAll)}
          >
            <span className="relative z-10">
              {viewAll ? "SHOW LESS" : "VIEW ALL PROJECTS"}
            </span>

            {/* Button glow effect */}
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-sky-500/0 via-sky-500/20 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            {/* Lightning bolts on hover */}
            <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-4 top-1/2 w-4 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
      )}

      {/* Circuit board background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-[-1]">
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
        <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
      </div>
    </div>
  );
};

export default Portfolio;
