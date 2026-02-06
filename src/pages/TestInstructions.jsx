import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { showError } from "../utils/toast";

const TestInstructions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.get(`/test-series/test/${testId}`);
        setTest(res.data);
      } catch (err) {
        showError("Failed to load test instructions");
      }
    };

    fetchTest();
  }, [testId]);

  if (!test) return null;

  return (
    <>
      <Navbar />

      <div className="container py-14 max-w-3xl">
        <h1 className="text-2xl font-semibold text-slate-900">
          Instructions – {test.title}
        </h1>

        <div className="mt-6 border rounded-xl p-6 space-y-4 text-slate-700">
          <p>
            <strong>Duration:</strong> {test.durationMinutes} minutes
          </p>
          <p>
            <strong>Total Marks:</strong> {test.totalMarks}
          </p>

          <hr />

          <ul className="list-disc pl-6 space-y-2">
            <li>The test consists of multiple choice questions (MCQs).</li>
            <li>Each question has only one correct answer.</li>
            <li>
              Correct answer carries <strong>+1 mark</strong>.
            </li>
            <li>
              Wrong answer carries <strong>negative marking</strong>.
            </li>
            <li>No marks are deducted for unanswered questions.</li>
            <li>The test will auto-submit when time expires.</li>
            <li>Do not refresh or close the browser during the test.</li>
          </ul>
        </div>

        <button
          onClick={() =>
            navigate(`/test-series/${testId}/attempt`)
          }
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Start Test
        </button>
      </div>

      <Footer />
    </>
  );
};

export default TestInstructions;
