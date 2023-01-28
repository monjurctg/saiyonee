import React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import HomeLayout from "../../components/layouts/HomeLayout";

import "./../../assets/css/viewProfile.scss";

function ViewProfile() {
  const [active, setActive] = useState("personal");
  const {user} = useSelector((state) => state.auth);
  console.log(user, "user from view profile");

  let activeData;

  if (active === "personal") {
    activeData = (
      <div className="information-container">
        <div className="info">
          <p>Name</p>
          <p>{user?.full_name}</p>
        </div>

        <div className="info">
          <p>Age</p>
          <p>{user?.age}</p>
        </div>

        <div className="info">
          <p>Gender</p>
          <p>{user?.gender}</p>
        </div>
        <div className="info">
          <p>Height</p>
          <p>
            {user?.height_feet} Feet {user?.height_inches} inches
          </p>
        </div>
        <div className="info">
          <p>Weight</p>
          <p>{user?.weight} kg</p>
        </div>
        <div className="info">
          <p> Marital Status</p>
          <p>{user?.marital_status}</p>
        </div>
        <div className="info">
          <p> Date of Birth</p>
          <p>{user.date_of_birth}</p>
        </div>

        <div className="info">
          <p>Nationality</p>
          <p>Bangladeshi</p>
        </div>

        <div className="info">
          <p>Mother Tongue</p>
          <p>Bangla</p>
        </div>
      </div>
    );
  } else if (active === "Professional") {
    activeData = (
      <div className="information-container">
        <div className="info">
          <p>Company Name</p>
          <p>Teah Hash Code</p>
        </div>
        <div className="info">
          <p>Position Name</p>
          <p>Manager</p>
        </div>
        <div className="info">
          <p>Address</p>
          <p>Lalmatia</p>
        </div>
        {/* LinkedIn Account Verified */}
      </div>
    );
  } else if (active === "educational") {
    activeData = (
      <div className="information-container">
        <div className="info">
          <p>University</p>
          <p>IIUC</p>
        </div>
        <div className="info">
          <p>Collage</p>
          <p>Chittagong Collage</p>
        </div>
        <div className="info">
          <p>School</p>
          <p>B.S Ideal</p>
        </div>
      </div>
    );
  }

  return (
    <HomeLayout>
      <div className="container pt-2">
        <div className="container explore_viewProfile pt-2 text-center">
          <div className="mt-3">
            <div className="content-container">
              <img className="user-img" src={user?.profile_img} />
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
                      active === "educaltion"
                        ? "viewProfile-active viewProfile-no-active"
                        : "viewProfile-no-active"
                    }
                    style={{
                      cursor: "pointer",
                      width: "45%",
                      marginLeft: "10px",
                    }}
                    onClick={() => setActive("educational")}>
                    Educational
                  </p>
                </div>
              </div>

              <div className="mt-5 mb-5 explore">{activeData}</div>

              {/* <img className="user-img" src="/img/user2.jpeg" /> */}

              {/* <img className="user-img" src="/img/user3.jpg" /> */}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ViewProfile;
