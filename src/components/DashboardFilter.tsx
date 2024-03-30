import React, { useState } from "react";
import DatePickerUi from "./DatePicker";
import UIInput from "../UI/UIInput";
import UISelect from "../UI/UISelect";
import { fullOrPartial, trucks } from "../constants/LoadItems";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { filterLoad, loadInitialPosition } from "../store/itemsSlice";

const DashboardFilter: React.FC<{ open: boolean }> = ({ open }) => {
  const loads = useTypedSelector((state) => state.load.load);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      truckType: null,
      loadType: null,
      date: "",
    },
  });
  const dispatch = useTypedDispatch();

  // const changeDateFormat = (date: string): string => {
  //   if (date === "") {
  //     return "";
  //   }
  //   let inputDate = new Date(date);
  //   inputDate.setMinutes(
  //     inputDate.getMinutes() - inputDate.getTimezoneOffset()
  //   );
  //   return inputDate.toISOString().split("T")[0];
  // };

  const onSubmit: SubmitHandler<any> = (data): void => {
    console.log(data);
    console.log(loads);

    // let filter = loads.filter((item: any, el: number) => {
    //   if (
    //     (data.date === "" || item.date === changeDateFormat(data.date)) &&
    //     (data.delivery === "" ||
    //       item.delivery.description
    //         .toLowerCase()
    //         ?.includes(data.delivery.toLowerCase())) &&
    //     (!data.truckType || item.truckType === data.truckType.name) && // Modified line
    //     (data.pickUp === "" ||
    //       item.pickup.description
    //         .toLowerCase()
    //         ?.includes(data.pickUp.toLowerCase())) &&
    //     (!data.loadType || item.loadType === data.loadType.name) && // Modified line
    //     (data.length === "" || item.length === data.length) &&
    //     (data.weight === "" || item.weight === +data.weight) &&
    //     (data.rate === "" || item.rate === +data.rate)
    //   ) {
    //     return item;
    //   }
    // });

    dispatch(filterLoad(data));
  };

  const cancelFilter = (): void => {
    dispatch(loadInitialPosition());
    reset();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className={`${
        open ? "flex" : "hidden"
      } px-4 lg:px-6 py-8 gap-4 justify-between flex-wrap lg:flex-nowrap`}
    >
      <DatePickerUi inputName="date" setValue={setValue} watch={watch} />
      <div className="trucktype w-full sm:w-[48%] lg:w-full flex flex-col justify-between">
        <UISelect
          data={trucks}
          label="Տ/Մ"
          inputName="truckType"
          control={control}
          setValue={setValue}
          watch={watch}
        />
      </div>
      <UIInput
        inputName="pickUp"
        label="Բարձում"
        text="օր. Մոսկվա"
        type="text"
        register={register}
      />
      <UIInput
        inputName="delivery"
        label="Բեռնաթափում"
        text="օր. Երևան"
        type="text"
        register={register}
      />
      <div className="trucktype w-full sm:w-[48%] lg:w-full flex flex-col justify-between">
        <UISelect
          data={fullOrPartial}
          label="Ա/Հ"
          inputName="loadType"
          control={control}
          setValue={setValue}
          watch={watch}
        />
      </div>
      <UIInput
        inputName="length"
        label="Ծավալ մ³"
        text="90"
        type="number"
        register={register}
      />
      <UIInput
        inputName="weight"
        label="Քաշ կգ"
        text="20000"
        type="number"
        register={register}
      />
      <UIInput
        inputName="rate"
        label="Գին"
        text="3400"
        type="number"
        register={register}
      />
      <div className="flex justify-center items-end">
        <button
          type="submit"
          className="px-10 lg:px-4 py-[8px] bg-[#1C90F3] dark:bg-[#1e3053] dark:hover:bg-[#293c66]   hover:bg-[#48a8fb] transition-all  rounded-md text-white text-sm"
        >
          Որոնել
        </button>
      </div>
      <div className="flex justify-center items-end">
        <div
          onClick={cancelFilter}
          className="px-4 lg:px-3 py-[8px] bg-gray-500 dark:bg-[#1e3053] dark:hover:bg-[#293c66]   hover:bg-gray-400 transition-all  rounded-md flex justify-center items-end text-sm cursor-pointer text-white"
        >
          X
        </div>
      </div>
    </form>
  );
};

export default DashboardFilter;
