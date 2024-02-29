import InputPlaces from "./InputPlaces";

const FromInput = ({ cbSuccess, disabled, defaultLocation }: any) => {
  return (
    <InputPlaces
      cbSuccess={cbSuccess}
      type={"from"}
      disabled={disabled}
      defaultLocation={defaultLocation}
    />
  );
};

export default FromInput;
