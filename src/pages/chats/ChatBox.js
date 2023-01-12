import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import demoProfile from "../../assets/imgs/demoProfile.png";
import message from "../../assets/imgs/msg.png";
import msgWhite from "../../assets/imgs/msgWhite.png";
import plus from "../../assets/imgs/plus.png";
import ChatLayout from "../../components/layouts/ChatLayout";
import UserServices from "../../services/userServices";

function ChatBox() {
  const [messageUser, setMessageUser] = useState();
  const [messageData, setmessageData] = useState([]);
  const messagesEndRef = useRef(null)
  let getMessage = async () => {
    let res = await UserServices.getMessage({ match_id: 10 });
    // console.log('res', res.data.data)
    setmessageData(res.data);
  };
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // }

  let scrollToBottomF = () => {
    messagesEndRef.current.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"});
  }
  useEffect(() => {
    // scrollToBottom();
    getMessage();
    scrollToBottomF();
    const interval = setInterval(() => getMessage(), 10000)
        return () => {
          clearInterval(interval);
        }
  }, []);


  useEffect(() => {
    // scrollToBottom();
    scrollToBottomF();
    console.log('window.pageXOffset',messagesEndRef.current.off)
    }, [messageData]);

  let sendMessages = async (e) => {
    e.preventDefault();
    // console.log("ss");
    let data = {
      match_id: 10,
      message: messageUser,
    };
    let res = await UserServices.message_users(data);
    if (res.status === 200) {
      setMessageUser("");
      getMessage();
    }
    // console.log("res", res);
  };

  let showMessageFrom = messageData?.data?.chat_messages.map((md) => {
    if (md?.from_id === messageData?.data?.user.id)
      return (
        <div className="chat-body-inner-right">
          <div
            className="write"
            style={{
              // backgroundImage: `url(${message})`,
            }}
          >
            <p>{md.message}</p>
          </div>
        </div>
      );
    else {
      return (
        <div className="chat-body-inner-left">
          <div
            className="write"
            style={{
              // backgroundImage: `url(${msgWhite})`,
            }}
          >
            <p>{md.message}</p>
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
    <ChatLayout>
      <div className="chat-body" style={{ marginTop: 80 }} ref={messagesEndRef}>
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
