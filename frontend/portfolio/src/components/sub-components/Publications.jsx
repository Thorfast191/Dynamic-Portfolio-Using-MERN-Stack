import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS
import { FileText, Download, ExternalLink, Loader, Code2 } from "lucide-react";

const Publications = () => {
  const [viewAll, setViewAll] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ADD THIS

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/publications/getall",
          { withCredentials: true }
        );
        setPublications(data.publications || []);
      } catch (error) {
        console.error("Failed to fetch publications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  // ADD THIS FUNCTION
  const handlePublicationClick = (id) => {
    navigate(`/publication/${id}`);
  };

  // ADD THIS FUNCTION
  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  /* -------------------- Loading -------------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader className="h-10 w-10 animate-spin text-sky-400" />
      </div>
    );
  }

  /* -------------------- Empty -------------------- */
  if (publications.length === 0) {
    return (
      <div className="text-center py-32">
        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-white">
          No Publications Found
        </h3>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
      {/* ---------- Title ---------- */}
      <div className="relative mb-14">
        <h1 className="flex justify-center text-[2.5rem] md:text-[3.5rem] font-tech-heading tracking-[0.25em] text-tubeLight-effect font-extrabold">
          PUBLICATIONS
        </h1>

        <div className="absolute -inset-6 rounded-2xl bg-gradient-to-r from-transparent via-sky-500/10 to-transparent animate-pulse" />
      </div>

      {/* ---------- Grid ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(viewAll ? publications : publications.slice(0, 9)).map((pub) => (
          <div
            key={pub._id}
            className="relative group cursor-pointer" // ADD cursor-pointer
            onClick={() => handlePublicationClick(pub._id)} // ADD click handler
          >
            {/* Glow */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-sky-500/0 via-sky-500/15 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

            <Card className="glass-space border border-sky-500/20 shadow-lg overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:border-sky-400/40 h-full relative">
              {/* Glowing corner effect (similar to Portfolio) */}
              <div className="absolute top-0 right-0 w-6 h-6">
                <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-sky-400/30 blur-sm" />
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-sky-400/20 blur-sm" />
              </div>

              {/* View overlay (similar to Portfolio) */}
              <div className="absolute inset-0 bg-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                <div className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg text-white font-tech-subheading animate-pulse">
                  VIEW PUBLICATION →
                </div>
              </div>

              {/* Header */}
              <div className="p-5 border-b border-sky-500/20 relative z-10">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-sky-400 mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-sky-300 transition-colors duration-300">
                    {pub.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {pub.platform && (
                    <Badge className="bg-sky-900/40 text-sky-300 border border-sky-500/30">
                      {pub.platform}
                    </Badge>
                  )}
                  {pub.status && (
                    <Badge
                      className={`px-3 py-1 rounded-full text-xs font-tech-mono ${
                        pub.status === "Published"
                          ? "bg-green-900/30 text-green-300 border border-green-500/30"
                          : pub.status === "Ongoing"
                          ? "bg-blue-900/30 text-blue-300 border border-blue-500/30"
                          : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                      }`}
                    >
                      {pub.status}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col h-full relative z-10">
                <p className="text-gray-300 text-sm line-clamp-3 mb-6">
                  {pub.description}
                </p>

                {/* Publication metadata */}
                <div className="mt-auto space-y-3">
                  {pub.paperId && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">ID:</span>
                      <span className="text-sky-300 font-tech-mono truncate">
                        {pub.paperId}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {/* View Paper */}
                    {pub.paperAttachment?.url && (
                      <Button
                        variant="outline"
                        className="flex-1 gap-2 bg-gray-800/50 border-sky-500/30 text-sky-300 hover:bg-sky-900/50 hover:text-white font-tech-subheading"
                        onClick={(e) =>
                          handleLinkClick(e, pub.paperAttachment.url)
                        }
                      >
                        <ExternalLink size={16} />
                        View
                      </Button>
                    )}

                    {/* Download */}
                    {pub.paperAttachment?.url && (
                      <Button
                        className="flex-1 gap-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 font-tech-subheading"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Create a temporary link to trigger download
                          const link = document.createElement("a");
                          link.href = pub.paperAttachment.url;
                          link.download =
                            pub.paperAttachment.name || "publication.pdf";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <Download size={16} />
                        Download
                      </Button>
                    )}

                    {/* Code */}
                    {pub.codeAttachment?.url && (
                      <Button
                        variant="ghost"
                        className="flex-1 gap-2 text-sky-300 hover:text-sky-200 font-tech-subheading"
                        onClick={(e) =>
                          handleLinkClick(e, pub.codeAttachment.url)
                        }
                      >
                        <Code2 size={16} />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-sky-500/30 transition-all duration-500" />
            </Card>
          </div>
        ))}
      </div>

      {/* ---------- Show More ---------- */}
      {publications.length > 9 && (
        <div className="text-center mt-14">
          <Button
            className="px-10 py-6 text-lg font-tech-heading bg-sky-600 hover:bg-sky-700 tracking-widest"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "SHOW LESS" : "VIEW ALL PUBLICATIONS"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Publications;
