import React, { useState } from 'react';
import NewHome from "./NewHome";

import "./../../assets/css/viewProfile.scss";
import "./../../assets/css/modal.scss";

const MatchedUser = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <NewHome>
            <div className='container pt-2'>
                <div className='container explore_viewProfile pt-2 text-center'>
                    <div className='mt-3'>
                        <div className='content-container'>
                            <img className='user-img' src='/img/user.jpg' />
                            <h2>Sharmila</h2>

                            <p style={{
                                textAlign: "Center"
                            }}>
                                <span className='short-description'>Student</span>
                                <span className='short-description'>Khulna, BD</span>
                                <span className='short-description'>Age 24</span>
                            </p>

                            <h4>Professional Details</h4>

                            <p style={{
                                color: "#000",
                                marginLeft: "-15px",
                                fontSize: "14px"
                            }}>
                                Company Name
                                <br />
                                Position : Manager
                                <br />
                                Address : Lalmatia
                                <br />
                                LinkedIn Account Verified
                            </p>

                            <h4>Educational qualification</h4>

                            <p style={{
                                color: "#000",
                                marginLeft: "-15px",
                                fontSize: "14px"
                            }}>
                                University :
                                <br />
                                College :
                                <br />
                                School :
                            </p>

                            <h4>Personal Details</h4>

                            <p style={{
                                color: "#000",
                                marginLeft: "-15px",
                                fontSize: "14px"
                            }}>
                                Name
                                <br />
                                Age
                                <br />
                                Gender
                                <br />
                                Height
                                <br />
                                Weight
                                <br />
                                Marital Status
                                <br />
                                Marital Timing
                                <br />
                                Date of Birth
                                <br />
                                Blood group
                                <br />
                                Nationality
                                <br />
                                Mother Tongue
                                <br />
                                Physical Status
                            </p>
                        </div>
                    </div>
                    <img className='user-img' src='/img/user2.jpeg' />

                    <hr
                        style={{
                            width: "80px",
                            border: "10px solid #f0f",
                            margin: "0 auto",
                            marginTop: "20px",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "-30px",
                            alignItems: "center"
                        }}
                    >
                        <img
                            style={{
                                height: "80px",
                                width: "80px",
                                marginTop: "10px",
                                marginLeft: "10px",
                                borderRadius: "20px"
                            }}
                            className='user-img'
                            src='/img/user3.jpg'
                        />
                        <img
                            style={{
                                height: "80px",
                                width: "80px",
                                marginTop: "10px",
                                marginLeft: "10px",
                                borderRadius: "20px"
                            }}
                            className='user-img'
                            src='/img/user3.jpg'
                        />
                        <img
                            style={{
                                height: "80px",
                                width: "80px",
                                marginTop: "10px",
                                marginLeft: "10px",
                                borderRadius: "20px"
                            }}
                            className='user-img'
                            src='/img/user3.jpg'
                        />
                    </div>

                    <div
                        className='buttons'
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "30px"
                        }}
                    >
                        <button
                            className='edit-btn'
                            onClick={() => {
                                setOpenModal(true);
                            }}
                        >
                            Unmatch User
                        </button>

                        <div className="modalBackground">
                            <div className="modalContainer">
                                <div className="titleCloseBtn">
                                    <button
                                        onClick={() => {
                                            setOpenModal(false);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="title">
                                    <h1>Are You Sure You Want to Continue?</h1>
                                </div>
                                <div className="body">
                                    <p>The next page looks amazing. Hope you want to go there!</p>
                                </div>
                                <div className="footer">
                                    <button
                                        onClick={() => {
                                            setOpenModal(false);
                                        }}
                                        id="cancelBtn"
                                    >
                                        Cancel
                                    </button>
                                    <button>Continue</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='buttons'
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "30px"
                        }}
                    >
                        <button className='edit-btn'>
                            Report User
                        </button>
                    </div>

                </div>
            </div>
        </NewHome>
    )
}

export default MatchedUser
