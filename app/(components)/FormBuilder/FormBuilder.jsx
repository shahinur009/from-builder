"use client";

import React from "react";
import FormField from "./FormField";
import { useForm } from "@/app/context/FormContext";
import { useDrop } from "react-dnd";

const FormBuilder = () => {
  const { formSchema, addField, reorderFields } = useForm();

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "PALETTE_FIELD",
      drop: (item, monitor) => {
        addField({
          id: `field-${Date.now()}`,
          ...item.defaultProps,
        });
        return { name: "Form Canvas" };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [addField]
  );

  return (
    <div
      ref={drop}
      className={`min-h-[500px] p-4 border-2 border-dashed rounded-lg transition-colors duration-200 ease-in-out ${
        isOver && canDrop
          ? "border-purple-500 bg-purple-50"
          : "border-gray-300 bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {formSchema.name || "Custom Form"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formSchema.fields.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full py-10">
            Drag fields from the left sidebar here to build your form.
          </p>
        ) : (
          formSchema.fields.map((field, index) => (
            <FormField key={field.id} field={field} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
