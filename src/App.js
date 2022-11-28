import "./App.scss";
import Routers from "./routers/Routers";
import axios from "axios";
import {getToken} from "./utils/functions";
function App() {
  axios.defaults.headers["Accept"] = "application/json";
  axios.defaults.headers.post["Content-Type"] =
    "multipart/form-data; charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  axios.defaults.baseURL = "https://backend.saiyonee.com/api";
  // console.log('getToken()', getToken())
  axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

  // axios.defaults.headers.Authorization = getToken()  ? `Bearer ${getToken()}`: "";

  // if (navigator.onLine) {
  //   console.log("online");
  // } else {
  //   // localStorage.setItem("regStart", false);
  // }

  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  // const access_token = getToken();

  return <Routers />;
}

export default App;
