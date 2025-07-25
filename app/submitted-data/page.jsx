"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../(components)/Common/Button";
import { useForm } from "../context/FormContext";

export default function SubmittedDataPage() {
  const { submittedData, showSuccessMessage, setShowSuccessMessage } =
    useForm();
  const router = useRouter();
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    if (submittedData) {
      setDisplayData(submittedData);
    }
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [submittedData, setShowSuccessMessage]);

  const handleBackToBuilder = () => {
    router.push("/");
  };

  const renderValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400 italic">N/A</span>;
    }
    if (typeof value === "object" && value instanceof File) {
      return `[File: ${value.name} (${(value.size / 1024).toFixed(
        2
      )} KB), Type: ${value.type}]`;
    }
    if (Array.isArray(value)) {
      return value.length > 0 ? (
        value.join(", ")
      ) : (
        <span className="text-gray-400 italic">No selection</span>
      );
    }
    return String(value);
  };

  if (!displayData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          No Form Data Submitted Yet
        </h1>
        <p className="text-gray-600 mb-6">
          Submit a form from the preview page to see the data here.
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
        <h1 className="text-xl font-bold">Submitted Form Data</h1>
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
            Submitted Data
          </h2>
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
                {Object.entries(displayData).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {renderValue(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showSuccessMessage && (
            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center border border-green-300">
              Form submitted successfully!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
