import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Religions from "../register/Religions";

function PreferenceModule() {
  const {module} = useParams();
  const [activeModule, setActiveModule] = useState(<h1>404</h1>);

  useEffect(() => {
    if (module === "religion") {
      setActiveModule(<Religions module="preference" />);
    }
  }, [module]);

  return <div>{activeModule}</div>;
}

export default PreferenceModule;
