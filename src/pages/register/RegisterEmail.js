import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthServices from "../../services/authServices";

function RegisterEmail() {
  const [err, setErr] = useState();
  let success = true;
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkEmail = async () => {
    setLoading(true);
    const res = await AuthServices.checkIsEmailUnique({email});
    if (res) {
      if (res.status === 200) {
        setLoading(false);
        navigate("/register/usertype");
      } else {
        setErr("Something wrong");
        setLoading(false);
        return;
      }
    } else {
      setErr("Something is wrong");
      setLoading(false);
    }
  };

  const onContinueClicked = () => {
    if (!email) {
      setErr("Email is Required");
      setLoading(false);
      return;
    }
    if (!password) {
      setErr("password is Required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErr("password and confirmPassword does not match");
      setLoading(false);
      return;
    }
    checkEmail();
  };

  return (
    <>
      <div className="vh-100 max-width-mobile mx-auto d-flex flex-column">
        <div className="position-relative">
          <img
            src="/img/bg.svg"
            alt="bg-star"
            className="img-fluid w-100 rounded-top"
          />
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
        </div>
        <div className="card border-0 mt-n15 bg-transparent flex-grow-1 overflow-auto">
          <div className="card-body bg-body rounded p-4 overflow-auto">
            <h1 className="card-title mt-3">Create an account</h1>
            <p className="card-text text-muted mt-3 mb-2">
              Take a step towards finding someone awesome!
            </p>
            <div className="form-floating my-4 text-muted">
              <input
                type="email"
                id="inputEmail"
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="form-control border-0 rounded-1"
                placeholder="******"
                aria-describedby="password"
              />
              <label htmlFor="inputPassword">Password</label>
            </div>
            <div className="form-floating my-4 text-muted">
              <input
                type="password"
                id="inputConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control border-0 rounded-1"
                placeholder="******"
                aria-describedby="confirm-password"
              />
              <label htmlFor="inputConfirmPassword">Confirm Password</label>
            </div>
          </div>
        </div>
        <div className="container px-4 pb-4 pt-2">
          {err && <p className="text-primary">* {err}</p>}
          <button
            onClick={onContinueClicked}
            disabled={loading}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
            <strong>Continue</strong>
            {success && loading && (
              <>
                {" "}
                <i
                  className="spinner-border spinner-border-sm text-black"
                  role="status"
                  aria-hidden="true"></i>
                <i className="visually-hidden">Loading...</i>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterEmail;
