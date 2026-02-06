import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const TestSeriesPacks = () => {
  const [packs, setPacks] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPacks = async () => {
      const res = await api.get("/test-series/packs");
      const testPacks = res.data.filter(
        (r) => r.type === "test-series-pack"
      );
      setPacks(testPacks);
    };

    fetchPacks();
  }, []);

  const hasPurchased = (packId) => {
    return user?.purchasedResources?.some(
      (r) => (typeof r === "string" ? r : r._id) === packId
    );
  };

  return (
    <>
      <Navbar />

      <div className="container py-14">
        <h1 className="text-3xl font-semibold text-slate-900">
          GATE Test Series
        </h1>

        <p className="mt-3 text-slate-600 max-w-2xl">
          Attempt full-length and subject-wise GATE-style tests with real
          exam interface, timer, and detailed analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {packs.map((pack) => (
            <div
              key={pack._id}
              className="border rounded-xl p-6 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {pack.title}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {pack.description}
              </p>

              {/* PRICE */}
              <div className="mt-4">
                {pack.discountPercent > 0 ? (
                  <>
                    <span className="line-through text-slate-400 text-sm">
                      ₹{pack.price}
                    </span>
                    <span className="ml-2 text-xl font-semibold text-green-600">
                      ₹{pack.finalPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-blue-600">
                    ₹{pack.price}
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-6">
                {hasPurchased(pack._id) ? (
                  <button
                    onClick={() =>
                      navigate(`/test-series/pack/${pack._id}`)
                    }
                    className="w-full bg-green-600 text-white py-2 rounded"
                  >
                    Access Pack
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate(`/payment/${pack._id}`)
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {packs.length === 0 && (
          <p className="mt-10 text-slate-500">
            No test series packs available yet.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TestSeriesPacks;
