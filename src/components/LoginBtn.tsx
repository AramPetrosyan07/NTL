import React, { useEffect, useMemo, useRef, useState } from "react";
import {  RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalContact from "./ContactMe";
const LoginBtn = () => {
  const [open, setOpen] = useState<Boolean | null>(false);
  const [openContact, setOpenContact] = useState(false);
  const [showDropDown, setShowDropDown] = useState<Boolean | null>(true);
  const ref = useRef<any>();

  const handleOpenContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);
  return (
    <div ref={ref} onClick={handleOpen}>
      <div className="w-[80px] h-[40px] cursor-pointer border-slate-400 border-[0.7px] rounded-[20px] flex justify-around items-center hover:shadow hover:border-[0.3px]">
        <span className="text-[17px] dark:text-white">
          <RxHamburgerMenu />
        </span>
        <span className="text-[30px] text-slate-600 dark:text-slate-300">
          <FaUserCircle />
        </span>
      </div>
      {open && (
        <div
          className={`${
            showDropDown ? "block" : "hidden"
          } absolute z-50 top-[58px] right-[20px]  bg-white divide-y divide-gray-100 rounded-lg  w-[160px] dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200 "
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Մուտք
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Գրանցվել
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <div className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={handleOpenContact}
            >
              Հետադարձ կապ
            </div>
           
          </div>
        </div>
      )}
       <ModalContact isOpen={openContact} onClose={handleCloseContact} />
    </div>
  );
};

export default LoginBtn;
