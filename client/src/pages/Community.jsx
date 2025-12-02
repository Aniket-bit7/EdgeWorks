import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../authContext";
import toast from "react-hot-toast";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useAuth();
  const fetchCreations = async () => {
    try {
      const { data } = await api.get("/user/get-published-creations");

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message || "Failed to load creations");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Creations</h2>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creations.map((creation) => (
          <div key={creation.id} className="relative group">
            <img
              src={creation.content}
              alt=""
              className="w-full h-60 object-cover rounded-lg"
            />

            <div className="absolute inset-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/60">
              <p className="text-sm hidden group-hover:block text-white max-w-[70%]">
                {creation.prompt}
              </p>

              <div className="flex gap-1 items-center">
                <p className="text-white">{creation.likes.length}</p>

                <Heart
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes.includes(user?.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
