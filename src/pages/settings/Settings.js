import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

const Settings = () => {

    const Navigate = useNavigate();

    return (
        <>
            <div className="vh-100 max-width-mobile mx-auto d-flex flex-column rounded-top rounded-bottom"
                style={{
                    backgroundColor: "#F9FAFB"
                }}
            >
                <div className="position-relative">
                    <div className="position-absolute container position-top mt-6">
                        <div className="row justify-content-center">
                            <div className="col-2 ps-3">
                                <button
                                    // onClick={history.goBack}
                                    className="btn btn-light rounded-circle shadow p-3 image-invert"
                                    style={{
                                        height: "58px",
                                        width: "58px",
                                        backgroundColor: "#FFB7AC"
                                    }}>
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

                <div className='central_items'>
                    <img
                        className='rounded-circle'
                        src='img/userDemo.jpg'
                        style={{
                            marginTop: "100px",
                            height: "220px",
                            width: "200px"
                        }}
                    />
                    <div>
                        <h3>Nandita Ritu</h3>
                        <button
                            type="button"
                            class="btn btn-outline-success"
                            disabled

                            style={{
                                backgroundColor: "#28B56F1A",
                                borderRadius: "25px",
                                border: "0"
                            }}
                        >
                            Completed My Profile
                        </button>

                    </div>

                    <button
                        type="button"
                        class="btn btn-outline-secondary"
                    >
                        View Profile
                    </button>

                    <button
                        type="button"
                        class="btn btn-primary"
                        style={{
                            marginLeft: "30px"
                        }}
                        onClick={() => {
                            Navigate("/editProfile")
                        }}
                    >
                        Edit Profile
                    </button>

                </div>
            </div>
        </>
    )
}

export default Settings
