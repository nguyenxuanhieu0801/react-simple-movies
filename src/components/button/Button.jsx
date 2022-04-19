import React from "react";

const Button = ({
  onClick,
  className = "",
  type = "button",
  full = false,
  bgColor = "primary",
  children,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      className={`mt-auto rounded-lg px-6 py-3 font-medium capitalize ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}{" "}
    </button>
  );
};

export default Button;
