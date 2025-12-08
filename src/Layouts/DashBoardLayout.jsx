import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaSlidersH, FaUser } from "react-icons/fa";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { TiDocumentAdd } from "react-icons/ti";
import { Link, NavLink, Outlet } from "react-router";

const DashBoardLayout = () => {
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
          <div className="px-4">ScholarStream DashBoard</div>
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
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <IoMdHome size={20} />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
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
            {/* AddScholarShip */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Scholarship"
                to="/dashboard/add-scholarship
"
              >
                <TiDocumentAdd size={20} />
                <span className="is-drawer-close:hidden">Add ScholarShip</span>
              </NavLink>
            </li>

            {/* Users Managment  */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Users Managment "
                to="/dashboard/users-managment 
"
              >
                <FaUser size={20} />
                <span className="is-drawer-close:hidden">Users Managment </span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <IoMdSettings size={20} />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
