import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";
import {setIsRegStart} from "../redux/slices/authSlices";
import {FcGoogle} from "react-icons/fc";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillAccountBook,
} from "react-icons/ai";

function GetStarted() {
  const dispatch = useDispatch();
  const registerStart = () => {
    localStorage.setItem("regStart", true);
    dispatch(setIsRegStart(true));
  };
  let subItem = (
    <div className="position-absolute d-flex flex-column justify-content-center align-items-center position-top">
      {/* <LinkLogo /> */}
      <Link to={"/"}>
        <img src="img/logo.svg" alt="" />
      </Link>
    </div>
  );
  return (
    <BasicLayout subItem={subItem}>
      <div
        className="card border-0  bg-transparent flex-grow-1"
        style={{height: "40vh", marginTop: "-10px"}}>
        <div className="card-body bg-body rounded p-3">
          <h1
            className="card-title mt-3 mb-4"
            style={{
              fontFamily: "Inter",
            }}>
            Hi there! Let's get <br /> Started.
          </h1>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70px",
            }}
            onClick={registerStart}
            to={"/register/email"}
            className="btn  btn btn-outline-primary w-100 rounded shadow p-3 my-2">
            <strong
              style={{
                fontFamily: "Inter",
              }}>
              Register
            </strong>
          </Link>
          <div
            className="mb-2  justify-content-center"
            style={{
              gap: 10,
            }}>
            {/* <div>
              <a
                style={{
                  fontFamily: "Inter",
                }}
                href="https://testingsaiyonee.betteraidbd.com/social_login/facebook"
                className="btn  btn-outline-primary w-100 rounded shadow p-3 my-2">
                <strong
                  style={{
                    fontFamily: "Inter",
                  }}>
                  <span> Sign Up With </span>
                  <AiFillFacebook
                    style={{
                      color: "#14a0f8",
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </strong>
              </a>
            </div>
            <div className="">
              <a
                style={{
                  fontFamily: "Inter",
                }}
                href="https://testingsaiyonee.betteraidbd.com/social_login/linkedin"
                className="btn  btn-outline-primary  w-100 rounded shadow p-3 my-2">
                <strong
                  style={{
                    fontFamily: "Inter",
                  }}>
                  <span> Sign Up With </span>
                  <AiFillLinkedin
                    style={{
                      color: "#14a0f8",
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </strong>
              </a>
            </div>
            <div>
              <a
                href="https://testingsaiyonee.betteraidbd.com/social_login/google"
                className="btn btn btn-outline-primary w-100 rounded shadow p-3 my-2"
                style={{
                  fontFamily: "Inter",
                }}>
                <strong
                  style={{
                    fontFamily: "Inter",
                  }}>
                  <span>Sign Up With </span>
                  {""}
                  <FcGoogle
                    style={{
                      color: "#14a0f8",
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </strong>
              </a>
            </div> */}
          </div>
          <Link
            to={"/login"}
            className="btn mt-4  btn-primary w-100 rounded shadow p-3 my-2">
            <strong
              style={{
                fontFamily: "Inter",
              }}>
              Login
            </strong>
          </Link>
        </div>
        <div
          className="container max-width-mobile p-4"
          style={{height: "17vh"}}>
          {/* <div className="row">
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
      </div> */}
          <p className="get-started-p">
            By continuing you agree to our Terms and Privacy Policy. We never
            post to facebook.
          </p>
        </div>
      </div>
    </BasicLayout>
  );
}

export default GetStarted;
