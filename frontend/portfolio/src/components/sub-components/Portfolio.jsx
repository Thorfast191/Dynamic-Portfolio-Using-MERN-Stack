import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, MapPin, BookOpen, ArrowUpRight } from "lucide-react";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    </div>
  );
};

export default Portfolio;
