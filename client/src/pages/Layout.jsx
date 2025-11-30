import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DollarSign, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { AuthCtx } from "../authContext";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useContext(AuthCtx);

  useEffect(() => {
    if (user?.plan !== "pro") {
      toast("Refresh once payment is completed.", {
        icon: <DollarSign/>,
      });
    }
  }, [user]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <nav className="flex items-center justify-between w-full px-6 py-4 shadow-sm bg-white border-b">
          <div className="flex flex-col leading-tight">
            <h1 className="text-2xl font-semibold text-gray-900">EdgeWorks</h1>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="sm:hidden"
            onClick={() => setSidebar(!sidebar)}
            aria-label="Toggle menu"
          >
            {sidebar ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </nav>

        {/* Content */}
        <div className="flex-1 bg-[#F4F7FB] overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
