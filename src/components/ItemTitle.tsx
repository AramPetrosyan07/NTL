import React, { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { getLoadThunk, getTruckThunk } from "../store/asyncThunk";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ItemTitle = ({ boardType }: any) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

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
            {t("dashboard.or")}
          </div>
        </div>
        <div className=" flex justify-start items-center  w-[50px]">
          <div
            className=" flex justify-start items-center"
            title={"տրանսպորտային միջոցի տեսակը"}
          >
            {t("dashboard.tm")}
          </div>
        </div>
        <div className=" flex justify-start items-center  w-[40px]">
          <div
            className=" flex justify-start items-center"
            title={"ամբողջական/հավաքական"}
          >
            {t("dashboard.ah")}
          </div>
        </div>

        <div className=" flex justify-start items-center  w-[150px]">
          <div title={"բարձման վայր"}>{t("dashboard.pickup")}</div>
        </div>
        <div className=" flex justify-start items-center  w-[35px]">
          <div></div>
        </div>
        <div className="flex justify-start items-center  w-[150px]">
          <div title={"բերնաթափման վայր"}>
            {boardType === "load"
              ? t("dashboard.delivery")
              : "նախընտրելի ուղղ."}{" "}
          </div>
        </div>
        <div className="flex justify-start items-center  w-[70px]">
          <div title={"հեռավորություն"}>{t("dashboard.pickup")}</div>
        </div>
        <div className="flex justify-start items-center  w-[170px]">
          <div>
            {boardType === "load"
              ? t("dashboard.company")
              : t("dashboard.carrier")}{" "}
          </div>
        </div>
        <div className=" flex justify-start items-center  w-[170px]">
          <div>{t("dashboard.contact")}</div>
        </div>
        <div className=" flex justify-start items-center w-[50px]">
          <div>{t("dashboard.volume")}</div>
        </div>
        <div className=" flex justify-start items-center  w-[80px]">
          <div>{t("dashboard.weight")}</div>
        </div>
        <div className=" flex justify-start items-center  w-[70px]">
          <div>{t("dashboard.price")}</div>
        </div>
        {boardType === "load" && (
          <div className="flex justify-start items-center w-[30px]"></div>
        )}
      </div>
    </div>
  );
};

export default ItemTitle;
