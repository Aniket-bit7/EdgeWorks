import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-30">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <h1 className="text-3xl font-semibold text-black">EdgeWorks</h1>
          <p className="mt-6 text-sm">
            EdgeWorks simplifies the creative process by bringing idea
            generation, content creation, image enhancement, resume analysis,
            and community collaboration into one AI-powered platform.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Pages</h2>
            <ul className="flex flex-col text-sm space-y-2">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contactUs">Contact Us</Link>
              <Link to="/pricing">Pricing</Link>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91 900XXXXXXX</p>
              <p>contact@EdgeWorks.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">© {new Date().getFullYear()} EdgeWorks. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
