import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import useSecure from "../../../Hooks/useSecure/useSecure";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlinePersonRemove } from "react-icons/md";
import Loader from "../../../Components/Loader/Loader";


const ManageUser = () => {
  const axiosSecure = useSecure();
  const {
    refetch,
    isLoading,
    data: users = [],
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  const UserRole = async (user, role) => {
    const userInfo = { role };

    const result = await Swal.fire({
      title: `Are you sure you want to set this user role to: ${role}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, userInfo);

      if (res.data?.result?.modifiedCount > 0) {
        Swal.fire({
          title: "Confirmed!",
          text: `${user.displayName} is now an ${role}.`,
          icon: "success",
        });
        await refetch();
      } else {
        Swal.fire({
          title: "No Changes!",
          text: "It seems this user already has this role.",
          icon: "info",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  // Make admin
  const handleMakeAdmin = (user) => {
    UserRole(user, "admin");
  };
  //Make moderator
  const handleMakemoderator = (user) => {
    UserRole(user, "moderator");
  };
  // Remove from admin or moderator
  const handleSetStudent = (user) => {
    UserRole(user, "student");
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-4xl">Manage Users {users?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex flex-col md:flex-row gap-2">
                  {/* Moderator */}
                  {user.role === "moderator" ? (
                    <button
                      onClick={() => {
                        handleSetStudent(user);
                      }}
                      className="btn btn-outline btn-error"
                    >
                      Remove Moderator <MdOutlinePersonRemove size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleMakemoderator(user);
                      }}
                      className="btn btn-outline btn-success"
                    >
                      Make Moderator <RiAdminLine size={20} />
                    </button>
                  )}
                  {/* Admin */}
                  {user.role === "admin" ? (
                    <button
                      onClick={() => {
                        handleSetStudent(user);
                      }}
                      className="btn btn-outline btn-error"
                    >
                      Remove Admin <FiShieldOff size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user);
                      }}
                      className="btn btn-outline btn-success"
                    >
                      Make Admin <FaUserShield size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
