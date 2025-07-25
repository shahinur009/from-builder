"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "@/app/context/FormContext";
import Input from "../Common/Input";

const RightSidebar = () => {
  const { selectedField, setSelectedField, updateField } = useForm();
  const [fieldProperties, setFieldProperties] = useState({});
  const [optionsInput, setOptionsInput] = useState("");

  useEffect(() => {
    if (selectedField) {
      setFieldProperties(selectedField);
      if (selectedField.options && Array.isArray(selectedField.options)) {
        setOptionsInput(selectedField.options.join("\n"));
      } else {
        setOptionsInput("");
      }
    }
  }, [selectedField]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFieldProperties((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleOptionsChange = (e) => {
    setOptionsInput(e.target.value);
    const newOptions = e.target.value
      .split("\n")
      .filter((line) => line.trim() !== "");
    setFieldProperties((prev) => ({ ...prev, options: newOptions }));
  };

  // Save changes when input loses focus
  const handleSave = () => {
    if (selectedField) {
      updateField(selectedField.id, fieldProperties);
    }
  };

  if (!selectedField) {
    return (
      <div className="w-80 bg-gray-100 p-4 border-l border-gray-300 shadow-lg flex-shrink-0">
        <p className="text-gray-600">Select a field to edit its settings.</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white p-4 border-l border-gray-300 shadow-lg overflow-y-auto flex-shrink-0">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
        Field Settings
      </h3>
      <div className="space-y-4">
        <Input
          label="Label"
          id="label"
          name="label"
          type="text"
          value={fieldProperties.label || ""}
          onChange={handleChange}
          onBlur={handleSave}
        />
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          value={fieldProperties.name || ""}
          onChange={handleChange}
          onBlur={handleSave}
        />
        {fieldProperties.type !== "file" &&
          fieldProperties.type !== "acceptance" && (
            <Input
              label="Placeholder"
              id="placeholder"
              name="placeholder"
              type="text"
              value={fieldProperties.placeholder || ""}
              onChange={handleChange}
              onBlur={handleSave}
            />
          )}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="required"
            id="required"
            checked={fieldProperties.required || false}
            onChange={handleChange}
            onBlur={handleSave}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="required"
            className="ml-2 block text-sm font-medium text-gray-900 cursor-pointer"
          >
            Required
          </label>
        </div>
        {(fieldProperties.type === "select" ||
          fieldProperties.type === "checkbox" ||
          fieldProperties.type === "radio") && (
          <div>
            <label
              htmlFor="options"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Options (Label=value, one per line)
            </label>
            <textarea
              name="options"
              id="options"
              value={optionsInput}
              onChange={handleOptionsChange}
              onBlur={handleSave}
              rows="5"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Example: Option 1=option1
            </p>
          </div>
        )}
        {selectedField.type === "acceptance" && (
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Acceptance Content (HTML allowed)
            </label>
            <textarea
              name="content"
              id="content"
              value={fieldProperties.content || ""}
              onChange={handleChange}
              onBlur={handleSave}
              rows="5"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
        )}
        <button
          onClick={() => setSelectedField(null)}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out"
        >
          Close Settings
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
