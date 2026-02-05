import { Routes, Route, Navigate } from "react-router-dom";

/* Public pages */
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import ResourceDetail from "../pages/ResourceDetail";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import PaymentSubmitted from "../pages/PaymentSubmitted";

/* Protection */
import ProtectedRoute from "../components/ProtectedRoute";

/* Admin */
import AdminRoute from "../admin/AdminRoute";
import AdminLayout from "../admin/AdminLayout";

/* Admin pages */
import Dashboard from "../admin/pages/Dashboard";
import AdminResources from "../admin/pages/Resources";
import AddResource from "../admin/pages/AddResource";
import Purchases from "../admin/pages/Purchases";
import Users from "../admin/pages/Users";
import EditResource from "../admin/pages/EditResource";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resource/:id" element={<ResourceDetail />} />
      <Route path="/login" element={<Login />} />

      {/* ================= USER ================= */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route
        path="/payment-submitted"
        element={<ProtectedRoute><PaymentSubmitted /></ProtectedRoute>}
      />


      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="add-resource" element={<AddResource />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="users" element={<Users />} />
        <Route
          path="edit-resource/:id"
          element={<EditResource />}
        />

      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
