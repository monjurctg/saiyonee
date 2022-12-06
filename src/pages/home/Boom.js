import React from "react";
import { Link } from "react-router-dom";
import back from "../../assets/imgs/Back.svg";
import human1 from "../../assets/imgs/human1.svg";
import human2 from "../../assets/imgs/human2.svg";

function Boom() {
  return (
    <div
      className="vh-100 max-width-mobile mx-auto p-4"
      style={{ background: "#FFB7AC", borderRadius: 35 }}
    >
      <div className="text-end">
        <Link to={"/home"}>
        <img
          src={back}
          alt=""
          style={{ width: "48px", height: "48px", cursor: "pointer" }}
        />
        </Link>
      </div>

      <div className="pt-4 text-center">
        <img src={"img/logo.svg"} alt="logo" style={{ height: 50 }} />

        <h1
          className="mt-4"
          style={{
            fontWeight: 700,
            fontSize: 48,
          }}
        >
          Boom
        </h1>

        <div className="mt-5">
          <img
            src={human1}
            alt=""
            style={{
              width: 112,
              height: 112,
            }}
          />
          <img
            src={human2}
            alt=""
            style={{
              width: 112,
              height: 112,
              marginLeft: -22,
            }}
          />

          <p
            className="pt-4"
            style={{
              fontWeight: 400,
              fontSize: 16,

              color: "#1F2937",
            }}
          >
            It’s match! Now Aysh has 24 hours to message you.
          </p>

          <button  className="mt-4"
            style={{
              width: 232,
              height: 57,
              left: 79,

              background: " #FFFFFF",
              /* Primary Color 2 */

              border: "1px solid #FFAEAE",
              /* EV-01 */

              boxShadow: "0px 6px 11px rgba(235, 202, 202, 0.3)",
              borderRadius: 100,
              fontSize:16
            }}
          >
            Go to chat
          </button>

          <button  className="mt-4"
            style={{
              width: 232,
              height: 57,
              left: 79,

              background: " #FFFFFF",
              /* Primary Color 2 */

              border: "1px solid #FFAEAE",
              /* EV-01 */

              boxShadow: "0px 6px 11px rgba(235, 202, 202, 0.3)",
              borderRadius: 100,
              fontSize:16
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Boom;
