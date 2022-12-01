import React from "react";
import { Link, useLocation } from "react-router-dom";

function HomeLayout({ children, background }) {
  let { pathname } = useLocation();

  return (
    <div
      //   className="vh-100 max-width-mobile mx-auto d-flex flex-column pt-5 px-4 rounded-top rounded-bottom position-relative mt-2 mb-2"S
      className="mx-auto max-width-mobile pt-4 "
      style={{
        background: "#F9FAFB",
        borderRadius: 35,

        // "#F9FAFB"
      }}
    >
      <div className="logos px-4" style={{ background: background,position:"fixed",top:pathname === "home" ? 20 :0,
    borderTopRightRadius:pathname === "home" ? 0 : 35,
    borderTopLeftRadius: pathname === "home" ? 0 : 35,
    width: pathname !== "home" && 428,
    
    }}>
        <div
          className="d-flex justify-content-end align-items-center"
          style={{ gap: 55,
          marginTop:pathname === "home" ? 0 : 20,
          }}
        >
          {pathname === "/settings" &&
          
          <Link
            to="/" // TODO ROUTES.tutorial
            className="image-saturate position-relative me-auto"
          >
            <img src="img/back.svg" alt="next" className="img-fluid" />
            <div className="position-absolute position-fill d-flex align-items-center justify-content-center">
              <img
                src="img/back-icon.svg"
                alt="next-btn-25-percent.svg"
                className="img-fluid"
              />
            </div>
          </Link>
          }
          <img src={"img/logo.svg"} alt="logo" style={{ height: 50 }} />
          <Link to={"/preference"} >
            <div className="menu-img">
              <img
                src={"img/menu.svg"}
                alt="logo"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </Link>
        </div>
        {pathname === "/explore" && (
          <div className="tab d-flex pt-3">
            <p className="active">Visited you</p>
            <p>Short list</p>
            <p>Liked you</p>
          </div>
        )}
      </div>
      <div className="px-4" style={{marginTop:70}}>{children}</div>
      <div className="footer rounded-bottom mx-auto max-width-mobile" style={{position:"fixed",bottom:"0"}}>
        <div className="d-flex justify-content-around pt-3 align-items-baseline">
          <Link to={"/home"}>
            <div
              className={`text-center ${pathname === "/home" ? "active" : ""}`}
            >
              <img src="img/home.svg" alt="" />
              <p>Home</p>
            </div>
          </Link>
          <Link to={"/explore"}>
            <div
              className={`text-center ${
                pathname === "/explore" ? "active" : ""
              }`}
            >
              <img src="img/glasses.svg" alt="" />
              <p>Explore</p>
            </div>
          </Link>
          <div className="text-center">
            <img src="img/message.svg" alt="" />
            <p>Message</p>
          </div>
          <Link to={"/settings"}>
            <div
              className={`text-center ${
                pathname === "/settings" ? "active" : ""
              }`}
            >
              <img src="img/glasses.svg" alt="" />
              <p>Settings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
