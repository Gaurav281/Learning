import { useEffect, useState } from "react";
import api from "../../services/api";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    const res = await api.get("/admin/purchases");
    setPurchases(res.data);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const approve = async (id) => {
    await api.post(`/admin/purchase/${id}/approve`);
    fetchPurchases();
  };

  const reject = async (id) => {
    await api.post(`/admin/purchase/${id}/reject`);
    fetchPurchases();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Purchases</h1>

      <table className="w-full border text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th className="p-3">Transaction</th>
            <th className="p-3">Screenshot</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-3">{p.user.email}</td>

              <td className="p-3 text-center">
                {p.transactionId}
              </td>

              <td className="p-3 text-center">
                {p.screenshot ? (
                  <a
                    href={`http://localhost:5000${p.screenshot}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : (
                  "—"
                )}
              </td>

              <td className="p-3 text-center space-x-3">
                {p.screenshot ? (
                  <>
                    <a
                      href={`http://localhost:5000${p.screenshot}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>

                    <button
                      onClick={async () => {
                        if (confirm("Delete screenshot permanently?")) {
                          await api.delete(
                            `/admin/purchase/${p._id}/screenshot`
                          );
                          fetchPurchases();
                        }
                      }}
                      className="text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>


              <td className="p-3 text-center space-x-3">
                {p.status === "pending" ? (
                  <>
                    <button
                      onClick={() => approve(p._id)}
                      className="text-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(p._id)}
                      className="text-red-600"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-slate-500 capitalize">
                    {p.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchases;
