import { useState } from "react";
import api from "../../services/api";

const AddResource = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    previewImage: "",
    driveFileId: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/admin/resource", form);
    alert("Resource added");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">
        Add Resource
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg mt-6 space-y-4">
        <input name="title" onChange={handleChange} placeholder="Title" className="w-full border p-2" />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full border p-2" />
        <input name="price" onChange={handleChange} placeholder="Price" className="w-full border p-2" />
        <input
          name="discountPercent"
          onChange={handleChange}
          placeholder="Discount % (optional)"
          className="w-full border p-2"
        />

        <input name="previewImage" onChange={handleChange} placeholder="Preview Image URL" className="w-full border p-2" />
        <input name="driveFileId" onChange={handleChange} placeholder="Google Drive File ID" className="w-full border p-2" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Resource
        </button>
      </form>
    </div>
  );
};

export default AddResource;
