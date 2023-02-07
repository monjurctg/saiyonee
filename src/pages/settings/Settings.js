import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../components/layouts/HomeLayout";
import QuestionServices from "../../services/questionServices";
import UserServices from "../../services/userServices";

import "./../../assets/css/settingsStyle.scss";

const Settings = () => {
  const [profile, setprofile] = useState();
  const [percentage, setpercentage] = useState(0);

  const [loading, setLoading] = useState(true)

  let percentageCal = (value) => {
    let left = 0;
    if (value <= 0) left = 80;
    else if (value <= 10) left = 125;
    else if (value <= 20) left = 150;
    else if (value <= 30) left = 185;
    else if (value <= 40) left = 215;
    else if (value <= 50) left = 245;
    else if (value <= 60) left = 255;
    else if (value <= 70) left = 265;
    else if (value <= 80) left = 335;
    else if (value <= 90) left = 355;
    else if (value <= 100) left = 365;

    return left;
  };

  const Navigate = useNavigate();

  let userProfile = async () => {
    let res = await UserServices.UserProfile();
    let percentageV = await UserServices.completion();
    // console.log('percentage', percentage)
    // console.log("res", res.data);
    if (res.status === 200) {
      setprofile(res.data);
      setpercentage(percentageV.data?.percentage_completion);
      setLoading(false);
    }
  };
  useEffect(() => {
    userProfile();
  }, []);

  return (
    <HomeLayout>
      {
        loading ?
          <div style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <div
            className="mt-3"
            style={{
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              className="d-flex justify-content-between align-items-center settings"
              style={{
                flexDirection: "column",
                // marginTop: "20px",
              }}
            >
              {/* <div className='rounded-img'>
                            <img src={"img/pp.png"} alt="" />

                        </div> */}
              {/* {profile?.profile_img ? ( */}
              <div
                className="rounded-img"
                style={{
                  background: `conic-gradient(#ffb7ac  ${percentageCal(
                    percentage
                  )}deg,#dee2e6 33deg)`,
                }}
              >
                {/* <input type={"range"}/> */}
                <img src={profile?.profile_img || "img/home.svg"} alt="" />
              </div>

              {/* ) : ( */}
              {/* <div className="no-image">
                <p>{profile?.full_name?.charAt(0)}</p>
              </div> */}
              {/* )} */}
              <div>
                <h3 className="mt-2 mb-1">{profile?.display_name}</h3>
                {/* <p style={{fontSize: 12}}>
                Selfie varifired:
                <span
                  style={{
                    fontSize: 14,
                    padding: 5,
                    color: "white",
                    background: profile?.selfie_verified == 0 ? "red" : "green",
                    fontWeight: 600,
                  }}>
                  {profile?.selfie_verified == 0 ? "No" : "Yes"}
                </span>
              </p> */}
              </div>

              {/* <div className="complete">
              <p>Complete my profile</p>
            </div> */}
              <div className="percentage-div">
                <p
                  className=""
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#ffb7ac",
                  }}
                >
                  {percentage}%
                </p>
                <p
                  style={{
                    fontWight: 600,
                  }}
                >
                  Profile complete
                </p>
              </div>
            </div>

            <div
              className="buttons justify-content-center"
              style={{
                marginTop: 0,
              }}
            >
              <Link to={"/viewProfile"}>
                <button className="com-btn">View profile</button>
              </Link>

              <Link to={"/edit/profile"}>
                <button className="edit-btn">Edit profile</button>
              </Link>
            </div>
            <Link to={"/image/gallery"} className="buttons justify-content-center">
              <button
                className="edit-btn"
                style={{ width: "80%", marin: "0 auto", marginBottom: 10 }}
              >
                View Gallery
              </button>
            </Link>
          </div>
      }

    </HomeLayout>
  );
};

export default Settings;
