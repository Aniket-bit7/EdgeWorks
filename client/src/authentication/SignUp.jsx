import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../authContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { setIsLogged } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // 🔐 Password validation
  const validatePassword = (password) => {
    const trimmed = password.trim();

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(trimmed);
  };

  async function submit(e) {
    e.preventDefault();

    const cleanPassword = form.password.trim();

    // Frontend validation
    if (!validatePassword(cleanPassword)) {
      toast.error(
        "Password must be 8+ characters with uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        ...form,
        password: cleanPassword,
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      setIsLogged(true);

      toast.success("Signup successful!");
      navigate("/ai");
    } catch (err) {
      console.error(err);

      const errorType = err.response?.data?.type;
      const message = err.response?.data?.error;

      // 🔥 If Clerk says password is breached → show ONLY this error
      if (errorType === "password_breach") {
        toast.error(message);
        return;
      }

      // Other backend errors (email already registered, etc.)
      toast.error(message || "Signup failed");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-10 w-[90%] max-w-md">
        <form className="w-full flex flex-col items-center" onSubmit={submit}>
          <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
          <p className="text-sm text-gray-500 mt-3">
            Welcome! Please Sign Up to continue
          </p>

          {/* FIRST NAME */}
          <div className="mt-5 flex items-center w-full bg-transparent border border-gray-400 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#6B7280" />
              <path
                d="M2 18c0-3.314 3.582-6 8-6s8 2.686 8 6"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="First Name"
              className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>

          {/* LAST NAME */}
          <div className="flex items-center mt-4 w-full bg-transparent border border-gray-400 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#6B7280" />
              <path
                d="M2 18c0-3.314 3.582-6 8-6s8 2.686 8 6"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Last Name"
              className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>

          {/* EMAIL */}
          <div className="flex items-center mt-4 w-full bg-transparent border border-gray-400 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center mt-4 w-full bg-transparent border border-gray-400 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Password validation hint */}
          {form.password.trim() &&
            !validatePassword(form.password.trim()) && (
              <p className="text-red-500 text-xs mt-1 text-left w-full pl-2">
                Must be 8+ chars, include uppercase, lowercase, number & special character and
                do not use #.
              </p>
            )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-black hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>

          {/* SWITCH TO LOGIN */}
          <p className="text-gray-500 text-sm mt-4">
            Have an account?{" "}
            <Link className="text-indigo-500 hover:underline" to="/login">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
