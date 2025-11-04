import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-gray-900">
        Welcome to <span className="text-indigo-600">EdgeWorks</span>
      </h1>
      <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mb-6">
        A smart platform built with PERN + Prisma + JWT Authentication.  
        Manage your projects, users, and content securely.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/signup"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-indigo-600 hover:bg-indigo-50 text-indigo-600 px-6 py-3 rounded-lg shadow-md transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
