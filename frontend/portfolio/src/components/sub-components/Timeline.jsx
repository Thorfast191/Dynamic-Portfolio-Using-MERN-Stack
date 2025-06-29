import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

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
    </div>
  );
};

export default Timeline;
