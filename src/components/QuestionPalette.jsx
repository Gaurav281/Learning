const QuestionPalette = ({
  questions,
  currentIndex,
  answers,
  onSelect,
}) => {
  return (
    <div className="border rounded-xl p-4">
      <h4 className="font-semibold text-sm mb-3">
        Question Palette
      </h4>

      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, i) => {
          const answered = answers[q._id];
          const active = i === currentIndex;

          return (
            <button
              key={q._id}
              onClick={() => onSelect(i)}
              className={`p-2 text-sm rounded border ${
                answered
                  ? "bg-green-500 text-white"
                  : active
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPalette;
