import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePublication,
  updatePublication,
} from "../store/slices/publicationSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const UpdatePublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singlePublication, loading } = useSelector(
    (state) => state.publication
  );
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getSinglePublication(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (singlePublication) {
      setFormData({
        title: singlePublication.title,
        description: singlePublication.description,
      });
    }
  }, [singlePublication]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (file) data.append("publication", file);

    dispatch(updatePublication({ id, formData: data })).then(() => {
      navigate("/publications");
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Publication</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Publication"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePublication;
