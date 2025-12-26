import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/projects/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description
    .split(". ")
    .filter((item) => item.trim() !== "");
  const technologiesList = technologies
    .split(", ")
    .filter((item) => item.trim() !== "");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <>
      {/* Space Background Container */}
      <div className="fixed inset-0 overflow-hidden z-[-10]">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 animate-gradient bg-[length:400%_400%]" />

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-[1px] w-32 bg-gradient-to-r from-transparent via-sky-300 to-transparent animate-shooting-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-sky-300/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.1;
          }
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
        }

        .animate-shooting-star {
          animation: shooting-star 3s linear infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen">
        {/* Subtle overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40 pointer-events-none" />

        <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 relative z-10">
          <div className="w-[100%] px-5 md:w-[1000px] pb-5">
            <div className="space-y-12 backdrop-blur-sm bg-gray-900/30 rounded-2xl p-8 border border-sky-500/20 shadow-2xl shadow-sky-900/20">
              <div className="border-b border-sky-500/30 pb-12">
                <div className="flex justify-end">
                  <Button
                    onClick={handleReturnToPortfolio}
                    className="bg-sky-600 hover:bg-sky-700 text-white transition-all duration-300 hover:scale-105"
                  >
                    ← Return to Portfolio
                  </Button>
                </div>
                <div className="mt-10 flex flex-col gap-8">
                  <div className="w-full">
                    <h1 className="text-4xl font-bold mb-6 text-sky-300">
                      {title}
                    </h1>
                    <div className="rounded-xl overflow-hidden border-2 border-sky-500/30 shadow-lg">
                      <img
                        src={
                          projectBannerPreview
                            ? projectBannerPreview
                            : "/avatarHolder.jpg"
                        }
                        alt="projectBanner"
                        className="w-full h-auto transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
                        <p className="text-2xl font-semibold mb-4 text-sky-300">
                          Description:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          {descriptionList.map((item, index) => (
                            <li key={index} className="text-gray-200">
                              {item}.
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
                        <p className="text-2xl font-semibold mb-4 text-sky-300">
                          Technologies:
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {technologiesList.map((item, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-sky-900/50 text-sky-300 rounded-full text-sm font-medium border border-sky-500/30"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
                        <p className="text-2xl font-semibold mb-4 text-sky-300">
                          Project Details
                        </p>
                        <div className="space-y-6">
                          <div>
                            <p className="text-lg font-medium text-sky-400 mb-2">
                              Stack:
                            </p>
                            <p className="text-gray-200 bg-sky-900/30 px-4 py-2 rounded-lg inline-block">
                              {stack}
                            </p>
                          </div>

                          <div>
                            <p className="text-lg font-medium text-sky-400 mb-2">
                              Deployment Status:
                            </p>
                            <div
                              className={`px-4 py-2 rounded-lg inline-block ${
                                deployed === "Yes"
                                  ? "bg-green-900/30 text-green-300 border border-green-500/30"
                                  : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                              }`}
                            >
                              {deployed}
                            </div>
                          </div>

                          <div>
                            <p className="text-lg font-medium text-sky-400 mb-2">
                              GitHub Repository:
                            </p>
                            <Link
                              className="text-sky-300 hover:text-sky-200 transition-colors duration-300 flex items-center gap-2 bg-sky-900/30 px-4 py-3 rounded-lg border border-sky-500/30 hover:bg-sky-800/40"
                              target="_blank"
                              to={gitRepoLink}
                            >
                              <span className="truncate">{gitRepoLink}</span>
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </Link>
                          </div>

                          <div>
                            <p className="text-lg font-medium text-sky-400 mb-2">
                              Live Project:
                            </p>
                            <Link
                              className="text-sky-300 hover:text-sky-200 transition-colors duration-300 flex items-center gap-2 bg-sky-900/30 px-4 py-3 rounded-lg border border-sky-500/30 hover:bg-sky-800/40"
                              target="_blank"
                              to={projectLink}
                            >
                              <span className="truncate">{projectLink}</span>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
