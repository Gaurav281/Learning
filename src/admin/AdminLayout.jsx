import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Admin Panel
          </h2>

          <nav className="space-y-3 text-sm">
            <NavLink to="/admin" className="block text-slate-700 hover:text-blue-600">
              Dashboard
            </NavLink>
            <NavLink to="/admin/resources" className="block text-slate-700 hover:text-blue-600">
              Resources
            </NavLink>
            <NavLink to="/admin/add-resource" className="block text-slate-700 hover:text-blue-600">
              Add Resource
            </NavLink>
            <NavLink to="/admin/purchases" className="block text-slate-700 hover:text-blue-600">
              Purchases
            </NavLink>
            <NavLink to="/admin/users" className="block text-slate-700 hover:text-blue-600">
              Users
            </NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
