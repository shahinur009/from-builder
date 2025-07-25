"use client";

import React from "react";
import LeftSidebar from "./Sidebars/LeftSidebar";
import RightSidebar from "./Sidebars/RightSidebar"; 
import FormBuilder from "./FormBuilder/FormBuilder";
import Button from "./Common/Button"; 
import { useForm } from "../context/FormContext";
import { useRouter } from "next/navigation"; 

export default function MainAppContent() {
  const { selectedField, setSelectedField } = useForm();
  const router = useRouter();

  const handlePreviewClick = () => {
    setSelectedField(null);
    router.push("/preview");
  };

  const handleCloseSettings = () => {
    setSelectedField(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <nav className="bg-white p-4 shadow-md flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-gray-800">
          Dynamic Form Builder
        </h1>
        <Button
          onClick={handlePreviewClick}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded-lg transition-all duration-200 ease-in-out"
        >
          Preview Form
        </Button>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white p-6 border-r overflow-y-auto">
          <LeftSidebar />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <FormBuilder />
        </main>

        {selectedField && (
          <div className="w-80 bg-white border-l overflow-y-auto flex-shrink-0">
            <RightSidebar onClose={handleCloseSettings} />
          </div>
        )}
      </div>
    </div>
  );
}
