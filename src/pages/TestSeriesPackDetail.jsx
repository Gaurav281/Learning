import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { showError } from "../utils/toast";

const TestSeriesPackDetail = () => {
  const { packId } = useParams();
  const navigate = useNavigate();

  const [pack, setPack] = useState(null);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchPackDetails = async () => {
      try {
        const packRes = await api.get(`/resources/${packId}`);
        setPack(packRes.data);

        // Fetch tests under this pack
        const testsRes = await api.get(
          `/test-series/pack/${packId}`
        );
        setTests(testsRes.data);
      } catch (err) {
        showError("Failed to load test series pack");
      }
    };

    fetchPackDetails();
  }, [packId]);

  if (!pack) return null;

  return (
    <>
      <Navbar />

      <div className="container py-14">
        <h1 className="text-3xl font-semibold text-slate-900">
          {pack.title}
        </h1>

        <p className="mt-3 text-slate-600 max-w-2xl">
          {pack.description}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-slate-900">
          Available Tests
        </h2>

        <div className="mt-6 space-y-4">
          {tests.map((test) => (
            <div
              key={test._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  {test.title}
                </h3>
                <p className="text-sm text-slate-600">
                  Duration: {test.durationMinutes} minutes •
                  Marks: {test.totalMarks}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/test-series/${test._id}/instructions`)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>

        {tests.length === 0 && (
          <p className="mt-6 text-slate-500">
            No tests added to this pack yet.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TestSeriesPackDetail;
