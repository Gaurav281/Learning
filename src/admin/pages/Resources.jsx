import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  const fetchResources = async () => {
    const res = await api.get("/resources");
    setResources(res.data);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">
        Resources
      </h1>

      <table className="w-full mt-6 border text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Type</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">{r.title}</td>
              <td className="p-3 text-center">₹{r.price}</td>
              <td className="p-3 text-center">
                {r.discountPercent || 0}%
              </td>
              <td className="p-3 text-center">{r.type}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-resource/${r._id}`)
                  }
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
