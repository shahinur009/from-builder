"use client";

import React from "react";

const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
