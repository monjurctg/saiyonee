import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import BasicLayout from "../../components/layouts/BasicLayout";
import {useCheckEmailMutation} from "../../redux/api/authApi";
import {setIsRegStart, setRegEmail_Pass} from "../../redux/slices/authSlices";
import AuthServices from "../../services/authServices";
import {stoteRegisterValues} from "../../utils/functions";

function RegisterEmail() {
  const [err, setErr] = useState();
  // let success = true;
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
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
      setErr(res.data.message);
      setisLoading(false);
      return;
    }
  };

  // useEffect(() => {

  // }, [dispatch]);

  const onContinueClicked = async () => {
    if (!email) {
      setErr("Email is Required");

      return;
    }
    if (!password) {
      setErr("password is Required");
      return;
    }
    if (password.length < 6) {
      setErr("password length must be minimum 6 character ");
      return;
    }

    if (password !== confirmPassword) {
      setErr("password and confirmPassword does not match");
      return;
    }
    checkEmail();
  };

  let subItem = (
    <div className="position-absolute container position-top mt-6">
      <div className="row justify-content-center">
        <div className="col-2 ps-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-light rounded-circle shadow p-3 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </button>
        </div>
        <div className="col-8 d-flex justify-content-center">
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
      <div className="card border-0 mt-n15 bg-transparent flex-grow-1 overflow-auto">
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
          <div className="form-floating my-4 text-muted">
            <input
              type="email"
              id="inputEmail"
              style={{
                fontFamily: "Inter",
              }}
              value={email}
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
          <div className="form-floating my-4 text-muted">
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="form-floating my-4 text-muted">
            <input
              style={{
                fontFamily: "Inter",
              }}
              type="password"
              id="inputConfirmPassword"
              value={confirmPassword}
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
      <div className="container px-4 pb-4 pt-2">
        {err && <p className="text-primary">* {err}</p>}
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
