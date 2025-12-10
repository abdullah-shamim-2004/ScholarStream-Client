import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useSecure from "../../Hooks/useSecure/useSecure";
import Loader from "../../Components/Loader/Loader";
import useAuth from "../../Hooks/useAuth/useAuth";

const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();
  const { id: scholarshipId } = useParams();
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
      return res.data;
    },
  });
  //   console.log(scholarship);
  const handlePayment = async () => {
    // Store data for payment failure page
    localStorage.setItem("scholarshipId", scholarship._id);
    localStorage.setItem("scholarshipName", scholarship.scholarshipName);
    localStorage.setItem("universityName", scholarship.universityName);
    localStorage.setItem(
      "amount",
      Number(scholarship.applicationFees) + Number(scholarship.serviceCharge)
    );

    const paymentInfo = {
      amount:
        Number(scholarship.applicationFees) + Number(scholarship.serviceCharge),
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      studentEmail: user.email,
    };
    // console.log(paymentInfo);

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-md my-10 mx-auto p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-3 text-center">
        Pay for {scholarship.scholarshipName}
      </h2>

      <p className="text-gray-600 text-center mb-4">
        {scholarship.universityName} — {scholarship.country}
      </p>

      <div className="flex justify-between text-lg font-semibold mb-4">
        <span>Application Fee:</span>
        <span>${scholarship.applicationFees}</span>
      </div>

      <div className="flex justify-between text-lg font-semibold mb-4">
        <span>Service Charge:</span>
        <span>${scholarship.serviceCharge}</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between text-xl font-bold mb-6">
        <span>Total Amount:</span>
        <span>${scholarship.applicationFees + scholarship.serviceCharge}</span>
      </div>

      <button onClick={handlePayment} className="btn btn-primary w-full">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
