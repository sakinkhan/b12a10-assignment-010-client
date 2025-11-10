import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center py-15 px-20 min-h-screen bg-base-300">
      <title>Error-404</title>
      <h1 className="quicksand-font text-2xl md:text-5xl font-bold text-center text-purple-700">
        Oops... page not found
      </h1>
      <p className="roboto-font mt-5 text-sm md:text-xl text-center text-primary">
        The page you're looking for isn't available. Use the go back button
        below.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="btn mt-5 bg-accent roboto-font text-m md:text-lg shadow-lg border-0 px-5 hover:scale-105"
      >
        <IoChevronBack />
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
