import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4 mt-20">
      <h1 className="text-6xl md:text-5xl font-bold text-black">Work in Progress</h1>
      <div className="h-1 w-16 rounded bg-gray-500 my-5 md:my-7"></div>

      <p className="text-2xl md:text-3xl font-bold text-gray-800">
        will deploy soon!
      </p>

      <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <div className="flex items-center gap-4 mt-6">
        {/* Return Home */}
        <Link
          to="/"
          className="bg-gray-800 hover:bg-black px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
        >
          Return Home
        </Link>

        {/* Contact Support */}
        <Link
          to="/contactUs"
          className="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md active:scale-95 transition-all"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default About;
