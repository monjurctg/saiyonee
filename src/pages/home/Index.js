import React, { useEffect, useState } from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
// import logo from '../../../public/img/logo.svg'
import { Swiper, SwiperSlide } from "swiper/react";
import nouser from "../../assets/imgs/nouser.png";
import { Pagination } from "swiper";
import UserServices from "../../services/userServices";
import toastMsg from "../../utils/toastify";

function Index() {
  const like = "like";
  const dislike = "dislike";
  const [data, setData] = useState(null);
  let getData = async () => {
    let res = await UserServices.filter_users();
    console.log("res", res.data);
    // let data = await res.json()
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log('filtered_users', data?.filtered_users)

  let getActiveSlide = async (task) => {
    // console.log('e', e)
    let id = document
      .getElementsByClassName("swiper-slide-active")[0]
      .getAttribute("data-id");
    if (task === like) {
      console.log("like");
      let res = await UserServices.like_user(id);
      // console.log('res', res)
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        getData();
      }

      // console.log('id', id)
    } else if (task === dislike) {
      console.log("like");
      let res = await UserServices.dislike_user(id);
      // console.log('res', res)
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        getData();
      }

      // console.log('id', id)
    }
  };

  let show = "";
  if (data?.filtered_users) {
    show = data.filtered_users.map((item, index) => {
      return (
        <SwiperSlide data-id={item.id}>
          <img
            src={item?.profile_image_url || nouser}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: item?.filter_users ? "100%" : "40%",
              borderRadius: 30,
              marginTop: !item?.filter_users && 168,
            }}
          />
        </SwiperSlide>
      );
    });
  }
  console.log("show", show);
  return (
    <HomeLayout background={"#F9FAFB"}>
      <div className="body-div">
        <div className="menu">
          <img src="img/menu_top.svg" alt="" />
        </div>
        <div className="inside">
          <Swiper
            style={{ width: "100%", height: "100%" }}
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {show}
          </Swiper>
        </div>
        <div className="body-bottom">
          <div className="items">
            <div className="item" onClick={() => getActiveSlide(dislike)}>
              <img src="img/dislike.svg" alt="" />
            </div>
            <div className="item">
              <img src="img/task.svg" alt="" />
            </div>{" "}
            <div className="item">
              <img src="img/rocket.svg" alt="" />
            </div>{" "}
            <div className="item" onClick={() => getActiveSlide(like)}>
              <img src="img/like.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="body-div-lower01"></div>
      <div className="body-div-lower02"></div> */}
    </HomeLayout>
  );
}

export default Index;
