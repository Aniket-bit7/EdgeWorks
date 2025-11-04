import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            EdgeWorks
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            {!user && (
              <>
                <Link to="/signup" className="hover:text-primary transition">Signup</Link>
                <Link to="/login" className="hover:text-primary transition">Login</Link>
              </>
            )}
            {user && (
              <>
                <Link to="/profile" className="hover:text-primary transition">Profile</Link>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

