import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
// import logo from '../../../public/img/logo.svg'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

function Index() {
  return (
    <HomeLayout background={"#F9FAFB"}>
      <div className="body-div">
        <div className="menu">
          <img src="img/menu_top.svg" alt="" />
        </div>
        <div className="inside">
          
          <Swiper
          style={{width: '100%', height: '100%'}}
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
        <img src="img/sharmila.svg" alt="" style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: 30
        }}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src="img/sharmila.svg" alt="" style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: 30
        }}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src="img/sharmila.svg" alt="" style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: 30
        }}/>
        </SwiperSlide>
      
      </Swiper>
        </div>
        <div className="body-bottom">
            <div className="items"> 

            <div className="item">
                <img src="img/dislike.svg" alt=""/>
            </div>
            <div className="item">
                <img src="img/task.svg" alt=""/>
            </div> <div className="item">
                <img src="img/rocket.svg" alt=""/>
            </div> <div className="item">
                <img src="img/like.svg" alt=""/>
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
