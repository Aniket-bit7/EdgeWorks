import React from "react";
import { useNavigate } from "react-router-dom";
import { AiToolsData } from "../assets/assets";
import toast from "react-hot-toast";

const Tools = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-black text-[42px] font-semibold">
          Everything You Get with EdgeWorks
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mt-2">
          Transform your ideas into polished content instantly — AI handles the
          work, you take the credit.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-8 m-4 max-w-xs rounded-lg bg-white shadow-md hover:shadow-[0_0_12px_3px_#F5EED6] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => {
              if (token) {
                navigate(tool.path); 
              } else {
                toast.error("Please login to access this tool!");
                navigate("/login");
              }
            }}
          >
            <h3 className="mb-3 text-lg font-semibold">{tool.title}</h3>

            <img
              src={tool.img}
              alt="image"
              className="mb-3 w-100 h-50 object-cover rounded-lg"
            />

            <p className="text-gray-500 text-sm max-w-[95%]">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
