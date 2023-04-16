import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import QuestionLayout from "../../components/layouts/QuestionLayout";
import QuestionServices from "../../services/questionServices";
import toastMsg from "../../utils/toastify";

function AddPhoto() {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sloading, setSLoading] = useState(false);

  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const [image2, setimage2] = useState(null);

  // console.log("image2", image, image2);

  const getImage = async () => {
    let res = await QuestionServices.getProfileImage();
    // console.log("res", res.data.images);
    if (res.status === 200) {
      setimage2(res.data.images.profile_img);
      setLoading(false);
      if (
        res.data.images.profile_img
        // && !isEdit
      ) {
        localStorage.setItem("profile_image", res.data.images.profile_img);
        // navigate("/question/selfie-verification");
      }
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  let onSubmit = async (e) => {
    // setSLoading(true)
    e.preventDefault();
    localStorage.setItem("edit_img", false);

    if (image2 && !image) navigate("/question/selfie-verification");
    else {
      setSLoading(true);

      let data = new FormData();
      data.append("profile_img", image);
      let res = await QuestionServices.submitProfilePhoto(data);
      // console.log("ressdddddd", res);
      if (res.status === 200) {
        setSLoading(false);

        localStorage.setItem("profile_image", true);
        toastMsg.success("Profile photo added successfully");
        seterr(false);
        navigate("/question/selfie-verification");
      } else {
        setSLoading(false);

        seterr(res.data.message);
      }
    }
  };
  let imageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

  let fileChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    // console.log('file', file)
    if (file) {
      if (file.size > 10000000) {
        seterr("File size is too large");
      } else {
        // console.log('file', file)
        setimage2(null);
        seterr(null);
        setlength(file.size);
        setimage(file);
      }
    }
  };
  return (
    <QuestionLayout
      err={err}
      onContinueClicked={onSubmit}
      length={length}
      title={"Add Profile Photo"}
      loading={loading}
      sloading={sloading}>
      <div className="question mt-3">
        <p className="text-start">
          Your profile will only be visible to other members, when you add a
          photo.
        </p>

        {loading ? (
          <div className="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            className="image-upload mt-4"
            style={{
              width: "70%",
              height: "40vh",
              margin: 0,
            }}>
            <img
              src="/img/plus-round.svg"
              alt=""
              onClick={imageClick}
              style={{
                display: (image || image2) && "none",
                cursor: "pointer",
              }}
            />

            <img
              src={image2 ? image2 : image ? URL.createObjectURL(image) : null}
              alt=""
              onClick={imageClick}
              style={{
                width: (image || image2) && "100%",
                borderRadius: 24,
                height: (image || image2) && "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            <input
              type="file"
              id="image"
              style={{display: "none"}}
              onChange={fileChange}
            />
          </div>
        )}

        <div className="instruction">
          <h4
            style={{
              marginTop: 20,
            }}>
            Instruction
          </h4>
          <p>- Upload a clear photo.</p>
          <p>- It is better to avoid group photo.</p>
          <p>
            - Please upload your photo only. Avoid adding photos of
            dolls,celebrities, pets etc,
          </p>
        </div>
      </div>
    </QuestionLayout>
  );
}

export default AddPhoto;
