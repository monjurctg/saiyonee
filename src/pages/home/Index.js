import React, {useEffect, useState} from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
// import logo from '../../../public/img/logo.svg'
import UserServices from "../../services/userServices";
import Swipers from "../../components/home/Swipers";
import PreferenceServices from "../../services/preferenceServices";
import {setPreviousPreference} from "../../redux/slices/preferenceSlice";
import {useDispatch} from "react-redux";

function Index() {
  const [data, setData] = useState(null);
  const [gettingUser, setgettingUser] = useState(false);
  const dispatch = useDispatch();
  let getData = async () => {
    setgettingUser(true);
    let res = await UserServices.filter_users();
    // console.log("res", res.data);
    if (res.status === 200) {
      setgettingUser(false);
      setData(res.data);
    }
    // let data = await res.json()
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log('data', data)
  // console.log('filtered_users', data?.filtered_users.length === 0 && !gettingUser )
  // console.log('data?.filtered_users.length > 0 && !gettingUser', data?.filtered_users.length > 0 && !gettingUser)

  let show = "";
  if (data?.filtered_users?.length > 0 && !gettingUser) {
    show = <Swipers getData={getData} data={data} />;
  } else if (gettingUser) {
    show = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100%",
          fontSize: 20,
          color: "black",
          fontWeight: 700,
        }}>
        Loading data
      </div>
    );
  } else if (data?.filtered_users?.length === 0 && !gettingUser) {
    show = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100%",
          fontSize: 20,
          color: "black",
          fontWeight: 700,
        }}>
        {/* <img src="img/loading.gif" alt="" /> */}
        No matched user found
      </div>
    );
  }
  // console.log("show", show);
  return (
    <HomeLayout background={"#F9FAFB"}>
      <div className="body-div">
        {/* <div className="menu">
          <img src="img/menu_top.svg" alt="" />
        </div> */}
        {show}
      </div>
      {/* <div className="body-div-lower01"></div>
      <div className="body-div-lower02"></div> */}
    </HomeLayout>
  );
}

export default Index;
