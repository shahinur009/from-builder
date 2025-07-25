"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "../context/FormContext";
import { useRouter } from "next/navigation";
import RenderForm from "./RenderForm";
import Button from "../(components)/Common/Button";

export default function PreviewPage() {
  const { formSchema, setSubmittedData, setShowSuccessMessage } = useForm();
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [formLoadError, setFormLoadError] = useState(false);

  useEffect(() => {
    if (formSchema && formSchema.fields) {
      const initialData = {};
      formSchema.fields.forEach((field) => {
        if (field.type === "checkbox") {
          initialData[field.name] = [];
        } else {
          initialData[field.name] = field.value || "";
        }
      });
      setFormData(initialData);
      setFormLoadError(false);
    } else {
      setFormLoadError(true);
    }
  }, [formSchema]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const currentValues = new Set(prevData[name] || []);
        if (checked) {
          currentValues.add(value);
        } else {
          currentValues.delete(value);
        }
        return { ...prevData, [name]: Array.from(currentValues) };
      });
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmittedData(formData);
    setShowSuccessMessage(true);
    router.push("/submitted-data");
  };

  const handleBackToBuilder = () => {
    router.push("/");
  };

  if (
    formLoadError ||
    !formSchema ||
    !formSchema.fields ||
    formSchema.fields.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Form Not Found / Empty
        </h1>
        <p className="text-gray-700 mb-6">
          No form schema was loaded or the form is empty. Please ensure you have
          created and saved a form in the builder first.
        </p>
        <Button
          onClick={handleBackToBuilder}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded-lg"
        >
          Back to Form Builder
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <nav className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Form Preview: {formSchema.name}</h1>
        <div>
          <Button
            onClick={handleBackToBuilder}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded-lg"
          >
            Back to Builder
          </Button>
        </div>
      </nav>

      <main className="flex-1 p-6 overflow-y-auto flex justify-center items-start">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            {formSchema.name || "Custom Form"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <RenderForm
              fields={formSchema.fields}
              formData={formData}
              handleChange={handleChange}
              
            />
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white shadow-md rounded-lg"
              >
                Submit Form
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
