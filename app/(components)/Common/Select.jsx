"use client";

import React from "react";

const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
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
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options &&
          options.map((option, idx) => {
            const [optionLabel, optionValue] = option.split("=");
            return (
              <option key={idx} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
