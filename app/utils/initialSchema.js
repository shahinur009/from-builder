export const initialSchema = {
  id: "777w5d35",
  version: "1.0.0",
  name: "Custom Form",
  toEmail: "test@dorik.io",
  subject: "Custom Form from Dorik",
  successMessage: "Successful Form Submission",
  fields: [
    {
      id: "mffkcgsa",
      label: "Name",
      name: "name",
      placeholder: "Enter your Name",
      type: "text",
      required: true,
      columnWidth: "100%",
      value: "",
    },
    {
      id: "72hje740",
      type: "email",
      label: "Email",
      placeholder: "Your Email Address",
      name: "email",
      required: true,
      columnWidth: "100%",
      value: "",
    },
    {
      id: "0l3jl63i",
      type: "time",
      label: "Time",
      columnWidth: "100%",
      name: "time",
      required: false,
      value: "",
    },
    {
      id: "4964r7li",
      type: "date",
      label: "Date",
      columnWidth: "100%",
      name: "date",
      required: false,
      value: "",
    },
    {
      id: "3vlb0g2e",
      type: "radio",
      label: "Radio Input",
      options: ["Option 1=option1", "Option 2=option2", "Option 3=option3"],
      columnWidth: "100%",
      name: "radioInput",
      required: false,
      value: "option1",
    },
    {
      id: "n2t18jme",
      type: "checkbox",
      label: "Checkbox Input",
      options: ["Option 1=option1", "Option 2=option2", "Option 3=option3"],
      inlineStyle: "bellow",
      columnWidth: "100%",
      name: "checkboxInput",
      required: false,
      value: [],
    },
    {
      id: "6x0gza3h",
      type: "file",
      label: "Upload",
      name: "uploadFile",
      columnWidth: "100%",
      accept: "image/*",
    },
    {
      id: "7azo7fj6",
      type: "select",
      label: "Select",
      name: "selectOption",
      placeholder: "Select",
      options: ["Option 1=option-1", "Option 2=option-2"],
      columnWidth: "100%",
      value: "option-1",
    },
    {
      id: "b5dbentx",
      type: "acceptance",
      content:
        "<p><strong>I agree with all terms and conditions.</strong></p>\n",
      required: true,
      columnWidth: "100%",
      name: "acceptance",
      value: false,
    },
  ],
};
