import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import useSWR, {useSWRConfig} from "swr";
import HomeLayout from "../../components/layouts/HomeLayout";
import fetcher from "../../utils/fetchData";

import "./../../assets/css/viewProfile.scss";

const Title = (title = "personal details") => {
  const splitTitle = title?.split(" ");
  console.log(splitTitle[0], title);

  if (title) {
    return (
      <>
        <span>{splitTitle[0] ? splitTitle[0] : " "}</span>
        <br /> {splitTitle[1] ? splitTitle[1] : " "}
      </>
    );
  }
};

function ViewProfile() {
  const {user} = useSelector((state) => state?.auth);
  const {mutate} = useSWRConfig();
  const {
    data: userData,
    error: userError,
    isLoading,
  } = useSWR("/app_users/get_auth_user_info", fetcher);

  const {display_name, profile_img, current_city, current_country, sub_header} =
    userData?.structured_app_user_info ?? {};
  let activeData;
  const {group_1, group_2, group_3, group_4} =
    userData?.structured_app_user_info?.app_user_detail ?? {};
  console.log(sub_header, "profile_img");

  const [active, setActive] = useState(group_1?.title);

  useEffect(() => {
    if (group_1?.title) {
      setActive(group_1?.title);
    }
  }, [group_1?.title]);
  if (active === group_1?.title) {
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
  } else if (active === group_2?.title) {
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
  } else if (active === group_3?.title) {
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
  } else if (active === group_4?.title) {
    activeData = (
      <div className="information-container">
        {group_4?.data.map((info, index) => (
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
                {sub_header[0]}
              </h2>
              {sub_header.map((item, index) => {
                if (index == 0) return;
                return (
                  <p
                    style={{
                      textAlign: "Center",
                    }}>
                    {/* <span className="short-description">
              {singleData?.app_user?.designation}
            </span>
            <span className="short-description">
              {singleData?.app_user?.current_city},
              {singleData?.app_user?.current_country},
            </span> */}
                    <span className="short-description">{item}</span>
                  </p>
                );
              })}
              <div className="" style={{width: "100%"}}>
                <div className="tab  pt-3 d-flex justify-content-evenly">
                  <p
                    className={active === group_1?.title && "active"}
                    style={{
                      cursor: "pointer",
                      color: "#7d8490f0",
                      fontSize: 10,
                    }}
                    onClick={() => setActive(group_1?.title)}>
                    {Title(group_1?.title)}
                  </p>

                  <p
                    className={active === group_2?.title && "active"}
                    style={{
                      cursor: "pointer",
                      color: "#7d8490f0",
                      fontSize: 10,
                    }}
                    onClick={() => setActive(group_2?.title)}>
                    {Title(group_2?.title)}
                  </p>

                  <p
                    className={active === group_3?.title && "active"}
                    style={{
                      cursor: "pointer",
                      color: "#7d8490f0",
                      fontSize: 10,
                    }}
                    onClick={() => setActive(group_3?.title)}>
                    {Title(group_3?.title)}
                  </p>
                  <p
                    className={active === group_4?.title && "active"}
                    style={{
                      cursor: "pointer",
                      color: "#7d8490f0",
                      fontSize: 10,
                    }}
                    onClick={() => setActive(group_4?.title)}>
                    {Title(group_4?.title)}
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
