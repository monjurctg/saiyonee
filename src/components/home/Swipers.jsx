import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import nouser from "../../assets/imgs/nouser.png";
import { Pagination } from "swiper";
import UserServices from "../../services/userServices";
import toastMsg from "../../utils/toastify";
import { useNavigate } from "react-router-dom";

function Swipers({ data, getData }) {
  const navigate = useNavigate();
  const [boomData, setBoomData] = useState();
  let getBoomData = async () => {
    let res = await UserServices.matched_users();
    // console.log("resmatched_user", res.data.matched_users);
    if (res?.data?.matched_users?.length > 0) {
      // setBoomData(res.data.matched_users)
      setTimeout(() => {
        toastMsg.success("You have a match");
        navigate("/boom");
      }, 2000);
    }
  };

  const like = "like";
  const dislike = "dislike";
  let getActiveSlide = async (task) => {
    let id = document
      .getElementsByClassName("swiper-slide-active")[0]
      .getAttribute("data-id");
    if (task === like) {
      let res = await UserServices.like_user(id);
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        getBoomData();
        getData();
      }
    } else if (task === dislike) {
      console.log("like");
      let res = await UserServices.dislike_user(id);
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        getData();
      }
    }
  };
  let show = data?.filtered_users.map((item, index) => {
    return (
      <SwiperSlide data-id={item.id}>
        <img
          src={item?.profile_image_url || nouser}
          alt=""
          style={{
            // objectFit: "cover",
            width: "100%",
            height: item?.profile_image_url ? "100%" : "40%",
            borderRadius: 30,
            marginTop: !item?.profile_image_url && 168,
          }}
        />
      </SwiperSlide>
    );
  });
  return (
    <div>
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
  );
}

export default Swipers;
