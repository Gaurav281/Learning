import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const EditResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPercent: 0,
    previewImage: "",
    driveFileId: "",
    type: "pdf",
  });

  useEffect(() => {
    api.get(`/resources/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/resource/${id}`, form);
      showSuccess("Resource updated successfully");
      navigate("/admin/resources");
    } catch (err) {
      showError("Failed to update resource");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Edit Resource</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mt-6 space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Title"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Description"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Price"
        />

        <input
          name="discountPercent"
          value={form.discountPercent}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Discount %"
        />

        <input
          name="previewImage"
          value={form.previewImage}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Preview Image URL"
        />

        <input
          name="driveFileId"
          value={form.driveFileId}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Google Drive File ID"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="pdf">PDF</option>
          <option value="test-series">Test Series</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Resource
        </button>
      </form>
    </div>
  );
};

export default EditResource;
