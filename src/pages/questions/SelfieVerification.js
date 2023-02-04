import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionLayout from "../../components/layouts/QuestionLayout";
import QuestionServices from "../../services/questionServices";
import toastMsg from "../../utils/toastify";

function SelfieVerification() {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState(null);
  const [image2, setimage2] = useState(null);
  const navigate = useNavigate();
  // console.log('image', image);

  //Sazid's edition extra
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const width = windowSize.current[0];


  const getImage = async () => {
    let res = await QuestionServices.getSelfieImage();

    if (res.status === 200) {
      if (res.data.images.selfie_img) {
        console.log("hello world selfie");
        localStorage.setItem("selfie_image", "true");
      } else {
        localStorage.setItem("selfie_image", "false");
      }
      setimage2(res.data.images.selfie_img);
      // if (res.data.images.selfie_img && !selfieEdit) {
      //   navigate("/preference");
      // }
    }
  };

  let submitImage = async (value) => {
    let data = new FormData();
    data.append("selfie_img", value);
    let res = await QuestionServices.submitSelfiePhoto(data);
    console.log("ressadasdasda", res);
    if (res.status === 200) {
      seterr(false);
      toastMsg.success("Image uploaded successfully");
      getImage();
      setTimeout(() => {
        navigate("/preference");
      }, 2000);
    } else {
      toastMsg.error(res.data.message);

      seterr(res.data.message);
    }
  };

  useEffect(() => {
    getImage();
  }, []);
  let fileChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    // console.log('file', file)
    if (file) {
      if (file.size > 100000000) {
        seterr("File size is too large");
      } else {
        // console.log('file', file)
        seterr(null);
        setlength(file.size);
        setimage(file);
        submitImage(file);
      }
    }
  };
  let imageClick = (e) => {
    // console.log("e", e);
    // e.preventDefault();
    // console.log(' document.getElementById("image")',  document.getElementById("image").click())
    document.getElementById("image").click();
  };
  return (
    <QuestionLayout
      imageClick={imageClick}
      err={err}
      // onContinueClicked={onSubmit}
      skipBtn={true}
      length={length}
      title={"Candidate's Selfie (optional)"}
      loading={loading}>
      <div className="question mt-3">
        <p
          style={{
            fontSize: "12px",
            textAlign: "start",
          }}>
          If you are the bride/groom, please tap the camera and take a selfie If
          you are not the candidate, please ask the candidate to login
          separately to this account and give her/his selfie
        </p>
        <div className="image-round mt-3" onClick={imageClick}>
          <img
            src={image2 ? image2 : image ? URL.createObjectURL(image) : null}
            alt=""
            // onClick={imageClick}

            style={{
              width: (image || image2) && "100%",
              borderRadius: "50%",
              height: (image || image2) && "100%",
            }}
          />
          {/* <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
            
          /> */}

          {
            width < 1024 &&
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              onChange={fileChange}
              accept="image/*"
              capture="camera"
            />
          }
        </div>
        <div className="mt-2">
          <h5
            style={{
              fontSize: "16px",
              textAlign: "start",
            }}>
            Selfie Guideline
          </h5>

          <p
            style={{
              fontSize: "12px",
              textAlign: "start",
              margin: 0,
            }}>
            1. Hold the phone at eye level
          </p>
          <p
            style={{
              fontSize: "12px",
              textAlign: "start",
            }}>
            2. Make sure that your whole face is visible
          </p>
        </div>

        {
          width > 1023 &&
          <span style={{
            color: "red",
            fontWeight: "bold",
          }}>Please login through a mobile phone to verify your selfie. </span>
        }

        <p className="mt-3" style={{
          color: "red",
          fontSize: 15,
          textAlign: "initial",
          fontWeight: 600
        }}>We will not make this public. it’s kept PRIVATE</p>
        {image2?.selfie_img && (
          <Link to={"/review/profile"}>
            <p style={{ color: "#1F2937" }}>I will do it later</p>
          </Link>
        )}
      </div>
    </QuestionLayout>
  );
}

export default SelfieVerification;
