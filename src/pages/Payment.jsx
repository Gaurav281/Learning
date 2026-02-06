import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { showSuccess, showError } from "../utils/toast";

const UPI_ID = "gauravkhatri281-1@okhdfcbank";
const PAYEE_NAME = "Gaurav Khatri";
const PAYMENT_TIME = 300;

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PAYMENT_TIME);

  /* Fetch resource */
  useEffect(() => {
    api
      .get(`/resources/${id}`)
      .then((res) => setResource(res.data))
      .catch(() => showError("Failed to load payment details"));
  }, [id]);

  /* Countdown */
  useEffect(() => {
    if (!showQR) return;

    if (timeLeft === 0) {
      showError("Payment session expired. Please generate QR again.");
      setShowQR(false);
      setTimeLeft(PAYMENT_TIME);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showQR, timeLeft]);

  /* ✅ HOOK MUST BE BEFORE RETURN */
  const amount = resource?.finalPrice ?? resource?.price ?? 0;

  const upiUrl = useMemo(() => {
    return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
      PAYEE_NAME
    )}&am=${amount}&cu=INR`;
  }, [amount]);

  /* ✅ Safe early return AFTER hooks */
  if (!resource) return null;

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

      showSuccess("Payment submitted for verification");
      navigate("/payment-submitted");
    } catch (err) {
      showError(err.response?.data?.message || "Payment submission failed");
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen">
        <div className="container max-w-2xl py-16">
          <h1 className="text-3xl font-bold text-slate-900">
            Complete Payment
          </h1>

          <p className="mt-2 text-slate-600">
            Secure UPI payment for{" "}
            <span className="font-medium text-slate-800">
              {resource.title}
            </span>
          </p>

          <div className="mt-8 bg-white rounded-2xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-600">Amount Payable</p>
                <p className="text-xl font-bold text-slate-900">₹{amount}</p>
              </div>
            </div>

            <div className="p-6 text-center">
              {!showQR ? (
                <>
                  <p className="text-sm text-slate-600">
                    Pay using any UPI app
                  </p>

                  <button
                    onClick={() => {
                      setShowQR(true);
                      setTimeLeft(PAYMENT_TIME);
                    }}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Generate UPI QR
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-700">
                    Scan & Pay within
                  </p>

                  <p className="text-lg font-semibold text-red-600 mt-1">
                    {minutes}:{seconds.toString().padStart(2, "0")}
                  </p>

                  <div className="my-6 flex justify-center">
                    <QRCodeCanvas
                      value={upiUrl}
                      size={280}
                      level="H"
                      includeMargin
                      className="border rounded-xl"
                    />
                  </div>

                  {/* <div className="text-sm text-slate-600">
                    UPI ID:
                    <span className="font-medium text-slate-800 ml-1">
                      {UPI_ID}
                    </span>
                  </div> */}
                </>
              )}

              <div className="mt-6 text-left">
                <label className="text-sm font-medium text-slate-700">
                  Upload Payment Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full mt-2 border rounded-lg p-2"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                />
              </div>

              <button
                onClick={submitPayment}
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit for Verification"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
