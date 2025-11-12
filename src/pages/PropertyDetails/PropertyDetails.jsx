import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useLoaderData, useNavigate, useParams } from "react-router";
import PropertyDetailsCard from "./PropertyDetailsCard";
import RatingsReview from "./RatingsReview";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const propertyData = useLoaderData();

  return (
    <div className="bg-green-50 dark:bg-gray-900 py-10">
      <title>HomeNest - Property Details</title>
      {/* Back Button */}
      <div className="pl-20 pt-5 pb-10">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-success rounded-full font-primary"
        >
          <IoMdArrowBack />
          Go Back
        </button>
      </div>
      <div className="px-20">
        {/* Property Details */}
        <PropertyDetailsCard propertyData={propertyData}></PropertyDetailsCard>

        {/* Ratings and Review section */}
        <RatingsReview></RatingsReview>
      </div>
    </div>
  );
};

export default PropertyDetails;
