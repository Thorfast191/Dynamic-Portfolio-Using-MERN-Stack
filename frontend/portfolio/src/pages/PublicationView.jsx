import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ExternalLink,
  Download,
  Code2,
  Image as ImageIcon,
  Loader, // ADD THIS
  ArrowLeft, // ADD THIS
} from "lucide-react";

const PublicationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/publications/get/${id}`,
          { withCredentials: true }
        );
        setPublication(data.publication);
        setError(null);
      } catch (error) {
        setError("Failed to load publication");
        toast.error("Failed to load publication");
      } finally {
        setLoading(false);
      }
    };
    fetchPublication();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sky-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading publication...</p>
        </div>
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 text-red-400 mx-auto mb-4">
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
            {error || "Publication not found"}
          </h3>
          <Button
            onClick={() => navigate("/publications")}
            className="mt-4 bg-sky-600 hover:bg-sky-700"
          >
            ← Back to Publications
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ---------- SPACE BACKGROUND ---------- */}
      <div className="fixed inset-0 overflow-hidden z-[-10]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 animate-gradient bg-[length:400%_400%]" />

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
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
      </div>

      <div className="relative min-h-screen z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/50 pointer-events-none" />

        <div className="flex justify-center items-center min-h-screen px-5">
          <div className="w-full max-w-[1000px] space-y-12 backdrop-blur-sm bg-gray-900/30 rounded-2xl p-8 border border-sky-500/20 shadow-2xl shadow-sky-900/20">
            {/* ---------- HEADER ---------- */}
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-sky-300">
                {publication.title}
              </h1>

              <Button
                onClick={() => navigate("/publications")}
                className="bg-sky-600 hover:bg-sky-700 gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </Button>
            </div>

            {/* ---------- DESCRIPTION ---------- */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
              <p className="text-2xl font-semibold text-sky-300 mb-4">
                Abstract
              </p>
              <p className="text-gray-200 leading-relaxed">
                {publication.description}
              </p>
            </div>

            {/* ---------- META GRID ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT COLUMN */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
                  <p className="text-xl text-sky-300 mb-4">
                    Publication Details
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sky-400 mb-1">Paper ID:</p>
                      <p className="text-gray-200">
                        {publication.paperId || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sky-400 mb-1">Platform:</p>
                      <p className="text-gray-200">
                        {publication.platform || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sky-400 mb-1">Program:</p>
                      <p className="text-gray-200">
                        {publication.program || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
                  <p className="text-xl text-sky-300 mb-4">Status</p>

                  <span
                    className={`px-4 py-2 rounded-lg inline-block ${
                      publication.status === "Published"
                        ? "bg-green-900/30 text-green-300 border border-green-500/30"
                        : publication.status === "Ongoing"
                        ? "bg-blue-900/30 text-blue-300 border border-blue-500/30"
                        : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                    }`}
                  >
                    {publication.status}
                  </span>
                </div>

                {/* ---------- ATTACHMENTS ---------- */}
                <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
                  <p className="text-xl text-sky-300 mb-4">Attachments</p>

                  <div className="space-y-3">
                    {publication.paperAttachment?.url && (
                      <div className="space-y-2">
                        <Button
                          className="w-full gap-2 bg-sky-600 hover:bg-sky-700"
                          onClick={() =>
                            window.open(
                              publication.paperAttachment.url,
                              "_blank"
                            )
                          }
                        >
                          <Download size={16} />
                          Download Paper
                        </Button>
                        <p className="text-xs text-gray-400 text-center">
                          {publication.paperAttachment.name || "Paper document"}
                        </p>
                      </div>
                    )}

                    {publication.codeAttachment?.url && (
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() =>
                            window.open(
                              publication.codeAttachment.url,
                              "_blank"
                            )
                          }
                        >
                          <Code2 size={16} />
                          View Source Code
                        </Button>
                        <p className="text-xs text-gray-400 text-center">
                          {publication.codeAttachment.name || "Code files"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- IMAGES ---------- */}
            {publication.images?.length > 0 && (
              <div className="bg-gray-900/50 rounded-xl p-6 border border-sky-500/20">
                <p className="text-xl text-sky-300 mb-4 flex items-center gap-2">
                  <ImageIcon size={20} />
                  Figures & Images
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {publication.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img.url}
                        alt={`figure-${i + 1}`}
                        className="rounded-lg border border-sky-500/30 hover:scale-105 transition-transform duration-300 w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        }}
                      />
                      <div className="absolute inset-0 bg-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-xs text-white">View</div>
                      </div>
                      <div className="text-xs text-gray-400 truncate mt-2">
                        {img.name || `Figure ${i + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- GLOBAL ANIMATIONS ---------- */}
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

        .animate-gradient {
          animation: gradient 15s ease infinite;
        }

        .animate-shooting-star {
          animation: shooting-star 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default PublicationView;
