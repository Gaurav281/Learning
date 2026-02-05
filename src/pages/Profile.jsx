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
      className={`text-xs px-2 py-1 rounded-full capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    api.get("/purchase/my").then((res) => {
      setPurchases(res.data);
    });
  }, []);

  const accessResource = async (resourceId) => {
    const res = await api.get(`/resources/${resourceId}/access`);
    window.open(res.data.url, "_blank");
  };

  return (
    <>
      <Navbar />

      <div className="container py-14">
        <h2 className="text-2xl font-semibold">My Dashboard</h2>

        {/* USER INFO */}
        <div className="mt-6 border rounded-xl p-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p className="mt-2"><strong>Email:</strong> {user.email}</p>
        </div>

        {/* PURCHASED RESOURCES */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Purchased Resources</h3>

          {purchases.length === 0 ? (
            <p className="text-slate-600 mt-4">
              You have not purchased any resources yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {purchases.map((p) => (
                <li
                  key={p._id}
                  className="border rounded-md p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {p.resource?.title || "Resource"}
                    </p>

                    <div className="mt-1">
                      <StatusBadge status={p.status} />
                    </div>
                  </div>

                  {p.status === "approved" && (
                    <button
                      onClick={() => accessResource(p.resource._id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Access
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
