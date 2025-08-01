"use client";

import React, { useState } from "react";
import { FaCog, FaTrash, FaCopy } from "react-icons/fa";
import { useForm } from "@/app/context/FormContext";
import { useFieldDragAndDrop } from "@/app/hooks/useDragAndDrop";

const FormField = ({ field, index }) => {
  const {
    setSelectedField,
    deleteField,
    duplicateField,
    reorderFields,
    updateField,
    selectedField,
  } = useForm();
  const [isHovered, setIsHovered] = useState(false);

  const { ref, isDragging } = useFieldDragAndDrop(field, index, reorderFields);

  const isCurrentlySelected = selectedField && selectedField.id === field.id;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue;

    if (type === "checkbox") {
      const currentValues = new Set(field.value || []);
      if (checked) {
        currentValues.add(value);
      } else {
        currentValues.delete(value);
      }
      newValue = Array.from(currentValues);
    } else if (type === "file") {
      newValue = files?.[0] || null; // Optional chaining ব্যবহার করুন
    } else {
      newValue = value;
    }

    updateField(field.id, { value: newValue });
  };

  const renderInput = () => {
    const commonProps = {
      id: field.id,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      className: `p-2 border rounded w-full bg-white`,
      onChange: handleChange,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "date":
      case "time":
        return (
          <input type={field.type} value={field.value || ""} {...commonProps} />
        );
      case "file":
        const fileValue = field.value;
        const isFile = fileValue instanceof File;
        const isImage = isFile && fileValue.type?.startsWith?.("image/");

        return (
          <div className="flex flex-col">
            <input
              type="file"
              {...commonProps}
              onChange={handleChange}
              value={undefined}
            />
            {isFile && (
              <div className="mt-2">
                {isImage && (
                  <img
                    src={URL.createObjectURL(fileValue)}
                    alt="Preview"
                    className="max-w-full h-auto max-h-40 border rounded"
                  />
                )}
                <p className="text-sm text-gray-600 mt-1">
                  {fileValue.name} ({(fileValue.size / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}
          </div>
        );
      case "select":
        return (
          <select value={field.value || ""} {...commonProps}>
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
                const isChecked =
                  Array.isArray(field.value) && field.value.includes(value);
                return (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={value}
                      name={field.name}
                      checked={isChecked}
                      onChange={handleChange}
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
                const isChecked = field.value === value;
                return (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={value}
                      name={field.name}
                      checked={isChecked}
                      onChange={handleChange}
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
              name={field.name}
              checked={field.value || false}
              onChange={handleChange}
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
        isCurrentlySelected
          ? "border-purple-500 bg-purple-100"
          : isHovered
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-white"
      } group`}
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

      {isHovered && (
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
