"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../(components)/Common/Button";
import { useForm } from "../context/FormContext";
import Image from "next/image";

export default function SubmittedDataPage() {
  const { submittedData, showSuccessMessage, setShowSuccessMessage } =
    useForm();
  const router = useRouter();
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    if (submittedData) {
      setDisplayData(submittedData);
    }
  }, [submittedData]);

  const handleBackToBuilder = () => {
    router.push("/");
    setShowSuccessMessage(false);
  };

  const renderValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400 italic">N/A</span>;
    }
    if (
      typeof value === "object" &&
      value &&
      value.file instanceof File &&
      value.previewUrl
    ) {
      const isImage = value.type.startsWith("image/");
      return (
        <div className="flex items-center gap-3">
          {isImage ? (
            <div className="w-[80px] h-[80px] relative border border-gray-200 rounded overflow-hidden shadow-sm flex-shrink-0">
              <Image
                src={value.previewUrl}
                alt={`Uploaded file: ${value.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          ) : (
            <span className="text-blue-500 mr-2 text-xl">📄</span>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{value.name}</span>
            <span className="text-sm text-gray-500">
              ({(value.size / 1024).toFixed(2)} KB, Type: {value.type})
            </span>
          </div>
        </div>
      );
    }
    if (Array.isArray(value)) {
      return value.length > 0 ? (
        value.map((item, idx) => (
          <span
            key={idx}
            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-1 mb-1"
          >
            {item}
          </span>
        ))
      ) : (
        <span className="text-gray-400 italic">No selection</span>
      );
    }
    if (typeof value === "boolean") {
      return value ? (
        <span className="text-green-600 font-semibold">Yes</span>
      ) : (
        <span className="text-red-600 font-semibold">No</span>
      );
    }
    return String(value);
  };

  if (!displayData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Form Data Submitted Yet
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Submit a form from the preview page to see the data here.
        </p>
        <Button
          onClick={handleBackToBuilder}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Form Builder
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="bg-white p-4 sm:p-6 shadow-lg flex justify-between items-center z-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
          Submitted Form Data
        </h1>
        <div>
          <Button
            onClick={handleBackToBuilder}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Builder
          </Button>
        </div>
      </nav>

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto flex justify-center items-start">
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl max-w-4xl w-full border border-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
            Thank You for Your Submission!
          </h2>
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center border border-green-300 font-semibold">
              Your data has been successfully recorded.
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-100 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Field Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(displayData).map(([key, value]) => (
                  <tr
                    key={key}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {renderValue(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
