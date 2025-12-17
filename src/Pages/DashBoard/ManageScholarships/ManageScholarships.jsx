import React from "react";
// import useAuth from "../../../Hooks/useAuth/useAuth";
// import useAxios from "../../../Hooks/useAxios/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import useSecure from "../../../Hooks/useSecure/useSecure";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const axiosSecure = useSecure();
  const {
    data: scholarships = [],
    isLoading,
    refetch,
    // error,
  } = useQuery({
    queryKey: ["Scholarship"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships`);
      return res.data.result;
    },
  });

  // Delete scholarship
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then((res) => {
          if (res.data.deletedCount) {
            // Refetch the data
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your scholarship has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>University</th>
            <th>Scholarship Name</th>
            <th>Fees</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((scholarship, index) => (
            <tr key={scholarship._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={scholarship.image} alt="University image" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {scholarship.universityName}
                    </div>
                    <div className="text-sm opacity-50">
                      {scholarship.country}, {scholarship.city}
                    </div>
                  </div>
                </div>
              </td>
              {/* scholarship name */}
              <td>
                {scholarship.scholarshipName}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {scholarship.subjectCategory},{" "}
                  {scholarship.scholarshipCategory}
                </span>
              </td>
              {/* Fees */}
              <td>
                tuition Fees: {scholarship.tuitionFees}
                <br />
                application Fees: {scholarship.applicationFees},<br></br>
                service Charge: {scholarship.serviceCharge}
              </td>
              <td>Deadline: {scholarship.deadline}</td>

              <th className="flex gap-2">
                <Link
                  to={`/dashboard/edit-scholarship/${scholarship._id}`}
                  className="btn btn-sm btn-outline btn-info"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(scholarship._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <MdDeleteForever size={20} />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScholarships;
