import "./App.scss";
import Routers from "./routers/Routers";
import axios from "axios";
import {getToken} from "./utils/functions";
function App() {
  axios.defaults.headers["Accept"] = "application/json";

  axios.defaults.headers["Content-Type"] = "application/json ";

  axios.defaults.headers["Authorization"] = `Bearer ${getToken()}`;

  axios.defaults.headers.post["Content-Type"] = 
    "multipart/form-data";
    
  axios.defaults.baseURL = "https://backend.saiyonee.com/api";

  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  // const access_token = getToken();
  // axios.defaults.headers.Authorization = access_token
  //   ? `Bearer ${access_token}`
  //   : "";

  return <Routers />;
}

export default App;
