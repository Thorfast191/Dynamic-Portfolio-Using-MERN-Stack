import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getAllProjects } from "@/store/slices/projectSlice";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, message, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "project/resetProjectSlice" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "project/clearAllProjectErrors" });
    }
  }, [message, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id))
        .then((action) => {
          if (!action.error) {
            toast.success("Project deleted successfully");
            dispatch(getAllProjects());
          }
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete project");
        });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link to="/add-project">
          <Button onClick={() => navigate("/add-project")}>
            Add New Project
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.type}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>
                {new Date(project.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="space-x-2">
                <Link to={`/project/${project._id}`}>
                  <Button variant="outline">View</Button>
                </Link>

                <Link to={`/update/project/${project._id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProjects;
