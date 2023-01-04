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
      setpercentage(percentageV.data?.percentage_completion)
    }
  };
  useEffect(() => {
    userProfile();
  }, []);

  return (
    <HomeLayout>
      <div className="mt-3">
        <div style={{
              height: "62vh",
              overflowY: "scroll"
        }}>
          <div
            className="d-flex justify-content-between align-items-center settings"
            style={{
              flexDirection: "column",
            }}
          >
            {/* <div className='rounded-img'>
                            <img src={"img/pp.png"} alt="" />

                        </div> */}
            {profile?.profile_img ? (
              <div className="rounded-img">
                <img src={profile?.profile_img} alt="" />
              </div>
            ) : (
              <div className="no-image">
                <p>{profile?.full_name?.charAt(0)}</p>
              </div>
            )}

            <h2 className="mt-4">{profile?.full_name}</h2>

            <div className="complete">
              <p>Complete my profile</p>
            </div>
            <p className='percentage'>
                {percentage}%
            </p>
          </div>

          <div className="buttons">
            <Link to={"/viewProfile"}>
              <button className="com-btn">View profile</button>
            </Link>

            <Link to={"/edit/profile"}>
              <button className="edit-btn">Edit profile</button>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Settings;
