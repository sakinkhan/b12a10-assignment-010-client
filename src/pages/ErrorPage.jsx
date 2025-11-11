import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import errorImg from "../assets/error-img.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center py-15 px-20 min-h-screen bg-base-300">
      <title>Error-404</title>
      <h1 className="font-primary text-2xl md:text-5xl font-bold text-center text-[#108251]">
        Oops... page not found
      </h1>
      <p className="font-secondary mt-5 text-sm md:text-xl text-center text-error pb-4">
        The page you're looking for isn't available. Use the go back button
        below.
      </p>
      <img
        src={errorImg}
        alt="error image"
        className="rounded-2xl h-130 object-cover object-fit animate-pulse"
      />
      <button
        onClick={() => navigate(-1)}
        className="btn mt-5 bg-[#108251] rounded-full font-primary text-m md:text-lg shadow-lg border-0 px-5 hover:scale-105"
      >
        <IoChevronBack />
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
