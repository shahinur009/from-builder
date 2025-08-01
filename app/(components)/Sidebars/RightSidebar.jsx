// app/components/Sidebars/RightSidebar.js
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@/app/context/FormContext";
import Input from "../Common/Input";
import Button from "../Common/Button";

const RightSidebar = () => {
  const { selectedField, setSelectedField, updateField, setFormSchema } =
    useForm();

  // Use a local state to manage changes for the currently selected field.
  // This state will be initialized from `selectedField` and then updated
  // immediately via `updateField` in the context.
  const [localFieldProperties, setLocalFieldProperties] = useState({});
  const [optionsInput, setOptionsInput] = useState("");
  const [contentInput, setContentInput] = useState(""); // For acceptance field content

  useEffect(() => {
    if (selectedField) {
      setLocalFieldProperties(selectedField);
      if (selectedField.options && Array.isArray(selectedField.options)) {
        setOptionsInput(selectedField.options.join("\n"));
      } else {
        setOptionsInput("");
      }
      if (selectedField.content) {
        setContentInput(selectedField.content);
      } else {
        setContentInput("");
      }
    } else {
      setLocalFieldProperties({});
      setOptionsInput("");
      setContentInput("");
    }
  }, [selectedField]);

  // This handleChange will update the local state and immediately the global formSchema
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Update local state
    setLocalFieldProperties((prev) => ({ ...prev, [name]: newValue }));

    // Immediately update the global form schema
    if (selectedField && selectedField.id !== "form-settings") {
      updateField(selectedField.id, { [name]: newValue });
    } else if (
      selectedField &&
      selectedField.id === "form-settings" &&
      name === "name"
    ) {
      setFormSchema((prevSchema) => ({
        ...prevSchema,
        name: newValue,
      }));
    }
  };

  const handleOptionsChange = (e) => {
    const newOptionsInput = e.target.value;
    setOptionsInput(newOptionsInput);
    const newOptions = newOptionsInput
      .split("\n")
      .filter((line) => line.trim() !== "");

    if (selectedField) {
      updateField(selectedField.id, { options: newOptions });
    }
  };

  const handleContentChange = (e) => {
    const newContentInput = e.target.value;
    setContentInput(newContentInput);

    // update global form schema
    if (selectedField) {
      updateField(selectedField.id, { content: newContentInput });
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
        {selectedField.id === "form-settings" ? (
          <Input
            label="Form Name"
            id="formName"
            name="name"
            type="text"
            value={localFieldProperties.name || ""}
            onChange={handleChange}
          />
        ) : (
          <>
            <Input
              label="Label"
              id="label"
              name="label"
              type="text"
              value={localFieldProperties.label || ""}
              onChange={handleChange}
            />
            <Input
              label="Name (for submission)"
              id="name"
              name="name"
              type="text"
              value={localFieldProperties.name || ""}
              onChange={handleChange}
            />
            {localFieldProperties.type !== "file" &&
              localFieldProperties.type !== "acceptance" && (
                <Input
                  label="Placeholder"
                  id="placeholder"
                  name="placeholder"
                  type="text"
                  value={localFieldProperties.placeholder || ""}
                  onChange={handleChange}
                />
              )}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="required"
                id="required"
                checked={localFieldProperties.required || false}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="required"
                className="ml-2 block text-sm font-medium text-gray-900 cursor-pointer"
              >
                Required
              </label>
            </div>
            {(localFieldProperties.type === "select" ||
              localFieldProperties.type === "checkbox" ||
              localFieldProperties.type === "radio") && (
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
                  rows="5"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Example: Option 1=option1
                </p>
              </div>
            )}
            {localFieldProperties.type === "acceptance" && (
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
                  value={contentInput}
                  onChange={handleContentChange}
                  rows="5"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>
            )}
          </>
        )}
        <Button
          onClick={() => setSelectedField(null)}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out"
        >
          Close Settings
        </Button>
      </div>
    </div>
  );
};

export default RightSidebar;
