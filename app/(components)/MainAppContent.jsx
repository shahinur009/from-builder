"use client";
import React from "react";
import LeftSidebar from "./Sidebars/LeftSidebar";
import RightSidebar from "./Sidebars/RightSidebar";
import FormBuilder from "./FormBuilder/FormBuilder";
import Button from "./Common/Button";
import { useForm } from "../context/FormContext";

export default function MainAppContent() {
  const {
    formSchema,
    previewMode,
    setPreviewMode,
    submittedData,
    setSubmittedData,
    showSuccessMessage,
    setShowSuccessMessage,
  } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    setSubmittedData(data);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white shadow p-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-gray-800">
          Dynamic Form Builder
        </h1>
        <Button
          onClick={() => setPreviewMode(!previewMode)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded-lg transition-all duration-200 ease-in-out"
        >
          {previewMode ? "Exit Preview" : "Preview"}
        </Button>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          {!previewMode ? (
            <FormBuilder />
          ) : (
            <div className="p-6 border rounded shadow-lg bg-white">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {formSchema.name}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {formSchema.fields.map((field) => (
                  <div
                    key={field.id}
                    style={{ width: field.columnWidth || "100%" }}
                    className="mb-4"
                  >
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>

                    {field.type === "text" && (
                      <input
                        type="text"
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="p-2 border rounded w-full bg-gray-50"
                      />
                    )}
                    {field.type === "email" && (
                      <input
                        type="email"
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="p-2 border rounded w-full bg-gray-50"
                      />
                    )}
                    {field.type === "date" && (
                      <input
                        type="date"
                        id={field.id}
                        name={field.name}
                        required={field.required}
                        className="p-2 border rounded w-full bg-gray-50"
                      />
                    )}
                    {field.type === "time" && (
                      <input
                        type="time"
                        id={field.id}
                        name={field.name}
                        required={field.required}
                        className="p-2 border rounded w-full bg-gray-50"
                      />
                    )}
                    {field.type === "file" && (
                      <input
                        type="file"
                        id={field.id}
                        name={field.name}
                        required={field.required}
                        className="p-2 border rounded w-full bg-gray-50"
                      />
                    )}
                    {field.type === "select" && (
                      <select
                        id={field.id}
                        name={field.name}
                        required={field.required}
                        className="p-2 border rounded w-full bg-gray-50"
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
                    )}
                    {field.type === "checkbox" && (
                      <div className="flex flex-col space-y-2">
                        {field.options &&
                          field.options.map((option, idx) => {
                            const [label, value] = option.split("=");
                            return (
                              <label
                                key={idx}
                                className="inline-flex items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  value={value}
                                  name={field.name}
                                  required={field.required}
                                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <span className="text-gray-900">{label}</span>
                              </label>
                            );
                          })}
                      </div>
                    )}
                    {field.type === "radio" && (
                      <div className="flex flex-col space-y-2">
                        {field.options &&
                          field.options.map((option, idx) => {
                            const [label, value] = option.split("=");
                            return (
                              <label
                                key={idx}
                                className="inline-flex items-center cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  value={value}
                                  name={field.name}
                                  required={field.required}
                                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300"
                                />
                                <span className="text-gray-900">{label}</span>
                              </label>
                            );
                          })}
                      </div>
                    )}
                    {field.type === "acceptance" && (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={field.name}
                          required={field.required}
                          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span
                          className="text-gray-900"
                          dangerouslySetInnerHTML={{ __html: field.content }}
                        />
                      </label>
                    )}
                  </div>
                ))}
                <div className="col-span-full">
                  <Button
                    type="submit"
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-lg w-full transition-all duration-200 ease-in-out"
                  >
                    Submit Form
                  </Button>
                </div>
              </form>

              {showSuccessMessage && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-300 shadow-sm">
                  {formSchema.successMessage || "Form submitted successfully!"}
                </div>
              )}

              {submittedData && (
                <div className="mt-6 p-4 bg-white border rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Submitted Data
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Field Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(submittedData).map(([key, value]) => (
                          <tr key={key} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {key}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {value.toString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
