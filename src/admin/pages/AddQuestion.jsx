import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { showSuccess } from "../../utils/toast";

const AddQuestion = () => {
  const { testId } = useParams();
  const [q, setQ] = useState({
    questionText: "",
    A: "",
    B: "",
    C: "",
    D: "",
    correctOption: "A",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/admin/test-series/question", {
      test: testId,
      questionText: q.questionText,
      options: { A: q.A, B: q.B, C: q.C, D: q.D },
      correctOption: q.correctOption,
    });
    showSuccess("Question added");
  };

  return (
    <form onSubmit={submit} className="max-w-xl space-y-3">
      <textarea placeholder="Question" className="w-full border p-2" onChange={e => setQ({...q, questionText: e.target.value})}/>
      {["A","B","C","D"].map(o => (
        <input key={o} placeholder={`Option ${o}`} className="w-full border p-2"
          onChange={e => setQ({...q, [o]: e.target.value})}/>
      ))}
      <select className="border p-2" onChange={e => setQ({...q, correctOption: e.target.value})}>
        {["A","B","C","D"].map(o => <option key={o}>{o}</option>)}
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </form>
  );
};

export default AddQuestion;
