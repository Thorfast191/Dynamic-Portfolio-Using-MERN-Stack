import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
<<<<<<< HEAD
  const [viewAll, setViewAll] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTimeline = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/timeline/get/posts",
          { withCredentials: true }
        );
        setTimeline(data.posts || []);
      } catch (err) {
        console.error("Error fetching timeline:", err);
        setError("Failed to load timeline data");
      } finally {
        setLoading(false);
      }
=======

  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/timeline/get/posts",
        { withCredentials: true }
      );
      setTimeline(data.posts);
>>>>>>> 4a73a3b (updated)
    };
    getTimeline();
  }, []);

<<<<<<< HEAD
  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "short" };
      return dateString
        ? new Date(dateString).toLocaleDateString(undefined, options)
        : "Present";
    } catch (e) {
      return "Present";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p>Loading timeline...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Professional Journey
        </h1>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full" />
      </div>

      {timeline.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            No timeline entries found
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You haven't added any timeline entries yet.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(viewAll ? timeline : timeline.slice(0, 9)).map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl p-6 transition-all"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {formatDate(item.from)} -{" "}
                      {formatDate(item.to) || "Present"}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.title || "Untitled Entry"}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description || "No description available"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {timeline.length > 9 && (
            <div className="w-full text-center mt-12">
              <button
                className="px-6 py-3 text-lg rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                dark:hover:bg-blue-600 transition-transform hover:scale-105 text-white"
                onClick={() => setViewAll(!viewAll)}
              >
                {viewAll ? "Show Less" : `Show More (${timeline.length})`}
              </button>
            </div>
          )}
        </>
      )}
=======
  return (
    <div className="max-w-5xl mx-auto px-4 relative">
      {/* Lightning effect elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        {/* Lightning bolts */}
        <div className="absolute top-0 left-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-lightning" />
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-lightning-bolt" />
      </div>

      {/* Title with lightning effect */}
      <div className="relative mb-12">
        <h1 className="text-[2.5rem] sm:text-[2.25rem] md:text-[2.7rem] lg:text-[3.3rem] mb-8 font-extrabold text-center text-tubeLight-effect font-tech-heading tracking-wider">
          TIMELINE
        </h1>

        {/* Electric border effect */}
        <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-transparent via-sky-500/20 to-transparent animate-pulse" />

        {/* Spark particles around title */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-sky-400 rounded-full animate-spark"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: "0 0 10px 2px rgba(56, 189, 248, 0.8)",
            }}
          />
        ))}
      </div>

      <div className="space-y-6 relative z-10">
        {timeline &&
          timeline.map((element) => (
            <div
              key={element._id}
              className="flex flex-col md:flex-row gap-6 glass-space rounded-xl p-6 border border-sky-500/20 shadow-lg hover:shadow-sky-900/30 transition-all duration-500 hover:scale-[1.02] group"
            >
              {/* Lightning bolt connector */}
              <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-gradient-to-r from-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* LEFT BOX — DATE */}
              <div className="md:w-1/3 border-l-4 md:border-l-0 md:border-r-4 border-sky-500 pl-4 md:pl-0 md:pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
                  <h4 className="text-lg font-semibold text-sky-300 font-tech-subheading">
                    {element.from} – {element.to ? element.to : "Present"}
                  </h4>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-1/2 w-2 h-2 rounded-full bg-sky-500 transform -translate-y-1/2 group-hover:scale-150 transition-transform duration-300" />
                  <div className="absolute -left-6 top-1/2 w-6 h-[1px] bg-gradient-to-r from-sky-500 to-transparent" />
                </div>
              </div>

              {/* RIGHT BOX — CONTENT */}
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-white mb-2 font-tech-heading group-hover:text-sky-300 transition-colors duration-300">
                  {element.title}
                </h3>
                <p className="text-gray-300 font-tech-body leading-relaxed">
                  {element.description}
                </p>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/0 via-sky-500/5 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
      </div>

      {/* Add lightning animation styles */}
      <style jsx>{`
        @keyframes lightning {
          0%,
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
          5% {
            opacity: 1;
            transform: translateY(0);
          }
          10% {
            opacity: 0.3;
            transform: translateY(10px);
          }
          15% {
            opacity: 1;
            transform: translateY(0);
          }
          20% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        @keyframes lightning-bolt {
          0%,
          100% {
            opacity: 0;
            transform: translateX(-50%) scaleX(0);
          }
          5%,
          15% {
            opacity: 1;
            transform: translateX(-50%) scaleX(1);
          }
          10% {
            opacity: 0.5;
            transform: translateX(-50%) scaleX(0.8);
          }
        }

        @keyframes spark {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 15px 3px rgba(56, 189, 248, 1);
          }
        }

        .animate-lightning {
          animation: lightning 4s ease-in-out infinite;
        }

        .animate-lightning-bolt {
          animation: lightning-bolt 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-spark {
          animation: spark 2s ease-in-out infinite;
        }
      `}</style>
>>>>>>> 4a73a3b (updated)
    </div>
  );
};

export default Timeline;
