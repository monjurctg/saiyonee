import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import BasicLayout from "../../components/layouts/BasicLayout";
import AuthServices from "../../services/authServices";
import toastMsg from "../../utils/toastify";

const ForgotPass = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");

  let subItem = (
    <div className="position-absolute d-flex flex-column justify-content-center align-items-center position-top mt-6">
      <Link to={"/"}>
        <img src="img/logo.svg" alt="" />
      </Link>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);

    const res = await AuthServices.forgotPassword(formData);
    if (res.status === 200) {
      console.log(res, "res success");
      toastMsg.success(res.data.message);
      navigate("/reset-pass");
    } else {
      toastMsg.error(res.data.message);
    }
  };

  const onChange = (e) => {
    const {name, value} = e.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  return (
    <BasicLayout subItem={subItem}>
      <div
        className="card border-0 bg-transparent overflow-auto flex-grow-1"
        style={{height: "40vh", marginTop: "-55px"}}>
        <div className="card-body bg-body rounded p-4 overflow-auto">
          <h1 className="card-title mt-3">Forget Password</h1>
          <p className="card-text text-muted mt-3 mb-5">
            Enter email address to get an OTP
          </p>

          <div className="form-floating my-4 text-muted">
            <input
              type="email"
              id="inputEmail"
              value={email}
              name="email"
              onChange={onChange}
              className="form-control border-0 rounded-1"
              placeholder="name@example.com"
              aria-describedby="email"
            />
            <label
              htmlFor="inputEmail"
              style={{
                textAlign: "left",
              }}>
              Email ID
            </label>
          </div>
          <div className="container px-4 pb-4 pt-2" style={{height: "20vh"}}>
            <button
              onClick={handleSubmit}
              // disabled={
              //     loading
              //     // status === FetchStatus.LOADING ||
              //     // verifyingPreviousLogin ||
              //     // isPrefetchingForms
              // }
              className="btn btn-primary w-100 rounded shadow p-3 my-2">
              <strong>Request OTP </strong>
              {/* {
                                loading && (
                                    <>
                                        <i
                                            className="spinner-border spinner-border-sm text-black"
                                            role="status"
                                            aria-hidden="true"></i>
                                        <i className="visually-hidden">Loading...</i>
                                    </>
                                )
                            } */}
            </button>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default ForgotPass;
