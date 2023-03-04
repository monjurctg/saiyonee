/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import demoProfile from "../../assets/imgs/demoProfile.png";
import message from "../../assets/imgs/msg.png";
import msgWhite from "../../assets/imgs/msgWhite.png";
import plus from "../../assets/imgs/plus.png";
import ChatLayout from "../../components/layouts/ChatLayout";
import UserServices from "../../services/userServices";
import { AiOutlineSend } from "react-icons/ai";

function ChatBox() {
  const { id } = useParams();
  // console.log('id', id)
  const [messageUser, setMessageUser] = useState();
  const [loading, setLoading] = useState(false);
  const [ploading, setPLoading] = useState(true);
  const [loadMessage, setloadMessage] = useState('Load more messages')
  console.log('ploading', ploading)


  const [userData, setuserData] = useState();
  const [messageData, setmessageData] = useState([]);
  const [scrollPos, setScrollPos] = useState();
  // console.log("scrollPos", scrollPos);
  const messagesEndRef = useRef(null);

  let getMessage = async (data,sendBtn) => {
    // console.log('data', data)
    if (!data) {
      data = { match_id: id };
    }

    let res = await UserServices.getMessage(data);
   
    if (messageData?.data?.chat_messages?.length > 0 && !sendBtn) {
      console.log('second')
      if(res.res?.data?.data?.chat_messages?.length > 0){

        setloadMessage('Load more messages')
        let newMessage = res?.data?.data?.chat_messages[0];
        console.log('newMessage', newMessage)
        messageData?.data?.chat_messages.push(newMessage);
  
        // console.log("newMessage", newMessage);
        setmessageData(res.data);
      }else{
        setloadMessage('No more messages')
      }
      // console.log('res', res)
      // // setPLoading(false);
     
    } else {
      console.log('first')
      setPLoading(false);
      setmessageData(res.data);
      setuserData(res.data?.data?.other_user);
    }
    // console.log('res', res.data)
  };
  let scrollToBottomF = () => {
    console.log("ss");
    // messagesEndRef.current.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: "smooth",
    // });
    messagesEndRef?.current?.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    const container = messagesEndRef.current;
    if (container) {
      console.log('first', container.scrollTop, container.scrollHeight)
      container.scrollTop = container.scrollHeight;
    }
  }, [messageData]);


  useEffect(() => {
    // scrollToBottom();
    getMessage({ match_id: id });
    scrollToBottomF();
    // const interval = setInterval(() => getMessage(), 10000)
    //     return () => {
    //       clearInterval(interval);
    //     }
  }, []);


  let sendMessages = async () => {
    // e.preventDefault();
    setLoading(true);
    // console.log("ss");
    let data = {
      match_id: id,
      message: messageUser,
    };
    let res = await UserServices.message_users(data);
    if (res.status === 200) {
      setLoading(false);
      setMessageUser("");
      getMessage({ match_id: id },true);
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
            }
          >
            
            <p>{md?.message}</p>
          </div>
          <p
             style={{
              fontSize:8,
              marginBottom: 0,
            }}
            >{md?.created_at}</p>
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
            }
          >
            <p>{md?.message}</p>
          </div>
          <p
            style={{
              fontSize:8,
              marginBottom: 0,
            }}
            >{md?.created_at}</p>
        </div>
      );
    }
  });

  let footer = (
    <div className="chat-footer d-flex">
      {/* <div className="round-shape">
        <img src={plus} alt="" />
      </div> */}

      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Type something..."
          value={messageUser}
          onChange={(e) => setMessageUser(e.target.value)}
        />
      </div>
      <button
        className="send"
        style={{
          opacity: loading && "0.8",
        }}
        onClick={() => {
          if (!loading) {
          console.log('loading', loading)

            sendMessages();
          }
        }}
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            Send <AiOutlineSend />
          </>
        )}
      </button>
    </div>
  );
  
  return (
   
    <ChatLayout user={userData}>
      <div
        className="chat-body"
        id="chat-body"
        style={{ marginTop: 80 }}
        ref={messagesEndRef}
      >
        <div className="text-center">
          <button
            style={{
              border: "none",
              background: "#ffb7ac",
              color: "white",
              fontSize: 10,
            }}

            onClick={() => {
              console.log("ss");
              setloadMessage('Loading...')
              getMessage({
                match_id: id,
                oldest_message_id:
                  messageData?.data?.chat_messages[0
                  ]?.id,
              });
            }}

          >
            {loadMessage}
          </button>
        </div>
        {showMessageFrom}
      </div>

      {footer}
    </ChatLayout>
  )
}

export default ChatBox;
