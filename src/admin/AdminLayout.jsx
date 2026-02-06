import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  const adminLink = ({ isActive }) =>
    `block text-sm px-3 py-2 rounded
     ${isActive
       ? "text-blue-600 font-semibold bg-blue-50"
       : "text-slate-700 hover:text-blue-600"}`;

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6">
          <h2 className="text-lg font-semibold mb-6">
            Admin Panel
          </h2>

          <nav className="space-y-3">
            <NavLink to="/admin" end className={adminLink}>
              Dashboard
            </NavLink>

            <NavLink to="/admin/resources" className={adminLink}>
              Resources
            </NavLink>

            <NavLink to="/admin/add-resource" className={adminLink}>
              Add Resource
            </NavLink>

            <NavLink to="/admin/purchases" className={adminLink}>
              Purchases
            </NavLink>

            <NavLink to="/admin/users" className={adminLink}>
              Users
            </NavLink>

            <hr />

            <NavLink to="/admin/test-series" className={adminLink}>
              Test Series Packs
            </NavLink>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
