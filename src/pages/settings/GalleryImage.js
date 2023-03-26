/* eslint-disable */

import React, { useEffect, useState } from "react";
// import InputLayOut from "./InputLayOut";

import "./../../assets/css/editProfile.scss";
import { Link } from "react-router-dom";
import UserServices from "../../services/userServices";
import { useSelector } from "react-redux";
import InputLayOut from "../editProfile/InputLayOut";
import toastMsg from "../../utils/toastify";

const GalleryImage = () => {
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

  let imageClick = (e, id) => {
    console.log("id", id);
    e.preventDefault();
    document.getElementById(`image${id}`).click();
  };

  let fileChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      seterr(null);
      setlength(file.size);
      setimages({ ...images, [e.target.name]: file });
    }
  };

  //   console.log('images', images)

  async function fetchData() {
    const res = await UserServices.UserProfile();
    // console.log('res.data', res.data)
    if (res.status === 200) {
      setdata(res.data);
      // setimages({
      //     optional_img_1: res.data.optional_img_1,
      //     optional_img_2: res.data.optional_img_2,
      //     optional_img_3: res.data.optional_img_3,
      //     optional_img_4: res.data.optional_img_4,
      //     optional_img_5: res.data.optional_img_5,
      // })
    }
    // console.log(res.data);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {
      optional_img_1: images?.optional_img_1,
      optional_img_2: images?.optional_img_2,
      optional_img_3: images?.optional_img_3,
      optional_img_4: images?.optional_img_4,
      optional_img_5: images?.optional_img_5,
    };
    const res = await UserServices.edit_user_info(data);
    if (res.status === 200) {
      toastMsg.success("Profile edit successfully");
      fetchData();
    } else {
      toastMsg.error(res.data.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <InputLayOut
      err={err}
      onContinueClicked={onSubmit}
      length={length}
      title={"Image Gallery"}
      loading={loading}
    >
      <div
        className="question mt-3 d-flex flex-wrap"
        style={{
          gap: 20,
        }}
      >
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}
        >
          {data?.optional_img_1 ? (
            <img
              src={data?.optional_img_1}
              alt=""
              onClick={(e) => imageClick(e, 1)}
              style={{
                width: data?.optional_img_1 && "100%",
                borderRadius: 24,
                height: data?.optional_img_1 && "100%",
                display: images?.optional_img_1 && "none",
                cursor: "pointer",
                objectFit: "contain",
              }}
            />
          ) : (
            <img
              src="/img/plus-round.svg"
              alt=""
              onClick={(e) => imageClick(e, 1)}
              style={{
                display: images?.optional_img_1 && "none",
                cursor: "pointer",
              }}
            />
          )}

          <img
            src={
              images?.optional_img_1 &&
              URL.createObjectURL(images?.optional_img_1)
            }
            alt=""
            onClick={imageClick}
            style={{
              width: images?.optional_img_1 && "100%",
              borderRadius: 24,
              height: images?.optional_img_1 && "100%",
            }}
          />

          <input
            type="file"
            id="image1"
            name="optional_img_1"
            style={{ display: "none" }}
            onChange={fileChange}
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}
        >
          {data?.optional_img_2 ? (
            <img
              src={data?.optional_img_2}
              alt=""
              onClick={(e) => imageClick(e, 2)}
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
              src="/img/plus-round.svg"
              alt=""
              onClick={(e) => imageClick(e, 2)}
              style={{
                display: images?.optional_img_2 && "none",
                cursor: "pointer",
              }}
            />
          )}

          <img
            src={
              images?.optional_img_2 &&
              URL.createObjectURL(images?.optional_img_2)
            }
            alt=""
            onClick={(e) => imageClick(e, 2)}
            style={{
              width: images?.optional_img_2 && "100%",
              borderRadius: 24,
              height: images?.optional_img_2 && "100%",
            }}
          />

          <input
            type="file"
            id="image2"
            style={{ display: "none" }}
            onChange={fileChange}
            name="optional_img_2"
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}
        >
          {data?.optional_img_3 ? (
            <img
              src={data?.optional_img_3}
              alt=""
              onClick={(e) => imageClick(e, 3)}
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
              src="/img/plus-round.svg"
              alt=""
              onClick={(e) => imageClick(e, 3)}
              style={{
                display: images?.optional_img_3 && "none",
                cursor: "pointer",
              }}
            />
          )}

          <img
            src={
              images?.optional_img_3 &&
              URL.createObjectURL(images?.optional_img_3)
            }
            alt=""
            onClick={(e) => imageClick(e, 3)}
            style={{
              width: images?.optional_img_3 && "100%",
              borderRadius: 24,
              height: images?.optional_img_3 && "100%",
            }}
          />

          <input
            type="file"
            id="image3"
            style={{ display: "none" }}
            onChange={fileChange}
            name="optional_img_3"
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}
        >
          {data?.optional_img_4 ? (
            <img
              src={data?.optional_img_4}
              alt=""
              onClick={(e) => imageClick(e, 4)}
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
              src="/img/plus-round.svg"
              alt=""
              onClick={(e) => imageClick(e, 4)}
              style={{
                display: images?.optional_img_4 && "none",
                cursor: "pointer",
              }}
            />
          )}

          <img
            src={
              images?.optional_img_4 &&
              URL.createObjectURL(images?.optional_img_4)
            }
            alt=""
            onClick={(e) => imageClick(e, 4)}
            style={{
              width: images?.optional_img_4 && "100%",
              borderRadius: 24,
              height: images?.optional_img_4 && "100%",
            }}
          />

          <input
            type="file"
            id="image4"
            name="optional_img_4"
            style={{ display: "none" }}
            onChange={fileChange}
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "40%",
            height: 150,
            margin: 0,
          }}
        >
          {data?.optional_img_5 ? (
            <img
              src={data?.optional_img_5}
              alt=""
              onClick={(e) => imageClick(e, 5)}
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
              src="/img/plus-round.svg"
              alt=""
              onClick={(e) => imageClick(e, 5)}
              style={{
                display: images?.optional_img_5 && "none",
                cursor: "pointer",
              }}
            />
          )}

          <img
            src={
              images?.optional_img_5 &&
              URL.createObjectURL(images?.optional_img_5)
            }
            alt=""
            onClick={(e) => imageClick(e, 5)}
            style={{
              width: images?.optional_img_5 && "100%",
              borderRadius: 24,
              height: images?.optional_img_5 && "100%",
            }}
          />

          <input
            type="file"
            id="image5"
            style={{ display: "none" }}
            onChange={fileChange}
            name="optional_img_5"
          />
        </div>
      </div>
    </InputLayOut>
  );
};

export default GalleryImage;
