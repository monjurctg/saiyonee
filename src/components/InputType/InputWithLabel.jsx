import React from "react";

const InputWithLabel = ({
  label,
  name,
  type,
  value,
  onChange,
  onFocus,
  error,
  min,
  step,
  errorType,
  underInputLabel,
}) => {
  return (
    <div>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        {label}
      </p>
      <div
        className="form-floating text-muted rounded-1"
        style={{border: error?.error === errorType ? "2px solid red" : ""}}>
        <input
          type={type}
          id={`input${name}`}
          name={name}
          min={min}
          step={step}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="form-control border-0 rounded-1"
          aria-describedby={name}
        />
        <label htmlFor={`input${name}`}>{underInputLabel}</label>
        {/* {error?.message && error?.error === errorType && (
          <span className="text-danger p-4" style={{fontSize: 12}}>
            {error?.message}
          </span>
        )} */}
      </div>
    </div>
  );
};

export default InputWithLabel;
