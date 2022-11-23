import React from "react";
import {Link, useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";

function Ocupation() {
  const navigate = useNavigate();
  let currentEmploymentTypeOther = true;
  let current_employment_type = "v";
  let industry = "hello";
  let err = "";
  let onContinueClicked = () => {
    navigate("/register/location");
  };
  return (
    <>
      <RegisterLayout onContinueClicked={onContinueClicked} err={err}>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1>Candidate’s Professional Background</h1>
          <p className="text-muted mt-5 mb-2">Current Employment type</p>
          <Link to={"/register/occupation_types"}>
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {/* {currentEmploymentTypeOther
                  ? 'Other'
                  : current_employment_type
                  ? current_employment_type
                  : 'Select current employment type'} */}
                </label>
              </div>
              <div className="col-2 d-flex justify-content-end pe-3">
                <img
                  src="/img/back-icon.svg"
                  alt="next"
                  className="rotate-180"
                />
              </div>
            </div>
          </Link>
          {currentEmploymentTypeOther && (
            <div className="form-floating my-4 text-muted">
              <input
                type="text"
                id="inputEmploymentType"
                // value={current_employment_type}
                // onChange={onEmploymentTypeChanged}
                className="form-control border-0 rounded-1"
                placeholder="employmentType"
                aria-describedby="employmentType"
              />
              <label htmlFor="inputEmploymentType">Enter Employment Type</label>
            </div>
          )}
          {((current_employment_type &&
            current_employment_type !== "Unemployed" &&
            current_employment_type !== "Student") ||
            currentEmploymentTypeOther) && (
            <>
              <p className="text-muted mt-5 mb-2">Industry</p>
              <Link to={"/register/industry_types"}>
                <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
                  <div className="col-10">
                    <label className="form-check-label bg-white px-2 text-body">
                      {industry ? industry : "Select current industry"}
                    </label>
                  </div>
                  <div className="col-2 d-flex justify-content-end pe-3">
                    <img
                      src="/img/back-icon.svg"
                      alt="next"
                      className="rotate-180"
                    />
                  </div>
                </div>
              </Link>
              <div className="form-floating my-4 text-muted">
                <input
                  type="text"
                  id="inputEmployer"
                  //   value={employer_name}
                  //   onChange={onEmployerNameChanged}
                  className="form-control border-0 rounded-1"
                  placeholder="employer"
                  aria-describedby="employer"
                />
                <label htmlFor="inputEmployer">Enter Employer's Name</label>
              </div>
              <div className="form-floating my-4 text-muted">
                <input
                  type="text"
                  id="inputDesignation"
                  //   value={designation}
                  //   onChange={onDesignationChange}
                  className="form-control border-0 rounded-1"
                  placeholder="designation"
                  aria-describedby="designation"
                />
                <label htmlFor="inputDesignation">Enter designation</label>
              </div>
              <div className="form-floating my-3 text-muted">
                <input
                  type="date"
                  id="inputWorkingSinceDate"
                  className="form-control border-0 rounded-1"
                  placeholder="name@example.com"
                  aria-describedby="workingSinceDate"
                  //   value={working_since?.toISOString().substring(0, 10)}
                  //   onChange={onWorkingSinceDateChange}
                />
                <label htmlFor="inputWorkingSinceDate">Working Since</label>
              </div>
            </>
          )}
        </div>
      </RegisterLayout>
    </>
  );
}

export default Ocupation;
