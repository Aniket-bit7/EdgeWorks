import React from "react";
import { avatarIcons } from "../assets/avatarIcons";
import { api } from "../api";
import toast from "react-hot-toast";

const AvatarPicker = ({ close }) => {
  const chooseAvatar = async (iconName) => {
    try {
      const { data } = await api.post("/api/user/set-avatar", {
        icon: iconName,
      });

      if (data.success) {
        toast.success("Avatar updated!");
        window.location.reload();
      }
    } catch {
      toast.error("Failed to update avatar");
    }
  };

  const deleteAvatar = async () => {
    try {
      const { data } = await api.delete("/api/user/delete-avatar");

      if (data.success) {
        toast.success("Avatar removed!");
        window.location.reload();
      }
    } catch {
      toast.error("Failed to remove avatar");
    }
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-3 p-4 bg-white shadow-lg border rounded-lg w-60 z-50">
      <h3 className="text-sm font-semibold mb-3">Choose Avatar</h3>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {avatarIcons.map(({ name, Icon }) => (
          <button
            key={name}
            onClick={() => chooseAvatar(name)}
            className="p-2 border rounded-lg hover:bg-gray-100"
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>

      <button
        onClick={deleteAvatar}
        className="text-xs text-red-500 underline mb-2"
      >
        Remove Avatar
      </button>

      <button
        onClick={close}
        className="text-xs text-gray-500 underline block"
      >
        Close
      </button>
    </div>
  );
};

export default AvatarPicker;
