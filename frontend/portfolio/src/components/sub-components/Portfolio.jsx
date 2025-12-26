import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Calendar, Users, MapPin, BookOpen, ArrowUpRight } from "lucide-react";
=======
import { useNavigate } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
>>>>>>> 4a73a3b (updated)

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
=======
  const navigate = useNavigate();
>>>>>>> 4a73a3b (updated)

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/projects/getall",
          { withCredentials: true }
        );
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProjects();
  }, []);

<<<<<<< HEAD
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateString
      ? new Date(dateString).toLocaleDateString(undefined, options)
      : "Present";
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Artistic Projects
        </h1>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full" />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4 flex items-center justify-center">
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
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            No projects found
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You haven't added any projects yet.
          </p>
=======
  // Handle project card click
  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  // Handle link click (stop propagation to prevent card click)
  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Lightning effect container */}
      <div className="relative mb-12">
        {/* Background lightning bolts */}
        <div className="absolute -top-12 left-10 w-24 h-20">
          <div className="absolute top-0 left-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-lightning" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-lightning-bolt" />
        </div>

        <div className="absolute -top-12 right-10 w-24 h-20">
          <div
            className="absolute top-0 right-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-lightning"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-8 right-1/2 transform translate-x-1/2 w-20 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-lightning-bolt"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Title with enhanced lightning effect */}
        <div className="relative">
          {/* Main title for large screens */}
          <h1 className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mx-auto w-fit font-tech-heading tracking-[0.2em] relative z-10">
            <span className="text-tubeLight-effect font-extrabold">
              PORTFOLIO
            </span>
          </h1>

          {/* Mobile title */}
          <h1 className="flex sm:hidden gap-4 items-center text-[2rem] mx-auto w-fit font-tech-heading tracking-[0.2em] relative z-10">
            <span className="text-tubeLight-effect font-extrabold">
              MY WORK
            </span>
          </h1>

          {/* Electric energy field behind title */}
          <div className="absolute -inset-6 sm:-inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />

          {/* Lightning bolt effect through text */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] sm:h-[3px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent animate-lightning-bolt z-0" />

          {/* Spark particles around title */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-sky-400 rounded-full animate-spark"
              style={{
                top: `${Math.random() * 120 - 10}%`,
                left: `${Math.random() * 120 - 10}%`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: "0 0 10px 2px rgba(56, 189, 248, 0.8)",
              }}
            />
          ))}

          {/* Animated border line */}
          <div className="absolute w-full h-1 top-8 sm:top-10 md:top-12 lg:top-14 z-[-1] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent animate-shimmer" />
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
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Tech stack badges */}
                  <div className="absolute bottom-2 left-2 z-20 flex flex-wrap gap-2">
                    {element.technologies &&
                      element.technologies
                        .split(", ")
                        .slice(0, 3)
                        .map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-900/80 text-sky-300 rounded-md border border-sky-500/30"
                          >
                            {tech}
                          </span>
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-tech-mono ${
                          element.deployed === "Yes"
                            ? "bg-green-900/30 text-green-300 border border-green-500/30"
                            : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        {element.deployed === "Yes"
                          ? "🚀 Live"
                          : "🔧 In Progress"}
                      </span>
                      <span className="text-sky-400 font-tech-mono">
                        {element.stack}
                      </span>
                    </div>

                    {/* Quick links - using buttons to avoid nested anchors */}
                    <div className="flex gap-2">
                      {element.gitRepoLink && (
                        <button
                          onClick={(e) =>
                            handleLinkClick(e, element.gitRepoLink)
                          }
                          className="p-2 bg-gray-800/50 rounded-lg hover:bg-sky-900/50 transition-colors duration-300"
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
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-12">
          <Button
            className="btn-space px-8 py-6 text-lg font-tech-heading tracking-wider relative group"
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

            {/* Sparkle dots */}
            <div className="absolute -top-2 left-1/4 w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            <div
              className="absolute -top-2 right-1/4 w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </Button>
>>>>>>> 4a73a3b (updated)
        </div>
      ) : (
        <>
          {/* Projects Grid */}
          <div className="space-y-8">
            {(viewAll ? projects : projects.slice(0, 9)).map((project) => (
              <div
                key={project._id}
                className="group flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 rounded-xl 
                shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                {/* Single Banner Image */}
                {project.projectBanner?.url && (
                  <div className="md:w-2/5">
                    <img
                      src={project.projectBanner.url}
                      alt={project.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Details Section */}
                <div
                  className={`${
                    project.projectBanner?.url ? "md:w-3/5" : "w-full"
                  } flex flex-col gap-4`}
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        project.status === "Ongoing" ? "default" : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      {project.type}
                    </Badge>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h2>

                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      <span>
                        {project.institution} - {project.department}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {formatDate(project.startDate)} -{" "}
                        {project.endDate
                          ? formatDate(project.endDate)
                          : "Present"}
                      </span>
                    </div>

                    {project.role && (
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Role: {project.role}</span>
                      </div>
                    )}

                    {project.collaborators?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>
                          Collaborators: {project.collaborators.join(", ")}
                        </span>
                      </div>
                    )}

                    {project.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mt-2">
                    <div className="prose dark:prose-invert max-w-none">
                      <h4 className="text-lg font-semibold">
                        Project Description
                      </h4>
                      <p className="line-clamp-3">{project.description}</p>
                    </div>

                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/project/${project._id}`}
                    className="mt-auto inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    View Full Project Details
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {projects.length > 9 && (
            <div className="w-full text-center mt-12">
              <Button
                className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                dark:hover:bg-blue-600 transition-transform hover:scale-105"
                onClick={() => setViewAll(!viewAll)}
              >
                {viewAll
                  ? "Show Less"
                  : `Show More Projects (${projects.length})`}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Circuit board background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-[-1]">
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
        <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
      </div>

      {/* Add necessary animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(56, 189, 248, 0.5),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite linear;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Spark animation for title */
        @keyframes spark {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
            box-shadow: 0 0 20px 4px rgba(56, 189, 248, 1);
          }
        }

        .animate-spark {
          animation: spark 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
