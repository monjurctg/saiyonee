import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";
import AuthServices from "../services/authServices";
import { setToken } from "../utils/functions";

function Login() {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigator = useNavigate();

  let subItem = (
    <div className="position-absolute d-flex flex-column justify-content-center align-items-center position-top mt-6">
      {/* <LinkLogo /> */}
      <Link to={"/"}>
        <img src="img/logo.svg" alt="" />
      </Link>
    </div>
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    let data = {
      email: email,
      password: password,
    };

    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    let res = await AuthServices.login(formData);
    // console.log("res", res.data);
    if (res.status === 200) {
      setloading(false);
      setErr(false);
      setToken(res.data.auth_token);
      // console.log(res.data.is_verified);

      if (res.data.is_verified == 0) {
        localStorage.setItem("isVarified", 0);

        navigator("/success");
      } else {
        localStorage.setItem("isVarified", 1);

        navigator("/question/1");
      }
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      // window.location.href = "/";
    } else {
      setloading(false);
      setErr(res.data.message);
    }

    // console.log("data", data);
  };
  // let err = true;
  return (
    <>
      <BasicLayout subItem={subItem}>

        <div className="card border-0 bg-transparent overflow-auto flex-grow-1" style={{ height: "40vh", marginTop: "-55px" }}>
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
              <label
                htmlFor="inputEmail"
                style={{
                  textAlign: "left"
                }}
              >Email ID
              </label>
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
              <label
                htmlFor="inputPassword"
                style={{
                  textAlign: "left"
                }}
              >Password</label>
            </div>
            <div className="d-flex justify-content-end mb-4 mt-5">
              <Link to="/forgot-pass">Forgot Password</Link>
            </div>
          </div>
        </div>
        <div className="container px-4 pb-4 pt-2" style={{ height: "20vh" }}>
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
      </BasicLayout>
    </>
  );
}

export default Login;
