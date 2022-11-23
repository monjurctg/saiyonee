import React from "react";

import RegisterLayout from "../../components/layouts/RegisterLayout";

function FamilyInfo() {
  let err = "";
  let onContinueClicked = () => {};
  return (
    <>
      <RegisterLayout onContinueClicked={onContinueClicked} err={err}>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1>Candidate's Family Information</h1>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputFatherOccupation"
              //   value={father_occupation}
              //   onChange={onFatherOccupationChanged}
              className="form-control border-0 rounded-1"
              placeholder="occupation"
              aria-describedby="occupation"
            />
            <label htmlFor="inputFatherOccupation">
              Enter Father's Occupation
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputFatherHomeDistrict"
              //   value={father_home_district}
              //   onChange={onFatherHomeDistrictChanged}
              className="form-control border-0 rounded-1"
              placeholder="homedistrict"
              aria-describedby="homedistrict"
            />
            <label htmlFor="inputFatherHomeDistrict">
              Enter Father's Home District
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputMotherOccupation"
              //   value={mother_occupation}
              //   onChange={onMotherOccupationChanged}
              className="form-control border-0 rounded-1"
              placeholder="occupation"
              aria-describedby="occupation"
            />
            <label htmlFor="inputMotherOccupation">
              Enter Mother's Occupation
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputMotherHomeDistrict"
              //   value={mother_home_district}
              //   onChange={onMotherHomeDistrictChanged}
              className="form-control border-0 rounded-1"
              placeholder="homedistrict"
              aria-describedby="homedistrict"
            />
            <label htmlFor="inputMotherHomeDistrict">
              Enter Mother's Home District
            </label>
          </div>

          <p className="text-muted mt-5 mb-2">Number of brothers</p>
          <div className="row">
            <div className="col-2">
              <button
                // onClick={decrementBrotherCount}
                className="btn btn-primary w-100 rounded-1 shadow p-3">
                <strong>-</strong>
              </button>
            </div>
            <div className="col-8 px-4">
              <input
                type="number"
                id="inputBrotherCount"
                // value={number_of_brothers}
                // onChange={onNumberOfBrothersChanged}
                className="form-control border-0 rounded-1 p-3 text-center"
                placeholder="50"
                aria-describedby="BrotherCount"
              />
            </div>
            <div className="col-2">
              <button
                // onClick={incrementBrotherCount}
                className="btn btn-primary w-100 rounded-1 shadow p-3">
                <strong>+</strong>
              </button>
            </div>
          </div>

          <p className="text-muted mt-4 mb-2">Number of sisters</p>
          <div className="row">
            <div className="col-2">
              <button
                // onClick={decrementSisterCount}
                className="btn btn-primary w-100 rounded-1 shadow p-3">
                <strong>-</strong>
              </button>
            </div>
            <div className="col-8 px-4">
              <input
                type="number"
                id="inputSisterCount"
                // value={number_of_sisters}
                // onChange={onNumberOfSistersChanged}
                className="form-control border-0 rounded-1 p-3 text-center"
                placeholder="50"
                aria-describedby="SisterCount"
              />
            </div>
            <div className="col-2">
              <button
                // onClick={incrementSisterCount}
                className="btn btn-primary w-100 rounded-1 shadow p-3">
                <strong>+</strong>
              </button>
            </div>
          </div>
        </div>
      </RegisterLayout>
    </>
  );
}

export default FamilyInfo;
