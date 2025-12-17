import React, { useEffect, useState } from "react";
import useSecure from "../../Hooks/useSecure/useSecure";
import useAuth from "../../Hooks/useAuth/useAuth";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { useMutation } from "@tanstack/react-query";

const PaymentFailed = () => {
  const axiosSecure = useSecure();
  const { user, loading } = useAuth();

  //State to store scholarship info
  const [scholarshipData, setScholarshipData] = useState({
    scholarshipId: "",
    scholarshipName: "",
    universityName: "",
    amount: 0,
  });
 

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/payment-failed-record", data);
      return res.data;
    },
    onSuccess: (data) => {
      setScholarshipData(data.result);
    },
  });
  useEffect(() => {
    if (!user?.email) return;

    const scholarshipId = localStorage.getItem("scholarshipId");
    const scholarshipName = localStorage.getItem("scholarshipName");
    const universityName = localStorage.getItem("universityName");
    const amount = localStorage.getItem("amount");

    if (!scholarshipId || !scholarshipName) return;

    mutate({
      scholarshipId,
      scholarshipName,
      universityName,
      amount,
      userEmail: user.email,
      userName: user.displayName,
    });
  }, [user, mutate]);

  // Show loader if user not loaded yet
  if (loading || isPending) return <Loader />;

  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="text-6xl mb-4">❌</div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h2>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment was not successful. Don’t worry — your
          application has been saved.
        </p>

        {/* Scholarship Info */}
        {scholarshipData && (
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <p className="font-semibold">
              🎓 Scholarship:{" "}
              <span className="font-normal">
                {scholarshipData.scholarshipName}
              </span>
            </p>
            <p className="font-semibold">
              🏫 University:{" "}
              <span className="font-normal">
                {scholarshipData.universityName}
              </span>
            </p>
            <p className="font-semibold">
              💰 Amount:{" "}
              <span className="font-normal">${scholarshipData.amount}</span>
            </p>
            <p className="font-semibold text-yellow-600">Status: Unpaid</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/my-applications"
            className="btn btn-primary w-full"
          >
            Go to My Applications
          </Link>

          <Link to="/dashboard" className="btn btn-outline w-full">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
