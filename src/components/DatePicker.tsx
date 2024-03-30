import React, { forwardRef, useRef, useState } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  inputName: string;
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
}

const DatePickerUi: React.FC<Props> = ({ inputName, setValue, watch }) => {
  const datePickerRef = useRef<ReactDatePicker<never, undefined>>(null);

  const handleClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  let selectedOption = watch(inputName);

  function formatDate(date = new Date()) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  return (
    <div className="flex w-full sm:w-[48%] lg:w-full flex-col justify-between  text-sm font-medium leading-4 text-gray-900 md:gap-0 gap-2">
      <label className="dark:text-white">Բարձման օր</label>
      <div
        onClick={handleClick}
        className="px-4 py-[9.3px] bg-white dark:bg-[#1e3053] rounded-md border-slate-300 dark:border-[#1e3053] dark:text-slate-400 border-x-[1px] border-y-[1px]"
      >
        <DatePicker
          placeholderText={formatDate()}
          ref={datePickerRef}
          selected={selectedOption}
          onChange={(value: any) => setValue(inputName, value)}
          // customInput={<ExampleCustomInput />}
          className="example-custom-input w-[100px] focus:outline-none focus:border-none"
        />
      </div>
    </div>
  );
};

export default DatePickerUi;
