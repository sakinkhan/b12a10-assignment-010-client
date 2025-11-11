import React from "react";
import heroImg from "../assets/Hero-banner.jpg";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative w-full">
      <img
        src={heroImg}
        alt="Hero Image"
        className="w-full h-180 object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20 gap-4 z-10">
        <p className="btn btn-success rounded-full cursor-default font-secondary">
          Welcome to HomeNest
        </p>
        <h2 className="font-primary text-3xl md:text-5xl font-black text-white max-w-3xl">
          Find your <span className="text-[#48e9a8]">dream</span> home in the
          best location
        </h2>
        <div className="w-full max-w-6xl">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
