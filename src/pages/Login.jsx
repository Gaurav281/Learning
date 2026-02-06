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

      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white border rounded-2xl p-10 max-w-md w-full shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Secure Login
          </h2>

          <p className="text-sm text-slate-600 mt-3 text-center">
            Login to access premium GATE resources, test series, and your
            personalized dashboard.
          </p>

          <button
            onClick={loginWithGoogle}
            disabled={authLoading}
            className={`mt-8 w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2
              ${
                authLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            {authLoading ? "Signing in securely..." : "Continue with Google"}
          </button>

          <p className="text-xs text-slate-500 mt-6 text-center">
            We use Google authentication for secure and verified access only.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
