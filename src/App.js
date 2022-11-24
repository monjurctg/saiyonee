import "./App.scss";
import Routers from "./routers/Routers";
import axios from "axios";
import {getToken} from "./utils/functions";
function App() {
  axios.defaults.headers["Accept"] = "application/json";
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  axios.interceptors.request.use((config) => {
    if (navigator.onLine) {
      config.baseURL = "http://backend.saiyonee.com/";
      config.withCredentials = true;
      const access_token = getToken();
      config.headers.Authorization = access_token
        ? `Bearer ${access_token}`
        : "";

      return config;
    } else {
      // customPosition("center", "error", "No internet connectin");
    }
  });

  return <Routers />;
}

export default App;
