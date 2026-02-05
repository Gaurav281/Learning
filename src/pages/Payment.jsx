import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { showSuccess, showError } from "../utils/toast";

const UPI_ID = "yourupi@bank";
const PAYEE_NAME = "GatePrepPro";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/resources/${id}`).then((res) => setResource(res.data));
  }, [id]);

  if (!resource) return null;

  const amount = resource.finalPrice ?? resource.price;

  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${amount}&cu=INR`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    upiUrl
  )}`;

  const submitPayment = async () => {
    if (!screenshot) {
      showError("Please upload payment screenshot");
      return;
    }

    const formData = new FormData();
    formData.append("resourceId", resource._id);
    formData.append("screenshot", screenshot);

    try {
      setLoading(true);

      await api.post("/purchase/website", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showSuccess("Payment submitted successfully");
      navigate("/payment-submitted");
    } catch (err) {
      showError(
        err.response?.data?.message || "Payment submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-14 max-w-xl">
        <h1 className="text-2xl font-semibold">Complete Payment</h1>

        <p className="mt-2 text-slate-600">
          Amount to pay: <strong>₹{amount}</strong>
        </p>

        <img
          src={qrUrl}
          className="w-64 mx-auto my-6 border rounded-lg"
          alt="UPI QR"
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 mt-4"
          onChange={(e) => setScreenshot(e.target.files[0])}
        />

        <button
          disabled={loading}
          onClick={submitPayment}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Payment"}
        </button>

        <p className="text-xs text-slate-500 mt-3">
          Upload payment screenshot only. Access will be granted after
          verification.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
