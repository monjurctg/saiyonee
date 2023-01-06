import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import demoProfile from "../../assets/imgs/demoProfile.png";
import message from "../../assets/imgs/msg.png";
import msgWhite from "../../assets/imgs/msgWhite.png";
import plus from "../../assets/imgs/plus.png";
import UserServices from "../../services/userServices";

function ChatBox() {
  const navigate = useNavigate();
  const [messageUser, setMessageUser] = useState();
  const [messageData, setmessageData] = useState([])
  let getMessage = async () => {
    let res = await UserServices.getMessage({match_id:10});
    // console.log('res', res.data.data)
    setmessageData(res.data)
  };
  useEffect(() => {
    getMessage()
  }, [])
  
  let sendMessages = async (e) => {
    e.preventDefault();
    // console.log("ss");
    let data = {
      match_id:10,
      message: messageUser,
    };
    let res = await UserServices.message_users(data);
    if (res.status === 200) {
      setMessageUser("");
      getMessage()
    }
    console.log('res', res)
  };

  let showMessageFrom = messageData?.data?.chat_messages.map( md=>{ 
  if(md?.from_id ===messageData?.data?.user.id ) return <div
  className="write"
  style={{
    backgroundImage: `url(${message})`,
  }}
>
  <p>{md.message}</p>
</div>
})

let showMessageTo = messageData?.data?.chat_messages.map( md=>{
  if(md?.from_id !==messageData?.data?.user.id ) return   <div
  className="write"
  style={{
    backgroundImage: `url(${msgWhite})`,
  }}
>
  <p>{md.message}</p>
</div>
})

  return (
    <div
      //   className="vh-100 max-width-mobile mx-auto d-flex flex-column pt-5 px-4 rounded-top rounded-bottom position-relative mt-2 mb-2"S
      className="mx-auto max-width-mobile pt-4 "
      style={{
        background: "#F9FAFB",
        borderRadius: 35,
        height: "100vh",

        // "#F9FAFB"
      }}
    >
      <div
        className="logos pb-3  px-4"
        style={{
          background: "rgb(255, 255, 255)",
          position: "fixed",
          top: 0,
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ gap: 55, marginTop: 20 }}
        >
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 image-invert"
            style={{ height: "58px", width: "58px" }}
          >
            <img src="/img/back-icon.svg" alt="back" />
          </div>

          <p
            style={{
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "24px",
              color: "#1F2937",
              marginBottom: 0,
              marginRight: 15,
            }}
          >
            Skylar
          </p>
          <img src={demoProfile} alt="" />
        </div>
      </div>
      <div className="chat-body" style={{ marginTop: 80 }}>
        <div className="chat-body-inner-right">
          <div>
          {showMessageFrom}
          </div>
          <img src={demoProfile} alt="" />
        </div>
        <div className="chat-body-inner-left">
          <img src={demoProfile} alt="" />
          <div>
          {showMessageTo}
           
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default ChatBox;
