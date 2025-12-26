import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
<<<<<<< HEAD
  const [viewAll, setViewAll] = useState(false);
=======
>>>>>>> 4a73a3b (updated)

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/skills/get",
          {
            withCredentials: true,
          }
        );
        setSkills(data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    getSkills();
  }, []);

<<<<<<< HEAD
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
        }[proficiency] || "0%",
      color:
        {
          beginner: "bg-yellow-400 dark:bg-yellow-500",
          intermediate: "bg-blue-400 dark:bg-blue-500",
          advanced: "bg-green-400 dark:bg-green-500",
          expert: "bg-purple-400 dark:bg-purple-500",
        }[proficiency] || "bg-gray-400",
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Technical Skills
        </h1>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full" />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(viewAll ? skills : skills?.slice(0, 12))?.map((skill) => {
          const proficiency = getProficiency(skill.proficiency);

          return (
            <motion.div
              key={skill._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl p-6 transition-all"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Skill Icon */}
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                  <img
                    src={skill.svg.url}
                    alt={skill.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Skill Details */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    {skill.title}
                  </h3>

                  {/* Proficiency Bar */}
                  <div className="relative pt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`${proficiency.color} h-3 rounded-full transition-all duration-500`}
                        style={{
                          width: proficiency.width,
                          minWidth: "0.5rem", // Ensures visibility for small percentages
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Show More Button */}
      {skills?.length > 12 && (
        <div className="w-full text-center mt-12">
          <Button
            className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
            dark:hover:bg-blue-600 transition-transform hover:scale-105"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "Show More Skills"}
          </Button>
        </div>
      )}
=======
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12 relative">
      {/* Lightning effect container */}
      <div className="relative">
        {/* Background lightning bolts */}
        <div className="absolute -top-10 left-1/4 w-32 h-16">
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-lightning" />
          <div
            className="absolute top-4 left-0 w-16 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-lightning-bolt"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="absolute -top-10 right-1/4 w-32 h-16">
          <div
            className="absolute top-0 right-0 w-[2px] h-8 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-lightning"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-4 right-0 w-16 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-lightning-bolt"
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
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent animate-lightning-bolt z-0" />

          {/* Spark particles around title */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-sky-400 rounded-full animate-spark"
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
        {skills &&
          skills.map((element) => {
            return (
              <div key={element._id} className="relative group">
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
                    <img
                      src={element.svg && element.svg.url}
                      alt="skill"
                      className="h-10 sm:h-16 md:h-20 w-auto relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"
                    />
                  </div>

                  {/* Skill name with tech font */}
                  <p className="text-muted-foreground text-center font-tech-mono text-sm sm:text-base mt-2 group-hover:text-sky-300 transition-colors duration-300">
                    {element.title}
                  </p>

                  {/* Progress bar (optional - you can add a skill level field) */}
                  <div className="w-full h-1 bg-gray-800/50 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                      style={{ width: "85%" }} // You can make this dynamic based on skill level
                    />
                  </div>
                </Card>
              </div>
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

      {/* Add the necessary animations to your App.css */}
      <style jsx>{`
        .dancing_text {
          font-family: "Orbitron", sans-serif;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
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

        /* Lightning bolt animation */
        @keyframes lightning-bolt {
          0%,
          100% {
            opacity: 0;
            transform: scaleX(0);
          }
          10%,
          90% {
            opacity: 0.5;
            transform: scaleX(1);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.2);
          }
        }

        .animate-spark {
          animation: spark 3s ease-in-out infinite;
        }

        .animate-lightning-bolt {
          animation: lightning-bolt 4s ease-in-out infinite;
        }
      `}</style>
>>>>>>> 4a73a3b (updated)
    </div>
  );
};

export default Skills;
