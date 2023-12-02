import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsSortDownAlt } from "react-icons/bs";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SortLoads() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-inherit px-3 py-2 text-sm font-semibold text-gray-900 ">
          <div className="font-bold text-2xl dark:text-white ">
            <BsSortDownAlt />
          </div>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-[#1e3053]    shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700  dark:text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  թարմության
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 "
                      : "text-gray-700 dark:text-white",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  քաշի
                </a>
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
                    "block px-4 py-2 text-sm"
                  )}
                >
                  գնի
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
