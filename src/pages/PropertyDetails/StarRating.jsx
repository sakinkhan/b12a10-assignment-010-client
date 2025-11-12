import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({
  count = 5,
  value = 0,
  onChange,
  size = 24,
  readOnly = false,
}) => {
  const [hover, setHover] = useState(null);

  const handleClick = (index) => {
    if (!readOnly && onChange) onChange(index + 1);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: count }, (_, index) => {
        const filled = hover !== null ? index <= hover : index < value;
        return (
          <FaStar
            key={index}
            size={size}
            className={`transition-transform duration-150 ${
              filled ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
            } ${
              !readOnly ? "cursor-pointer hover:scale-110" : "cursor-default"
            }`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readOnly && setHover(index)}
            onMouseLeave={() => !readOnly && setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
