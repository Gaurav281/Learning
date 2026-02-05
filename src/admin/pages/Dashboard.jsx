import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalResources: 0,
    pendingPurchases: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    api.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">
        Admin Dashboard
      </h1>

      <p className="text-slate-600 mt-2">
        Overview of platform activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-sm text-slate-500">Total Resources</h3>
          <p className="text-2xl font-semibold mt-2">
            {stats.totalResources}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-sm text-slate-500">Pending Purchases</h3>
          <p className="text-2xl font-semibold mt-2">
            {stats.pendingPurchases}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-sm text-slate-500">Users</h3>
          <p className="text-2xl font-semibold mt-2">
            {stats.totalUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
