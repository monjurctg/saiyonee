import React from "react";
import {Link, useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";

function Location() {
  let navigate = useNavigate();
  let err = "";
  let current_country = "Bangladesh";
  let current_city = "Chittagong";

  const onContinueClicked = () => {
    navigate("/register/family_info");
  };
  return (
    <>
      <RegisterLayout err={err} onContinueClicked={onContinueClicked}>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1>Current Country and City</h1>
          <p className="text-muted mt-5 mb-2">Candidate's current country</p>
          <Link to={"/register/location/country"}>
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {current_country ? current_country : "Select current country"}
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
          <p className="text-muted mt-5 mb-2">Candidate's current city</p>
          <Link to={"/register/location/city"}>
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {current_city ? current_city : "Select current city"}
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
        </div>
      </RegisterLayout>
    </>
  );
}

export default Location;
