import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    api.get("/purchase/my").then((res) => setPurchases(res.data));
  }, []);

  const accessResource = async (resourceId) => {
    const res = await api.get(`/resources/${resourceId}/access`);
    window.open(res.data.url, "_blank");
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen">
        <div className="container py-14">
          <h2 className="text-3xl font-bold text-slate-900">
            Student Dashboard
          </h2>

          {/* User Card */}
          <div className="mt-6 bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-slate-600">Account Details</p>
            <p className="mt-2 font-medium text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>

          {/* Purchases */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-slate-900">
              My Purchases
            </h3>

            {purchases.length === 0 ? (
              <p className="mt-4 text-slate-600">
                No purchases found.
              </p>
            ) : (
              <div className="mt-6 grid gap-4">
                {purchases.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white border rounded-xl p-5 flex justify-between items-center shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {p.resource?.title || "Resource"}
                      </p>
                      <div className="mt-2">
                        <StatusBadge status={p.status} />
                      </div>
                    </div>

                    {p.status === "approved" && (
                      <button
                        onClick={() => accessResource(p.resource._id)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                      >
                        Access
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
