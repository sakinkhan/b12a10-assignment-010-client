import React from "react";
import { BiArea } from "react-icons/bi";
import { FaBath, FaBed } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";

const PropertyCard = ({
  propertyName,
  location,
  price,
  beds,
  baths,
  area,
  image,
  tag,
  category,
  shortDescription,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden mb-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Outer Grid for Responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {/* 1. Image Section */}
        <figure className="relative w-full h-56 sm:h-64 md:h-full overflow-hidden lg:col-span-1">
          <img
            src={image}
            alt={propertyName}
            className="object-cover w-full h-70"
          />
          <div
            className={`badge absolute top-4 right-4 text-white text-xs font-bold p-2 border-0 rounded-full ${
              tag === "For Sale" ? "bg-[#108251]" : "bg-info"
            }`}
          >
            {tag}
          </div>
        </figure>

        {/* 2. Details Section */}
        <div className="p-6 flex flex-col justify-between lg:col-span-2">
          <div>
            <h2 className="text-2xl font-primary font-bold">{propertyName}</h2>
            <div className="flex items-center text-sm text-base-content/70 mb-2 pt-2 font-secondary">
              <IoLocationSharp className="mt-1 mr-1 text-gray-400" />
              {location}
            </div>

            {/* Description */}
            <p className="text-sm text-base-content/80 mb-3 flex items-start font-secondary">
              <TbFileDescription className="mt-0.5 mr-1 text-gray-400" />
              {shortDescription}
            </p>
          </div>

          <div>
            <p className="mb-4 btn w-fit btn-outline btn-success rounded-full h-7 hover:text-white cursor-default text-sm font-secondary">
              {category}
            </p>

            {/* Property Specs */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium font-secondary">
              <div className="flex items-center">
                <FaBed className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                {beds} Bed
              </div>
              <div className="flex items-center">
                <FaBath className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                {baths} Bath
              </div>
              <div className="flex items-center">
                <BiArea className="mr-2 text-gray-700 dark:text-gray-200" />{" "}
                {area}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Pricing & Button Section */}
        <div className="p-6 md:col-span-2 lg:col-span-1 lg:p-8 flex flex-col justify-between items-center lg:items-end border-t md:border-t-0 lg:border-l border-base-200 bg-base-200">
          <div className="mb-6 text-3xl lg:text-4xl font-extrabold text-success font-secondary text-center w-full">
            {price}
          </div>
          <button className="btn btn-success w-full md:w-[50%] lg:w-full hover:text-white font-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
