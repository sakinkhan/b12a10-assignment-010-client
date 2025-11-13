import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { useLoaderData } from "react-router";
import { FaSortAmountDown, FaSortAmountUp, FaSearch } from "react-icons/fa";

const AllProperties = () => {
  const properties = useLoaderData();

  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Sort the properties
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortOption === "priceLowHigh") return a.price - b.price;
    if (sortOption === "priceHighLow") return b.price - a.price;
    if (sortOption === "dateNewOld")
      return new Date(b.postedDate) - new Date(a.postedDate);
    if (sortOption === "dateOldNew")
      return new Date(a.postedDate) - new Date(b.postedDate);
    return 0;
  });

  // ✅ Filter by Property Name (case-insensitive)
  const filteredProperties = sortedProperties.filter((property) =>
    property.propertyName
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div>
      <title>HomeNest - All Properties</title>
      <section className="py-12 bg-linear-to-tl from-green-100 via-green-50 to-green-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-700 text-base-content dark:text-gray-200 transition-colors duration-300 px-15">
        <div className="container mx-auto px-4">
          {/* Header + Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-primary text-[#108251] dark:text-success">
              All Property Listings ({filteredProperties.length})
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              {/* Searchbar */}
              <div className="relative w-full sm:w-72 group">
                <FaSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#108251] transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by Property Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#108251] focus:border-[#108251] transition-all duration-300 placeholder-gray-400 font-secondary bg-white"
                />
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  className="select select-bordered w-56 dark:bg-gray-800 dark:text-white hover:border-[#108251] rounded-full font-secondary focus:outline-none focus:ring-2 focus:ring-[#108251] focus:border-[#108251] transition-all duration-300"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort by</option>
                  <option value="priceLowHigh">💰 Price: Low → High</option>
                  <option value="priceHighLow">💸 Price: High → Low</option>
                  <option value="dateNewOld">🕒 Date: New → Old</option>
                  <option value="dateOldNew">📅 Date: Old → New</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Cards */}
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property._id} {...property} />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 font-secondary">
                No properties found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProperties;
