import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DatePickerUi: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className="flex w-full sm:w-[48%] lg:w-full flex-col justify-between  text-sm font-medium leading-4 text-gray-900 md:gap-0 gap-2">
      <label className="dark:text-white">Բարձման օր</label>
      <div className="px-4 py-[9.3px] bg-white dark:bg-[#1e3053] rounded-md border-slate-300 dark:border-[#1e3053] dark:text-slate-400 border-x-[1px] border-y-[1px]">
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          customInput={<ExampleCustomInput />}
        />
      </div>
    </div>
  );
};

export default DatePickerUi;
