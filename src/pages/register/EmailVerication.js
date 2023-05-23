import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AuthServices from "../../services/authServices";
import {getToken} from "../../utils/functions";
import toastMsg from "../../utils/toastify";

function EmailVerication() {
  const navigate = useNavigate();

  const onClickLogout = async () => {
    let res = await AuthServices.sendVerificationLink();
    if (res.status === 200) {
      toastMsg.success(res.data?.message);
    }
    //console.log("res", res);
    // localStorage.removeItem("saiyonee_auth_token");
    // localStorage.removeItem("isVarified");
    // navigate("/get-start");
    // if (token) {
    //   const res = await AuthServices.logout();
    //   if (res.status === 200) {

    //   } else {
    //     //console.log(res);
    //   }
    // }
  };
  const logout = () => {
    //console.log("logout");
    localStorage.clear();
    window.location.reload();

    navigate("/get-start");
  };
  return (
    <>
      <div className="text-center min-vh-100 max-width-mobile mx-auto">
        <img
          src="/img/congrats-bg.svg"
          alt="bg-star"
          className="img-fluid w-100 rounded-top"
        />
        <div className="container px-4">
          <div className="row">
            <div className="col">
              <div className="card border-0 mt-n8 bg-transparent rounded shadow">
                <div className="card-body bg-white rounded px-4 py-5">
                  <h1 className="card-title">Verify Email</h1>
                  <p className="card-text text-muted">
                    We have sent you link in your email. Please check your inbox
                    and click on that link to complete your registration
                  </p>
                </div>
              </div>
              <button
                className="btn btn-primary w-100 rounded shadow p-3 my-4"
                onClick={onClickLogout}
              >
                <strong>Resend Verification Link</strong>
              </button>
              <button
                className="btn btn-primary w-100 rounded shadow p-3 mb-4"
                onClick={logout}
              >
                <strong>Go to Home</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerication;
