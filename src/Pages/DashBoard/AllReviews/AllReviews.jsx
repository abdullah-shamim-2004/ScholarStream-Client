import React from "react";
import useSecure from "../../../Hooks/useSecure/useSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const AllReviews = () => {
  const axiosSecure = useSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-reviews");
      return res.data.reviews || [];
    },
  });


  if (isLoading) return <Loader />;
  // Delete the review
  const handleDelete = async (id) => {
    const Conferm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (Conferm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/my-reviews/${id}`);
        if (res.data.success) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">All Reviews</h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Review Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.scholarshipName || "N/A"}</td>
                <td>{review.universityName}</td>
                <td>{review.comment}</td>
                <td>{review.rating} ⭐</td>
                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>

                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
