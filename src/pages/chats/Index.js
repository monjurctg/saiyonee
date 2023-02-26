import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../components/layouts/HomeLayout";
import UserServices from "../../services/userServices";

const ChatIndex = () => {
  const [data, setdata] = useState();
  const [authUser, setauthUser] = useState();
  console.log("data", data);

  let getInbox = async () => {
    const res = await UserServices.getInbox();
    // console.log("res ,]msg", res.data);
    setauthUser(res.data?.auth_user);
    setdata(res.data?.matched_users);
    return res;
  };
  useEffect(() => {
    getInbox();
  }, []);

  let div = "";
  if (data?.length > 0) {
    div = data?.map((item) => (
      <Link to={`/chat/room/${item?.latest_live_chat_message?.match_id}`}>
        <div
          className="chat_body mb-4"
          style={{
            margin: "auto",
          }}
        >
          <div className="d-flex justify-content-around align-items-center">
            <div
              style={{
                width: "30%",
              }}
            >
              {!item?.latest_live_chat_message?.to_user?.thumbnail_img ? (
                <img
                  src={item?.latest_live_chat_message?.to_user?.thumbnail_img}
                  alt=""
                  style={{
                    width: 70,
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: 70,
                    borderRadius: "50%",
                    /* background: #ffb7ac36; */
                    marginTop: 10,
                    padding: 10,
                  }}
                />
              ) : (
                <p className="no-image" w>
                  image
                </p>
              )}
            </div>
            {/* <p className="no-image">image</p> */}
            <div
              style={{
                width: "70%",
              }}
            >
              <p className="name">
                {item?.latest_live_chat_message?.to_user?.display_name}
              </p>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <p className="message">
                  {item?.latest_live_chat_message?.from_user?.id ===
                    authUser?.id && <span>You:</span>}
                  {item?.latest_live_chat_message?.message}
                </p>
                <p
                  className="day"
                  style={{
                    fontSize: 12,
                  }}
                >
                  •
                  {moment(item?.latest_live_chat_message?.created_at).fromNow(
                    true
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));
  } else {
    div = (
      <div className="mb-4 text-center">
        <h5
          style={{
            fontSize: 20,

            border: "1px solid #dee2e6",
            color: "#ffb7ac",
            padding: 10,
            width: "80%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          No chat available
        </h5>
      </div>
    );
  }
  return (
    <HomeLayout>
      <div
        style={{
          height: "69vh",
          overflowY: "auto",
        }}
      >
        {div}
      </div>
    </HomeLayout>
  );
};

export default ChatIndex;
