import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = ({ isActive }) =>
    `text-sm font-medium transition
     ${isActive
       ? "text-blue-600"
       : "text-slate-700 hover:text-slate-900"}`;

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-xl font-bold text-slate-900">
            GatePrep
          </span>
          <span className="text-xl font-bold text-blue-600">
            Pro
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/resources" className={navLink}>
            Resources
          </NavLink>

          {/* <NavLink to="/test-series" className={navLink}>
            Test Series
          </NavLink> */}

          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLink}>
              Admin Panel
            </NavLink>
          )}

          {user ? (
            <>
              <NavLink to="/profile" className={navLink}>
                Dashboard
              </NavLink>

              <button
                onClick={logout}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Login with Google
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-slate-700"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-4">
            <NavLink
              to="/resources"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Resources
            </NavLink>

            {/* <NavLink
              to="/test-series"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Test Series
            </NavLink> */}

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={navLink}
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </NavLink>
            )}

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={navLink}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  loginWithGoogle();
                  setMenuOpen(false);
                }}
                className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
