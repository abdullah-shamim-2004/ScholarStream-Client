import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import Loader from "../../../Components/Loader/Loader";
// import AuthContext from "../../Context/AuthContext";
// import Loading from "../Loader/Loading";

const MyProfile = () => {
  const { user, setUser, loading, updateUser } = useAuth();
  const [showModal, setShowModal] = useState(false);

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
    return <Loader></Loader>
  } else {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
        <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-all duration-300">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} alt={user.displayName || "User"} />
              </div>
            </div>
          </figure>

          <div className="card-body text-center space-y-3">
            <h2 className="text-2xl font-bold text-primary">
              {user.displayName || "Unknown User"}
            </h2>
            <p className="text-sm text-gray-500">
              {user.email || "No email found"}
            </p>

            <div className="divider"></div>

            <div className="card-actions justify-center pt-3">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary w-full hover:scale-105 transition-all duration-200"
              >
                Edit Profile
              </button>
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
