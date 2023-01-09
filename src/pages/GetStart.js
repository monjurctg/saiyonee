import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";
import {setIsRegStart} from "../redux/slices/authSlices";
import { FcGoogle } from "react-icons/fc";
import { AiFillLinkedin,AiFillFacebook  } from "react-icons/ai";




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
      <div className="card border-0  bg-transparent flex-grow-1"  style={{height:"40vh",marginTop:"-70px"}}>
        <div className="card-body bg-body rounded p-3">
          <h1
            className="card-title mt-3 mb-4"
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

          <div className="mb-2 d-flex justify-content-center" style={{
            gap:10
          }}>
            <div>

            <Link to={"/social-login"}>
            <AiFillFacebook style={{
             color: "#14a0f8",
             width: 40,
             height: 40,
             borderRadius: "50%",
             cursor: "pointer"
            }}/>
            
            </Link>
            </div>
            <div>
            <AiFillLinkedin style={{
             color: "rgb(5 90 189)",
             width: 40,
             height: 40,
             borderRadius: "50%",
             cursor: "pointer"
            }}/>

            </div>
            <div>
              <a href="https://testingsaiyonee.betteraidbd.com/social_login/google"> 
            <FcGoogle
            style={{
              color: "rgb(5 90 189)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              cursor: "pointer"
              }}
            />


              </a>

            </div>
          </div>
        </div>
      </div>
      <div className="container max-width-mobile p-4"style={{height: "20vh",
          position: "fixed",
          bottom: 0,}}>
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
        By continuing you agree to our Terms and Privacy Policy. We never post to facebook.
        </p>
      </div>
    </BasicLayout>
  );
}

export default GetStarted;
