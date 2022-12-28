import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import BasicLayout from "../../components/layouts/BasicLayout";
import {useCheckEmailMutation} from "../../redux/api/authApi";
import {setIsRegStart, setRegEmail_Pass} from "../../redux/slices/authSlices";
import AuthServices from "../../services/authServices";
import {stoteRegisterValues} from "../../utils/functions";

function RegisterEmail() {
  const [err, setErr] = useState();
  const {email: Email, password: Password} = useSelector((state) => state.auth);
  // let success = true;
  const [email, setemail] = useState(Email);
  const [password, setPassword] = useState(Password);
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [checkEmail, {isLoading, isSuccess, isError}] = useCheckEmailMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const checkEmail = async () => {
    setisLoading(true);
    const res = await AuthServices.checkIsEmailUnique({email});

    if (res.status === 200) {
      setisLoading(false);
      stoteRegisterValues({email, password, confirmPassword});
      dispatch(setRegEmail_Pass({email, password, confirmPassword}));
      navigate("/register/usertype");
    } else {
      setErr({
        error: "email",
        message: res.data.message,
      });
      setisLoading(false);

      return;
    }
  };

  // useEffect(() => {

  // }, [dispatch]);

  const onContinueClicked = async () => {
    if (!email) {
      setErr({
        error: "email",
        message: "Email is Required",
      });

      return;
    }
    if (!password) {
      setErr({
        error: "password",
        message: "password is Required",
      });

      return;
    }
    if (password.length < 6) {
      setErr({
        error: "password",
        message: "password length must be minimum 6 character ",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErr({
        error: "confirm_password",
        message: "password and confirm Password does not match",
      });
      return;
    }
    checkEmail();
  };
  // console.log(err);

  let subItem = (
    <div className="position-absolute container position-top mt-2">
      <div className="row justify-content-center">
        <div className="col-2 pr-3">
          <button
            onClick={() => navigate(-1)}
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

  return (
    <BasicLayout subItem={subItem}>
      <div
        className="card border-0 bg-transparent flex-grow-1 overflow-auto"
        style={{height: "40vh", marginTop: "-70px"}}>
        <div className="card-body bg-body rounded p-4 overflow-auto">
          <h1
            className="card-title mt-3"
            style={{
              fontFamily: "Inter",
            }}>
            Create an account
          </h1>
          <p
            className="card-text text-muted mt-3 mb-2"
            style={{
              fontFamily: "Inter",
            }}>
            Take a step towards finding someone awesome!
          </p>
          <div
            className="form-floating my-4 rounded-1 text-start text-muted"
            style={{
              fontFamily: "Inter",
              border: err?.error == "email" ? "2px solid red" : "",
            }}>
            <input
              type="email"
              id="inputEmail"
              value={email}
              onFocus={() => setErr({})}
              onChange={(e) => setemail(e.target.value)}
              className="form-control border-0 rounded-1"
              placeholder="name@example.com"
              aria-describedby="email"
            />
            <label
              htmlFor="inputEmail"
              style={{
                fontFamily: "Inter",
              }}>
              Email ID
            </label>
          </div>
          <div
            className="form-floating my-4 text-muted text-start rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "password" ? "2px solid red" : "",
            }}>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setErr({})}
              className="form-control border-0 rounded-1"
              placeholder="******"
              aria-describedby="password"
            />
            <label
              htmlFor="inputPassword"
              style={{
                fontFamily: "Inter",
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
        </div>
      </div>
      <div className="container px-4 pb-4 pt-2" style={{height: "20vh"}}>
        {err?.error && <p className="text-primary">* {err?.message}</p>}
        <button
          onClick={onContinueClicked}
          disabled={isLoading}
          style={{
            height: 60,
          }}
          className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
          <strong
            style={{
              fontFamily: "Inter",
            }}>
            Continue
          </strong>
          {isLoading && (
            <>
              {" "}
              <i
                className="spinner-border spinner-border-sm text-black"
                role="status"
                aria-hidden="true"></i>
              <i className="visually-hidden">isLoading...</i>
            </>
          )}
        </button>
      </div>
    </BasicLayout>
  );
}

export default RegisterEmail;
