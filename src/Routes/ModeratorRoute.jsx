import React from "react";
import useAuth from "../Hooks/useAuth/useAuth";
import Loader from "../Components/Loader/Loader";
import useRole from "../Hooks/useRole/useRole";
import Forbidden from "../Components/Forbidden/Forbidden";

const ModeratorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loader></Loader>;
  }

  if (role !== "moderator") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default ModeratorRoute;
