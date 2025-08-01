"use client";

import React from "react";
import { usePaletteDrag } from "@/app/hooks/useDragAndDrop";

const createNewField = (type, label) => {
  const timestamp = Date.now();
  const standardizedType = type.toLowerCase();
  let defaultProps = {
    id: `${standardizedType}-${timestamp}`,
    type: standardizedType,
    label: label,
    name: `${standardizedType}${timestamp}`,
    columnWidth: "100%",
    required: false,
  };

  switch (type) {
    case "text":
    case "email":
    case "date":
    case "time":
      defaultProps.placeholder = `Enter ${label.toLowerCase()}`;
      defaultProps.value = "";
      break;
    case "file":
      defaultProps.label = "File Upload";
      defaultProps.name = `fileUpload${timestamp}`;
      delete defaultProps.placeholder;
      break;
    case "select":
      defaultProps.placeholder = "Select an option";
      defaultProps.options = ["Option 1=option1", "Option 2=option2"];
      defaultProps.value = "option1";
      break;
    case "checkbox":
      defaultProps.options = ["Option 1=option1", "Option 2=option2"];
      defaultProps.value = [];
      break;
    case "radio":
      defaultProps.options = ["Option 1=option1", "Option 2=option2"];
      defaultProps.value = "option1";
      break;
    case "acceptance":
      defaultProps.content =
        "<p>I agree to the <strong>terms and conditions</strong>.</p>";
      defaultProps.required = true;
      delete defaultProps.placeholder;
      defaultProps.value = false;
      break;
    default:
      defaultProps.value = "";
      break;
  }
  return defaultProps;
};

const fieldTypes = [
  { type: "text", label: "Text Input" },
  { type: "email", label: "Email Input" },
  { type: "date", label: "Date Input" },
  { type: "time", label: "Time Input" },
  { type: "file", label: "File Upload" },
  { type: "select", label: "Select Dropdown" },
  { type: "checkbox", label: "Checkbox Group" },
  { type: "radio", label: "Radio Group" },
  { type: "acceptance", label: "Acceptance" },
];

const DraggableField = ({ fieldType }) => {
  const { drag, isDragging } = usePaletteDrag(
    "PALETTE_FIELD",
    fieldType.label,
    createNewField(fieldType.type, fieldType.label)
  );

  return (
    <div
      ref={drag}
      className={`p-3 bg-white border border-gray-300 rounded mb-3 cursor-grab hover:bg-blue-50 transition-all duration-100 ease-in-out ${
        isDragging ? "opacity-50 border-blue-500 shadow-lg" : ""
      }`}
    >
      {fieldType.label}
    </div>
  );
};

const LeftSidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 shadow-lg overflow-y-auto flex-shrink-0">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
        Field Palette
      </h3>
      <div className="space-y-3">
        {fieldTypes.map((field, index) => (
          <DraggableField key={index} fieldType={field} />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
