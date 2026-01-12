import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  // baseURL: "https://scholar-stream-server-steel.vercel.app",
  baseURL: "http://localhost:3000/",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
