import React, {memo} from "react";

const EditInput = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
  setErr,
  label2,
  min,
  max,
}) => {
  return (
    <>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        {label}
      </p>
      <div
        className="form-floating text-muted rounded-1"
        style={{border: error ? "2px solid red" : ""}}>
        <input
          type={type}
          style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
          onFocus={() => setErr({})}
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control border-0 rounded-1"
        />
        <label htmlFor="inputHeightFeet" style={{fontFamily: "Inter"}}>
          {label2}
        </label>
      </div>
    </>
  );
};

export default memo(EditInput);
