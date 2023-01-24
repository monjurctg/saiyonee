import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../components/layouts/HomeLayout";
import QuestionServices from "../../services/questionServices";
import UserServices from "../../services/userServices";

import "./../../assets/css/settingsStyle.scss";

const Settings = () => {
  const [profile, setprofile] = useState();
  const [percentage, setpercentage] = useState(0);

  const Navigate = useNavigate();

  let userProfile = async () => {
    let res = await UserServices.UserProfile();
    let percentageV = await UserServices.completion();
    // console.log('percentage', percentage)
    // console.log("res", res.data);
    if (res.status === 200) {
      setprofile(res.data);
      setpercentage(percentageV.data?.percentage_completion);
    }
  };
  useEffect(() => {
    userProfile();
  }, []);

  return (
    <HomeLayout>
      <div className="mt-3">
        <div
          style={{
            height: "62vh",
            overflowY: "auto",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center settings"
            style={{
              flexDirection: "column",
            }}
          >
            {/* <div className='rounded-img'>
                            <img src={"img/pp.png"} alt="" />

                        </div> */}
            {/* {profile?.profile_img ? ( */}
            <div className="rounded-img"
            style={{

              background: "conic-gradient(#4D5BFA 101deg,#dee2e6 33deg)"
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
              <h3 className="mt-2">{profile?.full_name|| "Kamrul Hassan"}</h3>

              </div>

            {/* <div className="complete">
              <p>Complete my profile</p>
            </div> */}
            <div className="percentage-div">
            <p className="percentage">{percentage}%</p>
            <p style={{
                  fontWight: 600,
            }}>Profile complete</p>

            </div>
          </div>

          <div className="buttons justify-content-center">
            <Link to={"/viewProfile"}>
              <button className="com-btn">View profile</button>
            </Link>

            <Link to={"/edit/profile"}>
              <button className="edit-btn">Edit profile</button>
            </Link>
          </div>
          <Link to={"/edit/profile"} className="buttons">
              <button className="edit-btn">View Gallery</button>
            </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Settings;
