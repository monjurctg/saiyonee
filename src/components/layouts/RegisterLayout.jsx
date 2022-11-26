import React, { useEffect } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

function RegisterLayout({children, err, onContinueClicked}) {
  const navigate = useNavigate();
  const location = useLocation()
  // useEffect(() => {
  //   // console.log('first')
  //   if (window.performance) {
  //     if (performance.navigation.type === 1) {
  //       navigate('/register/email')
  //     } 
  //   }
  // }, [])
  

  return (
    <>
      <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
        <div className="container px-4">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>

        {children}

        <div className="container px-4 pb-4 pt-2">
          {err && <p className="text-primary">* {err}</p>}
        {location.pathname === "/register/varification"
        &&
        <Link to={"/register/email"}>Go back to Refill the Data</Link>
        } 
          <button style={{height:60}}
            onClick={onContinueClicked}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
            <strong>Continue</strong>
          </button> 
        </div>
      </div>
    </>
  );
}

export default RegisterLayout;
