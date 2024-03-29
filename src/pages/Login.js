import React, {useCallback, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";
import AuthServices from "../services/authServices";
import {setToken} from "../utils/functions";

function Login() {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [isShowPass, setIsShowPass] = useState(false);

  const navigate = useNavigate();
  const onChange = (e) => {
    const {name, value} = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErr({
        error: "email",
        message: "Email is required",
      });
      return;
    } else if (!password.trim()) {
      setErr({
        error: "password",
        message: "Password is required",
      });
    }
    setloading(true);
    let data = {
      email: email,
      password: password,
    };
    const code = localStorage.getItem("code");

    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (code) {
      formData.append("code", code);
    }

    let res = await AuthServices.login(formData);
    // console.log("res", res.data);
    if (!res) {
      // console.log("res", res.data);
      setErr({error: "", message: "Server Error"});
      setloading(false);
      return;
    }
    if (res.status === 200) {
      setloading(false);
      setErr(false);
      setToken(res.data.auth_token);
      localStorage.setItem("code", "");

      // console.log(res.data);

      localStorage.setItem("preference", res.data.profile_preference_exists);
      localStorage.setItem("isVarified", res.data.is_verified);
      localStorage.setItem("is_banned", res.data.is_banned);
      localStorage.setItem("show_liked_list", res.data.show_liked_list);
      localStorage.setItem("package_id", res.data.package_id);
      localStorage.setItem("package_name", res.data.package_name);
      localStorage.setItem("profile_image", res.data.profile_image);
      localStorage.setItem("selfie_image", res.data.selfie_image);
      localStorage.setItem("emailVerified", res.data.email_verified);
      localStorage.setItem(
        "show_supper_liked_list",
        res.data.show_super_liked_list
      );

      if (!res.data.email_verified) {
        // console.log(res.data.email_verified, "login");
        navigate("/email-verification");
        return;
      } else if (
        !res.data.is_verified &&
        !res.data.is_banned &&
        res.data.email_verified
      ) {
        navigate("/success");
        return;
      } else {
        // navigate("/");
        // localStorage.setItem("isVarified", true);
        navigate("/question/1");
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

  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  let subItem = (
    <div className="position-absolute container position-top mt-2">
      <div className="row justify-content-center">
        <div className="col-2 pr-3">
          <button
            onClick={() => navigate("/get-start")}
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
  // let err = true;
  return (
    <>
      <BasicLayout subItem={subItem}>
        <div
          className="card border-0 bg-transparent overflow-auto flex-grow-1"
          style={{height: "40vh", marginTop: "-55px"}}>
          <div className="card-body bg-body rounded p-4 overflow-auto">
            <h1 className="card-title mt-3">Login</h1>
            <p className="card-text text-muted mt-3 mb-5">
              Take a step towards finding someone awesome!
            </p>

            <div
              className="form-floating my-4 text-muted rounded-1"
              style={{
                fontFamily: "Inter",
                border: err?.error == "email" ? "2px solid red" : "",
              }}>
              <input
                type="email"
                id="inputEmail"
                value={email}
                name="email"
                onFocus={() => setErr({})}
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
            <div
              className="form-floating my-4 text-muted rounded-1"
              style={{
                fontFamily: "Inter",
                border: err?.error == "password" ? "2px solid red" : "",
              }}>
              <input
                type={isShowPass ? "text" : "password"}
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
              <div
                onClick={handleShowPass}
                style={{
                  position: "relative",
                  bottom: "41px",
                  left: "143px",
                  width: "40px",
                  height: "40px",
                  margin: "0 auto",
                  cursor: "pointer",
                }}>
                {isShowPass ? (
                  <i class="fa-regular fa-eye"></i>
                ) : (
                  <i class="fa-regular fa-eye-slash"></i>
                )}

                {/* Icon */}
              </div>
            </div>
            <div className="d-flex justify-content-end">
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
    </>
  );
}

export default Login;
