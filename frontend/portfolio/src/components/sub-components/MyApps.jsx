import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ExternalLink, Download, Loader } from "lucide-react";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/software/applications/get",
          { withCredentials: true }
        );
        setApps(data.softwareApplications || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching apps:", err);
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getMyApps();
  }, []);

  if (loading) {
    return (
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Lightning effect container */}
        <div className="relative">
          <div className="absolute -top-12 left-10 w-24 h-20">
            <div className="absolute top-0 left-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />
          </div>

          <div className="absolute -top-12 right-10 w-24 h-20">
            <div
              className="absolute top-0 right-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse"
              style={{ animationDelay: "1.2s" }}
            />
            <div
              className="absolute top-8 right-1/2 transform translate-x-1/2 w-20 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-pulse"
              style={{ animationDelay: "1.7s" }}
            />
          </div>

          <div className="relative mb-8">
            <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] font-extrabold text-center font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect">MY APPS</span>
            </h1>

            <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />
            <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent animate-pulse z-0" />
          </div>
        </div>

        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-sky-400 mx-auto mb-4" />
            <p className="text-gray-300 font-tech-body">
              Loading applications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative">
          <div className="relative mb-8">
            <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] font-extrabold text-center font-tech-heading tracking-[0.2em] relative z-10">
              <span className="text-tubeLight-effect">MY APPS</span>
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
            Error Loading Apps
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

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Lightning effect container */}
      <div className="relative">
        {/* Background lightning bolts */}
        <div className="absolute -top-12 left-10 w-24 h-20">
          <div className="absolute top-0 left-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />
        </div>

        <div className="absolute -top-12 right-10 w-24 h-20">
          <div
            className="absolute top-0 right-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent animate-pulse"
            style={{ animationDelay: "1.2s" }}
          />
          <div
            className="absolute top-8 right-1/2 transform translate-x-1/2 w-20 h-[1px] bg-gradient-to-l from-transparent via-sky-400 to-transparent animate-pulse"
            style={{ animationDelay: "1.7s" }}
          />
        </div>

        {/* Title with enhanced lightning effect */}
        <div className="relative mb-8">
          <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] font-extrabold text-center font-tech-heading tracking-[0.2em] relative z-10">
            <span className="text-tubeLight-effect">MY APPS</span>
          </h1>

          {/* Electric energy field behind title */}
          <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />

          {/* Lightning bolt effect through text */}
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent animate-pulse z-0" />

          {/* Binary code background effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10">
            <div className="absolute top-4 left-4 text-xs font-tech-mono text-sky-400">
              10101010
            </div>
            <div className="absolute top-12 right-4 text-xs font-tech-mono text-sky-400">
              11001100
            </div>
            <div className="absolute bottom-4 left-1/2 text-xs font-tech-mono text-sky-400">
              10011001
            </div>
          </div>

          {/* Spark particles around title */}
          {[...Array(10)].map((_, i) => (
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

      {apps.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto text-gray-400 mb-4 flex items-center justify-center">
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
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No Applications Found
          </h3>
          <p className="text-gray-400">
            You haven't added any applications yet.
          </p>
        </div>
      ) : (
        <>
          {/* Apps grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 relative z-10">
            {apps.map((app) => (
              <div key={app._id} className="relative group">
                {/* Digital pulse effect on hover */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 blur-sm" />

                {/* Data flow lines */}
                <div className="absolute -left-2 top-1/2 w-2 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-2 top-1/2 w-2 h-[1px] bg-gradient-to-l from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Card className="h-fit p-4 sm:p-6 flex flex-col justify-center items-center gap-4 glass-space border border-sky-500/20 shadow-lg group-hover:shadow-sky-900/40 transition-all duration-500 group-hover:scale-105 group-hover:border-sky-400/40 relative z-10">
                  {/* App icon container with glow effect */}
                  <div className="relative">
                    {/* Glowing orb background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Digital grid overlay */}
                    <div className="absolute inset-0 rounded-full border border-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-sky-500/30 to-transparent" />
                      <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
                    </div>

                    {/* App icon */}
                    {app.svg?.url ? (
                      <img
                        src={app.svg.url}
                        alt={app.name}
                        className="h-12 sm:h-16 md:h-20 w-auto relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]"
                      />
                    ) : (
                      <div className="h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20 bg-gray-800/50 rounded-lg flex items-center justify-center relative z-10">
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Download indicator */}
                    {app.downloadLink && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-lg animate-pulse">
                        <Download size={12} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* App name with tech font */}
                  <div className="text-center">
                    <p className="text-white text-center font-tech-mono text-sm sm:text-base font-medium group-hover:text-sky-300 transition-colors duration-300">
                      {app.name}
                    </p>

                    {/* App description if available */}
                    {app.description && (
                      <p className="text-gray-400 text-xs mt-1 font-tech-body line-clamp-2">
                        {app.description}
                      </p>
                    )}
                  </div>

                  {/* App badges */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {app.category && (
                      <span className="px-2 py-1 text-xs bg-sky-900/30 text-sky-300 rounded-md border border-sky-500/30">
                        {app.category}
                      </span>
                    )}
                    {app.platform && (
                      <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md border border-gray-600/30">
                        {app.platform}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {app.link && (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/50 hover:bg-sky-900/50 rounded-lg transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} className="text-sky-300" />
                      </a>
                    )}
                    {(app.downloadLink || app.link) && (
                      <a
                        href={app.downloadLink || app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/50 hover:bg-sky-900/50 rounded-lg transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download size={14} className="text-sky-300" />
                      </a>
                    )}
                  </div>

                  {/* Progress bar (if app has version or progress info) */}
                  <div className="w-full h-1 bg-gray-800/50 rounded-full mt-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                      style={{ width: "100%" }}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Data stream background effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5 z-[-1]">
            <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
            <div
              className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent"
              style={{ animationDelay: "1s" }}
            />

            {/* Binary data streams */}
            <div className="absolute top-0 bottom-0 left-1/4 w-16">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xs font-tech-mono text-sky-400/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${i * 5}%`,
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>

            <div className="absolute top-0 bottom-0 right-1/4 w-16">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xs font-tech-mono text-sky-400/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${i * 5}%`,
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyApps;
