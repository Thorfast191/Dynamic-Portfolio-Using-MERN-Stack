import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePublication,
  updatePublication,
  clearAllPublicationErrors,
} from "@/store/slices/publicationSlice";
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
import { Trash2 } from "lucide-react";
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
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (id) dispatch(getSinglePublication(id));
  }, [id, dispatch]);

  // ---------------- HANDLE ERROR ----------------
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllPublicationErrors());
    }
  }, [error, dispatch]);

  // ---------------- HYDRATE FORM ----------------
  useEffect(() => {
    if (singlePublication?._id === id) {
      setFormData({
        title: singlePublication.title || "",
        description: singlePublication.description || "",
        paperId: singlePublication.paperId || "",
        platform: singlePublication.platform || "",
        program: singlePublication.program || "",
        status: singlePublication.status || "Ongoing",
      });

      setExistingImages(singlePublication.images || []);
    }
  }, [singlePublication, id]);

  // ---------------- INPUT HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value === "none" ? "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("Title and Description are required");
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, value));

    if (paperAttachment) fd.append("publication", paperAttachment);
    if (codeAttachment) fd.append("codeAttachment", codeAttachment);
    newImages.forEach((img) => fd.append("images", img));

    try {
      await dispatch(updatePublication(id, fd));
      toast.success("Publication updated successfully");
      navigate("/manage/publications");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // ---------------- LOADING GUARD ----------------
  if (loading && !singlePublication?._id) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!singlePublication?._id && !loading) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold">Publication not found</h2>
        <Button
          className="mt-4"
          onClick={() => navigate("/manage/publications")}
        >
          Go Back
        </Button>
      </div>
    );
  }

  // ---------------- RENDER ----------------
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Update Publication</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Title *</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Paper ID</Label>
              <Input
                name="paperId"
                value={formData.paperId}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Platform</Label>
                <Select
                  value={formData.platform || "none"}
                  onValueChange={(v) => handleSelect("platform", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      Select Platform
                    </SelectItem>
                    <SelectItem value="IEEE">IEEE</SelectItem>
                    <SelectItem value="Springer">Springer</SelectItem>
                    <SelectItem value="Elsevier">Elsevier</SelectItem>
                    <SelectItem value="ACM">ACM</SelectItem>
                    <SelectItem value="ArXiv">ArXiv</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => handleSelect("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Hold">Hold</SelectItem>
                    <SelectItem value="Cancel">Cancel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div>
              <Label>Replace Paper</Label>
              <Input
                type="file"
                onChange={(e) => setPaperAttachment(e.target.files[0])}
              />
            </div>

            <div>
              <Label>Replace Code</Label>
              <Input
                type="file"
                onChange={(e) => setCodeAttachment(e.target.files[0])}
              />
            </div>

            <div>
              <Label>Add Images</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setNewImages([...e.target.files])}
              />
            </div>

            {existingImages.length > 0 && (
              <div>
                <Label>Existing Images</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img.url}
                        className="h-32 w-full object-cover rounded"
                      />
                      <Trash2 className="absolute top-2 right-2 text-red-600" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate("/manage/publications")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Publication"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePublication;
