import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { generatePoster } from "../utils/generatePoster";

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await api.get(`/resources/${id}`);
        setResource(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (loading || !resource) return null;

  const hasPurchased = user?.purchasedResources?.some(
    (r) => (typeof r === "string" ? r : r._id) === resource._id
  );

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen">
        <div className="container py-16">
          {/* Top Section */}
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Image */}
            <img
              src={
                resource.previewImage?.trim()
                  ? resource.previewImage
                  : generatePoster(resource.title)
              }
              alt={resource.title}
              className="rounded-2xl border bg-white"
            />

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {resource.title}
              </h1>

              <p className="mt-4 text-slate-600 leading-relaxed">
                {resource.description}
              </p>

              {/* Pricing */}
              <div className="mt-6">
                {resource.discountPercent > 0 ? (
                  <div className="flex items-end gap-3">
                    <span className="text-lg line-through text-slate-400">
                      ₹{resource.price}
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      ₹{resource.finalPrice}
                    </span>
                    <span className="text-sm text-green-600">
                      ({resource.discountPercent}% OFF)
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-blue-600">
                    ₹{resource.price}
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8">
                {hasPurchased ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate(`/payment/${resource._id}`)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() =>
                        (window.location.href =
                          "https://t.me/YOUR_PAYMENT_BOT")
                      }
                      className="block mt-4 text-sm text-slate-600 underline"
                    >
                      Buy via Telegram
                    </button>
                  </>
                )}

                <p className="mt-3 text-xs text-slate-500">
                  Secure UPI payment • Manual verification • Lifetime access
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-10">
            {/* Benefits */}
            <div className="md:col-span-2 bg-white border rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-slate-900">
                What you will get
              </h2>

              <ul className="mt-4 space-y-3 list-disc pl-5 text-slate-700">
                <li>GATE-level questions & concepts</li>
                <li>Structured, exam-oriented material</li>
                <li>Instant access after approval</li>
                <li>Lifetime availability in dashboard</li>
              </ul>
            </div>

            {/* Info Card */}
            <div className="bg-white border rounded-2xl p-8">
              <h3 className="font-semibold text-slate-900">
                Resource Information
              </h3>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>
                  <strong>Type:</strong>{" "}
                  {resource.type === "pdf"
                    ? "PDF Resource"
                    : "Test Series"}
                </p>
                <p>
                  <strong>Access:</strong> Lifetime
                </p>
                <p>
                  <strong>Delivery:</strong> Digital
                </p>
                <p>
                  <strong>Support:</strong> Email / Telegram
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResourceDetail;
