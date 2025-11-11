import React, { useState } from "react";

const SearchBar = () => {
  const [price, setPrice] = useState(250000);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto font-secondary">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <select className="select select-bordered w-full">
            <option>Any Location</option>
            <option>Adelaide</option>
            <option>Brisbane</option>
            <option>Canberra</option>
            <option>Melbourne</option>
            <option>Perth</option>
            <option>Sydney</option>
          </select>

          <select className="select select-bordered w-full">
            <option>Any Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Unit</option>
            <option>Land</option>
          </select>

          <select className="select select-bordered w-full">
            <option>Any Status</option>
            <option>For Rent</option>
            <option>For Sale</option>
          </select>
          <button
            type="submit"
            className="hidden md:block btn bg-[#108251] hover:bg-[#48e9a8] hover:border-0 hover:text-black duration-200 text-white font-semibold w-full"
          >
            SEARCH
          </button>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setShowMore((s) => !s)}
            className="text-[#1bb6b8] text-sm hover:underline transition-colors duration-300 text-left"
          >
            {showMore ? "- Fewer options" : "+ More options"}
          </button>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden transition-all duration-500 ${
            showMore ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <select className="select select-bordered w-full">
            <option>Beds</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5/5+</option>
          </select>

          <select className="select select-bordered w-full">
            <option>Baths</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
          </select>
          {/* Price Range */}
          <div className="md:col-span-2 flex flex-col justify-center gap-1">
            <label className="font-medium text-gray-600 -mt-1">
              Price Range:{" "}
              <span className="text-[#108251]">${price.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="range range-sm range-success w-full"
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="block md:hidden btn bg-[#108251] hover:bg-[#0d6b43] text-white font-semibold w-full"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
