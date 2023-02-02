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

  let div = ""
  if(data?.length > 0){
    div =  <Link to={"/chat/room"}>
    <div className="chat_body mb-4">
      <div className="d-flex justify-content-evenly align-items-center">
        <p className="no-image">image</p>
        <div>
          <p className="name">Dianne, 22</p>
          <p className="message">Was great hanging out!</p>
        </div>
        <p className="day">Fri</p>
      </div>
    </div>
  </Link>
  }else{
    div = <div className="mb-4 text-center">
        <h5
        style={{
          color: "#000",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
        >No chat available</h5>
      </div>
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
