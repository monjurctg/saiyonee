import React, { useState } from 'react';
import InputLayOut from './InputLayOut';

import "./../../assets/css/editProfile.scss";

const EditProfile = () => {

    const [err, seterr] = useState(null);
    const [length, setlength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [image, setimage] = useState(false);

    let imageClick = (e) => {
        e.preventDefault();
        document.getElementById("image").click();
    };

    let onSubmit = async (e) => {
        e.preventDefault();
        // console.log("inputs");
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
        <InputLayOut
            err={err}
            onContinueClicked={onSubmit}
            length={length}
            title={"Edit Profile"}
            loading={loading}
        >
            <div className="question mt-3">

                <div className="image-upload mt-4">
                    <img
                        src="/img/plus-round.svg"
                        alt=""
                        onClick={imageClick}
                        style={{ display: image && "none", cursor: "pointer" }}
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
                    <h4>About</h4>

                    <p>
                        Dont be shy. Express yourself
                    </p>

                    <textarea
                        class="form-control"
                        id="description"
                        rows="10"
                        placeholder=" Write About Yourself"
                        style={{
                            borderRadius: "20px"
                        }}
                    />
                </div>
            </div>
        </InputLayOut>
    )
}

export default EditProfile
