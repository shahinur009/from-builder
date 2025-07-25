"use client";

import { usePaletteDrag } from "@/app/hooks/useDragAndDrop";
import React from "react";

const fieldTypes = [
  {
    type: "text",
    label: "Text Input",
    default: {
      label: "New Text Field",
      name: "new_text",
      placeholder: "Enter text",
      required: false,
      columnWidth: "100%",
    },
  },
  {
    type: "email",
    label: "Email Input",
    default: {
      label: "New Email Field",
      name: "new_email",
      placeholder: "Enter email",
      required: false,
      columnWidth: "100%",
    },
  },
  {
    type: "date",
    label: "Date Input",
    default: {
      label: "New Date Field",
      name: "new_date",
      required: false,
      columnWidth: "100%",
    },
  },
  {
    type: "time",
    label: "Time Input",
    default: {
      label: "New Time Field",
      name: "new_time",
      required: false,
      columnWidth: "100%",
    },
  },
  {
    type: "file",
    label: "File Upload",
    default: {
      label: "New File Upload",
      name: "new_file",
      columnWidth: "100%",
    },
  },
  {
    type: "select",
    label: "Select Dropdown",
    default: {
      label: "New Select Field",
      name: "new_select",
      placeholder: "Select an option",
      required: false,
      options: ["Option 1=option1", "Option 2=option2"],
      columnWidth: "100%",
    },
  },
  {
    type: "checkbox",
    label: "Checkbox Group",
    default: {
      label: "New Checkbox Field",
      name: "new_checkbox",
      required: false,
      options: ["Option 1=option1", "Option 2=option2"],
      columnWidth: "100%",
    },
  },
  {
    type: "radio",
    label: "Radio Group",
    default: {
      label: "New Radio Field",
      name: "new_radio",
      required: false,
      options: ["Option 1=option1", "Option 2=option2"],
      columnWidth: "100%",
    },
  },
  {
    type: "acceptance",
    label: "Acceptance",
    default: {
      label: "Acceptance",
      name: "new_acceptance",
      content: "<p>I agree to the <strong>terms and conditions</strong>.</p>",
      required: true,
      columnWidth: "100%",
    },
  },
];

const DraggableField = ({ fieldData }) => {
  const { drag, isDragging } = usePaletteDrag(
    fieldData.type,
    fieldData.label,
    fieldData.default
  );

  return (
    <div
      ref={drag}
      className={`p-3 bg-white border border-gray-300 rounded mb-3 cursor-grab hover:bg-blue-50 transition-all duration-100 ease-in-out ${
        isDragging ? "opacity-50 border-blue-500 shadow-lg" : ""
      }`}
    >
      {fieldData.label}
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
          <DraggableField key={index} fieldData={field} />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
