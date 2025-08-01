"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "../context/FormContext";
import Swal from "sweetalert2";
import Button from "../(components)/Common/Button";
import RenderForm from "./RenderForm";

export default function PreviewPage() {
  const {
    formSchema,
    setPreviewMode,
    setSubmittedData,
    setShowSuccessMessage,
  } = useForm();
  const router = useRouter();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setPreviewMode(true);
    const initialData = formSchema.fields.reduce((acc, field) => {
      acc[field.name] = field.type === "file" ? field.value : field.value || "";
      return acc;
    }, {});
    setFormData(initialData);

    return () => {
      setPreviewMode(false);
    };
  }, [formSchema, setPreviewMode]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue;

    if (type === "checkbox") {
      const currentValues = new Set(formData[name] || []);
      if (checked) {
        currentValues.add(value);
      } else {
        currentValues.delete(value);
      }
      newValue = Array.from(currentValues);
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        newValue = {
          file: file,
          previewUrl: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          type: file.type,
        };
      } else {
        newValue = null;
      }
    } else {
      newValue = value;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedData(formData);

    await Swal.fire({
      icon: "success",
      title: "Form Submitted Successfully!",
      text: formSchema.successMessage || "Your form has been submitted.",
      showConfirmButton: false,
      timer: 2000,
    });

    setShowSuccessMessage(true);
    router.push("/submitted-data");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 sm:p-8">
      <nav className="bg-white p-4 sm:p-6 shadow-lg rounded-lg w-full max-w-5xl mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
          Preview:{" "}
          <span className="text-purple-600">
            {formSchema.name || "Custom Form"}
          </span>
        </h1>
        <Button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Back to F.Builder
        </Button>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-200"
      >
        <RenderForm
          fields={formSchema.fields}
          formData={formData}
          handleChange={handleChange}
          disabled={true}
        />
        <div className="mt-8 text-center">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
