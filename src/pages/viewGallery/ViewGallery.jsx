/* eslint-disable */

import React, {useEffect, useState} from "react";

import "./../../assets/css/editProfile.scss";
import UserServices from "../../services/userServices";
import InputLayOut from "../editProfile/InputLayOut";

const ViewGallery = () => {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [images, setimages] = useState({
    optional_img_1: "",
    optional_img_2: "",
    optional_img_3: "",
    optional_img_4: "",
    optional_img_5: "",
  });

  const [data, setdata] = useState();

  async function fetchData() {
    const data = new FormData();

    data.append(`app_user_id`, 1831);

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

  return (
    <InputLayOut
      err={err}
      length={length}
      title={"Image Gallery"}
      loading={loading}
      from={"gellary"}>
      <div
        className="question mt-3 d-flex flex-wrap"
        style={{
          gap: 20,
        }}>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}>
          {data?.profile_img ? (
            <img
              src={data?.profile_img}
              alt=""
              style={{
                height: "140px",
                width: "140px",
                objectFit: "fill",
              }}
            />
          ) : (
            <img
              src="/img/no_image_available.svg"
              alt=""
              style={{
                height: "100px",
              }}
            />
          )}
        </div>

        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}>
          {data?.optional_img_1 ? (
            <img
              src={data?.optional_img_1}
              alt=""
              style={{
                width: data?.optional_img_1 && "100%",
                borderRadius: 24,
                height: data?.optional_img_1 && "100%",
                display: images?.optional_img_1 && "none",
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              src="/img/no_image_available.svg"
              alt=""
              style={{
                height: "100px",
              }}
            />
          )}
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}>
          {data?.optional_img_2 ? (
            <img
              src={data?.optional_img_2}
              alt=""
              style={{
                width: data?.optional_img_2 && "100%",
                borderRadius: 24,
                height: data?.optional_img_2 && "100%",
                display: images?.optional_img_2 && "none",
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              src="/img/no_image_available.svg"
              alt=""
              style={{
                height: "100px",
              }}
            />
          )}
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}>
          {data?.optional_img_3 ? (
            <img
              src={data?.optional_img_3}
              alt=""
              style={{
                width: data?.optional_img_3 && "100%",
                borderRadius: 24,
                height: data?.optional_img_3 && "100%",
                display: images?.optional_img_3 && "none",
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              src="/img/no_image_available.svg"
              alt=""
              style={{
                height: "100px",
              }}
            />
          )}
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}>
          {data?.optional_img_4 ? (
            <img
              src={data?.optional_img_4}
              alt=""
              style={{
                width: data?.optional_img_4 && "100%",
                borderRadius: 24,
                height: data?.optional_img_4 && "100%",
                display: images?.optional_img_4 && "none",
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              src="/img/no_image_available.svg"
              alt=""
              style={{
                height: "100px",
              }}
            />
          )}
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}>
          {data?.optional_img_5 ? (
            <img
              src={data?.optional_img_5}
              alt=""
              style={{
                width: data?.optional_img_5 && "100%",
                borderRadius: 24,
                height: data?.optional_img_5 && "100%",
                display: images?.optional_img_5 && "none",
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              src="/img/no_image_available.svg"
              alt=""
              style={{
                height: "100px",
              }}
            />
          )}
        </div>
      </div>
    </InputLayOut>
  );
};

export default ViewGallery;
