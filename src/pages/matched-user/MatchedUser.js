import React, { useState } from 'react';
import Modal from 'react-modal';

import NewHome from "./NewHome";

import "./../../assets/css/viewProfile.scss";
import "./../../assets/css/modal.scss";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 100%)',
        width: "350px",
    },
};

const MatchedUser = () => {

    let subtitle;

    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(!modal);
        console.log(modal);
    };

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    };

    function closeModal() {
        setModal(false);
    }

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
                            border: "10px solid red",
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

                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "30px"
                        }}
                    >
                        <button
                            className='edit-btn'
                            onClick={openModal}
                        >
                            Unmatch User
                        </button>

                        <Modal
                            isOpen={modal}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                            <div>
                                <p
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "30px",
                                            backgroundColor: "#faf7ed",
                                            marginRight: "20px",
                                            cursor: "pointer",
                                            borderRadius: "10px"
                                        }}
                                        onClick={closeModal}
                                    >X
                                    </span>
                                    Unmatch User!
                                </p>
                                <br />

                                <button
                                    onClick={closeModal}
                                    style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "19px",

                                        /* Main Text */

                                        color: "#1f2937",
                                        padding: "19px 40px",

                                        background: "#ffb7ac",
                                        /* Primary/Primary color */

                                        border: "1px solid #ffb7ac",
                                        /* EV-01 */

                                        boxShadow: "0px 6px 11px rgba(235, 202, 202, 0.3)",
                                        borderRadius: "100px",

                                        marginLeft: "15%",
                                        marginRight: "15%"

                                    }}
                                >
                                    Unmatch User
                                </button>

                                <button
                                    style={{
                                        padding: "19px 30px",
                                        background: " #ffffff",
                                        border: "1px solid #ffb7ac",
                                        boxShadow: "0px 6px 11px rgb(235 202 202 / 30%)",
                                        borderRadius: "100px",
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        fontSize: "15px",
                                        lineHeight: "19px",
                                        color: "#1f2937",
                                        width: "200px",
                                        marginLeft: "15%",
                                        marginRight: "15%"
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>


                        </Modal>
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
        </NewHome >
    )
}

export default MatchedUser
