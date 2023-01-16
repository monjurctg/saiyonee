import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Scalaton from "../../components/Scalaton";
import AuthServices from "../../services/authServices";
import toastMsg from "../../utils/toastify";

function SocialLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [laoding, setlaoding] = useState(false);
  // const status = searchParams.get("status");
  const google_token = searchParams.get("google_token");
  const driver = searchParams.get("driver");

  // const message = searchParams.get("message");
  // const registration_completed = searchParams.get("registration_completed");
  // const is_banned = searchParams.get("is_banned");
  // const is_verified = searchParams.get("is_verified");
  console.log("google_token", google_token);
  let sendToken = async (google_token) => {
    setlaoding(true);
    let res = await AuthServices.socialAppUserToken({
      driver: driver,
      token: google_token,
    });
    if (res.status === 200) {
      setlaoding(false);
      toastMsg.success(res?.data?.message);
      localStorage.setItem("social-token", google_token);
      navigate("/register/usertype");

      console.log("res", res);
    } else {
      setlaoding(false);
      toastMsg.error(res?.data?.message);
      navigate("/get-start");
    }

    console.log("res", res);
  };
  useEffect(() => {
    if (google_token) {
      sendToken(google_token);
    }
  }, [google_token]);

  return <div>{laoding ? <Scalaton /> : ""}</div>;
}

export default SocialLogin;
