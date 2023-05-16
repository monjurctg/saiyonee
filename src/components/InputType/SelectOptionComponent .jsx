import React from "react";

const SelectOptionComponent = ({ label, value, errorType, onClick, error }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2 ${
          error?.error === errorType ? "border-red" : ""
        }`}
        style={{ fontFamily: "Inter", cursor: "pointer" }}
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
