import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResearch, deleteResearch } from "@/store/slices/researchSlice";
import { Button } from "@/components/ui/button";

const ManageResearch = () => {
  const dispatch = useDispatch();
  const { research } = useSelector((state) => state.research);

  useEffect(() => {
    dispatch(getAllResearch());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Manage Research</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {research.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{r.title}</td>
              <td className="border p-2">{r.status}</td>
              <td className="border p-2">
                <Button
                  variant="destructive"
                  onClick={() => dispatch(deleteResearch(r._id))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageResearch;
