import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ISimpleInput {
  value: string;
  register: UseFormRegister<FieldValues>;
  type: string;
}

const UiSimpleInput = ({ value, register, type }: ISimpleInput) => {
  return (
    <div>
      <input
        className="w-[190px] px-1 py-[2px] border-2 border-slate-300 rounded-md bg-transparent "
        defaultValue={value}
        type="text"
        {...register(type)}
      />
    </div>
  );
};

export default UiSimpleInput;
