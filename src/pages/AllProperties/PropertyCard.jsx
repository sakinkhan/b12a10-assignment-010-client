import React from "react";
import { BiArea, BiMailSend, BiPhone } from "react-icons/bi";
import { FaBath, FaBed, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
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
    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden mb-6 hover:shadow-2xl flex flex-col lg:flex-row hover:scale-102 duration-300 transition-all">
      {/* 1. Image Section */}
      <figure className="relative w-full lg:w-[250px] h-[200px] lg:h-auto overflow-hidden shrink-0">
        <img
          src={image}
          alt={propertyName}
          className="object-cover w-full h-full lg:w-80 lg:h-80 rounded-2xl p-3"
        />
        {/* Status Badge */}
        <div
          className={`badge absolute top-5 right-5 text-white text-xs font-bold p-2 border-0 rounded-full ${
            tag === "For Sale" ? "bg-[#108251]" : "bg-info"
          }`}
        >
          {tag}
        </div>
      </figure>

      {/* 2. Details Section */}
      <div className="card-body p-6 grow flex flex-col justify-between">
        {/* Title and Location */}
        <div>
          <h2 className="card-title text-2xl font-primary">{propertyName}</h2>
          <div className="flex items-center text-sm text-base-content/70 mb-2 pt-2 font-secondary">
            <IoLocationSharp className="mt-1 mr-1 text-base text-gray-400" />
            {location}
          </div>

          {/* Description */}
          <p className="text-sm text-base-content/80 mb-3 flex items-start font-secondary">
            <TbFileDescription className="mt-0.5 mr-1 text-base text-gray-400" />
            {shortDescription}
          </p>

          <p className="mb-4 btn w-fit btn-outline btn-success rounded-full h-7 hover:text-white cursor-default text-sm font-secondary">
            {category}
          </p>

          {/* Property Specs */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium font-secondary">
            <div className="flex items-center">
              <FaBed className="mr-2 text-gray-700" /> {beds} Bed
            </div>
            <div className="flex items-center">
              <FaBath className="mr-2 text-gray-700" /> {baths} Bath
            </div>
            <div className="flex items-center">
              <BiArea className="mr-2 text-gray-700" /> {area}
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-6 px-20 lg:px-0">
          <button className="btn btn-success w-full lg:w-auto hover:text-white font-primary">
            View Details
          </button>
        </div>
      </div>

      {/* 3. Pricing & Contact Section */}
      <div className="p-6 lg:p-8 flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-base-200 shrink-0 w-full lg:w-72 mt-4 lg:mt-0 bg-base-200">
        {/* Pricing */}
        <div className="mb-6 w-full text-center text-3xl lg:text-4xl font-extrabold text-success">
          {price}
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col space-y-2 w-full font-primary px-20 lg:px-0">
          <button className="btn btn-primary">
            <BiPhone className="w-4 h-4" /> Call
          </button>
          <button className="btn btn-info">
            <MdEmail className="w-4 h-4" /> Email
          </button>
          <button className="btn btn-success ">
            <FaWhatsapp className="w-4 h-4" /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
