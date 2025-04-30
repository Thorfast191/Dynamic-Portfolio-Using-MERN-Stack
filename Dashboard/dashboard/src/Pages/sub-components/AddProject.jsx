import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewProject } from "@/store/slices/projectSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    role: "",
    collaborators: [],
    tags: [],
    location: "",
    audience: "",
    impact: "",
    projectBanner: null,
  });
  const [collaboratorInput, setCollaboratorInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, projectBanner: file });
  };

  const handleAddCollaborator = () => {
    if (collaboratorInput.trim()) {
      setFormData({
        ...formData,
        collaborators: [...formData.collaborators, collaboratorInput.trim()],
      });
      setCollaboratorInput("");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "collaborators" || key === "tags") {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === "startDate" || key === "endDate") {
        data.append(key, new Date(formData[key]).toISOString());
      } else if (key === "projectBanner" && formData[key]) {
        data.append("projectBanner", formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    dispatch(addNewProject(data));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message]);

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleSubmit} className="w-[100%] px-5 md:w-[1000px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">
              ADD NEW PROJECT
            </h2>

            <div className="mt-10 flex flex-col gap-5">
              {/* Project Banner */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">
                  Project Banner
                </label>
                <Input type="file" onChange={handleFileUpload} />
              </div>

              {/* Title */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              {/* Type */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">
                  Project Type
                </label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date
                  </label>
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
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Collaborators */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">
                  Collaborators
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={collaboratorInput}
                    onChange={(e) => setCollaboratorInput(e.target.value)}
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
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                {loading ? (
                  <SpecialLoadingButton content="Adding Project..." />
                ) : (
                  <Button type="submit">Add Project</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
