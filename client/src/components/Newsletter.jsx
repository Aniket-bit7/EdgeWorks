import React from 'react'

const Newsletter = () => {
  return (
        <section className="flex flex-col items-center mt-30">
            <div className="flex flex-col items-center">
                <h2 className="text-center text-4xl font-semibold max-w-2xl">Subscribe <span className=" p-1 bg-left inline-block">newsletter</span></h2>
                <p className="text-center text-gray-600 max-w-lg mt-3">A visual collection of our most recent works - each piece crafted with intention, emotion, and style.</p>
            </div>
            <div className="flex items-center justify-center mt-10 border border-slate-700 focus-within:outline  text-sm rounded-full h-14 max-w-xl w-full">
                <input className="bg-transparent outline-none rounded-full px-4 h-full flex-1 placeholder:text-slate-400" placeholder="Enter your email address" type="text" />
                <button className="bg-black text-white rounded-full h-11 mr-1 px-10 flex items-center justify-center active:scale-95 transition">Subscribe</button>
            </div>
        </section>
    );
};

export default Newsletter