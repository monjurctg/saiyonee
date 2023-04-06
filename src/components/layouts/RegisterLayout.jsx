import React from "react";
import {Link, useNavigate} from "react-router-dom";
import help from "../../assets/imgs/help.svg";
import Loader from "../Loader";

function RegisterLayout({
  children,
  err,
  onContinueClicked,
  onFocus,
  footerBtn,
  helpN,
  from,
  loading,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
        <div className="container px-4 py-4  d-flex justify-content-between align-items-center">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 image-invert"
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/img/back-icon.svg" alt="back" />
          </div>
          {!helpN ? (
            <Link to={"/help"}>
              <img
                src={help}
                alt=""
                style={{ height: "45px", width: "45px" }}
              />
            </Link>
          ) : (
            <div></div>
          )}
          {/* <Link to={"/help"}>
            <img src={help} alt="" style={{height: "58px", width: "58px"}}/>
          </Link> */}
        </div>

        {children}

        <div className="container px-4 pb-4 pt-2">
          {err?.error && <p className="text-primary">* {err?.message}</p>}
          {/* {location.pathname === "/register/varification" && (
            <Link to={"/register/email"}>Go back to Refill the Data</Link>
          )} */}
          <button
            style={{ height: 60 }}
            onFocus={onFocus}
            onClick={onContinueClicked}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1"
          >
            {loading ? (
              <Loader />
            ) : (
              <strong>
                {footerBtn
                  ? footerBtn
                  : from === "varification"
                  ? "Submit"
                  : "Continue"}
              </strong>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterLayout;
