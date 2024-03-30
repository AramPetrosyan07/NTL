import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Option {
  id: number;
  name: string;
}

interface UISelectProps {
  data: Option[];
  label: string;
  inputName: string;
  control: any;
  setValue: any;
  watch: any;
}

export default function UISelect({
  data,
  label,
  inputName,
  control,
  setValue,
  watch,
}: UISelectProps) {
  let selectedOption = watch(inputName) || null;

  return (
    <Listbox
      value={selectedOption}
      onChange={(value: Option) => setValue(inputName, value)}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </Listbox.Label>
          <div className="relative mt-2 w-full">
            <Listbox.Button className="bg-white relative cursor-default rounded-md py-[6px] pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-0 focus:outline-none focus:ring-2 focus:ring-[#1C90F3] dark:bg-[#1e3053] sm:text-sm sm:leading-6 w-full">
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {selectedOption
                    ? selectedOption.name
                    : inputName === "truckType"
                    ? "Տրանսպորտ"
                    : "Տեսակը"}
                </span>
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
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-[#1e3053] py-4 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item) => (
                  <Listbox.Option key={item.id} value={item}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active
                            ? "text-white bg-[#1C90F3]"
                            : "text-gray-900 dark:text-white"
                        } cursor-default select-none relative py-2 pl-3 pr-9`}
                      >
                        <span
                          className={`${
                            selected ? "font-semibold" : "font-normal"
                          } block truncate`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-white" : "text-[#1C90F3]"
                            } absolute inset-y-0 right-0 flex items-center pr-4`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
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
