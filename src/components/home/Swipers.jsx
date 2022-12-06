import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import nouser from "../../assets/imgs/nouser.png";
import { Pagination } from "swiper";
import UserServices from '../../services/userServices';
import toastMsg from '../../utils/toastify';

function Swipers({data,getData}) {
    console.log('data', data)
    const like = "like";
    const dislike = "dislike";
    let getActiveSlide = async (task) => {
        // console.log('e', e)
        let id = document
          .getElementsByClassName("swiper-slide-active")[0]
          .getAttribute("data-id");
        if (task === like) {
          // console.log("like");
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
    let show = data?.filtered_users.map((item, index) => {
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
  )
}

export default Swipers