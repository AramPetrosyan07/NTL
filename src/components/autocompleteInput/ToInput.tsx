import React from "react";
import InputPlaces from "./InputPlaces";


const ToInput = ({cbSuccess,disabled,defaultLocation}:any) => {
  

  return <InputPlaces cbSuccess={cbSuccess} type={"to"} disabled={disabled} defaultLocation={defaultLocation}/>;
};

export default ToInput;
