import React from "react";
import useAuth from "../useAuth/useAuth";
import useSecure from "../useSecure/useSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
        // console.log(res.data);
    },
  });
  return { userData, isLoading };
};

export default useUser;
