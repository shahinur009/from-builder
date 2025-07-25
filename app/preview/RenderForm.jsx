import React from "react";

const RenderForm = ({ fields, formData, handleChange }) => {
  const renderInput = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      className: `p-2 border border-gray-300 rounded-md shadow-sm w-full`,
      onChange: handleChange,
      readOnly: true,
      onClick: (e) => e.preventDefault(),
      tabIndex: -1,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "date":
      case "time":
        return (
          <input
            type={field.type}
            value={formData[field.name] || ""}
            {...commonProps}
          />
        );
      case "file":
        return (
          <input
            type="file"
            {...commonProps}
            disabled={true}
            value={undefined}
          />
        ); 
      case "select":
        return (
          <select
            value={formData[field.name] || ""}
            {...commonProps}
            disabled={true}
          >
            {" "}
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
        );
      case "checkbox":
        return (
          <div className="flex flex-col space-y-2">
            {field.options &&
              field.options.map((option, idx) => {
                const [label, value] = option.split("=");
                const isChecked =
                  Array.isArray(formData[field.name]) &&
                  formData[field.name].includes(value);
                return (
                  <label
                    key={idx}
                    className={`inline-flex items-center cursor-default`}
                  >
                    <input
                      type="checkbox"
                      value={value}
                      name={field.name}
                      checked={isChecked}
                      disabled={true} 
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-900">{label}</span>
                  </label>
                );
              })}
          </div>
        );
      case "radio":
        return (
          <div className="flex flex-col space-y-2">
            {field.options &&
              field.options.map((option, idx) => {
                const [label, value] = option.split("=");
                const isChecked = formData[field.name] === value;
                return (
                  <label
                    key={idx}
                    className={`inline-flex items-center cursor-default`}
                  >
                    <input
                      type="radio"
                      value={value}
                      name={field.name}
                      checked={isChecked}
                      disabled={true} 
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="text-gray-900">{label}</span>
                  </label>
                );
              })}
          </div>
        );
      case "acceptance":
        return (
          <label className={`inline-flex items-center cursor-default`}>
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              disabled={true} 
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span
              className="text-gray-900"
              dangerouslySetInnerHTML={{ __html: field.content }}
            />
          </label>
        );
      default:
        return (
          <p className="text-red-500">
            Error: Unknown or missing field type: **{field.type || "undefined"}
            ** for field `{field.label}`. Please check your form schema.
          </p>
        );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {fields.map((field) => (
        <div
          key={field.id}
          className={`col-span-${parseInt(field.columnWidth) / (100 / 12)}`}
        >
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderInput(field)}
        </div>
      ))}
    </div>
  );
};

export default RenderForm;
