import React, { use, useEffect, useState } from "react";
import MyLink from "./MyLink";
import logoImg from "../assets/logo.png";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const links = (
    <>
      <MyLink to={"/"}>Home</MyLink>
      <MyLink to={"/allProperties"}>All Properties</MyLink>
      <MyLink to={"/addProperties"}>Add Properties</MyLink>
      <MyLink to={"/myProperties"}>My Properties</MyLink>
      <MyLink to={"/myRatings"}>My Ratings</MyLink>
    </>
  );

  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.error("You have been logged out");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-lg py-4 px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 shadow space-y-2 font-primary"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-1">
          <img src={logoImg} alt="Logo image" className="w-10" />
          <Link to={"/"} className="font-primary font-bold text-2xl">
            Home<span className="text-[#108251]">Nest</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1 font-primary">
          {links}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-45 p-2 shadow font-primary space-y-2"
            >
              <li>
                <a className="justify-between">DisplayName</a>
              </li>
              <li>
                <a className="justify-between">Email</a>
              </li>
              <li>
                <label className="flex justify-between items-center gap-3 font-primary">
                  Change Theme
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={localStorage.getItem("theme") === "dark"}
                    className="toggle toggle-sm"
                  />
                </label>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-error p-2">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to={"/login"}
              className="btn btn-outline btn-accent font-primary text-lg"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="btn btn-outline btn-info font-primary text-lg"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
