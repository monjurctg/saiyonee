import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import EducationTypes3 from "../register/EducationType3";
import LocationCity from "../register/LocationCity";
import LocationCountry from "../register/LocationCountry";
import MaritalStatus from "../register/MaritalStatus";
import Religions from "../register/Religions";

function EditProfileModule() {
  const {module} = useParams();
  const [active, setActive] = useState(<h1>404</h1>);
  console.log(module);

  useEffect(() => {
    if (module === "religion") {
      setActive(<Religions module="edit_religion" />);
      return;
    }
    if (module === "edu3") {
      setActive(<EducationTypes3 module="edu3" />);
      return;
    }
    if (module === "marital_status") {
      setActive(<MaritalStatus module="marital_status_edit" />);
      return;
    }
    if (module === "country") {
      setActive(<LocationCountry module="edit_profile_country" />);
      return;
    }
    if (module === "city") {
      setActive(<LocationCity module="eidt_profile_city" />);
      return;
    }

    // if (id) {
    //   setActive(<Questions id={id} />);
    //   return;
    // }
  }, [module]);

  return <>{active}</>;
}

export default EditProfileModule;
