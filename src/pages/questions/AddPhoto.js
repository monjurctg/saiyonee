import React, { useState } from "react";
import QuestionLayout from "../../components/layouts/QuestionLayout";

function AddPhoto() {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState(false);

  let onSubmit = async (e) => {
    e.preventDefault();
    // console.log("inputs");
  };
  console.log("image", image);
  let imageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

  let fileChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      if (file.size > 1000000) {
        seterr("File size is too large");
      } else {
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
    >
      <div className="question mt-3">
        <p>
          Your profile will only be visible to other members, when you add a
          photo.
        </p>

        <div className="image-upload mt-4">
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{ display:image && "none", cursor: "pointer" }}
          />

          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            onClick={imageClick}

            style={{
              width: image && "100%",
              borderRadius: 24,
              height: image && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            onChange={fileChange}
          />
        </div>
        <div></div>

        <div className="instruction my-4">
          <h4>Instruction</h4>
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
