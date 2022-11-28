import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthServices from "../services/authServices";
import { setToken } from "../utils/functions";

function Login() {

  const [loading, setloading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState(null)
  const navigator = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setloading(true)
    let data = {
      email: email,
      password: password,
    };

    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    let res = await AuthServices.login(formData);
    console.log('res', res.data)
    if (res.status === 200) {
      setloading(false)
      setErr(false)
      setToken( res.data.auth_token);
      if(res.data.is_verified  === 0) navigator("/tutorial");
      else navigator("/question/1");
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      // window.location.href = "/";
    } else {
      setloading(false)
      setErr(res.data.message)
    }



    console.log('data', data)
  }
  // let err = true;
  return (
    <>
      <div className="vh-100 max-width-mobile mx-auto d-flex flex-column"  style={{ background: "#e9ecef3b" }}>
        <div className="position-relative">
          <img
            src="img/bg.svg"
            alt="bg-star"
            className="img-fluid w-100 rounded-top"
          />
          <div className="position-absolute container position-top mt-6">
            <div className="row justify-content-center">
              <div className="col-2 ps-3">
                <button
                  // onClick={history.goBack}
                  className="btn btn-light rounded-circle shadow p-3 image-invert"
                  style={{height: "58px", width: "58px"}}>
                  <img src="/img/back-icon.svg" alt="back" />
                </button>
              </div>
              <div className="col-8 d-flex justify-content-center">
                {/* <LinkLogo /> */}
                <Link to={"/"}>
                  <img src="img/logo.svg" alt="" />
                </Link>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        <div className="card border-0 mt-n15 bg-transparent overflow-auto flex-grow-1">
          <div className="card-body bg-body rounded p-4 overflow-auto">
            <h1 className="card-title mt-3">Login</h1>
            <p className="card-text text-muted mt-3 mb-5">
              Take a step towards finding someone awesome!
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
              <label htmlFor="inputEmail">Email ID</label>
            </div>
            <div className="form-floating my-4 text-muted">
              <input
                type="password"
                id="inputPassword"
                value={password}
                name="password"
                onChange={onChange}
                className="form-control border-0 rounded-1"
                placeholder="******"
                aria-describedby="password"
              />
              <label htmlFor="inputPassword">Password</label>
            </div>
            <div className="d-flex justify-content-end mb-4 mt-5">
              <Link to="#">Forgot Password</Link>
            </div>
          </div>
        </div>
        <div className="container px-4 pb-4 pt-2">
          {err !== false && <p className="text-primary">* {err}</p>}
          <button
            onClick={handleSubmit}
            disabled={
              loading
              // status === FetchStatus.LOADING ||
              // verifyingPreviousLogin ||
              // isPrefetchingForms
            }
            className="btn btn-primary w-100 rounded shadow p-3 my-2">
            <strong>Continue </strong>
            {
              // (status === FetchStatus.LOADING ||
              // verifyingPreviousLogin ||
              //   isPrefetchingForms)
              loading && (
                <>
                  <i
                    className="spinner-border spinner-border-sm text-black"
                    role="status"
                    aria-hidden="true"></i>
                  <i className="visually-hidden">Loading...</i>
                </>
              )
            }
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
