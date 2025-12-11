import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useSecure from "../../../Hooks/useSecure/useSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();

  const [selectedReview, setSelectedReview] = useState(null);

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
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    const res = await axiosSecure.delete(`/my-reviews/${id}`);
    if (res.data.success) {
      toast.success("Review deleted!");
      refetch();
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
      setSelectedReview(null);
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">My Reviews</h2>

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
                    onClick={() => setSelectedReview(review)}
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
      {selectedReview && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Edit Review</h3>

            <input
              type="number"
              min="1"
              max="5"
              className="input input-bordered w-full mb-3"
              value={selectedReview.rating}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  rating: e.target.value,
                })
              }
            />

            <textarea
              className="textarea textarea-bordered w-full mb-3"
              value={selectedReview.comment}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  reviewCocommentmment: e.target.value,
                })
              }
            ></textarea>

            <div className="flex justify-end gap-3">
              <button className="btn" onClick={() => setSelectedReview(null)}>
                Cancel
              </button>

              <button className="btn btn-primary" onClick={handleUpdateReview}>
                Update
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyReviews;
