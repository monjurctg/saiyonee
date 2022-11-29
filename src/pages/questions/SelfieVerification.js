import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionLayout from "../../components/layouts/QuestionLayout";
import QuestionServices from "../../services/questionServices";

function SelfieVerification() {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState(null);
  const [image2, setimage2] = useState(null);
  const navigate = useNavigate();
  console.log('image', image)


  const getImage = async () => {
    let res =  await QuestionServices.getSelfieImage();
    console.log("res", res.data.images);
    if (res.status === 200) {
      setimage2(res.data.images);
    }

  }

  let submitImage = async (value) => {

    let data = new FormData();
    data.append("selfie_img", value);
    let res = await QuestionServices.submitSelfiePhoto(data);
    console.log("res", res);
    if (res.status === 200) {
      seterr(false);
      navigate("/home");
    } else {
      seterr(res.data.message);
    }
  };


  useEffect(() => {
    getImage();
  }, [])
  let fileChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    // console.log('file', file)
    if (file) {
      if (file.size > 1000000) {
        seterr("File size is too large");
      } else {
        // console.log('file', file)
        seterr(null);
        setlength(file.size);
        setimage(file);
        submitImage(file)
      }
    }
  };
  let imageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };
  return (
    <QuestionLayout
    imageClick={imageClick}
      err={err}
      // onContinueClicked={onSubmit}
      length={length}
      title={"Selfie Verification"}
      loading={loading}
    >
      <div className="question mt-3">
        <p>
          Hold the phone at eye level and make sure that your whole face is
          visible. Tap the camera when you’re ready.
        </p>
        <div className="image-round mt-5">
        <img
                src={image2?.selfie_img ? image2?.selfie_img : image ?  URL.createObjectURL(image): null}
            alt=""
            // onClick={imageClick}

            style={{
              width: (image || image2) && "100%",
              borderRadius: "50%",
              height: (image || image2) && "100%",
            }}
            />
        <input
            type="file"
            id="image"
            style={{ display: "none" }}
            onChange={fileChange}
          />
        </div>
        <p className="mt-3">
        We will not make this public. it’s kept PRIVATE
        </p>
        {image2?.selfie_img &&
        <Link to={"/review/profile"}>
        <p style={{color: "#1F2937"}}>
            I will do it later
        </p>
        </Link>
        
        }
      
      </div>
    </QuestionLayout>
  );
}

export default SelfieVerification;
