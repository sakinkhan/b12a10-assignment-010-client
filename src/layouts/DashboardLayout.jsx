import React, { useContext, useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import logoImg from "../assets/logo.png";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // In a real app, you'd get this from user metadata / backend
  const role = user?.role || "user"; // "user" | "admin"

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
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const userMenuItems = [
    { to: "/dashboard", label: "Dashboard Home" },
    { to: "/dashboard/add-property", label: "Add Property" },
    { to: "/dashboard/my-properties", label: "My Properties" },
    { to: "/dashboard/my-ratings", label: "My Ratings" },
    { to: "/dashboard/profile", label: "Manage Profile" },
  ];

  const adminMenuItems =
    role === "admin"
      ? [
          { to: "/dashboard/manage-users", label: "Manage Users" },
          { to: "/dashboard/all-properties", label: "All Properties" },
          { to: "/dashboard/site-settings", label: "Site Settings" },
        ]
      : [];

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Top Navbar */}
      <header className="w-full bg-base-100 shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
          {/* Left: Mobile menu button + Logo */}
          <div className="flex items-center gap-2 sm:gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-ghost btn-sm lg:hidden"
              aria-label="Toggle menu"
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo as Home ('/') button */}
            <Link
              to="/"
              className="flex items-center gap-1 sm:gap-2 hover:opacity-90"
            >
              <img src={logoImg} alt="Logo" className="w-7 sm:w-9" />
              <h1 className="font-primary font-bold text-base sm:text-xl">
                <span className="sm:inline">Home</span>
                <span className="text-[#108251]">Nest</span>
                <span className="hidden md:inline"> Dashboard</span>
              </h1>
            </Link>
          </div>

          {/* Right actions: Theme toggle + Back + Profile */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm sm:btn-md text-base sm:text-lg"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <BsMoonStarsFill className="text-gray-700" />
              ) : (
                <BsSunFill className="text-yellow-400" />
              )}
            </button>

            {/* Back to Website button - hidden on mobile */}
            <Link
              to="/"
              className="btn btn-outline btn-sm rounded-full border-[#22c55e] text-[#22c55e] font-primary hidden sm:inline-flex"
            >
              <span className="hidden md:inline">Back to Website</span>
              <span className="md:hidden">Back</span>
            </Link>

            {/* Profile dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar btn-sm sm:btn-md"
              >
                <div className="w-8 sm:w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user?.photoURL ||
                      "https://img.icons8.com/?size=48&id=kDoeg22e5jUY&format=png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow space-y-2 z-50"
              >
                <li className="pointer-events-none justify-center">
                  <span className="w-full text-center block font-semibold text-sm">
                    {user?.displayName || "User"}
                  </span>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className="btn btn-sm rounded-full text-sm bg-[#108251] hover:bg-[#48e9a8] text-white hover:text-black"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Manage Profile
                  </NavLink>
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
          </div>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6 gap-4 sm:gap-6 relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar - Drawer on mobile, always visible on desktop */}
        <aside
          className={`
            fixed lg:sticky top-0 lg:top-auto
            h-full lg:h-auto
            w-64 sm:w-72 lg:w-60
            bg-base-100 rounded-xl shadow-md p-4 space-y-4
            z-50 lg:z-auto
            transform transition-transform duration-300 ease-in-out
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Close button for mobile */}
          <div className="flex items-center justify-between mb-2 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User role menu: minimum 2 items */}
          <nav className="space-y-2">
            {userMenuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#108251] text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-base-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Admin / advanced role menu: minimum 3 items */}
          {adminMenuItems.length > 0 && (
            <div className="pt-4 border-t border-base-300">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Admin
              </p>
              <nav className="space-y-2">
                {adminMenuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#22c55e] text-white"
                          : "text-gray-700 hover:bg-base-200"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </aside>

        {/* Dashboard content */}
        <main className="flex-1 bg-base-100 rounded-xl shadow-md p-3 sm:p-4 md:p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
