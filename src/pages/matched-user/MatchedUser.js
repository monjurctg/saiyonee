import React, { useState } from "react";
import Modal from "react-modal";

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
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <NewHome>
      <div className="container pt-2">
        <div className="container explore_viewProfile pt-2 text-center">
          <div className="mt-3">
            <div className="content-container">
              <img className="user-img" src="/img/user.jpg" />
              <h2>Sharmila</h2>

              <p
                style={{
                  textAlign: "Center",
                }}
              >
                <span className="short-description">Student</span>
                <span className="short-description">Khulna, BD</span>
                <span className="short-description">Age 24</span>
              </p>

              <h4   style={{
                  paddingLeft:20
                }}>Professional Details</h4>

              <p
                style={{
                  color: "#000",
                  
                  fontSize: "14px",
                }}
              >
                Company Name
                <br />
                Position : Manager
                <br />
                Address : Lalmatia
                <br />
                LinkedIn Account Verified
              </p>

              <h4
               style={{
                paddingLeft:20
              }}
              >Educational qualification</h4>

              <p
                style={{
                  color: "#000",
                  
                  fontSize: "14px",
                }}
              >
                University :
                <br />
                College :
                <br />
                School :
              </p>

              <h4>Personal Details</h4>

              <p
                style={{
                  color: "#000",
                  
                  fontSize: "14px",
                }}
              >
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
          <div>


          </div>
          <img className="user-img" src="/img/user2.jpeg" />

          <div
            style={{
              width: "53px",
              background: "#D32C2C",
              margin: "0 auto",
              marginTop: "20px",
              height: 10,
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "-30px",
              alignItems: "center",
            }}
          >
            <img
              style={{
                height: "55px",
                width: "56px",
                marginTop: "10px",
                marginLeft: "10px",
                borderRadius: "20px",
              }}
              className="user-img"
              src="/img/user2.jpeg"
            />
              <img
              style={{
                height: "55px",
                width: "56px",
                marginTop: "10px",
                marginLeft: "10px",
                borderRadius: "20px",
              }}
              className="user-img"
              src="/img/user2.jpeg"
            />
            <img
              style={{
                height: "55px",
                width: "56px",
                marginTop: "10px",
                marginLeft: "10px",
                borderRadius: "20px",
              }}
              className="user-img"
              src="/img/user2.jpeg"
            />
            <img
              style={{
                height: "55px",
                width: "56px",
                marginTop: "10px",
                marginLeft: "10px",
                borderRadius: "20px",
              }}
              className="user-img"
              src="/img/user2.jpeg"
            />
          </div>

          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <button className="edit-btn" onClick={openModal}>
              Unmatch User
            </button>

            <Modal
              isOpen={modal}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div className="modalBox">
                <p>
                  <span
                    style={{
                      width: "20px",
                      backgroundColor: "#faf7ed",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={closeModal}
                  >
                    X
                  </span>
                  Unmatch User!
                </p>
                <br />
              </div>

              <div
                className="buttons"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <button className="edit-btn" onClick={closeModal}>
                  Unmatch User
                </button>
              </div>
            </Modal>
          </div>

          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <button className="edit-btn">Report User</button>
          </div>
        </div>
      </div>
    </NewHome>
  );
};

export default MatchedUser;
