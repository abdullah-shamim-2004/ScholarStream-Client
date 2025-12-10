import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useSecure from "../../Hooks/useSecure/useSecure";
import Loader from "../../Components/Loader/Loader";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useSecure();
  //   console.log(sessionId);

  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .get(`/payment-verify?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
        setPaymentData(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [sessionId, axiosSecure]);
  console.log(paymentData);
  if (!paymentData) {
    return <Loader />;
  }

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Payment Successful!
      </h2>
      <p className="text-center mb-2">
        Scholarship: {paymentData.scholarshipName}
      </p>
      <p className="text-center mb-2">
        University: {paymentData.universityName}
      </p>
      <p className="text-center mb-2">Amount Paid: ${paymentData.amount}</p>
      <p className="text-center mb-4">
        Transaction ID: {paymentData.transactionId}
      </p>
      <Link to="/dashboard/my-applications" className="btn btn-primary w-full">
        Go to My Applications
      </Link>
    </div>
  );
};

export default PaymentSuccess;
