import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AuthServices from "../../services/authServices";
import {getToken} from "../../utils/functions";

function RegSuccess() {
  const navigate = useNavigate();
  // let token = getToken();
  // let isVarified = localStorage.getItem("isVarified");

  // useEffect(() => {
  //   let token = getToken();
  //   let isVarified = localStorage.getItem("isVarified");
  //   if (token && isVarified == 0) {
  //     console.log("ok");
  //   } else {
  //     navigate("/get-start");
  //   }
  // }, []);
  const onClickLogout = async () => {
    let token = getToken();

    if (token) {
      const res = await AuthServices.logout();
      if (res.status === 200) {
        localStorage.removeItem("saiyonee_auth_token");
        navigate("/get-start");
      } else {
        console.log(res);
      }
    }
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
                  <h1 className="card-title">
                    Congratulation! Register Success
                  </h1>
                  <p className="card-text text-muted">
                    Your informations are being verified now
                  </p>
                </div>
              </div>
              <button
                className="btn btn-primary w-100 rounded shadow p-3 my-4"
                onClick={onClickLogout}>
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegSuccess;
