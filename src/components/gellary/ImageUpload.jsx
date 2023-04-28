const ImageUpload = ({id, onChange, value, onClick}) => {
  return (
    <div
      className="image-upload"
      style={{
        width: "40%",
        height: 150,
        margin: 0,
      }}
      onClick={onClick}>
      {value ? (
        <img
          src={value}
          alt=""
          style={{
            width: value && "100%",
            borderRadius: 24,
            height: value && "100%",
            cursor: "pointer",
            objectFit: "contain",
          }}
        />
      ) : (
        <img
          src="/img/plus-round.svg"
          alt=""
          style={{
            cursor: "pointer",
          }}
        />
      )}

      <input
        type="file"
        id={id}
        style={{display: "none"}}
        onChange={onChange}
        name={id}
      />
    </div>
  );
};
export default ImageUpload;
