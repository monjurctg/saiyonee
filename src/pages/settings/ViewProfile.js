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
          <p className="fw-bold">Name</p>
          <p>{user?.full_name}</p>
        </div>

        <div className="info">
          <p className="fw-bold">Age</p>
          <p>{user?.age}</p>
        </div>

        <div className="info">
          <p className="fw-bold">Gender</p>
          <p>{user?.gender}</p>
        </div>
        <div className="info">
          <p className="fw-bold">Height</p>
          <p>
            {user?.height_feet} Feet {user?.height_inches} inches
          </p>
        </div>
        <div className="info">
          <p className="fw-bold">Weight</p>
          <p>{user?.weight} kg</p>
        </div>
        <div className="info">
          <p className="fw-bold"> Marital Status</p>
          <p>{user?.marital_status}</p>
        </div>
        <div className="info">
          <p className="fw-bold"> Date of Birth</p>
          <p>{user?.date_of_birth}</p>
        </div>

        {/* <div className="info">
          <p>Nationality</p>
          <p>Bangladeshi</p>
        </div> */}

        {/* <div className="info">
          <p>Mother Tongue</p>
          <p>Bangla</p>
        </div> */}
      </div>
    );
  } else if (active === "Professional") {
    activeData = (
      <div className="information-container">
        <div className="info">
          <p className="fw-bold">Company Name</p>
          <p>Teah Hash Code</p>
        </div>
        <div className="info">
          <p className="fw-bold">Position Name</p>
          <p>Manager</p>
        </div>
        <div className="info">
          <p className="fw-bold">Address</p>
          <p>Lalmatia</p>
        </div>
        {/* LinkedIn Account Verified */}
      </div>
    );
  } else if (active === "educational") {
    activeData = (
      <div className="information-container">
        <div className="info">
          <p className="fw-bold">University</p>
          <p>IIUC</p>
        </div>
        <div className="info">
          <p className="fw-bold">Collage</p>
          <p>Chittagong Collage</p>
        </div>
        <div className="info">
          <p className="fw-bold">School</p>
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
              <h2>{user?.display_name ?? user?.full_name}</h2>

              <p
                style={{
                  textAlign: "Center",
                }}>
                <span className="short-description">
                  {user?.current_employment_type}
                </span>
                <span className="short-description">
                  {user?.current_city},BD
                </span>
                <span className="short-description">Age {user?.age}</span>
              </p>
              <div className="" style={{width: "100%"}}>
                <div className="tab  pt-3 d-flex justify-content-evenly">
                  <p
                    className={active === "personal" && "active"}
                    style={{
                      cursor: "pointer",
                      color: "#7d8490f0",
                      fontSize: 12,
                    }}
                    onClick={() => setActive("personal")}>
                    Personal
                  </p>

                  <p
                    className={active === "Professional" && "active"}
                    style={{
                      cursor: "pointer",
                      color: "#7d8490f0",
                      fontSize: 12,
                    }}
                    onClick={() => setActive("Professional")}>
                    Professional
                  </p>

                  <p
                    className={active === "educational" && "active"}
                    style={{
                      cursor: "pointer",
                      color: "#7d8490f0",
                      fontSize: 12,
                    }}
                    onClick={() => setActive("educational")}>
                    Educational
                  </p>
                </div>
              </div>

              <div className="mt-5 mb-5 explore" style={{height: "auto"}}>
                {activeData}
              </div>

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
