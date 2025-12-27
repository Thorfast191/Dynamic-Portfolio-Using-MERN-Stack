import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSkills = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/skills/get",
          {
            withCredentials: true,
          }
        );
        setSkills(data.skills || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("Failed to load skills. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getSkills();
  }, []);

  // Proficiency configuration
  const getProficiency = (level) => {
    const proficiency = level?.toLowerCase();
    return {
      width:
        {
          beginner: "25%",
          intermediate: "50%",
          advanced: "75%",
          expert: "100%",
        }[proficiency] || "50%",
      color:
        {
          beginner: "from-yellow-400 to-yellow-500",
          intermediate: "from-sky-400 to-blue-500",
          advanced: "from-green-400 to-emerald-500",
          expert: "from-purple-400 to-purple-500",
        }[proficiency] || "from-sky-400 to-blue-500",
    };
  };

  if (loading) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        {/* Lightning effect container */}
        <div className="relative mb-12">
          <div className="absolute -top-10 left-1/4 w-32 h-16">
            <div className="absolute top-0 left-0 w-[2px] h-8 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
          </div>

          <div className="absolute -top-10 right-1/4 w-32 h-16">
            <div
              className="absolute top-0 right-0 w-[2px] h-8 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          <div className="relative mb-8">
            <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] font-extrabold text-center font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect">SKILLS</span>
            </h1>
            <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-sky-400 mx-auto mb-4" />
            <p className="text-gray-300 font-tech-body">Loading skills...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        <div className="relative">
          <div className="relative mb-8">
            <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] font-extrabold text-center font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect">SKILLS</span>
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
            Error Loading Skills
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

  if (skills.length === 0) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        {/* Lightning effect container */}
        <div className="relative mb-12">
          <div className="relative mb-8">
            <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] font-extrabold text-center font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect">SKILLS</span>
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No Skills Found
          </h3>
          <p className="text-gray-400">Skills will appear here once added.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
      {/* Lightning effect container */}
      <div className="relative">
        {/* Background lightning bolts */}
        <div className="absolute -top-10 left-1/4 w-32 h-16">
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
          <div
            className="absolute top-4 left-0 w-16 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="absolute -top-10 right-1/4 w-32 h-16">
          <div
            className="absolute top-0 right-0 w-[2px] h-8 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-4 right-0 w-16 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Title with enhanced lightning effect */}
        <div className="relative mb-8">
          <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] font-extrabold text-center font-tech-heading tracking-[0.2em] relative z-10">
            <span className="text-tubeLight-effect">SKILLS</span>
          </h1>

          {/* Electric energy field behind title */}
          <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />

          {/* Lightning bolt effect through text */}
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent animate-pulse z-0" />

          {/* Spark particles around title */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-sky-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 120 - 10}%`,
                left: `${Math.random() * 120 - 10}%`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: "0 0 10px 2px rgba(56, 189, 248, 0.8)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 relative z-10">
        {skills.map((element) => {
          const proficiency = getProficiency(element.proficiency);

          return (
            <motion.div
              key={element._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              {/* Energy pulse effect on hover */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 blur-md" />

              {/* Lightning connector lines */}
              <div className="absolute top-1/2 -left-4 w-4 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-1/2 -right-4 w-4 h-[1px] bg-gradient-to-l from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Card className="h-fit p-4 sm:p-6 flex flex-col justify-center items-center gap-3 glass-space border border-sky-500/20 shadow-lg group-hover:shadow-sky-900/40 transition-all duration-500 group-hover:scale-105 group-hover:border-sky-400/40 relative z-10">
                {/* Glowing orb effect */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sky-400/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Skill icon with hover glow */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {element.svg?.url ? (
                    <img
                      src={element.svg.url}
                      alt={element.title}
                      className="h-10 sm:h-16 md:h-20 w-auto relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"
                    />
                  ) : (
                    <div className="h-10 sm:h-16 md:h-20 w-10 sm:w-16 md:w-20 bg-gray-800/50 rounded-lg flex items-center justify-center relative z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Skill name with tech font */}
                <p className="text-white text-center font-tech-mono text-sm sm:text-base mt-2 group-hover:text-sky-300 transition-colors duration-300">
                  {element.title}
                </p>

                {/* Proficiency badge */}
                {element.proficiency && (
                  <Badge
                    className={`mt-2 px-2 py-1 text-xs font-tech-mono ${
                      element.proficiency.toLowerCase() === "expert"
                        ? "bg-purple-900/30 text-purple-300 border border-purple-500/30"
                        : element.proficiency.toLowerCase() === "advanced"
                        ? "bg-green-900/30 text-green-300 border border-green-500/30"
                        : element.proficiency.toLowerCase() === "intermediate"
                        ? "bg-sky-900/30 text-sky-300 border border-sky-500/30"
                        : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                    }`}
                  >
                    {element.proficiency}
                  </Badge>
                )}

                {/* Progress bar */}
                <div className="w-full h-1 bg-gray-800/50 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${proficiency.color} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                    style={{ width: proficiency.width }}
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Circuit board background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
      </div>
    </div>
  );
};

export default Skills;
