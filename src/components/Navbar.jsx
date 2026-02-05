import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-slate-900">
          GatePrep<span className="text-blue-600">Pro</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/resources" className="text-slate-700 hover:text-slate-900">
            Resources
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-slate-700 hover:text-slate-900"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
