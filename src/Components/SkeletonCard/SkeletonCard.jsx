import React from "react";

const SkeletonCard = () => (
  <div className="border p-4 rounded animate-pulse">
    <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
    <div className="h-4 bg-gray-300 mb-2 w-1/2"></div>
    <div className="h-4 bg-gray-300 w-1/3"></div>
  </div>
);
export default SkeletonCard;
