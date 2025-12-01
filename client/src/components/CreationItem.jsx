import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white cursor-pointer"
    >
      {/* HEADER ROW */}
      <div className="flex justify-between items-center">
        {/* LEFT SIDE: PROMPT + DATE */}
        <div>
          <h2 className="font-medium">{item.prompt}</h2>
          <p className="text-xs text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* RIGHT SIDE: TYPE BADGE */}
        <div className="flex items-center">
          <button className="bg-[#EFF6FF] ml-5 border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full capitalize">
            {item.type}
          </button>
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      {expanded && (
        <div className="mt-3">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="image"
              className="w-full max-w-md mt-2 rounded-lg"
            />
          ) : (
            <div className="h-full overflow-y-scroll text-sm text-slate-700 reset-tw">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
