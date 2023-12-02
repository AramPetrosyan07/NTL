import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { LuPhoneCall } from "react-icons/lu";
import { FaViber, FaWhatsapp } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CallOptions({ contact }: any) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full bg-inherit ">
          <p className="flex items-center gap-2">{contact} <span className="lg:hidden block"><MdKeyboardArrowDown size={20}/></span></p>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute lg:-right-6 -right-2 z-10 md:mt-[10px] mt-[14px] w-[150px] origin-top-center rounded-md bg-white dark:bg-[#1e3053]   shadow-lg  ring-0 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700  dark:text-white",
                    "flex px-4 py-2 text-sm items-center gap-2 focus:ring-0"
                  )}
                >
                  <span>
                    <LuPhoneCall color="purple" />
                  </span>{" "}
                  Direct
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 "
                      : "text-gray-700 dark:text-white",
                    "flex px-4 py-2 text-sm items-center gap-2"
                  )}
                >
                  <span>
                    <FaViber color="#59267c	" />
                  </span>{" "}
                  Viber
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 dark:text-white",
                    "flex px-4 py-2 text-sm items-center gap-2 "
                  )}
                >
                  <span>
                    <FaWhatsapp color="#25D366" />
                  </span>
                  Whatsapp
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
