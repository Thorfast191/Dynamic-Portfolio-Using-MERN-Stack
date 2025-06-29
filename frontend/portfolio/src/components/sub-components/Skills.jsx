import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [viewAll, setViewAll] = useState(false);

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
    </div>
  );
};

export default Skills;
