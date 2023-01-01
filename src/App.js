import "./App.scss";
import Routers from "./routers/Routers";
import axios from "axios";
import PreferenceServices from "./services/preferenceServices";
import {useDispatch} from "react-redux";
import {setPreviousPreference} from "./redux/slices/preferenceSlice";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
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
  // console.log(route.pathname, "fjdkjf");
  const dispatch = useDispatch();
  const fetchPreviousPreference = async () => {
    const res = await PreferenceServices.getPreferenceData();
    if (res.status === 200) {
      dispatch(setPreviousPreference(res.data.profile_preferences));
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    fetchPreviousPreference();
  }, []);

  return <Routers />;
}

export default App;
