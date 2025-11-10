import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `text-lg font-primary transition-colors duration-200
            hover:text-[#108251]
            ${isActive ? "font-extrabold text-[#108251]" : ""}
            ${className || ""}
          `
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default MyLink;
