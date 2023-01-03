import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function ExploreLayout({ children, background, tab, footer }) {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { route } = useParams();

  const logout = () => {
    // console.log("logout");
    localStorage.clear();
    navigate("/login");
  };

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
        className="logos px-4"
        style={{
          background: background,
          position: "fixed",
          top: pathname === "home" ? 20 : 0,
          borderTopRightRadius: pathname === "home" ? 0 : 35,
          borderTopLeftRadius: pathname === "home" ? 0 : 35,
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ gap: 55, marginTop: pathname === "home" ? 0 : 20 }}
        >
          <Link
            to="/" // TODO ROUTES.tutorial
            className="image-saturate position-relative me-auto"
          >
            <img src="/img/back.svg" alt="next" className="img-fluid" />
            <div className="position-absolute position-fill d-flex align-items-center justify-content-center">
              <img
                src="/img/back-icon.svg"
                alt="next-btn-25-percent.svg"
                className="img-fluid"
              />
            </div>
          </Link>

          <Link to={"/home"}>
            <img src={"/img/logo.svg"} alt="logo" style={{ height: 50 }} />
          </Link>
          <img
            src={"/img/logout.png"}
            alt="logo"
            onClick={logout}
            style={{
              height: 30,
              width: 30,
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
          {/* <Link to={"/chat"}>
            <div className="menu-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-chat"
                viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
              </svg>
            </div>
          </Link> */}
        </div>

        <div className="">{route !== "match" && tab}</div>
      </div>
      <div className="px-4" style={{ marginTop: 105 }}>
        {children}
      </div>
      {route !== "match" && (
        <div
          className="footer rounded-bottom mx-auto max-width-mobile"
          style={{ position: "fixed", bottom: "0" }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export default ExploreLayout;
