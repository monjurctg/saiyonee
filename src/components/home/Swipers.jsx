import React, {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import nouser from "../../assets/imgs/nouser.png";
import {Pagination} from "swiper";
import UserServices from "../../services/userServices";
import toastMsg from "../../utils/toastify";
import {useNavigate} from "react-router-dom";
import Explore from "../../pages/home/Explore";
import ExploreServices from "../../services/exploreServices";

function Swipers({data, getData}) {
  const navigate = useNavigate();
  const [boomData, setBoomData] = useState();
  const [likeSlide, setLikeSlide] = useState("");
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
  const addShort_list = "add_short_list";
  const supper_like_submit = "supper_like_submit";

  let getActiveSlide = async (task) => {
    let id = document
      .getElementsByClassName("swiper-slide-active")[0]
      .getAttribute("data-id");

    if (task === like) {
      let res = await UserServices.like_user(id);
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        getBoomData();
        setLikeSlide(" animation-container-right");
        setTimeout(() => {
          getData();
        }, 2000);
      }
    } else if (task === dislike) {
      console.log("like");
      let res = await UserServices.dislike_user(id);
      if (res.status === 200) {
        toastMsg.success(res.data.message);
        setLikeSlide(" animation-container-left");
        setTimeout(() => {
          getData();
        }, 2000);
      }
    } else if (task === addShort_list) {
      addShortlist(id);
    } else if (task === supper_like_submit) {
      let data = new FormData();

      data.append("superliked_app_user_id", id);
      let res = await ExploreServices.addSupperLike(data);
      if (res.status === 200) {
        toastMsg.success(res.data.message);

        getData();
      } else {
        console.log(res, "res");
      }
    }
  };

  const addShortlist = async (id) => {
    let data = new FormData();

    data.append("shortlist_app_user_id", id);
    console.log(id, "id");

    const res = await ExploreServices.submitShortList(data);
    if (res.status === 200) {
      toastMsg.success(res.data.message);
      getData();
    } else {
      console.log(res);

      toastMsg.error(res.response.data.message);
    }
  };
  let show = data?.filtered_users.map((item, index) => {
    return (
      <div className={``}>
        <SwiperSlide data-id={item.id}>
          <img
            src={item?.profile_image_url || nouser}
            alt=""
            style={{
              // objectFit: "cover",
              width: "80%",
              height: "50%",
              borderRadius: 10,
              marginTop: 25,
              marginLeft: "10%",
            }}
            />
            <div style={{boxShadow:"rgb(255 183 172) 2px 5px 20px -17px"}}>
              <h3 style={{textAlign: "center", marginTop: 10,
                fontSize: 20,
                fontFamily: "sans-serif",marginBottom:0,
                fontWeight:700
            }}>
                 {item?.display_name}
              </h3>
              <p style={{textAlign: "center", marginTop: 10,marginBottom:0}}>
                {item?.age} years
              </p>  
              <div className="d-flex justify-content-center" style={{gap:5}}>

              <p style={{textAlign: "center", marginTop: 10}}>
                {item?.current_city},
              </p>
              <p style={{textAlign: "center", marginTop: 10}}>
              {item?.current_country}
              </p>

              </div>


            
            </div>
        </SwiperSlide>
      </div>
    );
  });
  return (
    <div>
      <div className={`inside ${likeSlide}`}>
        <Swiper
          style={{width: "100%", height: "100%"}}
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          // modules={[Pagination]}
          className="mySwiper">
          {show}
        </Swiper>
      </div>
      <div className="body-bottom">
        <div className="items">
          <div className="item" onClick={() => getActiveSlide(dislike)}>
            <img src="img/dislike.svg" alt="" />
          </div>
          <div className="item" onClick={() => getActiveSlide(addShort_list)}>
            <img src="img/task.svg" alt="" />
          </div>{" "}
          <div
            className="item"
            onClick={() => getActiveSlide(supper_like_submit)}>
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
