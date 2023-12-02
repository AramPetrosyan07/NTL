import React from "react";
import InputPlaces from "./InputPlaces";




const FromInput = ({cbSuccess,disabled,defaultLocation}:any) => {
 console.log(disabled);
 
  return (
    <InputPlaces cbSuccess={cbSuccess} type={"from"} disabled={disabled} defaultLocation={defaultLocation}/>
  );
};

export default FromInput;
