import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResearch, clearErrors, reset } from "@/store/slices/researchSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const AddResearch = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [paper, setPaper] = useState(null);
  const [code, setCode] = useState(null);
  const [images, setImages] = useState([]);

  const { loading, error, message } = useSelector((state) => state.research);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("status", status);
    if (paper) fd.append("paper", paper);
    if (code) fd.append("code", code);
    images.forEach((img) => fd.append("images", img));
    dispatch(addResearch(fd));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(reset());
    }
  }, [dispatch, error, message]);

  return (
    <form onSubmit={submitHandler} className="max-w-3xl mx-auto space-y-5">
      <h2 className="text-3xl font-bold">Add Research</h2>

      <input
        className="w-full border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full border p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Published</option>
        <option>Ongoing</option>
        <option>Hold</option>
        <option>Cancel</option>
      </select>

      <input type="file" onChange={(e) => setPaper(e.target.files[0])} />
      <input type="file" onChange={(e) => setCode(e.target.files[0])} />
      <input
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
      />

      {loading ? (
        <SpecialLoadingButton content="Adding Research" />
      ) : (
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add Research
        </button>
      )}
    </form>
  );
};

export default AddResearch;
