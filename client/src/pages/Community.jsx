import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../authContext";
import toast from "react-hot-toast";
import { api } from "../api";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCreations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/api/user/get-published-creations?page=${page}&limit=9`
      );

      if (data.success) {
        setCreations(data.creations);
        setTotalPages(data.totalPages);
      } else {
        toast.error(data.message || "Failed to load creations");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await api.post("/api/user/toggle-like-creation", {
        id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchCreations(); 
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchCreations();
  }, [page]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Creations</h2>

      {/* LOADING SKELETON */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-60 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creations.map((creation) => (
            <div key={creation.id} className="relative">
              {/* IMAGE */}
              <div className="relative group">
                <img
                  src={creation.content}
                  alt=""
                  className="w-full h-60 object-cover rounded-lg"
                />

                {/* OVERLAY ONLY ON IMAGE */}
                <div
                  className="absolute inset-0 flex items-end justify-end p-3
                                opacity-0 group-hover:opacity-100 transition bg-gradient-to-b 
                                from-transparent to-black/60 rounded-lg"
                >
                  <p className="text-sm text-white max-w-[70%] line-clamp-2">
                    {creation.prompt}
                  </p>

                  <div className="flex gap-1 items-center ml-auto">
                    <p className="text-white">{creation.likes.length}</p>

                    <Heart onClick={() => imageLikeToggle(creation.id)}
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                        creation.likes.includes(String(user?.id))
                          ? "fill-red-500 text-red-600"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION BUTTONS */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Community;
