import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Loader } from "lucide-react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
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
        setError(null);
      } catch (err) {
        console.error("Error fetching timeline:", err);
        setError("Failed to load timeline data");
      } finally {
        setLoading(false);
      }
    };
    getTimeline();
  }, []);

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
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="relative mb-12">
          <div className="relative">
            <h1 className="text-[2.5rem] sm:text-[2.25rem] md:text-[2.7rem] lg:text-[3.3rem] mb-8 font-extrabold text-center text-tubeLight-effect font-tech-heading tracking-wider">
              TIMELINE
            </h1>
            <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-transparent via-sky-500/20 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-sky-400 mx-auto mb-4" />
            <p className="text-gray-300 font-tech-body">Loading timeline...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="relative mb-12">
          <div className="relative">
            <h1 className="text-[2.5rem] sm:text-[2.25rem] md:text-[2.7rem] lg:text-[3.3rem] mb-8 font-extrabold text-center text-tubeLight-effect font-tech-heading tracking-wider">
              TIMELINE
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
            Error Loading Timeline
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

  if (timeline.length === 0) {
    return (
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="relative mb-12">
          <div className="relative">
            <h1 className="text-[2.5rem] sm:text-[2.25rem] md:text-[2.7rem] lg:text-[3.3rem] mb-8 font-extrabold text-center text-tubeLight-effect font-tech-heading tracking-wider">
              TIMELINE
            </h1>
            <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-transparent via-sky-500/20 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">
            No Timeline Entries Found
          </h3>
          <p className="text-gray-400">
            You haven't added any timeline entries yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-16">
      {/* Lightning effect elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        {/* Lightning bolts */}
        <div className="absolute top-0 left-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />
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
            className="absolute w-2 h-2 bg-sky-400 rounded-full animate-pulse"
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
        {(viewAll ? timeline : timeline.slice(0, 9)).map((element) => (
          <motion.div
            key={element._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col md:flex-row gap-6 glass-space rounded-xl p-6 border border-sky-500/20 shadow-lg hover:shadow-sky-900/30 transition-all duration-500 group"
          >
            {/* Lightning bolt connector */}
            <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-gradient-to-r from-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* LEFT BOX — DATE */}
            <div className="md:w-1/3 border-l-4 md:border-l-0 md:border-r-4 border-sky-500 pl-4 md:pl-0 md:pr-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
                <h4 className="text-lg font-semibold text-sky-300 font-tech-subheading">
                  {formatDate(element.from)} – {formatDate(element.to)}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-sky-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-tech-mono">
                  {element.to ? "" : "Present"}
                </span>
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-1/2 w-2 h-2 rounded-full bg-sky-500 transform -translate-y-1/2 group-hover:scale-150 transition-transform duration-300" />
                <div className="absolute -left-6 top-1/2 w-6 h-[1px] bg-gradient-to-r from-sky-500 to-transparent" />
              </div>
            </div>

            {/* RIGHT BOX — CONTENT */}
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold text-white mb-2 font-tech-heading group-hover:text-sky-300 transition-colors duration-300">
                {element.title || "Untitled Entry"}
              </h3>
              <p className="text-gray-300 font-tech-body leading-relaxed">
                {element.description || "No description available"}
              </p>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/0 via-sky-500/5 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less button */}
      {timeline.length > 9 && (
        <div className="w-full text-center mt-12">
          <button
            className="px-6 py-3 text-lg rounded-full bg-sky-600 hover:bg-sky-700 transition-transform hover:scale-105 text-white font-tech-heading"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : `Show More (${timeline.length})`}
          </button>
        </div>
      )}

      {/* CSS Styles */}
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
    </div>
  );
};

export default Timeline;
