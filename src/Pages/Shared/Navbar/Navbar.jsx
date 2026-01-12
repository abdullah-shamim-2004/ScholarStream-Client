import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { FaSignOutAlt, FaThLarge, FaUserCircle } from "react-icons/fa";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, UserSignOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("Theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  // Scroll handler to toggle glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    UserSignOut()
      .then(() => {
        toast.success("You signed out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleToggle = (e) => {
    e.target.checked ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    localStorage.setItem("Theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const links = (
    <>
      <li>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/scholarships" className="nav-link">
          Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us" className="nav-link">
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar px-4 md:px-10 sticky top-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-base-100/70 backdrop-blur-xl border-b border-base-200 shadow-sm py-2"
          : "bg-base-100 py-4"
      }`}
    >
      <ToastContainer />
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-2xl border border-base-200"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 font-bold uppercase text-[12px] tracking-wider">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {/* Theme Controller */}
        <div className="flex items-center justify-center">
          <label className="swap swap-rotate hover:bg-base-200 p-2 rounded-full transition-all duration-300">
            <input
              onChange={handleToggle}
              type="checkbox"
              className="theme-controller"
              checked={theme === "dark"}
            />
            <svg
              className="swap-off h-6 w-6 fill-orange-500"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-6 w-6 fill-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* User Actions */}
        <div className="flex items-center">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar online hover:ring-offset-2 hover:ring-2 ring-primary transition-all duration-300 rounded-full"
              >
                <div className="w-10 rounded-full border-2 border-base-100 shadow-md">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-400 p-1 bg-gray-100" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow-2xl bg-base-100/95 backdrop-blur-xl border border-base-200 rounded-[1.5rem] z-[100] w-64 mt-4"
              >
                <div className="px-4 py-3 mb-2 border-b border-base-200">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    Account
                  </p>
                  <p className="text-sm font-black text-base-content truncate">
                    {user?.displayName || "User"}
                  </p>
                </div>
                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 font-semibold transition-colors"
                  >
                    <FaUserCircle size={18} className="text-primary/70" />
                    <span>My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 font-semibold transition-colors"
                  >
                    <FaThLarge size={18} className="text-primary/70" />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <div className="h-px bg-base-200 my-1 mx-2" />
                <li className="mt-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 font-bold group w-full"
                  >
                    <FaSignOutAlt
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="btn btn-ghost btn-sm px-4 rounded-full font-bold uppercase text-[11px] tracking-widest"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-primary btn-sm px-5 rounded-full shadow-lg shadow-primary/20 font-bold uppercase text-[11px] tracking-widest"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
