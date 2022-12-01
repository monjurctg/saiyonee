import React, {useState} from "react";
import QuestionLayout from "../../components/layouts/QuestionLayout";
import RegisterLayout from "../../components/layouts/RegisterLayout";

function Preference() {
  const [err, seterr] = useState(false);
  return (
    <>
      <RegisterLayout></RegisterLayout>
    </>
  );
}

export default Preference;
