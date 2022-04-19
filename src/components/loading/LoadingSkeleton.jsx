import React from "react";

const LoadingSkeleton = ({ height, width, radius }) => {
  return (
    <div
      className="skeleton"
      style={{
        height: height,
        width: width || "100%",
        borderRadius: radius,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
