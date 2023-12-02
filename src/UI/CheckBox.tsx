import React, { useState } from "react";

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[20px] w-[40px] items-center rounded-full duration-200 ${
            isChecked ? "bg-slate-200" : "bg-slate-300"
          }`}
        >
          <span
            className={`dot h-[20px] w-[20px] rounded-full duration-200 ${
              isChecked ? "translate-x-6 bg-blue-400 " : "bg-white"
            }`}
          ></span>
        </span>
        {/* <span className="label flex items-center text-sm font-medium text-black">
          Auto Saver <span className="pl-1"> {isChecked ? "On" : "Off"} </span>
        </span> */}
      </label>
    </>
  );
};

export default CheckBox;
