import React, { useEffect, useState, useContext } from "react";
import MyLink from "./MyLink";
import logoImg from "../assets/logo.png";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => toast.error("You have been logged out"))
      .catch((err) => console.log(err));
  };

  const publicLinks = (
    <>
      <MyLink to="/">Home</MyLink>
      <MyLink to="/allProperties">All Properties</MyLink>
    </>
  );

  const protectedLinks = null;

  return (
    <div className="navbar bg-base-100 shadow-lg py-4 pr-4 md:px-20 sticky top-0 z-50">
      {/* Left: Logo + Dropdown Menu */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow space-y-2 font-primary"
          >
            {publicLinks}
            {protectedLinks}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-1">
          <img src={logoImg} alt="Logo image" className="w-10" />
          <Link to="/" className="font-primary font-bold text-2xl">
            Home<span className="text-[#108251]">Nest</span>
          </Link>
        </div>
      </div>

      {/* Center: Navigation (desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1 font-primary">
          {publicLinks}
          {protectedLinks}
        </ul>
      </div>

      {/* Right: Theme, Login/Signup or Profile */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme toggle (visible everywhere) */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-lg"
        >
          {theme === "light" ? (
            <BsMoonStarsFill className="text-gray-700" />
          ) : (
            <BsSunFill className="text-yellow-400" />
          )}
        </button>

        {/* Logged-in user */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user.photoURL ||
                    "https://img.icons8.com/?size=48&id=kDoeg22e5jUY&format=png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-48 p-2 shadow font-primary space-y-2"
            >
              <li className="pointer-events-none justify-center">
                <span className="w-full text-center block font-semibold text-sm">
                  {user?.displayName}
                </span>
              </li>
              {!location.pathname.startsWith("/dashboard") && (
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="btn btn-sm rounded-full text-sm bg-[#108251] hover:bg-[#48e9a8] text-white hover:text-black"
                  >
                    Manage Profile
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/dashboard"
                  className="btn btn-outline btn-sm border-[#22c55e] text-[#22c55e] rounded-full font-primary border-2 text-sm w-full justify-center"
                >
                  My Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm text-white text-sm rounded-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-outline border-[#22c55e] text-[#22c55e] rounded-full font-primary border-2 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-info rounded-full font-primary border-2 text-sm text-white"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Dropdown */}
            <div className="dropdown dropdown-end lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 shadow space-y-2"
              >
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
