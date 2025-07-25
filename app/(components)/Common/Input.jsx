"use client";

import React from "react";

const Input = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  className = "",
  ...props
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
