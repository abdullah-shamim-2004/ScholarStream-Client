import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useSecure from "../../../Hooks/useSecure/useSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-applications?userEmail=${user.email}`
      );
      return res.data.applications || [];
    },
  });
  console.log(applications);

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>scholarship Name</th>
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
                <td className="font-semibold">{application.paymentStatus}</td>
                <td className="font-semibold">
                  {application.ApplicationStatus}
                </td>
                <td>{application.feedback || "No feedback yet"}</td>

                <td className="space-x-2">
                  {/* DETAILS BUTTON */}
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedApplication(application)}
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
                      <button className="btn btn-sm btn-success">Pay</button>
                    )}

                  {/* DELETE BUTTON */}
                  {application.ApplicationStatus === "pending" && (
                    <button className="btn btn-sm btn-error">Delete</button>
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
      {selectedApplication && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="text-xl font-bold mb-2">Application Details</h3>

            <p>
              <b>Scholarship:</b> {selectedApplication.scholarshipName}
            </p>
            <p>
              <b>University:</b> {selectedApplication.universityName}
            </p>
            {/* <p>
              <b>Subject Category:</b> {selectedApplication.subjectCategory || "N/A"}
            </p> */}
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
              <b>Feedback:</b> {selectedApplication.feedback || "No feedback yet"}
            </p>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedApplication(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* REVIEW MODAL */}
      {showReviewModal && (
        <dialog open className="modal">
          <div className="modal-box max-w-md">
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
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
