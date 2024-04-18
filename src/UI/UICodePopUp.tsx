import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface UICodePopUp {
  setIsOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenPopUp: boolean;
  register: any;
  type: string;
  title: string;
  text?: string;
  codeEvent: () => void;
}

export default function UICodePopUp({
  setIsOpenPopUp,
  isOpenPopUp,
  register,
  type,
  codeEvent,
  text,
  title,
}: UICodePopUp) {
  const { user } = useTypedSelector((state) => state.user);

  function closeModal() {
    setIsOpenPopUp(false);
  }
  return (
    <>
      <Transition appear show={isOpenPopUp} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{text}</p>
                  </div>
                  <div className="w-full py-2 flex justify-center items-center">
                    {type === "code" ? (
                      <input
                        className="w-[400px] text-[30px] text-center  outline-none text-gray-800 "
                        id="inputField"
                        placeholder="ծածկագիր"
                        // maxLength={6}
                        {...register(type)}
                      />
                    ) : (
                      <input
                        className="w-[400px] text-[20px] text-center  outline-none text-gray-800 "
                        id="inputField"
                        placeholder="Նոր էլ, հասցե"
                        // maxLength={6}
                        {...register(type)}
                      />
                    )}
                  </div>
                  <div className="mt-4 flex justify-center gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Չեղարկել
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                        codeEvent();
                      }}
                    >
                      Հաստատել
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
