/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import demoProfile from "../../assets/imgs/demoProfile.png";
import message from "../../assets/imgs/msg.png";
import msgWhite from "../../assets/imgs/msgWhite.png";
import plus from "../../assets/imgs/plus.png";
import ChatLayout from "../../components/layouts/ChatLayout";
import UserServices from "../../services/userServices";

function ChatBox() {
  const { id } = useParams();
  // console.log('id', id)
  const [messageUser, setMessageUser] = useState();
  const [userData, setuserData] = useState()
  const [messageData, setmessageData] = useState([]);
  const [scrollPos, setScrollPos] = useState();
  // console.log("scrollPos", scrollPos);
  const messagesEndRef = useRef(null);

  let getMessage = async (data) => {
    // console.log('data', data)
    if (!data) {
      data = { match_id: id }
    }

    let res = await UserServices.getMessage(data);
    console.log('messageData?.data?.chat_messages?.length', messageData?.data?.chat_messages?.length)
    if (messageData?.data?.chat_messages?.length > 0) {
      let newMessage = res?.data?.data?.chat_messages[0];
      messageData?.data?.chat_messages.push(newMessage);

      // console.log("newMessage", newMessage);
      setmessageData(res.data);
    } else {
      setmessageData(res.data);
      setuserData(res.data?.data?.other_user)
    }
    // console.log('res', res.data)
  };
  // console.log("messageData", userData);
  let scrollToBottomF = () => {
    console.log('ss')
    // messagesEndRef.current.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: "smooth",
    // });
    messagesEndRef?.current?.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    if (scrollPos == 0) {
      console.log("first");
      console.log(
        "f",
        messageData?.data?.chat_messages[
          messageData?.data?.chat_messages.length - 1
        ]?.id
      );
      getMessage({
        match_id: id,
        oldest_message_id:
          messageData?.data?.chat_messages[
            messageData?.data?.chat_messages.length - 1
          ]?.id,
      });
    }
  }, [scrollPos]);

  useEffect(() => {
    if (!messagesEndRef.current && !messageData) return;
    const handleScroll = () => {
      setScrollPos(messagesEndRef.current.scrollTop);
    };
    messagesEndRef.current.addEventListener("scroll", handleScroll);
    return () =>
      messagesEndRef?.current?.removeEventListener("scroll", handleScroll);
  }, [messagesEndRef]);

  useEffect(() => {
    // scrollToBottom();
    getMessage({ match_id: id });
    scrollToBottomF();
    // const interval = setInterval(() => getMessage(), 10000)
    //     return () => {
    //       clearInterval(interval);
    //     }
  }, []);

  useEffect(() => {
    // scrollToBottom();
    scrollToBottomF();
  }, [messageData]);

  let sendMessages = async (e) => {
    e.preventDefault();
    // console.log("ss");
    let data = {
      match_id: id,
      message: messageUser,
    };
    let res = await UserServices.message_users(data);
    if (res.status === 200) {
      setMessageUser("");
      getMessage();
    }
    // console.log("res", res);
  };

  let showMessageFrom = messageData?.data?.chat_messages.map((md, index) => {
    if (md?.from_id === messageData?.data?.user.id)
      return (
        <div key={index} className="chat-body-inner-right">
          <div
            className="write"
            style={
              {
                // backgroundImage: `url(${message})`,
              }
            }>
            <p>{md?.message}</p>
          </div>
        </div>
      );
    else {
      return (
        <div className="chat-body-inner-left">
          <div
            className="write"
            style={
              {
                // backgroundImage: `url(${msgWhite})`,
              }
            }>
            <p>{md?.message}</p>
          </div>
        </div>
      );
    }
  });

  let footer = (
    <div className="chat-footer d-flex">
      <div className="round-shape">
        <img src={plus} alt="" />
      </div>

      <form onSubmit={sendMessages}>
        <input
          type="text"
          className="form-control"
          placeholder="Type something..."
          value={messageUser}
          onChange={(e) => setMessageUser(e.target.value)}
        />
      </form>
    </div>
  );
  return (
    <ChatLayout user={userData}>
      <div
        className="chat-body"
        id="chat-body"
        style={{ marginTop: 80 }}
        ref={messagesEndRef}>
        {showMessageFrom}
        {/* <div className="chat-body-inner-right">
          <div>{showMessageFrom}</div>
          {/* <img src={demoProfile} alt="" /> */}
        {/* </div>
        <div className="chat-body-inner-left">
          <img src={demoProfile} alt="" />
          <div>{showMessageTo}</div>
        </div> */}
      </div>
      {/* ////footer */}
      {footer}
    </ChatLayout>
  );
}

export default ChatBox;
