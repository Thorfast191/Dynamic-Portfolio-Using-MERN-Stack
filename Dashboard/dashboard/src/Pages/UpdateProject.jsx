import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getSingleProject, updateProject } from "@/store/slices/projectSlice";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleProject, loading, error } = useSelector(
    (state) => state.project
  );
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    collaborators: [],
    tags: [],
    location: "",
    audience: "",
    impact: "",
  });
  const [newCollaborator, setNewCollaborator] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (singleProject) {
      setFormData({
        title: singleProject.title || "",
        type: singleProject.type || "",
        description: singleProject.description || "",
        startDate: singleProject.startDate?.split("T")[0] || "",
        endDate: singleProject.endDate?.split("T")[0] || "",
        status: singleProject.status || "",
        collaborators: singleProject.collaborators || [],
        tags: singleProject.tags || [],
        location: singleProject.location || "",
        audience: singleProject.audience || "",
        impact: singleProject.impact || "",
      });
    }
  }, [singleProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "collaborators" || key === "tags") {
        updatedData.append(key, JSON.stringify(formData[key]));
      } else {
        updatedData.append(key, formData[key]);
      }
    });

    // Dispatch with proper arguments
    dispatch(updateProject(id, updatedData))
      .then(() => {
        toast.success("Project updated successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update project");
      });
  };

  const handleAddCollaborator = () => {
    if (newCollaborator.trim()) {
      setFormData({
        ...formData,
        collaborators: [...formData.collaborators, newCollaborator.trim()],
      });
      setNewCollaborator("");
    }
  };

  if (loading) return <div className="text-center p-8">Loading Project...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <Button onClick={() => navigate(-1)} className="mb-6">
        Back to Projects
      </Button>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Edit Project</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Project Type */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Project Type</label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Theatrical Production",
                "Research",
                "Workshop",
                "Community Project",
                "Publication",
              ].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Start Date</label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">End Date</label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Collaborators */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Collaborators</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
              placeholder="Add collaborator"
            />
            <Button type="button" onClick={handleAddCollaborator}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.collaborators.map((collab, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                {collab}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProject;
