import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { BsTruck, BsBox } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import ModalContact from "./ContactMe";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsFilter } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

const Search = () => {
  const [open, setOpen] = useState<Boolean | null>(false);
  const [openContact, setOpenContact] = useState(false);
  const [showDropDown, setShowDropDown] = useState<Boolean | null>(true);
  const ref = useRef<any>();
  const { pathname } = useLocation();
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
      <div className="relative dark:text-white font-light lg:w-[120px] w-[60px] lg:text-[14px] text-[12px] px-1 lg:h-[40px] h-[30px] cursor-pointer border-slate-400  border-[0.7px] rounded-[20px] flex justify-around items-center hover:shadow hover:border-[0.3px]">
        <p className="hidden lg:block">Փնտրել</p>
        <span className="flex lg:hidden">
          <BsFilter size={"20"} />
        </span>
        <span
          className={`text-[20px] hidden lg:block ${open ? "rotate-180" : ""}`}
        >
          <IoMdArrowDropdown />
        </span>
      </div>
      {open && (
        <div
          className={`${
            showDropDown ? "block" : "hidden"
          } absolute z-50 top-[55px]  lg:right-[170px] right-[120px]  bg-white  divide-gray-100 rounded-lg  w-[160px] dark:bg-[#1e3053]  dark:divide-gray-600`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200 "
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                to="/"
                className="flex items-center font-light  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="w-[22px] h-[30px] flex justify-center items-center text-[#1C90F3] text-[18px]">
                  {pathname === "/" && <AiOutlineCheck />}
                </div>{" "}
                Բեռներ
              </Link>
            </li>
            <li>
              <Link
                to="/trucks"
                className="flex items-center font-light px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="w-[22px] h-[30px] flex justify-center items-center text-[#1C90F3] text-[18px]">
                  {pathname === "/trucks" && <AiOutlineCheck />}
                </div>{" "}
                Բեռնատարներ
              </Link>
            </li>
          </ul>
        </div>
      )}
      <ModalContact isOpen={openContact} onClose={handleCloseContact} />
    </div>
  );
};

export default Search;
