import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { loginWithGoogle, user, loading, authLoading } = useAuth();

  // Redirect if already logged in
  if (!loading && user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="border rounded-xl p-10 text-center max-w-sm w-full">
          <h2 className="text-xl font-semibold text-slate-900">
            Login Required
          </h2>

          <p className="text-sm text-slate-600 mt-2">
            Please login with Google to continue.
          </p>

          <button
            onClick={loginWithGoogle}
            disabled={authLoading}
            className={`mt-6 w-full py-2 rounded-md transition
              ${
                authLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            {authLoading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
