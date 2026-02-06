import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { showSuccess } from "../../utils/toast";

const AddTest = () => {
  const { packId } = useParams();
  const [form, setForm] = useState({
    title: "",
    durationMinutes: "",
    totalMarks: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/admin/test-series/test", {
      ...form,
      pack: packId,
    });
    showSuccess("Test created");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Add Test</h1>

      <form onSubmit={submit} className="max-w-lg mt-6 space-y-4">
        <input name="title" onChange={handleChange} className="w-full border p-2" placeholder="Test Title" />
        <input name="durationMinutes" onChange={handleChange} className="w-full border p-2" placeholder="Duration (minutes)" />
        <input name="totalMarks" onChange={handleChange} className="w-full border p-2" placeholder="Total Marks" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Test
        </button>
      </form>
    </div>
  );
};

export default AddTest;
