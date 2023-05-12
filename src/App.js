import "./App.scss";
import Routers from "./routers/Routers";
import axios from "axios";
import PreferenceServices from "./services/preferenceServices";
import {useDispatch} from "react-redux";
import {setPreviousPreference} from "./redux/slices/preferenceSlice";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import UserServices from "./services/userServices";
import {setCurrentUser} from "./redux/slices/authSlices";
import {getToken} from "./utils/functions";
import {useCallback} from "react";
import {MessengerChat} from "react-messenger-chat-plugin";
import {setEditData} from "./redux/slices/utilsSlice";
function App() {
  axios.defaults.headers["Accept"] = "application/json";
  axios.defaults.headers.post["Content-Type"] =
    "multipart/form-data; charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  axios.defaults.baseURL = "https://testing.saiyonee.com/api";

  // axios.defaults.headers.Authorization = getToken()  ? `Bearer ${getToken()}`: "";

  // if (navigator.onLine) {
  //   console.log("online");
  // } else {
  //   // localStorage.setItem("regStart", false);
  // }

  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  // const access_token = getToken();
  const route = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPreviousPreference = async () => {
    const res = await PreferenceServices.getPreferenceData();
    if (res.status === 200) {
      dispatch(setPreviousPreference(res.data.profile_preferences));
    } else {
      console.log(res);
    }
  };
  const logout = () => {
    // console.log("logout");
    localStorage.clear();
    window.location.reload();

    navigate("/get-start");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await UserServices.UserProfile();
      if (res.status === 200) {
        dispatch(setCurrentUser(res.data));
        console.log(res.data);
      }
    } catch (err) {
      // Check if the error is due to an expired token 
      if (err.response && err.response.status === 401) {
        // Clear the token from local storage
        logout();
        // Redirect the user to the login page or show a logout message
        // For example, using react-router-dom:
        navigate("/login");
      } else {
        console.log(err);
      }
    }
  }, [dispatch, navigate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchEditUser = async () => {
    const res = await UserServices.getEditData();
    if (res.status === 200) {
      dispatch(setEditData(res.data));

      console.log(res.data);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchPreviousPreference();
      fetchCurrentUser();
      fetchEditUser();
    }
  }, [fetchCurrentUser, fetchEditUser, fetchPreviousPreference]);

  return (
    <>
      <Routers />

      <div className="max-width-mobile">
        <MessengerChat
          language="EN"
          themeColor={"#ffb7ac"}
          bottomSpacing={80}
          loggedInGreeting="Welcome to saiyonee"
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
