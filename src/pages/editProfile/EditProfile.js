import React from 'react';

import "./style.css";

const EditProfile = () => {
    return (
        <>
            <div className="vh-100 max-width-mobile mx-auto d-flex flex-column rounded-top rounded-bottom"
                style={{
                    backgroundColor: "#F9FAFB"
                }}>
                <div className="position-relative">
                    <div className="position-absolute container position-top mt-6">

                        <button
                            // onClick={history.goBack}
                            className="btn btn-light rounded-circle shadow p-3 image-invert float-start"
                            style={{
                                height: "58px",
                                width: "58px",
                                backgroundColor: "#FFB7AC"
                            }}>
                            <img src="/img/back-icon.svg" alt="back" />
                        </button>
                    </div>
                </div>
                <div className='central_items'>
                    <h3>
                        Edit Profile
                    </h3>

                    <img
                        className='rounded-circle'
                        src="img/image-alt.svg"
                        style={{
                            marginTop: "50px",
                            height: "200px",
                            width: "200px",
                            color: "#FFB7AC",
                            backgroundColor: "#FFB7AC"
                        }}
                    />
                    <br />
                    <button
                        type="button"
                        class="btn btn-primary"
                    // onClick={ }
                    >
                        {/* <input
                            class="form-control"
                            type="file"
                            id="formFile"
                            style={{
                                visibility: "hidden"
                            }}
                        /> */}
                        Take Selfie
                    </button>
                </div>

                <div
                    className='d-flex justify-content-between'
                    style={{
                        marginRight: "10px",
                        marginLeft: "10px"
                    }}
                >
                    <h4>
                        About
                    </h4>

                    <img
                        height="16px"
                        src='img/edit.png'
                        style={{
                            marginTop: "50px"
                        }}
                    />
                </div>

            </div>
        </>
    )
}

export default EditProfile
