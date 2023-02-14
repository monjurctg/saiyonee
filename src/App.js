import "./App.scss";
import Routers from "./routers/Routers";
import axios from "axios";
import PreferenceServices from "./services/preferenceServices";
import {useDispatch} from "react-redux";
import {setPreviousPreference} from "./redux/slices/preferenceSlice";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import UserServices from "./services/userServices";
import {setCurrentUser} from "./redux/slices/authSlices";
import {getToken} from "./utils/functions";
import {useCallback} from "react";
import {MessengerChat} from "react-messenger-chat-plugin";
function App() {
  axios.defaults.headers["Accept"] = "application/json";
  axios.defaults.headers.post["Content-Type"] =
    "multipart/form-data; charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  axios.defaults.baseURL = "https://testingsaiyonee.betteraidbd.com/api";

  // axios.defaults.headers.Authorization = getToken()  ? `Bearer ${getToken()}`: "";

  // if (navigator.onLine) {
  //   console.log("online");
  // } else {
  //   // localStorage.setItem("regStart", false);
  // }

  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  // const access_token = getToken();
  const route = useLocation();

  const dispatch = useDispatch();
  const fetchPreviousPreference = useCallback(async () => {
    const res = await PreferenceServices.getPreferenceData();
    if (res.status === 200) {
      dispatch(setPreviousPreference(res.data.profile_preferences));
    } else {
      console.log(res);
    }
  }, [dispatch]);

  const fetchCurrentUser = async () => {
    const res = await UserServices.UserProfile();
    if (res.status === 200) {
      dispatch(setCurrentUser(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchPreviousPreference();
      fetchCurrentUser();
    }
  }, []);

  return (
    <>
      <Routers />

      <div className="max-width-mobile">
        <MessengerChat
          language="EN"
          themeColor={"#ffb7ac"}
          bottomSpacing={80}
          loggedInGreeting="Wellcome to saiyonee"
          // loggedOutGreeting="loggedOutGreeting"

          greetingDialogDisplay={"hide"}
          debugMode={true}
          B
          pageId="105398835401043"
        />
      </div>
    </>
  );
}

export default App;
