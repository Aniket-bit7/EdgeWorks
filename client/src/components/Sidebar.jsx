import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import {
  SquarePen,
  Eraser,
  Hash,
  House,
  Users,
  Scissors,
  Image,
  LogOut,
  FileText,
  Lock,
} from "lucide-react";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House, pro: false },
  {
    to: "/ai/write-article",
    label: "Write Article",
    Icon: SquarePen,
    pro: false,
  },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash, pro: false },

  {
    to: "/ai/generate-images",
    label: "Generate Images",
    Icon: Image,
    pro: true,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser,
    pro: true,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    Icon: Scissors,
    pro: true,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText,
    pro: true,
  },

  { to: "/ai/community", label: "Community", Icon: Users, pro: false },
];

// Avatar Component
const Avatar = ({ name }) => {
  const letter = name ? name.charAt(0).toUpperCase() : "G";
  return (
    <div className="w-16 h-16 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
      {letter}
    </div>
  );
};

const SmallAvatar = ({ name }) => {
  const letter = name ? name.charAt(0).toUpperCase() : "G";
  return (
    <div className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
      {letter}
    </div>
  );
};

const Sidebar = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";
  const isPro = user?.plan === "pro";

  const handleNavClick = (item) => {
    if (item.pro && !isPro) {
      navigate("/pricing");
      return;
    }
    setSidebar(false);
  };

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="my-7 w-full text-center">
        <Avatar name={fullName} />

        <h1 className="mt-2 text-center">{fullName}</h1>

        <div className="mt-6 flex flex-col gap-2 px-2">
          {navItems.map((item) => (
            <div key={item.to} onClick={() => handleNavClick(item)}>
              <NavLink
                to={item.to}
                end={item.to === "/ai"}
                className={({ isActive }) =>
                  `
      flex items-center gap-1 justify-between px-3.5 py-2.5 rounded transition-colors
      ${
        isActive
          ? "bg-black text-white"
          : item.pro && !isPro
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100"
      }
    `
                }
              >
                {/* LEFT: Icon + Label */}
                <div className="flex items-center gap-3">
                  {item.pro && !isPro ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <item.Icon className="w-4 h-4" />
                  )}

                  <span className="whitespace-nowrap">{item.label}</span>
                </div>

                {/* RIGHT: PRO Badge */}
                {item.pro && !isPro && (
                  <span className="text-xs bg-yellow-300 text-gray-800 px-2 py-0.5 rounded font-semibold">
                    PRO
                  </span>
                )}
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <SmallAvatar name={fullName} />

          <div>
            <h1 className="text-sm font-medium">{fullName}</h1>
            <p className="text-xs text-gray-500">
              {isPro ? "Pro Plan" : "Free Plan"}
            </p>
          </div>
        </div>

        <LogOut
          onClick={logout}
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
