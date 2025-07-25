"use client";

import React, { useState } from "react";
import { FaCog, FaTrash, FaCopy } from "react-icons/fa";
import { useForm } from "@/app/context/FormContext";
import { useFieldDragAndDrop } from "@/app/hooks/useDragAndDrop";

const FormField = ({ field, index }) => {
  const {
    previewMode,
    setSelectedField,
    deleteField,
    duplicateField,
    reorderFields,
  } = useForm();
  const [isHovered, setIsHovered] = useState(false);

  // Use the drag and drop hook re-Ordering
  const { ref, isDragging } = useFieldDragAndDrop(field, index, reorderFields);

  // Different input types
  const renderInput = () => {
    const commonProps = {
      id: field.id,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      disabled: previewMode,
      className: `p-2 border rounded w-full ${
        previewMode ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "date":
      case "time":
        return <input type={field.type} {...commonProps} />;
      case "file":
        return <input type="file" {...commonProps} />;
      case "select":
        return (
          <select {...commonProps}>
            {field.options &&
              field.options.map((option, idx) => {
                const [label, value] = option.split("=");
                return (
                  <option key={idx} value={value}>
                    {label}
                  </option>
                );
              })}
          </select>
        );
      case "checkbox":
        return (
          <div className="flex flex-col space-y-2">
            {field.options &&
              field.options.map((option, idx) => {
                const [label, value] = option.split("=");
                return (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={value}
                      name={field.name}
                      {...commonProps}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-900">{label}</span>
                  </label>
                );
              })}
          </div>
        );
      case "radio":
        return (
          <div className="flex flex-col space-y-2">
            {field.options &&
              field.options.map((option, idx) => {
                const [label, value] = option.split("=");
                return (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={value}
                      name={field.name}
                      {...commonProps}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="text-gray-900">{label}</span>
                  </label>
                );
              })}
          </div>
        );
      case "acceptance":
        return (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...commonProps}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span
              className="text-gray-900"
              dangerouslySetInnerHTML={{ __html: field.content }}
            />
          </label>
        );
      default:
        return <p className="text-red-500">Unknown field type: {field.type}</p>;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        width: field.columnWidth || "100%",
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`relative p-4 border border-dashed rounded transition-all duration-100 ease-in-out ${
        isHovered && !previewMode
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-white"
      } ${previewMode ? "pointer-events-none" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}

      {isHovered && !previewMode && (
        <div className="absolute top-0 right-0 p-1 bg-white border border-t-0 border-r-0 rounded-bl-lg flex space-x-1 shadow-md">
          <button
            onClick={() => setSelectedField(field)}
            className="text-gray-600 hover:text-blue-600 p-1"
            title="Settings"
          >
            <FaCog size={16} />
          </button>
          <button
            onClick={() => deleteField(field.id)}
            className="text-gray-600 hover:text-red-600 p-1"
            title="Delete"
          >
            <FaTrash size={16} />
          </button>
          <button
            onClick={() => duplicateField(field.id)}
            className="text-gray-600 hover:text-green-600 p-1"
            title="Duplicate"
          >
            <FaCopy size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FormField;
