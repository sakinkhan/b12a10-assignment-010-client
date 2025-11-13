import React from "react";
import PropertyCard from "./PropertyCard";
import { useLoaderData } from "react-router";

const AllProperties = () => {
  const properties = useLoaderData();
  return (
    <div>
      <title>HomeNest - All Properties</title>
      <section className="py-12 bg-green-50 dark:bg-gray-900 text-base-content px-15">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8  font-primary text-[#108251] dark:text-success">
            All Property Listings ({properties.length})
          </h1>
          {properties.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProperties;
