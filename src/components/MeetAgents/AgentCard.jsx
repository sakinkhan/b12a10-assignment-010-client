import React from "react";

const AgentCard = ({ name, role, imageUrl, ringColor }) => {
  return (
    <div className="flex flex-col items-center p-4 text-center bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700  transform hover:scale-105 cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl rounded-xl">
      <div className="avatar relative mb-4">
        <div
          className={`w-32 h-32 rounded-full border-4 ${ringColor} border-opacity-50`}
        >
          <img
            src={imageUrl}
            alt={`Profile of ${name}`}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-1">
        {name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
    </div>
  );
};

export default AgentCard;
