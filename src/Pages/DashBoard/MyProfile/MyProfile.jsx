import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import Loader from "../../../Components/Loader/Loader";
import { Award, Briefcase } from "lucide";
import useRole from "../../../Hooks/useRole/useRole";
import { FaAward, FaEdit, FaUserTag } from "react-icons/fa";
// import AuthContext from "../../Context/AuthContext";
// import Loading from "../Loader/Loading";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPhoneAlt,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user, setUser, loading, updateUser } = useAuth();
  const { role } = useRole();
  const [showModal, setShowModal] = useState(false);
  // console.log(user);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const photoURL = form.photo.value;
    updateUser({
      displayName,
      photoURL,
    })
      .then(() => {
        setUser({ ...user, displayName, photoURL });
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        setUser(user);
      });
  };
  // Info Items
  const InfoItem = ({ icon, label, value, isUpper }) => (
    <div className="flex items-start gap-4 group">
      <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p
          className={`font-bold text-base-content ${
            isUpper ? "uppercase" : ""
          } leading-tight`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w- mb-2.5 flex justify-between items-center bg-base-100 border border-base-200 rounded-[2rem] px-8 py-6 shadow-sm"
        >
          <div>
            <h2 className="text-3xl font-black text-base-content tracking-tight">
              Account Profile
            </h2>
            <p className="text-sm text-base-content/60 font-medium">
              Manage your personal settings and verified information
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-circle btn-primary btn-outline border-2 hover:shadow-lg hover:shadow-primary/30 transition-all group"
          >
            <FaEdit
              className="group-hover:rotate-12 transition-transform"
              size={20}
            />
          </button>
        </motion.div>
        {/* --- PROFILE LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl p-10 flex flex-col items-center text-center relative overflow-hidden group"
          >
            {/* Decorative Background Blob */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>

            {/* Avatar with Ring Animation */}
            <div className="relative mb-8">
              <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-primary via-blue-400 to-secondary p-1.5 shadow-2xl animate-spin-slow">
                <div className="w-full h-full rounded-full bg-base-100 p-1">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover shadow-inner"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-base-100 rounded-full"></div>
            </div>

            <h2 className="text-2xl font-black text-base-content tracking-tighter italic">
              {user.displayName || "Unknown User"}
            </h2>
            <div className="flex items-center gap-2 text-base-content/60 text-sm mt-1 mb-6">
              <FaEnvelope className="text-primary/70" />
              <span>{user.email}</span>
            </div>

            {/* Premium Role Badge */}
            <div className="px-6 py-2 rounded-2xl bg-primary/10 border border-primary/20">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                {role} Account
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Detailed Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl p-8 md:p-12 relative"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-base-content flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Personal Credentials
              </h3>
              <span className="badge badge-success badge-outline font-bold px-4 py-3">
                ● Verified Profile
              </span>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              <InfoItem
                icon={<FaMapMarkerAlt />}
                label="Country"
                value="Bangladesh"
              />
              <InfoItem
                icon={<FaGraduationCap />}
                label="University"
                value="Chandpur Polytecnical Institute"
              />
              <InfoItem
                icon={<FaAward />}
                label="Department"
                value="Computer Science & Engineering"
              />
              <InfoItem
                icon={<FaCalendarAlt />}
                label="Joined On"
                value="January 15, 2024"
              />
              <InfoItem
                icon={<FaPhoneAlt />}
                label="Phone Number"
                value="+880 1XXX-XXXXXX"
              />
              <InfoItem
                icon={<FaUserTag />}
                label="Access Level"
                value={role}
                isUpper
              />
            </div>
          </motion.div>
        </div>

        {showModal && (
          <dialog
            open
            className="modal modal-botto items-center text-center sm:modal-middle"
          >
            <div className="modal-box bg-base-100 rounded-[2.5rem] p-8 border border-base-200 shadow-2xl max-w-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="font-black text-2xl text-base-content tracking-tight">
                  Update <span className="text-primary">Profile</span>
                </h3>
                <p className="text-xs text-base-content/50 uppercase font-bold tracking-widest mt-1">
                  Personal Information
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="form-control w-full">
                    <label className="label font-bold text-xs uppercase text-base-content/60">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={user?.displayName}
                      className="input input-bordered bg-base-200/50 focus:border-primary rounded-xl font-semibold"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Photo URL */}
                  <div className="form-control w-full">
                    <label className="label font-bold text-xs uppercase text-base-content/60">
                      Photo URL
                    </label>
                    <input
                      name="photo"
                      type="text"
                      defaultValue={user?.photoURL}
                      className="input input-bordered bg-base-200/50 focus:border-primary rounded-xl font-semibold"
                      placeholder="https://example.com/photo.jpg"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-control w-full">
                    <label className="label font-bold text-xs uppercase text-base-content/60">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      defaultValue={user?.phoneNumber || ""}
                      className="input input-bordered bg-base-200/50 focus:border-primary rounded-xl font-semibold"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>

                  {/* Country */}
                  <div className="form-control w-full">
                    <label className="label font-bold text-xs uppercase text-base-content/60">
                      Country
                    </label>
                    <input
                      name="country"
                      type="text"
                      defaultValue="Bangladesh"
                      className="input input-bordered bg-base-200/50 focus:border-primary rounded-xl font-semibold"
                    />
                  </div>

                  {/* University */}
                  <div className="form-control w-full md:col-span-2">
                    <label className="label font-bold text-xs uppercase text-base-content/60">
                      University / College
                    </label>
                    <input
                      name="university"
                      type="text"
                      defaultValue="National University"
                      className="input input-bordered bg-base-200/50 focus:border-primary rounded-xl font-semibold"
                    />
                  </div>

                  {/* Department */}
                  <div className="form-control w-full md:col-span-2">
                    <label className="label font-bold text-xs uppercase text-base-content/60">
                      Department
                    </label>
                    <input
                      name="department"
                      type="text"
                      defaultValue="Computer Science & Engineering"
                      className="input input-bordered bg-base-200/50 focus:border-primary rounded-xl font-semibold"
                    />
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="modal-action flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-ghost flex-1 rounded-xl font-bold border border-base-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1 rounded-xl text-white font-black shadow-lg shadow-primary/30"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    );
  }
};

export default MyProfile;
