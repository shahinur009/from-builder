// app/context/FormContext.js
// (No changes needed, keeping for completeness to show where `successMessage` comes from)
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { initialSchema } from "../utils/initialSchema";

const FormContext = createContext();

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
    setFormSchema((prevSchema) => ({
      ...prevSchema,
      fields: [...prevSchema.fields, newField],
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
          // Also reset value for duplicated field if it's a file to avoid issues
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
        addField,
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
