import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../components/layouts/HomeLayout";
import UserServices from "../../services/userServices";

const ChatIndex = () => {
  const [data, setdata] = useState();


  let getInbox = async () => {
    const res = await UserServices.getInbox();
    console.log("res ,]msg", res.data?.matched_users);
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
        <div className="chat_body mb-4" style={{
          margin: "auto",
        }}>
          <div className="d-flex justify-content-evenly align-items-center">
            {item?.latest_live_chat_message?.from_user?.thumbnail_img ? (
              <img
                src={item?.latest_live_chat_message?.from_user?.thumbnail_img}
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
              <p className="no-image">image</p>
            )}
            {/* <p className="no-image">image</p> */}
            <div>
              <p className="name">
                {item?.latest_live_chat_message?.from_user?.display_name}, 22
              </p>
              <p className="message">
                {item?.latest_live_chat_message?.message}
              </p>
            </div>
            <p className="day">Fri</p>
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
