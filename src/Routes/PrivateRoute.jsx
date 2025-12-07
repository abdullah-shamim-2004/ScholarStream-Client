import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth/useAuth";
import Loader from "../Components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (user && user?.email) {
    return children;
  } else {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }
};

export default PrivateRoute;