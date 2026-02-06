import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { showError, showInfo } from "../utils/toast";

const TestAttempt = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  /* Fetch test questions */
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.get(
          `/test-series/test/${testId}/questions`
        );
        setQuestions(res.data.questions);
        setTimeLeft(res.data.durationMinutes * 60);
      } catch (err) {
        showError("Failed to load test");
      }
    };

    fetchTest();
  }, [testId]);

  /* Timer */
  useEffect(() => {
    if (timeLeft <= 0) {
      showInfo("Time over. Submitting test...");
      submitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const question = questions[current];

  const selectOption = (opt) => {
    setAnswers({ ...answers, [question._id]: opt });
  };

  const clearResponse = () => {
    const copy = { ...answers };
    delete copy[question._id];
    setAnswers(copy);
  };

  const submitTest = async () => {
    try {
      await api.post(`/test-series/test/${testId}/submit`, {
        answers,
      });
      navigate(`/test-series/${testId}/result`);
    } catch (err) {
      showError("Failed to submit test");
    }
  };

  if (!question) return null;

  return (
    <>
      <Navbar />

      <div className="container py-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="font-semibold">Test Attempt</h2>
          <span className="text-red-600 font-mono">
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-6">
          {/* Question */}
          <div className="md:col-span-3 border rounded-xl p-6">
            <h3 className="font-semibold">
              Question {current + 1}
            </h3>

            <p className="mt-4 text-slate-700">
              {question.questionText}
            </p>

            <div className="mt-6 space-y-3">
              {["A", "B", "C", "D"].map((opt) => (
                <label
                  key={opt}
                  className={`flex gap-3 p-3 border rounded cursor-pointer ${
                    answers[question._id] === opt
                      ? "border-blue-600 bg-blue-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    checked={answers[question._id] === opt}
                    onChange={() => selectOption(opt)}
                  />
                  <span>
                    <strong>({opt})</strong>{" "}
                    {question.options[opt]}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={clearResponse}
                className="text-sm underline"
              >
                Clear Response
              </button>

              <div className="space-x-3">
                <button
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => c - 1)}
                  className="border px-4 py-2 rounded"
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setCurrent((c) =>
                      Math.min(c + 1, questions.length - 1)
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save & Next
                </button>
              </div>
            </div>
          </div>

          {/* Palette */}
          <div className="border rounded-xl p-4">
            <h4 className="font-semibold text-sm mb-3">
              Question Palette
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button
                  key={q._id}
                  onClick={() => setCurrent(i)}
                  className={`p-2 text-sm rounded border ${
                    answers[q._id]
                      ? "bg-green-500 text-white"
                      : i === current
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={submitTest}
              className="w-full mt-6 bg-red-600 text-white py-2 rounded"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestAttempt;
