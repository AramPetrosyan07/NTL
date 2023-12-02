import { CutString, checkLengthOfValue } from "../utils/Check";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { HiArrowRight } from "react-icons/hi";
import CallOptions from "./CallOptions";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { GiPathDistance } from "react-icons/gi";
import DetectCurrentUserType from "../utils/detectUserType";

function calculateFormattedPostAge(postTimestamp: number): string {
  const now = Date.now();
  const timeDifference = now - postTimestamp;

  const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
const AccordionItemDesktop = ({
  _id,
  age,
  date,
  truckType,
  loadType,
  pickup,
  delivery,
  distance,
  customerInfo,
  contactInfo,
  subContactInfo,
  length,
  weight,
  rate,
  commodity,
  comment,
  boardType,
  updatedAt,
}: any) => {
  const mydate = new Date(updatedAt).getTime();
  const [formattedAge, setFormattedAge] = useState("");
  const [clicked, setClicked] = useState(false);
  const userType = DetectCurrentUserType();
  const handleClick = () => {
    setClicked(true);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const age = calculateFormattedPostAge(mydate);
      setFormattedAge(age);
    }, 60000);

    const initialAge = calculateFormattedPostAge(mydate);
    setFormattedAge(initialAge);

    return () => {
      clearInterval(interval);
    };
  }, [mydate]);

  const renderContactInformation = (main: any, sub: any):any => {

    if( sub?.phoneNumber || main?.phoneNumber){
      return  <CallOptions contact={sub ? sub?.phoneNumber : main?.phoneNumber} />
    }else{
      return ( <a href={`mailto:${sub ? sub?.email : main?.email}`}>
      {sub ? sub?.email : main?.email}
    </a>)
    }
  };


  return (
    <>
      <Accordion className="lg:block hidden" as="div">
        <AccordionItem>
          <AccordionHeader className="AccordionHeader" as="div">
            <div
              className="max-w-[2000px] lg:flex hidden "
              onClick={handleClick}
            >
              <div
                className={`w-full  h-[35px] bg-slate-200 dark:bg-slate-700 dark:text-slate-200  text-[12px] ${
                  clicked ? "font-normal" : "font-semibold"
                } flex justify-around gap-[1px]`}
              >
                <div className="flex justify-start items-center  w-[50px]">
                  <div className="flex justify-start items-center">
                    {formattedAge}
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[50px]">
                  <div className="w-full flex justify-start items-center ">
                    {date.slice(5)}
                  </div>
                </div>
                <div className="flex justify-start items-center  w-[50px]">
                  <div className="w-full flex justify-start items-center">
                    {truckType}
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[40px]">
                  <div
                    title={loadType}
                    className="w-full flex justify-start items-center"
                  >
                    {loadType[0]}
                  </div>
                </div>

                <div className="flex justify-start items-center  w-[150px]">
                  <div
                    title={pickup?.description}
                    className="w-full flex justify-start items-center"
                  >
                    {CutString(pickup?.description)}
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[35px]">
                  <div>
                    <HiArrowRight />
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[150px]">
                  <div
                    title={delivery?.description}
                    className="w-full flex justify-start items-center"
                  >
                    {CutString(delivery?.description)}
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[70px]">
                  <div className="w-full flex justify-start items-center">
                    <p className="flex justify-start items-center w-full">
                      {" "}
                      {distance}2300կմ
                    </p>
                  </div>
                </div>
                <div className=" flex justify-start items-center w-[170px] text-[#1C90F3]">
                  <div
                    title={customerInfo?.companyName}
                    className="w-full flex justify-start items-center"
                  >
                    {CutString(contactInfo?.companyName)}
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[170px] overflow-hidden">
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {
                      renderContactInformation(contactInfo,subContactInfo)
                    }
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[50px]">
                  <div className="w-full flex justify-start items-center">
                    {checkLengthOfValue(length, "մ³")}{" "}
                  </div>
                </div>
                <div className=" flex justify-start items-center  w-[80px]">
                  <div className="w-full flex justify-start items-center">
                    {checkLengthOfValue(weight, "կգ")}{" "}
                  </div>
                </div>
                <div className="flex justify-start items-center  w-[70px]">
                  <div className="w-full flex justify-start items-center text-[#1C90F3]">
                    {checkLengthOfValue(rate, "$")}
                  </div>
                </div>
                {boardType === "load" && (
                  <div
                    className="flex justify-center items-center  w-[30px]"
                    title="Դիտել քարտեզի վրա"
                  >
                    <Link
                      to={`/dashboard/preview/${_id}`}
                      target="_blank"
                      type="button"
                      className="flex justify-center items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span className="font-extrabold text-slate-600 hover:text-[#1C90F3] transition-all duration-200">
                        <GiPathDistance fontSize={20} />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </AccordionHeader>
          <AccordionBody className="AccordionBody w-full bg-gray-300  dark:text-white dark:bg-[#132b46]">
            <div className="w-full h-28 flex flex-col gap-2 justify-center px-4">
              {boardType === "load" && (
                <div className="text-[12px] flex items-center gap-2">
                  <h4 className="font-bold">Բեռը `</h4> <p>{commodity}</p>
                </div>
              )}

              <div className="text-[12px] flex items-center gap-2">
                <h4 className="font-bold">Նշում `</h4> <p>{comment}</p>
              </div>

              {boardType === "load" && (
                <div className="text-[12px] flex items-center gap-2">
                  <h4 className="font-bold">Վճարում `</h4> <p>{"7 աշխ. օր"}</p>
                </div>
              )}
            </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AccordionItemDesktop;
