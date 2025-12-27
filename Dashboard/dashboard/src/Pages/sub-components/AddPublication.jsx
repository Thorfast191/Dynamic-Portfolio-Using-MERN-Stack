import {
  addNewPublication,
  clearAllPublicationErrors,
  getAllPublications,
  resetPublicationSlice,
} from "@/store/slices/publicationSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";

const AddPublication = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    paperId: "",
    platform: "",
    program: "",
    status: "Ongoing",
  });

  const [paperAttachment, setPaperAttachment] = useState(null);
  const [codeAttachment, setCodeAttachment] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [paperPreview, setPaperPreview] = useState(null);
  const [codePreview, setCodePreview] = useState(null);

  const { loading, message, error } = useSelector((state) => state.publication);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaperAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaperAttachment(file);
      // Create preview for document
      const reader = new FileReader();
      reader.onload = () => {
        setPaperPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCodeAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCodeAttachment(file);
      // For code files
      setCodePreview(URL.createObjectURL(file));
    }
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...images, ...files];
      setImages(newImages);

      // Create previews for images
      const previews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setImagePreviews((prev) => [...prev, ...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleAddNewPublication = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("Title and Description are required");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("paperId", formData.paperId || "");
      formDataToSend.append("platform", formData.platform || "");
      formDataToSend.append("program", formData.program || "");
      formDataToSend.append("status", formData.status || "Ongoing");

      // Add paper attachment (as 'publication' field for backend)
      if (paperAttachment) {
        formDataToSend.append("publication", paperAttachment);
      }

      // Add code attachment (if you've updated multer config)
      if (codeAttachment) {
        formDataToSend.append("codeAttachment", codeAttachment);
      }

      // Add images (if you've updated multer config)
      if (images && images.length > 0) {
        images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }

      await dispatch(addNewPublication(formDataToSend));
    } catch (error) {
      // Error is already handled by Redux slice
      console.error("Publication add error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      paperId: "",
      platform: "",
      program: "",
      status: "Ongoing",
    });
    setPaperAttachment(null);
    setCodeAttachment(null);
    setImages([]);
    setImagePreviews([]);
    setPaperPreview(null);
    setCodePreview(null);

    // Reset file inputs
    document.querySelectorAll('input[type="file"]').forEach((input) => {
      input.value = "";
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllPublicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetPublicationSlice());
      dispatch(getAllPublications());
      resetForm();
    }
  }, [error, message, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14 p-4">
      <form
        onSubmit={handleAddNewPublication}
        className="w-full max-w-4xl space-y-8"
      >
        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
            ADD A NEW PUBLICATION
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Paper ID */}
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Paper ID (DOI/ISBN)
              </label>
              <input
                type="text"
                name="paperId"
                value={formData.paperId}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="e.g., DOI:10.1234/abc"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select Platform</option>
                <option value="IEEE">IEEE</option>
                <option value="Springer">Springer</option>
                <option value="Elsevier">Elsevier</option>
                <option value="ACM">ACM</option>
                <option value="ArXiv">ArXiv</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Program */}
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Program
              </label>
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="e.g., Computer Science"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Published">Published</option>
                <option value="Hold">Hold</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>

            {/* Paper Attachment */}
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Paper Attachment (PDF/DOC) *
              </label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="file"
                  name="publication"
                  accept=".pdf,.doc,.docx"
                  onChange={handlePaperAttachment}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  required
                />
                {paperPreview && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {paperAttachment?.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPaperAttachment(null);
                        setPaperPreview(null);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Required: Upload your research paper/document
              </p>
            </div>

            {/* Code Attachment (Optional) */}
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Code Attachment (Optional)
              </label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="file"
                  name="codeAttachment"
                  accept=".py,.js,.java,.cpp,.c,.ipynb,.txt,.zip,.rar,.7z"
                  onChange={handleCodeAttachment}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                {codePreview && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {codeAttachment?.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCodeAttachment(null);
                        setCodePreview(null);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Optional: Upload source code files
              </p>
            </div>

            {/* Images (Optional) */}
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Images (Optional)
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImages}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                        <div className="text-xs text-gray-500 truncate mt-1">
                          {images[index]?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {images.length > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    {images.length} image(s) selected
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Optional: Upload screenshots, diagrams, or related images
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={loading}
          >
            Reset Form
          </Button>

          {!loading ? (
            <Button type="submit" className="px-8" disabled={!paperAttachment}>
              Add Publication
            </Button>
          ) : (
            <SpecialLoadingButton content={"Adding Publication..."} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPublication;
