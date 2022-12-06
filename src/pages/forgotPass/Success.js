import React from "react";
import {useNavigate} from "react-router-dom";
import AuthServices from "../../services/authServices";
import {getToken} from "../../utils/functions";

const Success = () => {
  const navigate = useNavigate();

  setTimeout(async () => {
    const res = await AuthServices.check_verified();
    if (res.status === 200) {
      if (res.data.is_verified == 1) {
        localStorage.setItem("isVarified", 1);

        navigator("/question/1");
      }
    }
  }, 1000);

  const onClickLogout = async () => {
    let token = getToken();
    localStorage.removeItem("saiyonee_auth_token");
    localStorage.removeItem("isVarified");
    navigate("/get-start");
    // if (token) {
    //   const res = await AuthServices.logout();
    //   if (res.status === 200) {

    //   } else {
    //     console.log(res);
    //   }
    // }
  };

  return (
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
                <h1 className="card-title">Password Changed Successfully!</h1>
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
  );
};

export default Success;
