import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Religions from "../register/Religions";
import OcupationTypes from "../register/OcupationTypes";
import MaritalStatus from "../register/MaritalStatus";
import LocationCountry from "../register/LocationCountry";
import LocationCity from "../register/LocationCity";

function PreferenceModule() {
  const {module} = useParams();
  const [activeModule, setActiveModule] = useState(<h1>404</h1>);

  useEffect(() => {
    if (module === "religion") {
      setActiveModule(<Religions module="preference" />);
      return;
    }
    if (module === "employ") {
      setActiveModule(<OcupationTypes module="employ" />);
      return;
    }
    if (module === "marital_status") {
      setActiveModule(<MaritalStatus module="marital_status" />);
      return;
    }
    if (module === "country") {
      setActiveModule(<LocationCountry module="country" />);
      return;
    }
    if (module === "city") {
      setActiveModule(<LocationCity module="city" />);
      return;
    }
  }, [module]);

  return <div>{activeModule}</div>;
}

export default PreferenceModule;
