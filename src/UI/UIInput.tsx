import React, { ChangeEventHandler } from "react";

type InputProps = {
  label?: string;
  text: string;
  type?: "text" | "number" | 'date';
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const UIInput: React.FC<InputProps> = ({
  label,
  text,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex w-full sm:w-[48%] lg:w-full flex-col justify-between  text-sm font-medium  text-gray-900 lg:gap-0 gap-2">
      <label className="lg:pb-2 pb-0 dark:text-white">{label}</label>
      <input
        type={type}
        id={text}
        value={value}
        onChange={onChange}
        placeholder={text}
        className="px-4 py-[7px] border-x-[1px] border-y-[1px] dark:bg-[#1e3053] dark:text-white  border-slate-300 dark:border-[#1e3053]  rounded-md focus:outline-none w-full text-black"
      />
    </div>
  );
};

export default UIInput;
