"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { initialSchema } from "../utils/initialSchema";

const FormContext = createContext();

const standardizeFieldType = (typeString) => {
  if (!typeString) return "unknown";
  const lowerCaseType = typeString.toLowerCase().trim();
  switch (lowerCaseType) {
    case "text input":
    case "text":
      return "text";
    case "email input":
    case "email":
      return "email";
    case "date input":
    case "date":
      return "date";
    case "time input":
    case "time":
      return "time";
    case "file upload":
    case "file":
      return "file";
    case "select dropdown":
    case "select":
      return "select";
    case "radio input":
    case "radio":
      return "radio";
    case "checkbox input":
    case "checkbox":
      return "checkbox";
    case "acceptance":
      return "acceptance";

    default:
      console.warn(
        `অজানা ফিল্ড টাইপের স্ট্যান্ডার্ডাইজেশন: ${typeString}. যেমন আছে তেমনই ব্যবহার করা হচ্ছে।`
      );
      return lowerCaseType;
  }
};

export const FormProvider = ({ children }) => {
  const [formSchema, setFormSchema] = useState(initialSchema);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoadedFromLocalStorage, setIsLoadedFromLocalStorage] =
    useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSchema = localStorage.getItem("formBuilderSchema");
      if (savedSchema) {
        setFormSchema(JSON.parse(savedSchema));
      }
      setIsLoadedFromLocalStorage(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isLoadedFromLocalStorage) {
      localStorage.setItem("formBuilderSchema", JSON.stringify(formSchema));
    }
  }, [formSchema, isLoadedFromLocalStorage]);

  const updateField = (fieldId, newProperties) => {
    setFormSchema((prevSchema) => ({
      ...prevSchema,
      fields: prevSchema.fields.map((field) =>
        field.id === fieldId ? { ...field, ...newProperties } : field
      ),
    }));
  };

  const addField = (newField) => {
    console.log("Adding new field:", newField);
    const standardizedNewField = {
      ...newField,
      type: standardizeFieldType(newField.type),
      id: `field-${Date.now()}`,
      value:
        newField.type === "checkbox"
          ? []
          : newField.type === "file"
          ? null
          : newField.value || "",
    };

    setFormSchema((prevSchema) => ({
      ...prevSchema,
      fields: [...prevSchema.fields, standardizedNewField],
    }));
  };

  const deleteField = (fieldId) => {
    setFormSchema((prevSchema) => ({
      ...prevSchema,
      fields: prevSchema.fields.filter((field) => field.id !== fieldId),
    }));
    setSelectedField(null);
  };

  const duplicateField = (fieldId) => {
    setFormSchema((prevSchema) => {
      const newFields = [...prevSchema.fields];
      const fieldToDuplicate = newFields.find((field) => field.id === fieldId);
      if (fieldToDuplicate) {
        const duplicatedField = {
          ...fieldToDuplicate,
          id: `field-${Date.now()}`,
          // ডুপ্লিকেট করা ফিল্ডের জন্য ফাইল ভ্যালু রিসেট করুন
          value:
            fieldToDuplicate.type === "file" ? null : fieldToDuplicate.value,
        };
        const index = newFields.findIndex((field) => field.id === fieldId);
        newFields.splice(index + 1, 0, duplicatedField);
      }
      return { ...prevSchema, fields: newFields };
    });
  };

  const reorderFields = (startIndex, endIndex) => {
    setFormSchema((prevSchema) => {
      const newFields = Array.from(prevSchema.fields);
      const [movedField] = newFields.splice(startIndex, 1);
      newFields.splice(endIndex, 0, movedField);
      return { ...prevSchema, fields: newFields };
    });
  };

  return (
    <FormContext.Provider
      value={{
        formSchema,
        setFormSchema,
        previewMode,
        setPreviewMode,
        selectedField,
        setSelectedField,
        updateField,
        addField, // এই ফাংশনটি এখন নতুন স্ট্যান্ডার্ডাইজড টাইপ পাবে
        deleteField,
        duplicateField,
        reorderFields,
        submittedData,
        setSubmittedData,
        showSuccessMessage,
        setShowSuccessMessage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
