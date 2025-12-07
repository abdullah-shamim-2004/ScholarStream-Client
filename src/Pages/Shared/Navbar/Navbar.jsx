import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, UserSignOut } = useAuth();

  const handleSignOut = () => {
    UserSignOut()
      .then(() => {
        toast.success("You signed out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10 sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-1.5">
          {/* <FaUtensils className="text-2xl text-secondary" /> */}
          <Link to="/" className="normal-case text-2xl font-bold">
            Scholar<span className="text-primary">Stream</span>
          </Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
      </div>

      {/* User Section */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "No User"}
              >
                {user.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName || "User"}
                    className="w-10 h-10 rounded-full border cursor-pointer"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-gray-600 cursor-pointer" />
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
            >
              <li>
                <NavLink to="/dashboard">DashBoard</NavLink>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/auth/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-outline btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
