import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import Loader from "../../../Components/Loader/Loader";
import { Award, Briefcase } from "lucide";
import useRole from "../../../Hooks/useRole/useRole";
import { FaEdit } from "react-icons/fa";
// import AuthContext from "../../Context/AuthContext";
// import Loading from "../Loader/Loading";

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

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="mb-6 w-full flex justify-between items-center bg-white/80 backdrop-blur rounded-2xl px-6 py-4 shadow-sm ">
          <div>
            {" "}
            <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your personal information
            </p>
          </div>
          <div>
            <FaEdit
              onClick={() => setShowModal(true)}
              className="hover:text-primary cursor-pointer transition-all scale-110"
              size={25}
            />
          </div>
        </div>

        {/* Profile Layout */}
        <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
          {/* Left Profile Card */}
          <div className="bg-white rounded-2xl  shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300">
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-primary to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-white p-1">
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-gray-900">
              {user.displayName || "Unknown User"}
            </h2>

            {/* Email */}
            <p className="text-sm text-gray-500 mt-1 mb-4">
              {user.email || "No email found"}
            </p>

            {/* Role Badge */}
            <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase bg-primary/10 text-primary">
              {role}
            </span>
          </div>

          {/* Right Details Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Bio & Other Details
              </h2>

              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                Active
              </span>
            </div>

            <div className="my-6 h-px bg-gray-200"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Role */}
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-semibold text-gray-900 uppercase">{role}</p>
              </div>

              {/* Country */}
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-semibold text-gray-900 uppercase">
                  Bangladesh
                </p>
              </div>

              {/* University */}
              <div>
                <p className="text-sm text-gray-500">University / College</p>
                <p className="font-semibold text-gray-900">
                  Chandpur Polytecnical Institute
                </p>
              </div>

              {/* Department */}
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-semibold text-gray-900">
                  Computer Science & Engineering
                </p>
              </div>

              {/* Joined Date */}
              <div>
                <p className="text-sm text-gray-500">Joined On</p>
                <p className="font-semibold text-gray-900">January 15, 2024</p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-900">+880 1XXX-XXXXXX</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border p-4 text-center hover:bg-gray-50 transition">
                <p className="text-2xl font-bold text-primary">05</p>
                <p className="text-sm text-gray-500">Applications</p>
              </div>

              <div className="rounded-xl border p-4 text-center hover:bg-gray-50 transition">
                <p className="text-2xl font-bold text-primary">03</p>
                <p className="text-sm text-gray-500">Paid</p>
              </div>

              <div className="rounded-xl border p-4 text-center hover:bg-gray-50 transition">
                <p className="text-2xl font-bold text-primary">02</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <dialog
            open
            className="modal modal-botto items-center text-center sm:modal-middle"
          >
            <div className="modal-box items-center text-center">
              <h3 className="font-bold text-lg mb-4 text-center text-primary">
                Update Profile
              </h3>

              <form
                onSubmit={handleUpdateProfile}
                className="fieldset text-center items-center"
              >
                <div className="card-body">
                  {/* Name */}
                  <label className="label ">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input w-full"
                    placeholder="Enter Your Name"
                  />
                  {/* photo url */}
                  <label className="label">Photo URL</label>
                  <input
                    name="photo"
                    type="name"
                    className="input w-full"
                    placeholder="photo url"
                  />
                </div>
                <div className="modal-action flex justify-center items-center">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn"
                  >
                    Cancel
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
