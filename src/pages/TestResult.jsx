import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { showError } from "../utils/toast";

const TestResult = () => {
  const { testId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(
          `/test-series/test/${testId}/result`
        );
        setResult(res.data);
      } catch (err) {
        showError("Failed to load result");
      }
    };

    fetchResult();
  }, [testId]);

  if (!result) return null;

  return (
    <>
      <Navbar />

      <div className="container py-14 max-w-3xl">
        <h1 className="text-2xl font-semibold">
          Test Result
        </h1>

        <div className="mt-6 border rounded-xl p-6">
          <p>
            <strong>Score:</strong> {result.score}
          </p>
          <p className="mt-2">
            <strong>Total Marks:</strong> {result.totalMarks}
          </p>
          <p className="mt-2">
            <strong>Percentage:</strong>{" "}
            {result.percentage.toFixed(2)}%
          </p>
        </div>

        <h2 className="mt-10 font-semibold">
          Question Analysis
        </h2>

        <div className="mt-4 space-y-4">
          {result.analysis.map((q, i) => (
            <div
              key={q.questionId}
              className="border rounded-lg p-4"
            >
              <p className="font-medium">
                Q{i + 1}. {q.questionText}
              </p>

              <p className="mt-2 text-sm">
                Your Answer:{" "}
                <strong>{q.selectedOption || "Not Answered"}</strong>
              </p>

              <p className="text-sm">
                Correct Answer:{" "}
                <strong>{q.correctOption}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TestResult;
