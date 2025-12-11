import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-primary mb-4">403</h1>

      <h2 className="text-3xl font-semibold mb-2 text-neutral-800">
        Access Forbidden
      </h2>

      <p className="text-gray-500 max-w-md">
        You don't have permission to view this page. Please log in with the
        correct role or go back to the home page.
      </p>

      <div className="mt-6 flex gap-4">
        <Link to="/" className="btn btn-primary rounded-lg px-6">
          Go Home
        </Link>

        <Link to="/login" className="btn btn-outline rounded-lg px-6">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
