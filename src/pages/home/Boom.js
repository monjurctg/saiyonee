import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import back from "../../assets/imgs/Back.svg";
import human1 from "../../assets/imgs/human1.svg";
import human2 from "../../assets/imgs/human2.svg";
import UserServices from "../../services/userServices";

function Boom() {
  const [boomData, setBoomData] = useState();
  const navigate = useNavigate();

  let getBoomData = async () => {
    let res = await UserServices.matched_users();
    // console.log("resmatched_user", res.data.matched_users.length);
    if (res?.data?.matched_users ) {
      setBoomData(res.data.matched_users)
    }else{
      navigate("/home")
    }
  };
  useEffect(() => {
    getBoomData()
  }, [])
  console.log('boomData', boomData)
let show = ""
if( boomData !== undefined){
  show = boomData.map((item, index) => {
    return (
      <div className="mt-5">
        <img
          src={human1}
          alt=""
          style={{
            width: 112,
            height: 112,
          }}
        />
        <img
          src={item?.matched_user?.thumbnail_img_url||human2}
          alt=""
          style={{
            width: 112,
            height: 112,
            marginLeft: -22,
            objectFit: "cover",
            borderRadius: item?.matched_user?.thumbnail_img_url && "50%"
          }}
        />

        <p
          className="pt-4"
          style={{
            fontWeight: 400,
            fontSize: 16,

            color: "#1F2937",
          }}
        >
          You have matched with {item?.matched_user.full_name}! 
        </p>

        <button  className="mt-4"
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
        >
          Say Hi!
        </button>
      </div>
    )
  })
}


  return (
    <div
      className="vh-100 max-width-mobile mx-auto p-4"
      style={{ background: "#FFB7AC", borderRadius: 35 }}
    >
      <div className="text-end">
        <Link to={"/home"}>
        <img
          src={back}
          alt=""
          style={{ width: "48px", height: "48px", cursor: "pointer" }}
        />
        </Link>
      </div>

      <div className="pt-4 text-center">
        <img src={"img/logo.svg"} alt="logo" style={{ height: 50 }} />

        <h1
          className="mt-4"
          style={{
            fontWeight: 700,
            fontSize: 48,
          }}
        >
          Boom
        </h1>

       {show}
      </div>
    </div>
  );
}

export default Boom;
