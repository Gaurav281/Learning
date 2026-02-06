import { useState } from "react";
import api from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const AddTestSeriesPack = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPercent: "",
    previewImage: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/test-series-pack", {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        discountPercent: Number(form.discountPercent || 0),
        previewImage: form.previewImage,
        type: "test-series-pack",
      });

      showSuccess("Test series pack created successfully");
    } catch (err) {
      console.error(err);
      showError(
        err.response?.data?.message ||
          "Failed to create test series pack"
      );
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Add Test Series Pack</h1>

      <form onSubmit={submit} className="max-w-lg mt-6 space-y-4">
        <input name="title" onChange={handleChange} className="w-full border p-2" placeholder="Title" required />
        <textarea name="description" onChange={handleChange} className="w-full border p-2" placeholder="Description" required />
        <input name="price" onChange={handleChange} className="w-full border p-2" placeholder="Price" required />
        <input name="discountPercent" onChange={handleChange} className="w-full border p-2" placeholder="Discount %" />
        <input name="previewImage" onChange={handleChange} className="w-full border p-2" placeholder="Image URL" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Pack
        </button>
      </form>
    </div>
  );
};

export default AddTestSeriesPack;
