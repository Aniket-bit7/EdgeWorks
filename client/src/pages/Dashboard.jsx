import React, { useEffect, useState } from 'react';
import { dummyCreationData } from '../assets/assets';
import { Gem, Sparkles, Trash2 } from 'lucide-react';
import CreationItem from '../components/CreationItem';
import { useAuth } from "../authContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [creations, setCreations] = useState([]);

  useEffect(() => {
    // Load dummy creations
    setCreations(dummyCreationData);
  }, []);

  // 🔥 DELETE HANDLER
  const handleDelete = (id) => {
    const updated = creations.filter((item) => item.id !== id);
    setCreations(updated);
  };

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>

        {/* Total Creations */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>

        {/* Active Plan */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
              {user?.plan === "pro" ? "Pro" : "Free"}
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>

      </div>

      <div className='mt-6 space-y-3'>
        <p className='mb-4'>Recent Creations</p>

        {creations.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 ">
            <CreationItem item={item} />

            <button
              onClick={() => handleDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;
