import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import Logo from "../../assets/mainlogowhite.svg";
import { MdNotificationsNone } from "react-icons/md";
import AdminAside from "./AdminAside";
import { notificationsData } from "../../data/notificationData";
import { NavItemsProps, customerNavItems } from "../../constants/NavItems";
import { carrierNavItems } from "../../constants/NavItems";
import { motion as m } from "framer-motion";
import DetectCurrentUserType from "../../utils/detectUserType";
import UILoader from "../../UI/UILoader";

const staggerChildren = 0.5;
const baseDuration = 0.3;

const calculateDuration = (index: number) => {

  return baseDuration + index * 0.5; 
};
const AdminHeader = () => {
  const [loading, setLoading] = useState(false);
  const [activeUserNav, setActiveUserNav] = useState<NavItemsProps[]>([]);
  const { pathname } = useLocation();
  const userType = DetectCurrentUserType();

  const handleNav = () => {
    if (userType === "customer") {
      setActiveUserNav(customerNavItems);
      setLoading(false);
    } else if (userType === "carrier") {
      setActiveUserNav(carrierNavItems);
      setLoading(false);
    } else if (userType === "loading") {
      setLoading(true);
    }
  };

  const getNotificationCount = () => {
    return notificationsData.filter((el: any) => el.isOpened === false).length;
  };

  const handlePath = (path: string, to: string) => {
    if (path.length === 2) {
      return path.split("/").at(1) === to.split("/").at(1);
    } else if (path.length >= 3) {
      return path.split("/").at(2) === to.split("/").at(2);
    }
  };
  useEffect(() => {
    handleNav();
  }, [userType]);

  return (
    <header className="w-full h-16 bg-black  text-white mx-auto md:px-10 px-4 border-b-[0.3px] border-b-slate-500">
      <div className="z-50 relative w-full h-full flex justify-between items-center">
        <m.div
          className=" h-ful flex justify-center items-center font-bold text-xl gap-4 overflow-hidden"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            staggerChildren,
            type: "spring",
          }}
        >
          <img src={Logo} alt="logo" className="w-[90px] logo -mt-[6px]" />
        </m.div>
        <nav className="lg:block hidden">
          <ul
            className={`flex w-full h-16 justify-center  items-center text-[13px]  tracking-wide ${
              userType ? "gap-10" : "gap-[20px] xl:gap-10"
            }`}
          >
            {loading ? (
              <UILoader />
            ) : (
              <>
                {activeUserNav.map((el, i) => (
                  <m.li
                    key={el.title}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      duration: calculateDuration(i),
                      staggerChildren,
                      type: "spring",
                    }}
                  >
                    <Link
                      to={el.to}
                      className={`${
                        handlePath(pathname, el.to) ? "text-[#1C90F3]" : ""
                      }`}
                    >
                      {el.title}
                    </Link>
                  </m.li>
                ))}
              </>
            )}
          </ul>
        </nav>

        <div className="flex items-center  gap-4">
          <div className=" font-bold text-sm">
            <ul className="flex  gap-2">
              <li className="active cursor-pointer">Հայ</li>
              <li className="cursor-pointer">Рус</li>
            </ul>
          </div>
          <div className=" flex justify-center items-center gap-8 lg:gap-6">
            <Link
              to="settings/notifications"
              className="notifications relative text-2xl cursor-pointer"
            >
              {getNotificationCount() > 0 && (
                <div className="count absolute w-[15px] h-[15px] rounded-full bg-red-500 -top-[7px] -right-[6px] text-[12px] flex justify-center items-center">
                  {getNotificationCount()}
                </div>
              )}

              <MdNotificationsNone />
            </Link>
            <div className="w-10 h-full lg:flex justify-center items-center hidden  relative z-50">
              <Avatar showDropDown={true} />
            </div>

            <div className="w-10 h-full flex justify-center items-center fill-white lg:hidden  relative z-50">
              <AdminAside />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
