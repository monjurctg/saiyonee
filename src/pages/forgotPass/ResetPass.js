import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../../components/layouts/BasicLayout';

const ResetPass = () => {

    let navigate = useNavigate();

    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState();

    let subItem = (
        <div className="position-absolute d-flex flex-column justify-content-center align-items-center position-top mt-6">
            <Link to={"/"}>
                <img src="img/logo.svg" alt="" />
            </Link>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            OTP: OTP,
        };

        navigate("/success-change-pass");
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "OTP") {
            setOTP(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <BasicLayout subItem={subItem}>
            <div className="card border-0 bg-transparent overflow-auto flex-grow-1" style={{ height: "40vh", marginTop: "-55px" }}>
                <div className="card-body bg-body rounded p-4 overflow-auto">
                    <h1 className="card-title mt-3">Reset Password</h1>

                    <p className="card-text text-muted mt-3 mb-5">
                        Enter your OTP and New Password
                    </p>

                    <div className="form-floating my-4 text-muted">
                        <input
                            type="text"
                            id="inputOTP"
                            value={OTP}
                            name="OTP"
                            onChange={onChange}
                            className="form-control border-0 rounded-1"
                            aria-describedby="OTP"
                        />
                        <label
                            htmlFor="input"
                            style={{
                                textAlign: "left"
                            }}
                        >
                            OTP
                        </label>
                    </div>

                    <div
                        className="form-floating my-4 text-muted text-start rounded-1"
                    // style={{
                    //     fontFamily: "Inter",
                    //     border: err?.error == "password" ? "2px solid red" : "",
                    // }}
                    >
                        <input
                            type="password"
                            id="inputPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // onFocus={() => setErr({})}
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
                    // style={{
                    //     fontFamily: "Inter",
                    //     border: err?.error == "confirm_password" ? "2px solid red" : "",
                    // }}
                    >
                        <input
                            style={{
                                fontFamily: "Inter",
                            }}
                            type="password"
                            id="inputConfirmPassword"
                            // value={confirmPassword}
                            // onFocus={() => setErr({})}
                            // onChange={(e) => setConfirmPassword(e.target.value)}
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

                    <div className="container px-4 pb-4 pt-2" style={{ height: "20vh" }}>
                        <button
                            onClick={handleSubmit}
                            // disabled={
                            //     loading
                            //     // status === FetchStatus.LOADING ||
                            //     // verifyingPreviousLogin ||
                            //     // isPrefetchingForms
                            // }
                            className="btn btn-primary w-100 rounded shadow p-3 my-2">
                            <strong>Change Password </strong>
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

    )
}

export default ResetPass
