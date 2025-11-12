import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

const PropertyDetailsCard = ({ propertyData }) => {
  const {
    propertyName,
    location,
    price,
    beds,
    baths,
    area,
    propertyImage,
    tag,
    category,
    userName,
    description,
    userEmail,
    userPhoto,
    postedDate,
  } = propertyData;

  const formattedPrice =
    price >= 1000 ? `$${price.toLocaleString()}` : `$${price}`;

  const formattedDate = new Date(postedDate).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto py-10 transition-colors duration-300 bg-green-50 dark:bg-gray-900">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 font-primary mb-4">
            {propertyName}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center font-secondary">
            <IoLocationSharp className="mr-1 text-gray-400 dark:text-gray-500" />
            {location}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-secondary">
            Posted on {formattedDate}
          </p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-3xl md:text-4xl font-bold text-[#108251] dark:text-green-400">
            {tag === "For Sale"
              ? `${formattedPrice.toLocaleString()}`
              : `${formattedPrice} / Week`}
          </p>
          <span className="inline-block mt-3 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-semibold px-4 py-2 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* IMAGE */}
      <figure className="relative mb-8 shadow-xl rounded-lg overflow-hidden">
        <img
          src={propertyImage}
          alt={propertyName}
          className="w-full h-100 md:h-150 lg:h-200 object-cover hover:scale-[1.01] transition-transform duration-500"
        />
        <div
          className={`badge absolute top-4 right-4 text-white text-lg font-bold p-5 border-0 rounded-full ${
            tag === "For Sale" ? "bg-[#108251]" : "bg-info"
          }`}
        >
          {tag}
        </div>
      </figure>

      {/* FEATURES */}
      <div className="flex justify-around text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md py-4 mb-8 transition-colors duration-300 font-secondary">
        <div className="flex flex-col items-center flex-1">
          <FaBed className="text-gray-500 dark:text-gray-400 text-xl mb-1" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {beds} Beds
          </span>
        </div>

        <div className="w-px bg-gray-300 dark:bg-gray-700 mx-4" />

        <div className="flex flex-col items-center flex-1">
          <FaBath className="text-gray-500 dark:text-gray-400 text-xl mb-1" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {baths} Baths
          </span>
        </div>

        <div className="w-px bg-gray-300 dark:bg-gray-700 mx-4" />

        <div className="flex flex-col items-center flex-1">
          <FaRulerCombined className="text-gray-500 dark:text-gray-400 text-xl mb-1" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {area} m²
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* DESCRIPTION */}
        <div className="lg:w-2/3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 font-primary">
            Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line font-secondary">
            {description}
          </p>
        </div>

        {/* CONTACT PostedBy */}
        <div className="lg:w-1/3 h-fit bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center  gap-5 transition-colors duration-300 font-secondary">
          <img
            src={userPhoto}
            alt={userName}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <div className="text-center">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {userName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">{userEmail}</p>
            <a
              href={`mailto:${userEmail}`}
              className="mt-2 inline-block bg-[#108251] hover:bg-success dark:bg-green-600 dark:hover:bg-green-500 text-white hover:text-black font-semibold px-4 py-2 rounded-full transition-colors duration-300 font-primary"
            >
              Contact Agent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
