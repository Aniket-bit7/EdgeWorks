import { useEffect, useContext } from "react";
import { AuthCtx } from "../authContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const PaymentSuccess = () => {
  const { setIsLogged } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    const upgrade = async () => {
      try {
        const res = await api.post("/api/auth/upgrade");
        
        // save updated token and user
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setIsLogged(true);

        // redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/ai");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };

    upgrade();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="text-gray-600 mt-2">Upgrading your plan...</p>
      <p className="text-gray-500 mt-1">Redirecting to dashboard...</p>
    </div>
  );
};

export default PaymentSuccess;
