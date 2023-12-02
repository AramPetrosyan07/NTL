import React, { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { getLoadThunk, getTruckThunk } from "../store/asyncThunk";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";

const LoadItemTitle = ({ boardType }: any) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();
  const handleUpdateData = () => {
    setIsUpdated(true);
    if (pathname === "/") {
      dispatch(getLoadThunk());
    } else {
      dispatch(getTruckThunk());
    }
    setTimeout(() => {
      setIsUpdated(false);
    }, 2000);
  };
  return (
    <div className="lg:block hidden">
      <div className="w-full h-[28px] bg-gray-300 dark:bg-[#27374D] dark:text-white text-[10px]  flex justify-around gap-[1px] font-semibold text-slate-700 mb-[2px]">
        <div className=" flex justify-start items-center pl-[12px] w-[50px] text-[14px] font-bold">
          <div title={"վերջին թարմացումը"} className="cursor-pointer">
            <span onClick={handleUpdateData}>
              <RxUpdate className={` ${isUpdated ? "animate-rotate" : ""}`} />
            </span>
          </div>
        </div>
        <div className=" flex justify-start items-center  w-[50px]">
          <div className="flex justify-start items-center" title={"բարձման օր"}>
            օր
          </div>
        </div>
        <div className=" flex justify-start items-center  w-[50px]">
          <div
            className=" flex justify-start items-center"
            title={"տրանսպորտային միջոցի տեսակը"}
          >
            տ/մ
          </div>
        </div>
        <div className=" flex justify-start items-center  w-[40px]">
          <div
            className=" flex justify-start items-center"
            title={"ամբողջական/հավաքական"}
          >
            ա/հ
          </div>
        </div>

        <div className=" flex justify-start items-center  w-[150px]">
          <div title={"բարձման վայր"}>բարձում</div>
        </div>
        <div className=" flex justify-start items-center  w-[35px]">
          <div></div>
        </div>
        <div className="flex justify-start items-center  w-[150px]">
          <div title={"բերնաթափման վայր"}>
            {boardType === "load" ? "բեռնաթափում" : "նախընտրելի ուղղ."}{" "}
          </div>
        </div>
        <div className="flex justify-start items-center  w-[70px]">
          <div title={"հեռավորություն"}>հեռավ.</div>
        </div>
        <div className="flex justify-start items-center  w-[170px]">
          <div>{boardType === "load" ? "պատվիրատու" : "փոխադրող"} </div>
        </div>
        <div className=" flex justify-start items-center  w-[170px]">
          <div>կոնտակտ</div>
        </div>
        <div className=" flex justify-start items-center w-[50px]">
          <div>ծավալ</div>
        </div>
        <div className=" flex justify-start items-center  w-[80px]">
          <div>քաշ</div>
        </div>
        <div className=" flex justify-start items-center  w-[70px]">
          <div>գին</div>
        </div>
        {boardType === "load" && (
          <div className="flex justify-start items-center w-[30px]"></div>
        )}
      </div>
    </div>
  );
};

export default LoadItemTitle;
