/* eslint-disable */

import React, {useEffect, useState} from "react";
// import InputLayOut from "./InputLayOut";

import "./../../assets/css/editProfile.scss";
import {Link} from "react-router-dom";
import UserServices from "../../services/userServices";
import {useSelector} from "react-redux";
import InputLayOut from "../editProfile/InputLayOut";
import toastMsg from "../../utils/toastify";
import ImageUpload from "../../components/gellary/ImageUpload";
import Loader from "../../components/Loader";

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
    //console.log("id", id);
    e.preventDefault();
    document.getElementById(`image${id}`).click();
  };

  let fileChange = (e) => {
    e.preventDefault();
    setLoading(true)

    let file = e.target.files[0];
    if (file) {
      seterr(null);
      setlength(file.size);
      //console.log("hello");
      setimages({...images, [e.target.name]: file});
      setTimeout(() => {
        onSubmit(e.target.name, file);
      }, 1000);
    }
  };

  //   //console.log('images', images)

  async function fetchData() {
    const res = await UserServices.UserProfile();
    //console.log('res.data', res.data)
    if (res.status === 200) {
      setdata(res.data);
    }
    //console.log(res.data);
  }
  const onSubmit = async (name, file) => {
    // e.preventDefault();
    setLoading(true);
    //console.log(images, "imgs");
    let data = {
      [name]: file,
      // optional_img_1: images?.optional_img_1,
      // optional_img_2: images?.optional_img_2,
      // optional_img_3: images?.optional_img_3,
      // optional_img_4: images?.optional_img_4,
      // optional_img_5: images?.optional_img_5,
    };
    const res = await UserServices.app_user_gallery_edit(data);
    if (res.status === 200) {
      setLoading(false);
      toastMsg.success("Profile edit successfully");
      fetchData();
      // setimages({
      //   optional_img_1: "",
      //   optional_img_2: "",
      //   optional_img_3: "",
      //   optional_img_4: "",
      //   optional_img_5: "",
      // });
    } else {
      setLoading(false);
      toastMsg.error(res.data.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  if(loading){
return <InputLayOut>
<div style={{display:"flex",justifyContent:"center",alignSelf:"center"}}>
<Loader/>

</div>
    </InputLayOut>
  }





  return (
    <InputLayOut
      err={err}
      onContinueClicked={onSubmit}
      length={length}
      title={"Image Gallery"}
      loading={loading}
      from={"editGallery"}>
        
       
      <div
        className="question mt-3 d-flex flex-wrap"
        style={{
          gap: 20,
          margin: 20,
          justifyContent: "space-between",
        }}>
        <div
          className="image-upload"
          style={{
            width: "45%",
            height: 170,
            // margin: 20,
          }}>
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
            onClick={(e)=>imageClick(e,1)}
            style={{
              width: images?.optional_img_1 && "100%",
              borderRadius: 24,
              height: images?.optional_img_1 && "100%",
              objectFit: "contain",
            }}
          />

          <input
            type="file"
            id="image1"
            name="optional_img_1"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "45%",
            height: 170,
            margin: 0,
          }}>
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
                objectFit: "contain",
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
              objectFit: "contain",
            }}
          />

          <input
            type="file"
            id="image2"
            style={{display: "none"}}
            onChange={fileChange}
            name="optional_img_2"
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "45%",
            height: 170,
            margin: 0,
          }}>
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
                objectFit: "contain",
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
              objectFit: "contain",
            }}
          />

          <input
            type="file"
            id="image3"
            style={{display: "none"}}
            onChange={fileChange}
            name="optional_img_3"
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "45%",
            height: 170,
            margin: 0,
          }}>
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
                objectFit: "contain",
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
              objectFit: "contain",
            }}
          />

          <input
            type="file"
            id="image4"
            name="optional_img_4"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
        <div
          className="image-upload"
          style={{
            width: "45%",
            height: 170,
            margin: 0,
          }}>
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
                objectFit: "contain",
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
              objectFit: "contain",
            }}
          />

          <input
            type="file"
            id="image5"
            style={{display: "none"}}
            onChange={fileChange}
            name="optional_img_5"
          />
        </div>

        {/* <ImageUpload /> */}
      </div>
    </InputLayOut>
  );
};

export default GalleryImage;
