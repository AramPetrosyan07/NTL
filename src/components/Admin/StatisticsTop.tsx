import React, { useMemo } from "react";
import { BsFillBoxFill } from "react-icons/bs";
import { GiRoad } from "react-icons/gi";
import { BsCheckAll } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { motion as m } from "framer-motion";
import DetectCurrentUserType from "../../utils/detectUserType";
import { IoLogoUsd } from "react-icons/io";
const StatisticsTop: React.FC = () => {
  const { user } = useTypedSelector((state) => state.user);
  const userType = DetectCurrentUserType();
  const { pathname } = useLocation();
  const { userLoads } = useTypedSelector((state) => state.load);
  const { userTrucks} = useTypedSelector((state) => state.truck);


  const onRoadLoads = () => {
    if(userType === 'customer'){
      return  userLoads.filter ((el:any) => el?.status === 'onRoad').length
    }else{
      return userTrucks.filter ((el:any) => el?.status === 'onRoad').length
    }
  }
  const deliveredLoads = () => {
    if(userType === 'customer'){
      return  userLoads.filter ((el:any) => el?.status === 'delivered').length
    }else{
      return userTrucks.filter ((el:any) => el?.status === 'delivered').length
    }
  
  }
  const paidLoads = () => {
    if(userType === 'customer'){
      return  userLoads.filter ((el:any) => el?.status === 'paid').length
    }else{
      return  userTrucks.filter ((el:any) => el?.status === 'paid').length
    }
 
  }

  const dynamicStatisticTitle = useMemo(() => {
    switch (pathname) {
      case "/admin":
        return {
          title: `Ողջույն ${user.firstName}`,
          description: "helooooooo",
        };

      case "/admin/additems":
        return {
          title: `Ավելացնել ${
            userType === "customer" ? "բեռներ" : "բեռնատարներ"
          }`,
        };

      case "/admin/changeitems":
        return {
          title: `Փոփոխել ${
            userType === "customer" ? "բեռները" : "բեռնատարները"
          }`,
          description: `Փոփոխել ${
            userType === "customer" ? "բեռները" : "բեռնատարները"
          }`,
        };

      case "/admin/settings":
        return {
          title: "See seetings",
          description: "helooooooo",
        };

      default:
        return {
          title: "Good morning ,Aram",
          description: "helooooooo",
        };
    }
  }, [pathname, user]);
  return (
    <div className="w-full h-[270px] md:h-[250px] bg-black text-white md:px-10 px-4 flex flex-col justify-around ">
      <div
        className="absolute inset-x-0 -top-40  transform-gpu overflow-hidden blur-3xl sm:-top-80 z-30"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/3 rotate-[30deg] bg-gradient-to-tr from-orange-300 via-green-300 to-[#1C90F3] opacity-20 sm:left-[calc(50%-20rem)] sm:w-[72.1875rem] anim"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div>
        <m.h4
          className="md:text-[28px] text-[20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.5,
            type: "spring",
            stiffness: 10,
          }}
        >
          {dynamicStatisticTitle.title}
        </m.h4>
       
      </div>
      <div className="statistics">
        <div className="flex flex-col md:flex-row justify-between md:justify-start md:items-center md:gap-10 gap-2">
          <div className="loads flex gap-2 justify-start items-center ">
            <div className="w-10 h-10 rounded-full text-orange-300 bg-gray-800 flex justify-center items-center text-xl">
              <BsFillBoxFill />
            </div>
            <div className=" md:block flex items-center gap-2">
              <h4 className="text-[25px]">{userType === 'customer' ? userLoads?.length : userTrucks?.length}</h4>
              <p className="text-[14px] text-gray-500">
                Ընդհանուր{" "}
                <span>
                  {userType === "customer" ? "բեռներ" : "բեռնատարներ"}
                </span>
              </p>
            </div>
          </div>
          <div className="loads flex gap-2  justify-start items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 text-green-400 flex justify-center items-center text-2xl">
              <GiRoad />
            </div>
            <div className=" md:block flex items-center gap-2">
              <h4 className="text-[25px]">{onRoadLoads()}</h4>
              <p className="text-[14px] text-gray-500">Ճանապարհին</p>
            </div>
          </div>
          <div className="loads flex gap-2 justify-start items-center">
            <div className="w-10 h-10 rounded-full text-[#1C90F3] bg-gray-800 flex justify-center items-center text-3xl">
              <BsCheckAll />
            </div>
            <div className=" md:block flex items-center gap-2">
              <h4 className="text-[25px]">{deliveredLoads()}</h4>
              <p className="text-[14px] text-gray-500">Դատարկված</p>
            </div>
          </div>

          <div className="loads flex gap-2 justify-start items-center">
            <div className="w-10 h-10 rounded-full text-green-600 bg-gray-800 flex justify-center items-center text-[22px]">
              <IoLogoUsd />
            </div>
            <div className=" md:block flex items-center gap-2">
              <h4 className="text-[25px]">{paidLoads()}</h4>
              <p className="text-[14px] text-gray-500">Վճարված</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatisticsTop;
