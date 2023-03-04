import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../components/layouts/HomeLayout";
import useSWR from "swr";
import axios from "axios";
import ProfileImage from "../../components/ProfileImage";
import { getDate } from "../../utils/functions";

const fetcher = (url) => axios.post(url).then((res) => res.data);
const ChatIndex = () => {
  // const [data, setdata] = useState();
  const { data, error, isLoading } = useSWR(
    "/live_chat/message_directory",
    fetcher
  );
  // console.log('getDate', getDate(data?.matched_users[0]?.latest_live_chat_message?.created_at))

  let div = "";
  if (data?.matched_users?.length > 0 && !isLoading) {
    div = data?.matched_users?.map((item) => (
      <Link to={`/chat/room/${item?.latest_live_chat_message?.match_id}`}>
        <div
          className="chat_body mb-4"
          style={{
            margin: "auto",
            background: item?.new_message_available && "#ffb7ac36",
          }}
        >
          <div className="d-flex justify-content-around align-items-center"
          style={{
            padding: 10,
          }}
          >
            <div
              style={{
                width: "20%",
              }}
            >
              <ProfileImage
                style={{
                  width: 58,
                  height: 58,
                  objectFit: "cover",
                  border: "1px solid #ffb7ac",
                  borderRadius: "50%",
                }}
                url={item?.latest_live_chat_message?.to_user?.thumbnail_img}
                gender={item?.latest_live_chat_message?.to_user?.gender}
              />
              {/* <img src={item?.latest_live_chat_message?.to_user?.thumbnail_img} alt=''/> */}
              {/* <p className="no-image" w>
                  image
                </p> */}
            </div>
            {/* <p className="no-image">image</p> */}
            <div
              style={{
                width: "80%",
              }}
            >
              <p
                className="name"
                style={{
                  fontWeight: item?.new_message_available ? "bold" : "normal",
                }}
              >
                {item?.latest_live_chat_message?.to_user?.display_name}
              </p>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <p
                  className="message"
                  style={{
                    fontWeight: item?.new_message_available ? "bold" : "normal",
                    color: item?.new_message_available && "#000",
                  }}
                >
                  {item?.latest_live_chat_message?.from_user?.id ===
                    data?.auth_user?.id && <span>You:</span>}
                  {item?.latest_live_chat_message?.message}
                </p>
                <p
                  className="day"
                  style={{
                    fontSize: 10,
                    fontWeight: item?.new_message_available ? "bold" : "normal",
                    color: item?.new_message_available && "#000",
                  }}
                >
                  {/* {getDate(item?.latest_live_chat_message?.created_at)} */}
                  {item?.latest_live_chat_message?.created_at}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));
  } else if (isLoading) {
    div = (
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: 15,
          }}
        >
          Loading...
        </h1>
      </div>
    );
  } else if (!isLoading && data?.matched_users?.length === 0) {
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
