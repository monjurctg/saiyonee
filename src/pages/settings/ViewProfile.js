import React from "react";
import {useState} from "react";
import HomeLayout from "../../components/layouts/HomeLayout";

import "./../../assets/css/viewProfile.scss";

function ViewProfile() {
  const [active, setActive] = useState("Professional");

  return (
    <HomeLayout>
      <div className="container pt-2">
        <div className="container explore_viewProfile pt-2 text-center">
          <div className="mt-3">
            <div className="content-container">
              <img className="user-img" src="/img/user.jpg" />
              <h2>Sharmila</h2>

              <p
                style={{
                  textAlign: "Center",
                }}>
                <span className="short-description">Student</span>
                <span className="short-description">Khulna, BD</span>
                <span className="short-description">Age 24</span>
              </p>
              <div className="logos">
                <div className="tab  pt-3 ">
                  <p
                    className={
                      active === "Professional"
                        ? "viewProfile-active viewProfile-no-active"
                        : "viewProfile-no-active"
                    }
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setActive("Professional")}>
                    Professional
                  </p>
                  <p
                    className={
                      active === "personal"
                        ? "viewProfile-active viewProfile-no-active"
                        : "viewProfile-no-active"
                    }
                    style={{
                      cursor: "pointer",
                      width: "45%",
                      marginLeft: "10px",
                    }}
                    onClick={() => setActive("personal")}>
                    Personal
                  </p>

                  <p
                    className={
                      active === "educaltion"
                        ? "viewProfile-active viewProfile-no-active"
                        : "viewProfile-no-active"
                    }
                    style={{
                      cursor: "pointer",
                      width: "45%",
                      marginLeft: "10px",
                    }}
                    onClick={() => setActive("educaltion")}>
                    Educational
                  </p>
                </div>
              </div>

              <div className="mt-5 mb-5 explore">{active}</div>

              {/* <img className="user-img" src="/img/user2.jpeg" /> */}

              <h4>Professional Details</h4>

              <p>
                Company Name
                <br />
                Position Name : Manager
                <br />
                Address : Lalmatia
                <br />
                LinkedIn Account Verified
              </p>

              {/* <img className="user-img" src="/img/user3.jpg" /> */}

              <h4>Educational qualification</h4>

              <p>
                University :
                <br />
                College :
                <br />
                School :
              </p>

              <h4>Personal Details</h4>

              <p>
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
        </div>
      </div>
    </HomeLayout>
  );
}

export default ViewProfile;
