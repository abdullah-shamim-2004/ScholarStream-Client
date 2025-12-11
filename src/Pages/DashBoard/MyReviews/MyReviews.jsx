import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useSecure from "../../../Hooks/useSecure/useSecure";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();

  const [selectedReview, setSelectedReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews?userEmail=${user.email}`);
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
  //Update the review
  const handleUpdateReview = async () => {
    const res = await axiosSecure.patch(`/my-reviews/${selectedReview._id}`, {
      rating: selectedReview.rating,
      comment: selectedReview.comment,
    });

    if (res.data.success) {
      toast.success("Review updated!");
      setShowEditModal(false);
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">My Reviews</h2>
      <ToastContainer />

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
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      setShowEditModal(true);
                      setSelectedReview(review);
                    }}
                  >
                    Edit
                  </button>

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

      {/* EDIT MODAL */}
      {showEditModal && (
        <dialog open className="modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateReview();
            }}
            className="modal-box"
          >
            <h3 className="font-bold text-lg mb-3">Edit Review</h3>

            {/* Rating */}
            <input
              type="number"
              min="1"
              max="5"
              className="input input-bordered w-full mb-3"
              value={selectedReview.rating}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  rating: Number(e.target.value),
                })
              }
            />

            {/* Comment */}
            <textarea
              className="textarea textarea-bordered w-full mb-3"
              value={selectedReview.comment}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  comment: e.target.value,
                })
              }
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyReviews;
