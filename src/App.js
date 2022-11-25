import "./App.scss";
import Routers from "./routers/Routers";
import axios from "axios";
import {getToken} from "./utils/functions";
function App() {
  axios.defaults.headers["Accept"] = "application/json";
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  // axios.defaults.baseURL = "";

  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  // const access_token = getToken();
  // axios.defaults.headers.Authorization = access_token
  //   ? `Bearer ${access_token}`
  //   : "";

  return <Routers />;
}

export default App;
