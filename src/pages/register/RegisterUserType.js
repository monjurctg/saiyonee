import React from "react";
import {Link, useNavigate} from "react-router-dom";

function RegisterUserType() {
  let USER_TYPES = ["mail", "femail"];
  const navigate = useNavigate();
  return (
    <>
      <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
        <div className="container pt-4 px-4">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1>I'm searching life partner for</h1>
          {USER_TYPES.map((userType, i) => (
            <div
              key={i}
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label
                  htmlFor={userType}
                  className="form-check-label bg-white w-100">
                  <strong>{userType}</strong>
                </label>
              </div>
              <div className="col-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="user_type"
                  //   checked={user_type === userType}
                  //   onChange={onTypeChange}
                  value={userType}
                  id={userType}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="container px-4 pb-4 pt-2">
          <Link
            to={"/register/personal-info"}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-3">
            <strong>Next</strong>
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterUserType;
