"use client";

import React from "react";
import Image from "next/image";

const RenderForm = ({ fields, formData, handleChange }) => {
  const renderInput = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      className:
        "p-3 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out",
      onChange: handleChange,
      disabled: true,
      readOnly: true,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "date":
      case "time":
        return (
          <input
            type={field.type}
            value={
              formData[field.name] !== undefined
                ? formData[field.name]
                : field.value || ""
            }
            {...commonProps}
          />
        );

      case "file":
        const fileInfo = formData[field.name];
        const previewUrl =
          fileInfo?.previewUrl ||
          (fileInfo instanceof File ? URL.createObjectURL(fileInfo) : null);
        const fileName =
          fileInfo?.name || (fileInfo instanceof File ? fileInfo.name : null);
        const isImage =
          previewUrl &&
          (fileInfo?.type?.startsWith("image/") ||
            (fileInfo instanceof File && fileInfo.type.startsWith("image/")));

        return (
          <div className="flex flex-col items-start gap-3 w-full">
            <input
              type="file"
              {...commonProps}
              value={undefined}
              accept={field.accept || undefined}
              disabled
            />
            {previewUrl && (
              <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-md bg-gray-50 w-full max-w-sm">
                {isImage ? (
                  <div className="w-[120px] h-[120px] relative flex-shrink-0 border border-gray-300 rounded overflow-hidden shadow-sm">
                    <img
                      src={previewUrl}
                      alt="Uploaded Image Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="flex items-center text-gray-700 text-sm">
                    <span className="mr-2 text-blue-500 text-xl">📄</span>
                    {fileName || "Selected File"}
                  </div>
                )}
                {!isImage && fileName && (
                  <span className="text-sm text-gray-600">{fileName}</span>
                )}
              </div>
            )}
            {!previewUrl && (
              <p className="text-gray-500 text-sm italic mt-1">
                No file chosen
              </p>
            )}
          </div>
        );

      case "select":
        return (
          <select
            value={
              formData[field.name] !== undefined
                ? formData[field.name]
                : field.value || ""
            }
            {...commonProps}
          >
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
                const currentFormValue =
                  formData[field.name] || field.value || [];
                const isChecked =
                  Array.isArray(currentFormValue) &&
                  currentFormValue.includes(value);
                return (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer text-gray-900"
                  >
                    <input
                      type="checkbox"
                      value={value}
                      name={field.name}
                      checked={isChecked}
                      disabled
                      className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>{label}</span>
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
                const currentFormValue = formData[field.name] || field.value;
                const isChecked = currentFormValue === value;
                return (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer text-gray-900"
                  >
                    <input
                      type="radio"
                      value={value}
                      name={field.name}
                      checked={isChecked}
                      disabled
                      className="mr-2 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
          </div>
        );

      case "acceptance":
        return (
          <label className="inline-flex items-center cursor-pointer text-gray-900">
            <input
              type="checkbox"
              name={field.name}
              checked={
                formData[field.name] !== undefined
                  ? formData[field.name]
                  : field.value || false
              }
              disabled
              className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span dangerouslySetInnerHTML={{ __html: field.content }} />
          </label>
        );

      default:
        console.error("Unknown field type:", field.type, field);
        return (
          <p className="text-red-500 font-medium">
            Unknown field type: <span className="font-bold">{field.type}</span>
          </p>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-1">
          <label
            htmlFor={field.name}
            className="block text-sm font-semibold text-gray-800 mb-1"
          >
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderInput(field)}
        </div>
      ))}
    </div>
  );
};

export default RenderForm;
