"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormProvider } from "../context/FormContext";

export default function ClientProviders({ children }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormProvider>{children}</FormProvider>
    </DndProvider>
  );
}
