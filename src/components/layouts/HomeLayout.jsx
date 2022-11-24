import React from "react";

function HomeLayout({ children }) {
  return (
    <div
      className="vh-100 max-width-mobile mx-auto d-flex flex-column pt-5 px-4 rounded-top rounded-bottom position-relative"
      style={{ background: "#F9FAFB" }}
    >
      <div className="logos ">
        <div
          className="d-flex justify-content-end align-items-center"
          style={{ gap: 30 }}
        >
          <img src={"img/logo.svg"} alt="logo" style={{ height: 50 }} />
          <div className="menu-img">
            <img
              src={"img/menu.svg"}
              alt="logo"
              style={{ height: 30, width: 30 }}
            />
          </div>
        </div>
      </div>
      {children}
      <div className="footer">
        <div className="d-flex justify-content-around pt-3">
          <div className="text-center active">
            <img src="img/home.svg" alt="" />
            <p>Home</p>
          </div>
          <div className="text-center">
            <img src="img/glasses.svg" alt="" />
            <p>Explore</p>
          </div>
          <div className="text-center">
            <img src="img/message.svg" alt="" />
            <p>Message</p>
          </div>
          <div className="text-center">
            <img src="img/settings.svg" alt="" />
            <p>Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
