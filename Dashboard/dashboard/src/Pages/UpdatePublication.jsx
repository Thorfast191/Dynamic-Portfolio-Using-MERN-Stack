import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePublication,
  updatePublication,
  clearAllPublicationErrors,
} from "../store/slices/publicationSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const UpdatePublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singlePublication, loading, error } = useSelector(
    (state) => state.publication
  );

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
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [paperPreview, setPaperPreview] = useState(null);
  const [codePreview, setCodePreview] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePublication(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllPublicationErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (singlePublication && singlePublication._id === id) {
      console.log("Setting publication data:", singlePublication);

      setFormData({
        title: singlePublication.title || "",
        description: singlePublication.description || "",
        paperId: singlePublication.paperId || "",
        platform: singlePublication.platform || "",
        program: singlePublication.program || "",
        status: singlePublication.status || "Ongoing",
      });

      // Set existing images
      if (singlePublication.images && singlePublication.images.length > 0) {
        setExistingImages(singlePublication.images);
      }

      // Set previews for existing attachments
      if (singlePublication.paperAttachment?.url) {
        setPaperPreview(singlePublication.paperAttachment.url);
      }
      if (singlePublication.codeAttachment?.url) {
        setCodePreview(singlePublication.codeAttachment.url);
      }
    }
  }, [singlePublication, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaperAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaperAttachment(file);
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
      setCodePreview(URL.createObjectURL(file));
    }
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...images, ...files];
      setImages(newImages);
    }
  };

  const removeNewImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeExistingImage = (index) => {
    const imageToRemove = existingImages[index];
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setRemovedImages((prev) => [...prev, imageToRemove.public_id]);
  };

  const handleSubmit = async (e) => {
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

      // Add paper attachment if new one selected
      if (paperAttachment) {
        formDataToSend.append("publication", paperAttachment);
      }

      // Add code attachment if new one selected
      if (codeAttachment) {
        formDataToSend.append("codeAttachment", codeAttachment);
      }

      // Add new images
      if (images && images.length > 0) {
        images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }

      // Note: In your backend, you'll need to handle removed images
      // You might want to send removed image IDs as well

      await dispatch(updatePublication(id, formDataToSend));
      toast.success("Publication updated successfully!");
      navigate("/manage/publications");
    } catch (error) {
      toast.error(error.message || "Failed to update publication");
    }
  };

  if (loading && !singlePublication) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-500">Loading publication...</p>
        </div>
      </div>
    );
  }

  if (!singlePublication && !loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Publication not found
        </h1>
        <Button
          onClick={() => navigate("/manage/publications")}
          className="mt-4"
        >
          Back to Publications
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Update Publication</CardTitle>
          <p className="text-gray-500">Edit the publication details below</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter publication title"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter detailed description"
                rows={4}
                required
              />
            </div>

            {/* Paper ID */}
            <div className="space-y-2">
              <Label htmlFor="paperId">Paper ID (DOI/ISBN)</Label>
              <Input
                id="paperId"
                name="paperId"
                value={formData.paperId}
                onChange={handleInputChange}
                placeholder="e.g., DOI:10.1234/abc"
              />
            </div>

            {/* Platform and Program */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) =>
                    handleSelectChange("platform", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Select Platform</SelectItem>
                    <SelectItem value="IEEE">IEEE</SelectItem>
                    <SelectItem value="Springer">Springer</SelectItem>
                    <SelectItem value="Elsevier">Elsevier</SelectItem>
                    <SelectItem value="ACM">ACM</SelectItem>
                    <SelectItem value="ArXiv">ArXiv</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Hold">Hold</SelectItem>
                  <SelectItem value="Cancel">Cancel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Paper Attachment */}
            <div className="space-y-3">
              <Label htmlFor="paperAttachment">
                Paper Attachment (PDF/DOC)
              </Label>
              <div className="flex flex-col gap-4">
                {/* Current attachment preview */}
                {(paperPreview ||
                  singlePublication.paperAttachment?.url ||
                  singlePublication.publicationFile?.url) && (
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="bg-blue-100 p-2 rounded">
                      <Upload className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Current Paper:{" "}
                        {singlePublication.paperAttachment?.name ||
                          singlePublication.publicationFile?.name ||
                          "Paper Attachment"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {paperPreview
                          ? "New file selected"
                          : "Existing attachment"}
                      </p>
                    </div>
                    {paperPreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setPaperAttachment(null);
                          setPaperPreview(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}

                {/* File input */}
                <div className="space-y-2">
                  <Input
                    id="paperAttachment"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handlePaperAttachment}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500">
                    {paperAttachment
                      ? `Selected: ${paperAttachment.name}`
                      : "Choose a new paper file or keep the existing one"}
                  </p>
                </div>
              </div>
            </div>

            {/* Code Attachment */}
            <div className="space-y-3">
              <Label htmlFor="codeAttachment">Code Attachment (Optional)</Label>
              <div className="flex flex-col gap-4">
                {/* Current attachment preview */}
                {(codePreview || singlePublication.codeAttachment?.url) && (
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="bg-green-100 p-2 rounded">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Current Code:{" "}
                        {singlePublication.codeAttachment?.name ||
                          "Code Attachment"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {codePreview
                          ? "New file selected"
                          : "Existing attachment"}
                      </p>
                    </div>
                    {codePreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCodeAttachment(null);
                          setCodePreview(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}

                {/* File input */}
                <div className="space-y-2">
                  <Input
                    id="codeAttachment"
                    type="file"
                    accept=".py,.js,.java,.cpp,.c,.ipynb,.txt,.zip,.rar,.7z"
                    onChange={handleCodeAttachment}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500">
                    {codeAttachment
                      ? `Selected: ${codeAttachment.name}`
                      : "Choose a new code file or keep the existing one"}
                  </p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-3">
              <Label>Images (Optional)</Label>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h4 className="font-medium">Existing Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {existingImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          alt={`Existing image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x200?text=Image+Not+Found";
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeExistingImage(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <div className="text-xs text-gray-500 truncate mt-1">
                          {img.name || `Image ${index + 1}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {images.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h4 className="font-medium">New Images to Add</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`New image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => removeNewImage(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <div className="text-xs text-gray-500 truncate mt-1">
                          {img.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add more images */}
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImages}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500">
                  Add more images (screenshots, diagrams, etc.)
                </p>
              </div>
            </div>

            <Separator />

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/manage/publications")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  "Update Publication"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePublication;
