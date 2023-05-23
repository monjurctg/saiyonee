import React from "react";
import {Link, useNavigate} from "react-router-dom";
import demoProfile from "../../assets/imgs/demoProfile.png";

function ChatLayout({children, matched_id, user, matchedTime}) {
  const navigate = useNavigate();
  // console.log("matchedTime", matchedTime);
  return (
    <div
      //   className="vh-100 max-width-mobile mx-auto d-flex flex-column pt-5 px-4 rounded-top rounded-bottom position-relative mt-2 mb-2"S
      className="mx-auto max-width-mobile pt-4 "
      style={{
        background: "#F9FAFB",
        borderRadius: 35,
        height: "100vh",

        // "#F9FAFB"
      }}>
      <div
        className="logos pb-3  px-4"
        style={{
          background: "rgb(255, 255, 255)",
          position: "fixed",
          top: 0,
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        }}>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{marginTop: 20}}>
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>

          <p
            style={{
              fontWeight: 800,
              fontSize: 16,
              lineHeight: "24px",
              color: "#1F2937",
              marginBottom: 0,
              // marginRight: 15,
              width: "40%",
              textAlign: "center",
            }}>
            {user?.display_name}
            <span
              style={{
                display: "block",
                margin: -6,
                fontSize: 10,
              }}>
              {matchedTime}
            </span>
          </p>
          <Link to={`/user-info/match/${matched_id}`}>
            <img
              src={user?.thumbnail_img}
              alt=""
              style={{
                height: 58,
                width: 58,
                border: "1px solid #ffb7ac",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ChatLayout;
