import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const TestSeriesPacks = () => {
  const [packs, setPacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/resources").then((res) => {
      setPacks(res.data.filter(r => r.type === "test-series-pack"));
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Test Series Packs</h1>
        <button
          onClick={() => navigate("/admin/test-series/add-pack")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Pack
        </button>
      </div>

      <table className="w-full mt-6 border text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {packs.map(p => (
            <tr key={p._id} className="border-t">
              <td className="p-3">{p.title}</td>
              <td className="p-3 text-center">₹{p.price}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() =>
                    navigate(`/admin/test-series/pack/${p._id}`)
                  }
                  className="text-blue-600 underline"
                >
                  Manage Tests
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestSeriesPacks;
