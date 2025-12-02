import React, { useEffect, useState } from "react";
import { Gem, Sparkles, Trash2 } from "lucide-react";
import CreationItem from "../components/CreationItem";
import { useAuth } from "../authContext";
import { api } from "../api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();

  const [creations, setCreations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState("all");

  // FETCH CREATIONS
  const fetchCreations = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/api/user/get-creations");

      if (data.success) {
        setCreations(data.creations);
        setFiltered(data.creations);
      } else {
        toast.error(data.message || "Failed to load creations");
      }
    } catch (err) {
      toast.error("Error loading creations");
    } finally {
      setLoading(false);
    }
  };

  // DELETE CREATION
  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/api/user/delete-creation/${id}`);

      if (data.success) {
        toast.success("Deleted successfully ✔");
        fetchCreations();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // FILTER
  const applyFilter = (type) => {
    setActiveFilter(type);
    if (type === "all") setFiltered(creations);
    else setFiltered(creations.filter((c) => c.type === type));
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      {/* TOP CARDS */}
      <div className="flex justify-start gap-4 flex-wrap">
        
        {/* Total Creations */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex justify-center items-center text-white">
            <Sparkles className="w-5" />
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              {user?.plan === "pro" ? "Pro" : "Free"}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#9E53EE] flex justify-center items-center text-white">
            <Gem className="w-5" />
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mt-6">
        {[
          { label: "All", value: "all" },
          { label: "Images", value: "image" },
          { label: "Articles", value: "article" },
          { label: "Blog Titles", value: "blog-title" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => applyFilter(btn.value)}
            className={`px-4 py-1 rounded-full text-sm border transition ${
              activeFilter === btn.value
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* LIST OF CREATIONS */}
      <div className="mt-6 space-y-3">
        <p className="mb-4">Recent Creations</p>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-20 bg-gray-200 animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg border"
            >
              <CreationItem item={item} />

              {/* DELETE BUTTON WITH STOP PROPAGATION */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
