import React from "react";
import useRole from "../../../Hooks/useRole/useRole";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { MdAdminPanelSettings, MdSchool } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import Loader from "../../../Components/Loader/Loader";

const DashBoardHome = () => {
  const { role } = useRole();
  const { user, loading } = useAuth();

  const roleConfig = {
    admin: {
      title: "Admin Dashboard",
      subtitle: "Manage scholarships, users & analytics and so on.",
      icon: <MdAdminPanelSettings size={36} />,
      bg: "from-indigo-500 to-purple-600",
      moderatorEmail: "moderator@gmail.com",
      moderatorPassword: "1234Asdf",
    },
    moderator: {
      title: "Moderator Dashboard",
      subtitle: "Manage applications & Reviews and so on. ",
      icon: <RiShieldUserFill size={36} />,
      bg: "from-emerald-500 to-teal-600",
    },
    student: {
      title: "Student Dashboard",
      subtitle: "Track your applications & reviews",
      icon: <MdSchool size={36} />,
      bg: "from-sky-500 to-blue-600",
    },
  };

  const current = roleConfig[role || "student"];
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div
        className={`w-full max-w-2xl rounded-2xl p-6 md:p-8 text-white shadow-xl bg-gradient-to-r ${current.bg}`}
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-white/40 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
              />
            </div>
          </div>

          {/* user info*/}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome, {user?.displayName || "User"}
            </h1>
            <p className="text-sm md:text-base opacity-90 mt-1">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Role Badge */}
        <div className="mt-4 flex items-center gap-2">
          <div className="bg-white/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
            {role || "student"}
          </div>
          <div className="bg-white/10 p-2 rounded-lg">{current.icon}</div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white/10 rounded-xl p-4 text-sm">
          <p>
            Use the sidebar to explore dashboard features based on your role.
          </p>
        </div>
        {role === "admin" && (
          <div className="p-2 bg-white/10 rounded-xl mt-3 ">
            <h2 className="font-semibold">
              Here is Moderator Email and Password , if You need :{" "}
            </h2>
            <h2>Email: {current.moderatorEmail} </h2>
            <h2>Password: {current.moderatorPassword} </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardHome;
