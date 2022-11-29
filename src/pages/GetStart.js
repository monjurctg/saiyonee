import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";
import {setIsRegStart} from "../redux/slices/authSlices";

function GetStarted() {
  const dispatch = useDispatch();
  const registerStart = () => {
    localStorage.setItem("regStart", true);
    dispatch(setIsRegStart(true));
  };
  let subItem = (
    <div className="position-absolute d-flex flex-column justify-content-center align-items-center position-top mt-6">
      {/* <LinkLogo /> */}
      <Link to={"/"}>
        <img src="img/logo.svg" alt="" />
      </Link>
    </div>
  );
  return (
    <BasicLayout subItem={subItem}>
      <div className="card border-0 mt-n15 bg-transparent flex-grow-1">
        <div className="card-body bg-body rounded p-4">
          <h1
            className="card-title mt-3 mb-5"
            style={{
              fontFamily: "Inter",
            }}>
            Hi there! Let's get <br /> Started.
          </h1>
          <Link
            onClick={registerStart}
            to={"/register/email"}
            className="btn btn-primary w-100 rounded shadow p-3 my-2">
            <strong
              style={{
                fontFamily: "Inter",
              }}>
              Sign Up
            </strong>
          </Link>
          <Link
            to={"/login"}
            className="btn btn-outline-primary w-100 rounded shadow p-3 my-2">
            <strong
              style={{
                fontFamily: "Inter",
              }}>
              Login
            </strong>
          </Link>
        </div>
      </div>
      <div className="container p-4">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center">
              <Link
                to="/" // TODO ROUTES.tutorial
                className="image-saturate position-relative me-auto">
                <img
                  src="img/next-btn-25-percent.svg"
                  alt="next-btn-25-percent.svg"
                  className="img-fluid"
                />
                <div className="position-absolute position-fill d-flex align-items-center justify-content-center">
                  <img
                    src="img/back-icon.svg"
                    alt="next-btn-25-percent.svg"
                    className="img-fluid"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default GetStarted;
