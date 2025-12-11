import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../useAuth/useAuth";
import useSecure from "../useSecure/useSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();
  const { data: role = "student", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  return { role, isLoading };
};

export default useRole;
