import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const PackTests = () => {
  const { packId } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    api.get(`/test-series/pack/${packId}`).then(res => setTests(res.data));
  }, [packId]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Tests</h1>
        <button
          onClick={() =>
            navigate(`/admin/test-series/pack/${packId}/add-test`)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Test
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {tests.map(t => (
          <li key={t._id} className="border p-4 flex justify-between">
            <span>{t.title}</span>
            <button
              onClick={() =>
                navigate(`/admin/test-series/test/${t._id}/questions`)
              }
              className="text-blue-600 underline"
            >
              Manage Questions
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackTests;
