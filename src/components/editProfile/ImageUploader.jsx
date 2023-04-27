import React, {useState} from "react";

function ImageUploader({imageUrl, onImageChange, handleFileChange}) {
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  // const handleFileChange = (e) => {
  //   if (e.target.files[0]) {
  //     onImageChange(e.target.files[0]);
  //   }
  //   setFileInputKey(Date.now());
  // };

  return (
    <div className="image-upload mt-4">
      <img
        src="/img/plus-round.svg"
        alt=""
        onClick={handleImageClick}
        style={{
          display: (imageUrl || "") && "none",
          cursor: "pointer",
        }}
      />
      <img
        src={imageUrl || ""}
        alt=""
        onClick={handleImageClick}
        style={{
          width: "100%",
          borderRadius: 24,
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <input
        key={fileInputKey}
        type="file"
        id="imageInput"
        style={{display: "none"}}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageUploader;
