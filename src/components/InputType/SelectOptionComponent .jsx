import React from "react";

const SelectOptionComponent = ({ label, value, errorType, onClick, error }) => {
  console.log(error?.error,errorType)
  return (
    <div onClick={onClick}>
      <div
        className={`row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2`}
        style={{ fontFamily: "Inter", cursor: "pointer",border:error?.error===errorType?"1px solid red":"" }}
      >
        <div className="col-10">
          <label className="form-check-label bg-white px-2 text-body">
            {value ? value : label}
          </label>
        </div>
        <div className="col-2 d-flex justify-content-end pe-3">
          <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default SelectOptionComponent;
