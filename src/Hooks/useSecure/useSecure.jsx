import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../useAuth/useAuth";

const axiosSecure = axios.create({
  baseURL: "https://scholar-stream-server-steel.vercel.app",
  headers: { "Content-Type": "application/json" },
});

const useSecure = () => {
  const { user, UserSignOut } = useAuth();
  const token = user?.accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          await UserSignOut();
          navigate("/auth/login");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [token, UserSignOut, navigate]);

  return axiosSecure;
};

export default useSecure;
