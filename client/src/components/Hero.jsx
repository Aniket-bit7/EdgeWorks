import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useAuth();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLogged(false);
    navigate("/");
  };

  return (
    <section className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] w-full bg-no-repeat bg-cover bg-center text-sm pb-44 font-[Poppins]">
      <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full">
        <Link to="/">
          <h1 className="text-3xl font-semibold">EdgeWorks</h1>
        </Link>

        {/* NAV LINKS */}
        <div
          className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:h-full 
            max-md:bg-white/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center 
            flex items-center gap-8 font-medium text-base transition-all duration-300 
            ${menuOpen ? "max-md:w-full" : "max-md:w-0 max-md:overflow-hidden"}`}
        >
          <Link
            to="/"
            className="hover:text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            to="/pricing"
            className="hover:text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </Link>

          <Link to="https://github.com/Aniket-bit7/EdgeWorks">
            Github
          </Link>

          {/* MOBILE CLOSE BUTTON */}
          <button
            className="md:hidden bg-gray-800 hover:bg-black text-white p-2 rounded-md aspect-square transition"
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* RIGHT BUTTON (Desktop) */}
        <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
          {/* Contact Us stays always */}
          <Link to="/contactUs">
            <button className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-full font-medium transition">
              Contact Us
            </button>
          </Link>

          {/* IF NOT LOGGED IN → Show Login Button */}
          {!isLogged && (
            <Link to="/login">
              <button className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-full font-medium transition">
                Login
              </button>
            </Link>
          )}

          {/* IF LOGGED IN → Show Profile Dropdown */}
          {isLogged && (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:bg-black"
              >
                {/* Simple profile icon */}
                <span className="text-lg">👤</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden bg-gray-800 hover:bg-black text-white p-2 rounded-md aspect-square transition"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* HERO TEXT */}
      <div
        className="flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400/70 
  rounded-full mx-auto px-4 py-2 
  mt-24 sm:mt-32 md:mt-36 lg:mt-40 
  text-[10px] xs:text-xs sm:text-sm md:text-base 
  max-w-[90%] sm:max-w-[70%] md:max-w-max text-center leading-tight"
      >
        <span>Empowering creators to do more with less effort.</span>
      </div>

      <h5 className="text-4xl md:text-7xl font-medium max-w-[850px] text-center mx-auto mt-8 px-2">
        Create more. Think less. Let AI do the work.
      </h5>

      <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 px-4">
        Unlock peak productivity with our AI-powered creative hub. From
        expressive articles to high-quality visuals, get everything you need to
        bring ideas to life instantly.
      </p>

      <div className="mx-auto w-full flex flex-wrap items-center justify-center gap-3 mt-4 px-2">
        {/* Only show Get Started if NOT logged in */}
        {!isLogged && (
          <Link to="/login">
            <button className="bg-slate-800 hover:bg-black text-white px-6 py-3 rounded-full font-medium transition w-max">
              Get Started
            </button>
          </Link>
        )}

        <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-200/30 rounded-full px-6 py-3 w-max">
          <span>Learn More</span>
          <svg width="6" height="8" fill="none" viewBox="0 0 6 8">
            <path
              d="M1.25.5 4.75 4l-3.5 3.5"
              stroke="#050040"
              strokeOpacity=".4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
