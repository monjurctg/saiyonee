import React, {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";
import AuthServices from "../services/authServices";
import {getToken, setToken} from "../utils/functions";
import toastMsg from "../utils/toastify";

function VerifyEmail() {
  const [loading, setloading] = useState(false);
  let token = localStorage.getItem("saiyonee_auth_token");
  const [searchParams] = useSearchParams();
  // console.log('saiyonee_auth_token', token)
  // console.log("searchParams", searchParams.get("code"));
  const verification_code = searchParams.get("code");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  // console.log('err', err?.message)
  const navigator = useNavigate();
  if (verification_code) {
    localStorage.setItem("code", verification_code);
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigator("/login");
    }
  }, []);
  let verify = useCallback(async () => {
    let res = await AuthServices.checkIsEmailVerification({
      code: verification_code,
    });
    // console.log("res", res);
    if (res.status === 200) {
      localStorage.setItem("emailVerified", true);
      toastMsg.success(res.data?.message);
      navigator("/success");
    } else {
      toastMsg.error(res.data.message);
      navigator("/email-verification");
      // console.log(res);
    }
    //   setToken(res.data?.token);
    //   localStorage.setItem("isVarified", true);
    //   navigator("/get-start");
    // } else {
    //   console.log(res);
    // }
  }, [verification_code, navigator]);

  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token, verify]);

  let subItem = (
    <div className="position-absolute container position-top mt-2">
      <div className="row justify-content-center">
        <div className="col-2 pr-3">
          <button
            onClick={() => navigator(-1)}
            className="btn btn-light rounded-circle shadow p-3 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </button>
        </div>
        <div className="col-8 d-flex justify-content-end">
          {/* <LinkLogo /> */}
          <Link to={"/"}>
            <img src="/img/logo.svg" alt="" />
          </Link>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );

  const onChange = (e) => {
    const {name, value} = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErr({
        error: "password",
        message: "Password is required",
      });
    }
    setloading(true);
    let data = {
      code: verification_code,
      password: password,
      password_confirmation: confirmPassword,
    };

    let formData = new FormData();
    formData.append("code", data.code);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    let res = await AuthServices.checkIsEmailVerification(formData);
    // console.log("res", res.data);
    if (res.status === 200) {
      setloading(false);
      setErr(false);
      setToken(res.data.auth_token);
      // console.log(res.data.is_verified);

      if (res.data.is_verified == 0) {
        navigator("/success");
      } else {
        if (res.data.profile_preference_exists) {
          navigator("/home");
          return;
        }
        localStorage.setItem("isVarified", 1);

        navigator("/question/1");
      }
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      // window.location.href = "/";
    } else {
      setloading(false);
      // console.log("res.data", res.data.message);
      setErr({
        error: "email",
        message: res.data.message,
      });
      return;
    }

    // console.log("data", data);
  };
  let activeNow = "";
  if (token) {
    activeNow = "Loading...";
  } else {
    activeNow = (
      <BasicLayout subItem={subItem}>
        <div
          className="card border-0 bg-transparent overflow-auto flex-grow-1"
          style={{height: "40vh", marginTop: "-55px"}}>
          <div className="card-body bg-body rounded p-4 overflow-auto">
            <h1 className="card-title mt-3">Verify your Email</h1>
            <p className="card-text text-muted mt-3 mb-5">
              Take a step towards finding someone awesome!
            </p>

            <div
              className="form-floating my-4 text-muted rounded-1"
              style={{
                fontFamily: "Inter",
                border: err?.error == "password" ? "2px solid red" : "",
              }}>
              <input
                type="password"
                id="inputPassword"
                onFocus={() => setErr({})}
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
                  textAlign: "left",
                }}>
                Password
              </label>
            </div>
            <div
              className="form-floating my-4 rounded-1 text-start text-muted"
              style={{
                fontFamily: "Inter",
                border: err?.error == "confirm_password" ? "2px solid red" : "",
              }}>
              <input
                style={{
                  fontFamily: "Inter",
                }}
                type="password"
                id="inputConfirmPassword"
                value={confirmPassword}
                onFocus={() => setErr({})}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control border-0 rounded-1"
                placeholder="******"
                aria-describedby="confirm-password"
              />
              <label
                htmlFor="inputConfirmPassword"
                style={{
                  fontFamily: "Inter",
                }}>
                Confirm Password
              </label>
            </div>
            <div className="d-flex justify-content-end mb-4 mt-5">
              <Link to="/forgot-pass">Forgot Password</Link>
            </div>
          </div>
        </div>
        <div className="container px-4 pb-4 pt-2" style={{height: "20vh"}}>
          {err?.error && <p className="text-primary">* {err?.message}</p>}
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
                  <i className="visually-hidden">Loading.....</i>
                </>
              )
            }
          </button>
        </div>
      </BasicLayout>
    );
  }
  // let err = true;
  return <>{activeNow}</>;
}

export default VerifyEmail;
