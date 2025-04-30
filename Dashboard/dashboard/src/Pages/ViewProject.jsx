import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { getSingleProject } from "@/store/slices/projectSlice";

const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleProject, loading, error } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/projects");
    }
  }, [error, navigate]);

  if (loading) return <div className="text-center p-8">Loading Project...</div>;

  return (
    <div className="container mx-auto p-6">
      <Button onClick={() => navigate(-1)} className="mb-6">
        Back to Projects
      </Button>

      {singleProject && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">{singleProject.title}</h1>
          <img
            src={singleProject.projectBanner?.url}
            alt="Project Banner"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Project Details</h2>
                <p>
                  <strong>Type:</strong> {singleProject.type}
                </p>
                <p>
                  <strong>Status:</strong> {singleProject.status}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(singleProject.startDate).toLocaleDateString()}
                </p>
                {singleProject.endDate && (
                  <p>
                    <strong>End Date:</strong>{" "}
                    {new Date(singleProject.endDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="whitespace-pre-wrap">
                  {singleProject.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {singleProject.collaborators?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Collaborators</h2>
                  <ul className="list-disc pl-6">
                    {singleProject.collaborators.map((collab, index) => (
                      <li key={index}>{collab}</li>
                    ))}
                  </ul>
                </div>
              )}

              {singleProject.impact && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Impact</h2>
                  <p>{singleProject.impact}</p>
                </div>
              )}

              {singleProject.location && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Location</h2>
                  <p>{singleProject.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProject;
