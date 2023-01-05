import React from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../components/layouts/HomeLayout";

const ChatIndex = () => {
  return (
    <HomeLayout>
      <div style={{
        height: "69vh",
        overflowY: "auto"
      }}>
        <Link to={"/chat/room"}>
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
      </div>
    </HomeLayout>
  );
};

export default ChatIndex;
