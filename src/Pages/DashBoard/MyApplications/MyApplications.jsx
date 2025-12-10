import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useSecure from "../../../Hooks/useSecure/useSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setshowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });

  // Get all application of the user
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-applications?userEmail=${user.email}`
      );
      return res.data.applications || [];
    },
  });

  // Handle payment
  const handlePay = async (application) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        scholarshipId: application.scholarshipId,
        applicationId: application._id,
        scholarshipName: application.scholarshipName,
        universityName: application.universityName,
        amount: application.amount,
        studentEmail: application.userEmail,
      });
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Delete
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
        const res = await axiosSecure.delete(`/my-applications/${id}`);
        if (res.data.success) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your application has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };
  // Handle create review

  const handleReview = async (appliInfo) => {
    try {
      const payload = {
        scholarshipId: appliInfo.scholarshipId,
        universityName: appliInfo.universityName,
        userName: user.displayName,
        userEmail: user.email,
        userImage: user.photoURL,
        rating: reviewData.rating,
        comment: reviewData.comment,
      };

      const res = await axiosSecure.post("/my-reviews", payload);

      if (res.data.success) {
        toast.success("Review submitted successfully!");
        setReviewData({ rating: "", comment: "" });
        setShowReviewModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review!");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Application Fees</th>
              <th>Payment Status</th>
              <th>Application Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id} className="border">
                <td>{index + 1}</td>
                <td>{application.scholarshipName}</td>
                <td>{application.universityName}</td>
                <td>${application.amount || 0}</td>
                <td
                  className={`font-semibold ${
                    application.paymentStatus === "paid"
                      ? "text-green-400 "
                      : "text-red-500"
                  }`}
                >
                  {application.paymentStatus}
                </td>
                <td
                  className={`font-semibold ${
                    application.ApplicationStatus === "completed"
                      ? "text-green-400 "
                      : "text-yellow-500"
                  }`}
                >
                  {application.ApplicationStatus}
                </td>
                <td>{application.feedback || "No feedback yet"}</td>

                <td className="flex flex-col md:flex-row gap-2 ">
                  {/* DETAILS BUTTON */}
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      setshowDetailsModal(true),
                        setSelectedApplication(application);
                    }}
                  >
                    Details
                  </button>

                  {/* EDIT BUTTON*/}
                  {application.ApplicationStatus === "pending" && (
                    <button className="btn btn-sm btn-warning">Edit</button>
                  )}

                  {/* PAY BUTTON */}
                  {application.ApplicationStatus === "pending" &&
                    application.paymentStatus === "unpaid" && (
                      <button
                        onClick={() => handlePay(application)}
                        className="btn btn-sm btn-success"
                      >
                        Pay
                      </button>
                    )}

                  {/* DELETE BUTTON */}
                  {application.ApplicationStatus === "pending" && (
                    <button
                      onClick={() => {
                        handleDelete(application._id);
                      }}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  )}

                  {/* ADD REVIEW BUTTON */}
                  {application.ApplicationStatus === "completed" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setShowReviewModal(true);
                        setSelectedApplication(application);
                      }}
                    >
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      {showDetailsModal && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="text-xl font-bold mb-2">Application Details</h3>

            <p>
              <b>Scholarship:</b> {selectedApplication.scholarshipName}
            </p>
            <p>
              <b>University:</b> {selectedApplication.universityName}
            </p>

            <p>
              <b>Payment Status:</b> {selectedApplication.paymentStatus}
            </p>
            <p>
              <b>Application Status:</b> {selectedApplication.ApplicationStatus}
            </p>
            <p>
              <b>Amount:</b> ${selectedApplication.amount || 0}
            </p>
            <p>
              <b>Feedback:</b>{" "}
              {selectedApplication.feedback || "No feedback yet"}
            </p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setshowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* REVIEW MODAL */}
      {showReviewModal && (
        <dialog
          onSubmit={(e) => {
            e.preventDefault();
            handleReview(selectedApplication);
          }}
          open
          className="modal"
        >
          <form className="modal-box max-w-md">
            <h3 className="text-xl font-black">Add Review</h3>

            <div className="mt-3">
              <label className="font-semibold">Rating (1–5):</label>
              <input
                type="number"
                min="1"
                max="5"
                className="input input-bordered w-full"
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({ ...reviewData, rating: e.target.value })
                }
              />
            </div>

            <div className="mt-3">
              <label className="font-semibold">Comment:</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-primary">Submit Review</button>
              <button className="btn" onClick={() => setShowReviewModal(false)}>
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
