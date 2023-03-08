/* eslint-disable */

import React, {useEffect, useState} from "react";

import "./../../assets/css/editProfile.scss";
import UserServices from "../../services/userServices";
import InputLayOut from "../editProfile/InputLayOut";
import {useParams} from "react-router-dom";

const ViewGallery = () => {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [modalImg, setModalIMg] = useState();
  const [images, setimages] = useState({
    optional_img_1: "",
    optional_img_2: "",
    optional_img_3: "",
    optional_img_4: "",
    optional_img_5: "",
  });

  const [data, setdata] = useState();
  const {id} = useParams();

  async function fetchData() {
    const data = new FormData();

    data.append(`app_user_id`, id);

    const res = await UserServices.view_gallery(data);
    console.log("res.data", res.data.app_user_gallery_images);
    if (res.status === 200) {
      setdata(res.data.app_user_gallery_images);
    }
    // console.log(res.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const Images = ({src}) => {
    return (
      <div
        className="image-upload"
        style={{
          width: "45%",
          height: 170,
          margin: 0,
        }}>
        <img
          onClick={() => {
            setModalIMg(src);
            setImgModal(true);
          }}
          src={src}
          alt=""
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "24px",
            cursor: "pointer",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    );
  };

  return (
    <InputLayOut
      err={err}
      length={length}
      title={"Image Gallery"}
      loading={loading}
      from={"gellary"}>
      <div
        className="question  mt-3 d-flex flex-wrap"
        style={{
          gap: 20,
        }}>
        <div
          className={` img-modal  ${
            imgModal ? "img-modal-active" : "img-modal-deactive"
          }`}>
          <p
            className="cross"
            onClick={() => {
              setImgModal(false);
              setModalIMg("");
            }}>
            X
          </p>
          <img src={modalImg} />
        </div>
        {data?.profile_img && <Images src={data?.profile_img} />}
        {data?.optional_img_1 && <Images src={data?.optional_img_1} />}
        {data?.optional_img_2 && <Images src={data?.optional_img_2} />}
        {data?.optional_img_3 && <Images src={data?.optional_img_3} />}
        {data?.optional_img_4 && <Images src={data?.optional_img_4} />}
        {data?.optional_img_5 && <Images src={data?.optional_img_5} />}
        {!data?.profile_img &&
          !data?.optional_img_1 &&
          !data?.optional_img_2 &&
          !data?.optional_img_3 &&
          !data?.optional_img_4 &&
          !data?.optional_img_5 && (
            <h5 className="text-dark text-center">No Image</h5>
          )}
      </div>
    </InputLayOut>
  );
};

export default ViewGallery;
