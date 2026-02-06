import { useNavigate } from "react-router-dom";

const TestCard = ({ test }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-slate-800">
          {test.title}
        </h3>

        <p className="text-sm text-slate-600">
          Duration: {test.durationMinutes} min •
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
  );
};

export default TestCard;
