import { Eraser, Sparkles } from "lucide-react";
import React, { useState, useRef } from "react";
import { api } from "../api";
import toast from "react-hot-toast";

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const fileRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", input);   

      const response = await api.post(
        "/ai/remove-image-background",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setContent(response.data.content);
      } else {
        toast.error(response.data.error || "Failed to remove background");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = ""; 
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          onChange={(e) => setInput(e.target.files[0])}
          required
        />

        <p className="text-xs text-gray-500 font-light mt-1">
          Supports JPG, PNG and other image formats
        </p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Eraser className="w-5" />
          )}
          Remove background
        </button>
      </form>

      {/* OUTPUT AREA */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center text-gray-400">
            <div className="text-sm flex flex-col items-center gap-5">
              <Eraser className="w-9 h-9" />
              <p>Upload an image and click "Remove Background"</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full">
            <img src={content} alt="Processed" className="w-full h-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
