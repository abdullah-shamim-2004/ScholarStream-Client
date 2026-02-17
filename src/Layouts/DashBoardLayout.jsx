import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegFileAlt, FaSlidersH, FaUser, FaUserCircle } from "react-icons/fa";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { MdEditDocument, MdSchool } from "react-icons/md";
import {
  RiChatSettingsFill,
  RiFileSettingsLine,
  RiMessageLine,
} from "react-icons/ri";
import { TiDocumentAdd } from "react-icons/ti";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../Hooks/useRole/useRole";
import { GoGraph } from "react-icons/go";
import useAuth from "../Hooks/useAuth/useAuth";
import Loader from "../Components/Loader/Loader";

const DashBoardLayout = () => {
  const { role } = useRole();
  const { user, loading } = useAuth();
  if (loading) return <Loader></Loader>;
  return (
    <div className="drawer lg:drawer-open max-w-screen-2xl mx-auto bg-base-200/50 min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* --- MODERN NAVBAR --- */}
        <nav className="navbar w-full bg-base-100/80 backdrop-blur-md sticky top-0 z-30 border-b border-base-300 px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-primary"
            >
              <FaSlidersH size={20} />
            </label>
          </div>
          {/* Dashboard Logo */}
          <div className="flex-1 px-2 mx-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg lg:hidden">
                <MdSchool className="text-primary" size={24} />
              </div>
              <h1 className="text-lg font-black tracking-tight text-base-content uppercase">
                Dashboard <span className="text-primary/50">/</span>{" "}
                <span className="text-sm font-semibold normal-case opacity-70">
                  Overview
                </span>
              </h1>
            </div>
          </div>

          {/* Profile */}
          <div className="flex-none gap-4">
            <div className="avatar placeholder online">
              <div className="bg-neutral text-neutral-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400 p-1 bg-gray-100" />
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* --- PAGE CONTENT --- */}
        <main className="p-6 flex-grow">
          <Outlet />
        </main>
      </div>

      {/* --- SIDEBAR --- */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col bg-base-100 border-r border-base-300 w-64">
          {/* Sidebar Header/Logo */}
          <div className="p-6 mb-2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                <MdSchool className="text-white" size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter text-base-content">
                Scholar<span className="text-primary">Stream</span>
              </span>
            </Link>
          </div>

          {/* Sidebar Menu */}
          <ul className="menu w-full px-4 grow gap-1.5 overflow-y-auto">
            {/* General Section */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className="flex items-center gap-3 py-3 rounded-xl transition-all"
              >
                <IoMdHome size={22} className="opacity-70" />
                <span className="font-bold">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className="flex items-center gap-3 py-3 rounded-xl transition-all"
              >
                <CgProfile size={22} className="opacity-70" />
                <span className="font-bold">My Profile</span>
              </NavLink>
            </li>

            {/* Admin Section */}
            {role === "admin" && (
              <>
                <div className="mt-6 mb-2 px-4">
                  <span className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">
                    Admin Management
                  </span>
                </div>
                <li>
                  <NavLink
                    to="/dashboard/add-scholarship"
                    className="flex items-center gap-3 py-3 rounded-xl"
                  >
                    <TiDocumentAdd size={22} />
                    <span className="font-semibold">Add Scholarship</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-scholarship"
                    className="flex items-center gap-3 py-3 rounded-xl"
                  >
                    <MdEditDocument size={22} />
                    <span className="font-semibold">Manage Scholarship</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users-managment"
                    className="flex items-center gap-3 py-3 rounded-xl"
                  >
                    <FaUser size={18} />
                    <span className="font-semibold">User Control</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/data-analytics"
                    className="flex items-center gap-3 py-3 rounded-xl"
                  >
                    <GoGraph size={20} />
                    <span className="font-semibold">Analytics</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Moderator Section */}
            {(role === "admin" || role === "moderator") && (
              <>
                <div className="mt-6 mb-2 px-4">
                  <span className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">
                    Operations
                  </span>
                </div>
                <li>
                  <NavLink
                    to="/dashboard/all-applications"
                    className="flex items-center gap-3 py-3 rounded-xl"
                  >
                    <RiChatSettingsFill size={22} />
                    <span className="font-semibold">Applications</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-reviews"
                    className="flex items-center gap-3 py-3 rounded-xl"
                  >
                    <RiFileSettingsLine size={22} />
                    <span className="font-semibold">Review Center</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Student Section */}
            <div className="mt-6 mb-2 px-4">
              <span className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">
                Student Portal
              </span>
            </div>
            <li>
              <NavLink
                to="/dashboard/my-applications"
                className="flex items-center gap-3 py-3 rounded-xl"
              >
                <FaRegFileAlt size={20} />
                <span className="font-semibold">My Submissions</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-reviews"
                className="flex items-center gap-3 py-3 rounded-xl"
              >
                <RiMessageLine size={20} />
                <span className="font-semibold">Feedback</span>
              </NavLink>
            </li>
          </ul>

          {/* Footer Side (Optional: Settings or Logout link could go here) */}
          <div className="p-4 border-t border-base-200">
            <div className="flex items-center gap-3 p-2 bg-base-200 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
                {role[0].toUpperCase()}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold capitalize">{role} Account</p>
                <p className="text-[10px] opacity-50">Active Status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
