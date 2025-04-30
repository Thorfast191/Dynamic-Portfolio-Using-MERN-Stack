import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePublication } from "@/store/slices/publicationSlice";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ViewPublication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singlePublication, loading, error } = useSelector(
    (state) => state.publication
  );
  const [fileType, setFileType] = useState("");
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    if (!id) {
      toast.error("Invalid publication ID");
      navigate("/");
      return;
    }
    dispatch(getSinglePublication(id));
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (singlePublication?.publication?.url) {
      const url = singlePublication.publication.url;
      const extension = url.split(".").pop().split(/[#?]/)[0].toLowerCase();
      setFileType(extension);

      // Load text content for txt files
      if (extension === "txt") {
        fetch(url)
          .then((response) => response.text())
          .then((text) => setTextContent(text))
          .catch((error) => console.error("Error loading text file:", error));
      }
    }
  }, [singlePublication]);

  const renderFileContent = () => {
    if (!singlePublication?.publication?.url) return null;

    switch (fileType) {
      case "pdf":
        return (
          <iframe
            src={singlePublication.publication.url}
            className="w-full h-screen"
            title="PDF Viewer"
          />
        );
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return (
          <img
            src={singlePublication.publication.url}
            alt={singlePublication.title}
            className="max-w-full h-auto"
          />
        );
      case "txt":
        return (
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md">
            {textContent}
          </pre>
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="mb-4">Preview not available for this file type</p>
            <Button asChild>
              <a
                href={singlePublication.publication.url}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download File
              </a>
            </Button>
          </div>
        );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading publication: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      {singlePublication && (
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold">{singlePublication.title}</h1>
            <p className="text-gray-600 mt-2">
              {singlePublication.description}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            {renderFileContent()}
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <a
                href={singlePublication.publication.url}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Document
              </a>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPublication;
