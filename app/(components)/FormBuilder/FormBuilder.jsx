"use client";

import React from "react";
import { useForm } from "@/app/context/FormContext";
import { useFormCanvasDrop } from "@/app/hooks/useDragAndDrop";
import FormField from "./FormField";

const FormBuilder = () => {
  const { formSchema, previewMode, addField } = useForm();

  // Drop form canvas to new fields
  const { drop, isOver, canDrop } = useFormCanvasDrop(addField);

  return (
    <div
      ref={drop} // Drop target  canvas
      className={`p-6 border rounded shadow-lg transition-all duration-200 ease-in-out ${
        previewMode ? "bg-gray-50 cursor-not-allowed" : "bg-gray-50"
      } ${
        isOver && canDrop
          ? "border-dashed border-blue-500 bg-blue-100"
          : "border-gray-300"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {formSchema.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formSchema.fields.length > 0 ? (
          formSchema.fields.map((field, index) => (
            <FormField key={field.id} field={field} index={index} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            Drag fields from the left sidebar to start building your form!
          </p>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
