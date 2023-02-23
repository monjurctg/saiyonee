import React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import useSWR, {useSWRConfig} from "swr";
import HomeLayout from "../../components/layouts/HomeLayout";
import fetcher from "../../utils/fetchData";

import "./../../assets/css/viewProfile.scss";

function ViewProfile() {
  const [active, setActive] = useState("personal");
  const {user} = useSelector((state) => state?.auth);
  const {mutate} = useSWRConfig();
  const {
    data: userData,
    error: userError,
    isLoading,
  } = useSWR("/app_users/get_auth_user_info", fetcher);

  const {display_name, profile_img, current_city, current_country, user_type} =
    userData?.structured_app_user_info?.sub_header ?? {};
  let activeData;
  const {group_1, group_2, group_3, group_4} =
    userData?.structured_app_user_info?.app_user_detail ?? {};
  console.log(profile_img, "profile_img");

  if (active === "personal") {
    activeData = (
      <div className="information-container">
        {group_1?.data.map((info, index) => (
          <div className="info" key={index}>
            <p className="fw-bold" style={{width: "60%"}}>
              {info?.label}
            </p>
            <p style={{width: "40%"}}>{info?.value}</p>
          </div>
        ))}

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
        {group_2?.data.map((info, index) => (
          <div className="info" key={index}>
            <p className="fw-bold" style={{width: "60%"}}>
              {info?.label}
            </p>
            <p style={{width: "40%"}}>{info?.value}</p>
          </div>
        ))}

        {/* LinkedIn Account Verified */}
      </div>
    );
  } else if (active === "educational") {
    activeData = (
      <div className="information-container">
        {group_3?.data.map((info, index) => (
          <div className="info" key={index}>
            <p className="fw-bold" style={{width: "60%"}}>
              {info?.label}
            </p>
            <p style={{width: "40%"}}>{info?.value}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <HomeLayout>
      <div className="container pt-2">
        <div className="container explore_viewProfile pt-2 text-center">
          <div className="mt-3">
            <div className="content-container">
              <img className="user-img" src={profile_img} />
              <h2
                style={{
                  marginBottom: 0,
                }}>
                {display_name}
              </h2>

              <p
                style={{
                  textAlign: "Center",
                }}>
                {/* <span className="short-description" style={{marginRight: 0}}>
                  {user_type},
                </span> */}
                <span className="short-description">
                  {current_city},{current_country}
                </span>
                {/* <span className="short-description">Age {user?.age}</span> */}
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
