import React from "react";

const RegInput = ({
  type,
  id,
  value,
  onFocus,
  onChange,
  placeholder,
  label,
  error,
  fontFamily,
  name,
  errorType,
}) => {
  return (
    <div
      className={`form-floating my-4 rounded-1 text-start text-muted ${
        error ? "error" : ""
      }`}
      style={{
        fontFamily: fontFamily,
        border: error?.error == errorType ? "2px solid red" : "",
      }}
    >
      <input
        type={type}
        id={id}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        className="form-control border-0 rounded-1"
        placeholder={placeholder}
        aria-describedby={id}
        name={name}
      />
      <label htmlFor={id} style={{ fontFamily: fontFamily }}>
        {label}
      </label>
    </div>
  );
};

export default RegInput;
