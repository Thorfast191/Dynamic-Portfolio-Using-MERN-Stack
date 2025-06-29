import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";

const Publications = () => {
  const [viewAll, setViewAll] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyPublications = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/publications/getall",
          { withCredentials: true }
        );
        setPublications(data.publications);
      } catch (error) {
        console.error("Error fetching publications:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyPublications();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p>Loading publications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Research Publications
        </h1>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full" />
      </div>

      {publications.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            No publications found
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You haven't added any publications yet.
          </p>
        </div>
      ) : (
        <>
          {/* Publications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(viewAll ? publications : publications.slice(0, 9)).map((pub) => (
              <div
                key={pub._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                transition-all duration-300 p-6 flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {pub.title}
                  </h2>
                </div>

                <div className="prose dark:prose-invert max-w-none flex-grow mb-4">
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                    {pub.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => window.open(pub.publication.url, "_blank")}
                  >
                    <span>View Publication</span>
                  </Button>

                  <Button
                    className="w-full gap-2"
                    onClick={() => window.open(pub.publication.url, "_blank")}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {publications.length > 9 && (
            <div className="w-full text-center mt-12">
              <Button
                className="px-8 py-4 text-lg rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                dark:hover:bg-blue-600 transition-transform hover:scale-105"
                onClick={() => setViewAll(!viewAll)}
              >
                {viewAll ? "Show Less" : `Show More (${publications.length})`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Publications;
