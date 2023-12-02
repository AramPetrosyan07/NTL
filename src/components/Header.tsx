import React, { useState } from "react";
import Logo from "../assets/mainlogo.svg";
import LogoWhite from "../assets/mainlogowhite.svg";
import Avatar from "./Avatar";
import LoginBtn from "./LoginBtn";
import ModeSwitcher from "./ModeSwitcher";
import Search from "./Search";
import { useTypedSelector } from "../hooks/useTypedSelector";

export default function Header({ isDarkMode }: any) {
  const { user } = useTypedSelector((state) => state.user);
  const [changedMode, setIsChangedMode] = useState<boolean>(false);

  return (
    <header className="bg-gray-300 dark:bg-[#0E192D] h-16 md:px-4 px-2 flex relative">
      <div className="logo1 md:w-1/2 w-1/4 flex justify-start items-center overflow-hidden -ml-1 relative">
        <img
          src={changedMode ? LogoWhite : Logo}
          alt="logo"
          className="w-[90px] logo"
        />
        <span className="absolute text-[8px] font-bold top-2 left-20 dark:text-white">DEMO</span>
      </div>
      <div className="title md:w-full w-0 flex justify-center items-center">
        <p className="text-xl font-bold text-gray-600 md:block hidden dark:text-white">
          NTL LOAD BOARD
        </p>
      </div>
      <div className="snack md:w-1/2 w-full  flex justify-end items-center md:gap-4 gap-[12px]">
        <Search />
        <ModeSwitcher setIsChangedMode={setIsChangedMode} />
        <div>
          <ul className="flex  gap-2 dark:text-white font-bold text-sm">
            <li className="active cursor-pointer">Հայ</li>
            <li className="cursor-pointer ">Рус</li>
          </ul>
        </div>
        {user?.firstName?.length ? (
          <Avatar showDropDown={true} />
        ) : (
          <LoginBtn />
        )}
      </div>
    </header>
  );
}
