import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineTeam } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const navigation = [
  {
    id: 1,
    title: "Իմ էջը",
    to: "",
    icon: <CgProfile />,
    fullPath: "/admin/settings",
  },
  {
    id: 2,
    title: "Ծանուցումներ",
    to: "notifications",
    icon: <MdNotificationsNone />,
    fullPath: "/admin/settings/notifications",
  },
  {
    id: 3,
    title: "Աշխատակիցներ",
    to: "teams",
    icon: <AiOutlineTeam />,
    fullPath: "/admin/settings/teams",
  },
  {
    id: 4,
    title: "Անվտանգություն",
    to: "security",
    icon: <BsShieldLock />,
    fullPath: "/admin/settings/security",
  },
];
const AsideMenu = () => {
  const { pathname } = useLocation();
  const { user } = useTypedSelector((state) => state.user);

  return (
    <div className="md:w-[300px] w-[60px] py-6">
      <nav className="w-full h-full md:border-r-2 border-r-0">
        <ul className="flex flex-col">
          {navigation.map((el) => {
            if (
              (user.userType === "subCustomer" && el.id === 3) ||
              (user.userType === "subCustomer" && el.id === 2)
            )
              return null;
            return (
              <li
                className={`  ${
                  pathname == el.fullPath
                    ? " bg-blue-300 dark:bg-neutral-800"
                    : ""
                }`}
                key={el.id}
              >
                <Link
                  to={el.to}
                  className="flex items-center gap-4 h-[60px] pl-4 "
                >
                  <div className="text-[24px]">{el.icon}</div>
                  <p className="md:block hidden">{el.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AsideMenu;
