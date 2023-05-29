import React, { memo, useState } from "react";

const PassingYearDropdown = ({
  passingYear,
  onChange,
  userPassingYear,
  previousPassingYear,
  maxHeight,
  errorType,
  error,
  setErr
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleYearClick = (year) => {
    onChange(year);
    setDropdownOpen(false);
  };

  const passingYears = Array.from(
    new Array(new Date().getFullYear() - 1990 + 1)
  ).map((_, i) => 1990 + i);

  return (
    <div
      className="row my-4 px-2  rounded-1"
      style={{ border: error?.error === errorType ? "1px solid red" : "" }}
    >
      <div className="col-8 d-flex align-items-center">
        <label className="form-check-label px-2 text-muted">
          Select passing year
        </label>
      </div>
      <div className="col-4">
        <div className="dropup bg-white rounded-1">
          <button
            type="button"
            className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
            data-bs-toggle="dropdown"
            aria-expanded={dropdownOpen ? "true" : "false"}
            onClick={toggleDropdown}
            onFocus={()=>setErr({})}
          >
            {passingYear ? passingYear : userPassingYear}
          </button>
          <ul
            data-bs-popper
            className={`dropdown-menu dropdown-menu-end w-100 text-end overflow-scroll shadow border-0 p-2${
              dropdownOpen ? " show" : ""
            }`}
            style={{ maxHeight: maxHeight }}
          >
            {passingYears.map((year, i) => {
              if (parseInt(year) > parseInt(previousPassingYear)) {
                return (
                  <li key={i}>
                    <div
                      className={`btn btn-primary py-3 dropdown-item${
                        passingYear === year ? " active" : ""
                      }`}
                      onClick={() => handleYearClick(year)}
                    >
                      {year}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(PassingYearDropdown);
