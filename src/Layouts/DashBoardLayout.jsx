import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegFileAlt, FaSlidersH, FaUser } from "react-icons/fa";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { MdEditDocument, MdSchool } from "react-icons/md";
import {
  RiChatSettingsFill,
  RiFileSettingsLine,
  RiMessageLine,
} from "react-icons/ri";
import { TiDocumentAdd } from "react-icons/ti";
import { NavLink, Outlet } from "react-router";
import useRole from "../Hooks/useRole/useRole";
import { GoGraph } from "react-icons/go";

const DashBoardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open max-w-screen-2xl mx-auto bg-[#eaeced]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <FaSlidersH />
          </label>
          <div className="flex items-center gap-2 font-semibold">
            <MdSchool size={22} />
            ScholarStream Dashboard
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-5">
            {/* Website Home */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home page"
              >
                <MdSchool size={20} />
                <span className="is-drawer-close:hidden">
                  Scholar<span className="text-primary">Stream</span>
                </span>
              </NavLink>
            </li>
            {/* Dashboard Home */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="DashBoard Home"
              >
                <IoMdHome size={20} />
                <span className="is-drawer-close:hidden"> Home</span>
              </NavLink>
            </li>
            {/* My Profile*/}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
                to="/dashboard/my-profile
"
              >
                <CgProfile size={20} />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>
            {role === "admin" && (
              <>
                <h2 className=" text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin Panel
                </h2>
                {/* Add ScholarShip */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Scholarship"
                    to="/dashboard/add-scholarship
"
                  >
                    <TiDocumentAdd size={20} />
                    <span className="is-drawer-close:hidden">
                      Add ScholarShip
                    </span>
                  </NavLink>
                </li>
                {/* Manage ScholarShip */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Scholarship"
                    to="/dashboard/manage-scholarship
"
                  >
                    <MdEditDocument size={20} />
                    <span className="is-drawer-close:hidden">
                      Manage ScholarShip
                    </span>
                  </NavLink>
                </li>

                {/* Users Managment  */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Managment "
                    to="/dashboard/users-managment"
                  >
                    <FaUser size={20} />
                    <span className="is-drawer-close:hidden">
                      Users Managment{" "}
                    </span>
                  </NavLink>
                </li>
                {/* Data analys */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Data Analytics"
                    to="/dashboard/data-analytics"
                  >
                    <GoGraph size={20} />
                    <span className="is-drawer-close:hidden">
                      Data Analytics
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {(role === "admin" || role === "moderator") && (
              <>
                <h2 className=" text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Moderator Panel
                </h2>
                {/* Application Managment  */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Application Managment "
                    to="/dashboard/all-applications 
"
                  >
                    <RiChatSettingsFill size={20} />
                    <span className="is-drawer-close:hidden">
                      Application Managment{" "}
                    </span>
                  </NavLink>
                </li>
                {/* All Reviews */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Reviews"
                    to="/dashboard/all-reviews 
"
                  >
                    <RiFileSettingsLine size={20} />
                    <span className="is-drawer-close:hidden">All Reviews</span>
                  </NavLink>
                </li>
              </>
            )}
            <h2 className=" text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Student panel
            </h2>
            {/* My applications */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Applications"
                to="/dashboard/my-applications 
"
              >
                <FaRegFileAlt size={20} />
                <span className="is-drawer-close:hidden">My Applications</span>
              </NavLink>
            </li>
            {/* My reviews */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Reviews"
                to="/dashboard/my-reviews 
"
              >
                <RiMessageLine size={20} />
                <span className="is-drawer-close:hidden">My Reviews</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
