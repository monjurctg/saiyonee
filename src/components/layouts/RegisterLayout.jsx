import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import help from "../../assets/imgs/help.svg";

function RegisterLayout({
  children,
  err,
  onContinueClicked,
  onFocus,
  footerBtn,
  helpN,
  from,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  //   // console.log('first')
  //   if (window.performance) {
  //     if (performance.navigation.type === 1) {
  //       navigate('/register/email')
  //     }
  //   }
  // }, [])
  // console.log('err in lay', err)
  return (
    <>
      <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
        <div className="container px-4 py-4  d-flex justify-content-between">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
          {!helpN ? (
            <Link to={"/help"}>
              <img src={help} alt="" style={{height: "35px", width: "35px"}} />
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
            style={{height: 60}}
            onFocus={onFocus}
            onClick={onContinueClicked}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
            <strong>
              {footerBtn
                ? footerBtn
                : from === "varification"
                ? "Submit"
                : "Continue"}
            </strong>
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterLayout;
