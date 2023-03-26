import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import back from "../../assets/imgs/Back.svg";
import human1 from "../../assets/imgs/human1.svg";
import human2 from "../../assets/imgs/human2.svg";
import UserServices from "../../services/userServices";
import { useSelector } from "react-redux";

function Boom() {
  const [boomData, setBoomData] = useState([]);
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  console.log('user', user)
  let getBoomData = async () => {
    let res = await UserServices.getBoomUsers();
    // console.log("resmatched_user", res.data.matched_users.length);
    if (res?.data?.matched_users.length > 0) {
      // console.log(res?.data?.matched_users, "res?.data?.matched_users");
      setBoomData(res?.data?.matched_users);
    } else {
      navigate("/home");
    }
  };
  useEffect(() => {
    getBoomData();
  }, []);

  const onNext = async (id) => {
    const fromData = new FormData();
    fromData.append("match_record_id", id);
    const res = await UserServices.match_viewed(fromData);
    if (res.status === 200) {
      getBoomData();
    }
  };
  // console.log("boomData", boomData);
  let show = "";
  if (boomData.length > 0) {
    show = (
      <div className="mt-5">
        <img
          src={user?.thumbnail_img ?  user?.thumbnail_img  : human1}
          alt=""
          style={{
            width: 112,
            height: 112,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <img
          src={
            boomData?.length > 0 ? boomData[0]?.thumbnail_img_url : human2
          }
          alt=""
          style={{
            width: 112,
            height: 112,
            marginLeft: -22,
            objectFit: "cover",
            borderRadius: boomData?.length > 0 && boomData[0]?.thumbnail_img_url &&
              "50%",
          }}
        />

        <p
          className="pt-4"
          style={{
            fontWeight: 400,
            fontSize: 16,

            color: "#1F2937",
          }}>
          You have matched with{" "}
          <span style={{
            fontWeight: 700,
          }}>
          {boomData[boomData.length -1]?.display_name}!

          </span>
        </p>

        <button
          className="mt-4"
          style={{
            width: 232,
            height: 57,
            left: 79,

            background: " #FFFFFF",
            /* Primary Color 2 */

            border: "1px solid #FFAEAE",
            /* EV-01 */

            boxShadow: "0px 6px 11px rgba(235, 202, 202, 0.25)",
            borderRadius: 28,
            fontSize: 16,
            fontWeight: 700,
            color: "#FFAEAE",
          }}>
            <Link to={`/chat/room/${boomData[boomData.length -1]?.match_id}`}>
          Say Hi!
            </Link>
        </button>
        <button
          className="mt-4"
          style={{
            width: 232,
            height: 57,
            left: 79,

            background: " #FFFFFF",
            /* Primary Color 2 */

            border: "1px solid #FFAEAE",
            /* EV-01 */

            boxShadow: "0px 6px 11px rgba(235, 202, 202, 0.25)",
            borderRadius: 28,
            fontSize: 16,
            fontWeight: 700,
            color: "#FFAEAE",
          }}
          onClick={() => onNext(boomData[boomData.length - 1]?.match_id)}>
          Next
        </button>
      </div>
    );
  }

  return (
    <>
      {boomData.length > 0 && (
        <div
          className="vh-100 max-width-mobile mx-auto p-4"
          style={{background: "#FFB7AC", borderRadius: 35}}>
          {/* <div className="text-end">
            <Link to={"/home"}>
              <img
                src={back}
                alt=""
                style={{width: "48px", height: "48px", cursor: "pointer"}}
              />
            </Link>
          </div> */}

          <div className="pt-4 text-center">
            <img src={"img/logo.svg"} alt="logo" style={{height: 50}} />

            <h1
              className="mt-4"
              style={{
                fontWeight: 700,
                fontSize: 48,
              }}>
              Boom
            </h1>

            {show}
          </div>
        </div>
      )}
    </>
  );
}

export default Boom;
