import { useContext, useEffect } from "react";
import { AuthCtx } from "../authContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const Pricing = () => {
  const { isLogged, user } = useContext(AuthCtx);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login", { replace: true });
    }
  }, [isLogged, navigate]);

  const handlePayment = async () => {
    try {
      const res = await api.post("/api/payment/create-checkout-session");


      // Stripe now handles redirect using URL, not ID
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
      alert("Payment failed: " + err.response?.data?.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 w-full px-4">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Unlock powerful AI tools tailored for creators, students, and
          professionals.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
        {/* FREE PLAN */}
        <div className="relative max-w-80 w-full h-[480px]">
          <div className="mt-4 h-full rounded-lg border-2 border-gray-800 bg-white shadow-lg flex flex-col">
            <div className="border-b p-6">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-gray-500">
                Best for individuals just getting started
              </p>
            </div>

            <div className="p-6 flex-grow">
              <div className="mb-4 flex items-baseline">
                <span className="text-3xl font-bold">$0</span>
                <span className="ml-1 text-sm text-gray-500">/month</span>
              </div>

              <ul className="space-y-1 text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm">Title Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm">Article Generation</span>
                </li>
              </ul>
            </div>

            <div className="border-t p-6">
                <button
                  disabled={!!user}
                  className={`w-full rounded-lg px-4 py-2 text-white transition-opacity 
      ${
        user?.plan === "pro"
          ? "bg-purple-600 cursor-not-allowed" // Pro user
          : user
          ? "bg-gray-400 cursor-not-allowed" // Logged in free
          : "bg-gray-800 hover:opacity-90" // Not logged in
      }
    `}
                >
                  {user?.plan === "pro"
                    ? "You are Pro Now ✓"
                    : user
                    ? "Already Active"
                    : "Choose Free"}
                </button>
              </div>
            </div>
        </div>

        {/* PRO PLAN */}
        <div className="relative max-w-80 w-full h-[480px]">
          <div className="absolute inset-x-0 top-1 flex justify-center z-10">
            <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
              Most Popular
            </span>
          </div>

          <div className="mt-4 h-full rounded-lg border-2 border-gray-800 bg-white shadow-lg flex flex-col">
            <div className="border-b p-6">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-gray-500">
                Perfect for serious creators & teams
              </p>
            </div>

            <div className="p-6 flex-grow">
              <div className="mb-4 flex items-baseline">
                <span className="text-3xl font-bold">$10</span>
                <span className="ml-1 text-sm text-gray-500">/month</span>
              </div>

              <ul className="space-y-1 text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm">
                    Unlimited Access + All Free Features
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm">Image Generator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm">Remove Background</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm">Remove Object</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm">Review Resume</span>
                </li>
              </ul>
            </div>

            <div className="border-t p-6">
              {user?.plan === "pro" ? (
                <button
                  disabled
                  className="w-full py-2 bg-green-600 text-white rounded-lg"
                >
                  You Already Have Pro ✓
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  className="w-full py-2 bg-gray-800 text-white rounded-lg"
                >
                  Choose Pro
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg
    className="h-4 w-4 text-blue-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default Pricing;
