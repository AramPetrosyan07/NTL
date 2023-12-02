import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function UISelect({ data, label, isDisabled = false,adminVersion=false}: any) {
  const [selected, setSelected] = useState(data[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium  text-gray-900 dark:text-white">
            {label}
          </Listbox.Label>
          <div className="relative mt-2 w-full">
            <Listbox.Button
              className={`${
                isDisabled ? "bg-[#EFEFEF4D]" : "bg-white dark:text-slate-400"
              } relative  cursor-default rounded-md ${adminVersion ? 'lg:py-[9px] py-[10px]' : 'py-[6px]'} pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-0 focus:outline-none focus:ring-2 focus:ring-[#1C90F3] dark:bg-[#1e3053] border-0  sm:text-sm sm:leading-6 w-full`}
              aria-disabled={isDisabled}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-[#1e3053]  py-4 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((el: any) => (
                  <Listbox.Option
                    key={el.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-[#1C90F3] text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9 dark:text-white",
                        el.name === 'ջնջել' && active ? 'bg-red-500' : ''
                      )
                    }
                    value={el}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center ">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate",
                              el.name === "ջնջել" && !active ? "text-red-500 " : "",
                              el.name==='ջնջել' && active ? 'text-white' :''
                            )}
                          >
                            {el.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-[#1C90F3]",
                              "absolute inset-y-0 right-0 flex items-center pr-4 "
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
