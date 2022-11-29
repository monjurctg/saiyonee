import React, { useState } from "react";
import QuestionLayout from "../../components/layouts/QuestionLayout";

function SelfieVerification() {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState(false);

  let onSubmit = async (e) => {
    e.preventDefault();
    // console.log("inputs");
  };

  return (
    <QuestionLayout
      err={err}
      onContinueClicked={onSubmit}
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

        </div>
        <p className="mt-3">
        We will not make this public. it’s kept PRIVATE
        </p>
        <p style={{color: "#1F2937"}}>
            I will do it later
        </p>
      </div>
    </QuestionLayout>
  );
}

export default SelfieVerification;
