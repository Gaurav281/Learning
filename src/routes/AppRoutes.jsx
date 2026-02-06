import { Routes, Route, Navigate } from "react-router-dom";

/* Public */
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import ResourceDetail from "../pages/ResourceDetail";
import Login from "../pages/Login";

/* User */
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import PaymentSubmitted from "../pages/PaymentSubmitted";
import TestSeriesPacks from "../pages/TestSeriesPacks";
import TestSeriesPackDetail from "../pages/TestSeriesPackDetail";
import TestInstructions from "../pages/TestInstructions";
import TestAttempt from "../pages/TestAttempt";
import TestResult from "../pages/TestResult";

/* Protection */
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../admin/AdminRoute";

/* Admin */
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import AdminResources from "../admin/pages/Resources";
import AddResource from "../admin/pages/AddResource";
import EditResource from "../admin/pages/EditResource";
import Purchases from "../admin/pages/Purchases";
import Users from "../admin/pages/Users";

/* Admin Test Series */
import AdminTestSeriesPacks from "../admin/pages/TestSeriesPacks";
import AddTestSeriesPack from "../admin/pages/AddTestSeriesPack";
import PackTests from "../admin/pages/PackTests";
import AddTest from "../admin/pages/AddTest";
import AddQuestion from "../admin/pages/AddQuestion";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resource/:id" element={<ResourceDetail />} />
      <Route path="/login" element={<Login />} />

      {/* USER */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/payment-submitted" element={<ProtectedRoute><PaymentSubmitted /></ProtectedRoute>} />

      <Route path="/test-series" element={<TestSeriesPacks />} />
      <Route path="/test-series/pack/:packId" element={<ProtectedRoute><TestSeriesPackDetail /></ProtectedRoute>} />
      <Route path="/test-series/:testId/instructions" element={<ProtectedRoute><TestInstructions /></ProtectedRoute>} />
      <Route path="/test-series/:testId/attempt" element={<ProtectedRoute><TestAttempt /></ProtectedRoute>} />
      <Route path="/test-series/:testId/result" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />

      {/* ADMIN */}
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
        <Route path="edit-resource/:id" element={<EditResource />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="users" element={<Users />} />

        {/* ADMIN TEST SERIES */}
        <Route path="test-series" element={<AdminTestSeriesPacks />} />
        <Route path="test-series/add-pack" element={<AddTestSeriesPack />} />
        <Route path="test-series/pack/:packId" element={<PackTests />} />
        <Route path="test-series/pack/:packId/add-test" element={<AddTest />} />
        <Route path="test-series/test/:testId/add-question" element={<AddQuestion />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
