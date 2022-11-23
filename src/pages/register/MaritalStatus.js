import React from "react";
import {useNavigate} from "react-router-dom";
import {MARITAL_STATUS_TYPES} from "../../constants/register_constants";

function MaritalStatus() {
  const navigatior = useNavigate();
  return (
    <>
      <div className="vh-100 max-width-mobile mx-auto">
        <div className="container pt-4 px-4">
          <div
            onClick={() => navigatior(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>
        <div className="container px-4 pb-2 overflow-auto">
          <h1>Marital status</h1>
          <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
            <div className="col-10">
              <label htmlFor="None" className="form-check-label bg-white w-100">
                <strong>Select marital status</strong>
              </label>
            </div>
            <div className="col-2">
              <input
                className="form-check-input"
                type="radio"
                name="marital_status_type"
                //   checked={!marital_status}
                //   onChange={onMaritalStatusChange}
                value={undefined}
                id="None"
              />
            </div>
          </div>

          {MARITAL_STATUS_TYPES.map((maritalStatusType, i) => (
            <div
              key={i}
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label
                  htmlFor={maritalStatusType}
                  className="form-check-label bg-white w-100">
                  <strong>{maritalStatusType}</strong>
                </label>
              </div>
              <div className="col-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="marital_status_type"
                  // checked={marital_status === maritalStatusType}
                  // onChange={onMaritalStatusChange}
                  value={maritalStatusType}
                  id={maritalStatusType}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MaritalStatus;
