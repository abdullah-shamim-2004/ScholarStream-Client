import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../Hooks/useSecure/useSecure";
import Loader from "../../../Components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const axiosSecure = useSecure();

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-applications");
      return res.data.applications || [];
    },
  });

  if (isLoading) return <Loader />;

  // UPDATE STATUS
  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/all-applications/${id}`, { status });
    if (res.data.success) {
      toast.success("Status Updated!");
      refetch();
    }
  };

  // CANCEL (Reject)
  const handleCancel = async (id) => {
    const Conferm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    });
    if (Conferm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/all-applications/${id}`, {
          status: "rejected",
        });
        if (res.data.success) {
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "Your review has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  // ADD FEEDBACK
  const submitFeedback = async () => {
    const res = await axiosSecure.patch(
      `/all-applications/${selectedApp._id}`,
      {
        feedback: feedbackText,
      }
    );

    if (res.data.success) {
      toast.success("Feedback Added!");
      setShowFeedbackModal(false);
      setFeedbackText("");
      refetch();
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-5">Manage Applied Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Application Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.userName || "Unknown"}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td>{app.feedback || "—"}</td>

                <td
                  className={`font-bold ${
                    app.ApplicationStatus === "completed"
                      ? "text-green-500"
                      : app.ApplicationStatus === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {app.ApplicationStatus}
                </td>

                <td
                  className={`font-semibold ${
                    app.paymentStatus === "paid"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {app.paymentStatus}
                </td>

                <td className="flex flex-col md:flex-row gap-2">
                  {/* DETAILS */}
                  <button
                    className="btn btn-sm  btn-outline btn-info"
                    onClick={() => {
                      setSelectedApp(app);
                      setShowDetailsModal(true);
                    }}
                  >
                    Details
                  </button>
                  {/* FEEDBACK */}
                  {app.feedback ? (
                    ""
                  ) : (
                    <button
                      className="btn btn-sm  btn-outline btn-warning"
                      onClick={() => {
                        setSelectedApp(app);
                        setShowFeedbackModal(true);
                      }}
                    >
                      Feedback
                    </button>
                  )}

                  {/* STATUS DROPDOWN */}
                  {app.ApplicationStatus === "completed" ? (
                    <button className="btn btn-sm btn-success">
                      Completed
                    </button>
                  ) : app.ApplicationStatus === "rejected" ? (
                    <button className="btn btn-sm btn-error">Rejected</button>
                  ) : (
                    <select
                      defaultValue={app.ApplicationStatus}
                      onChange={(e) =>
                        handleStatusUpdate(app._id, e.target.value)
                      }
                      className="select select-sm select-bordered"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}
                  {/* CANCEL */}
                  {(app.ApplicationStatus === "pending" ||
                    app.ApplicationStatus === "processing") && (
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleCancel(app._id)}
                    >
                      Cancel
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
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-3">Application Details</h3>

            <p>
              <strong>Name:</strong> {selectedApp.userName || "Unknown"}
            </p>
            <p>
              <strong>Email:</strong> {selectedApp.userEmail}
            </p>
            <p>
              <strong>University:</strong> {selectedApp.universityName}
            </p>
            <p>
              <strong>Scholarship:</strong> {selectedApp.scholarshipName}
            </p>
            <p>
              <strong>Status:</strong> {selectedApp.ApplicationStatus}
            </p>
            <p>
              <strong>Payment:</strong> {selectedApp.paymentStatus}
            </p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-3">
              Write Feedback for {selectedApp.userName || "user"}
            </h3>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={submitFeedback}>
                Submit
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageApplications;
