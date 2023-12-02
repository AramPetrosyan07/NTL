import React, { useState, useRef } from "react";
import { schema } from "../utils/formScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "../interfaces/FormProps";
import emailjs from "emailjs-com";
import Toast from "../UI/UIToast";


interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
}

const ModalContact: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    if (isValid) {
      await emailjs
        .sendForm(
          "service_pfutrzf",
          "template_xcihneq",
          ref.current,
          "7juDdm_vDM8bVfl97"
        )
        .then(() => {
          setIsVisible(true);
          reset();
          setTimeout(() => {
            setIsVisible(false);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("some error occured during sending email");
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0  flex justify-center items-center bg-slate-200 dark:bg-[#0E192D] z-50 ">
          <div
            id="staticModal"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)] max-h-full  z-50 flex justify-center items-center"
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-3xl shadow-xl dark:bg-[#142441]">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center w-full">
                    Հետադարձ կապ
                  </h3>
                </div>
                <form
                  className="p-6 space-y-6"
                  ref={ref}
                  encType="multipart/form-data"
                  method="post"
                >
                  <div className="mb-4">
                    <label className="blockpl-[4px]  mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Անուն/Ազգանուն
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="px-4 py-[9px] mt-2 border-x-[1px] border-y-[1px]  border-slate-300 rounded-xl focus:outline-none w-full text-black"
                      placeholder="Ձեր անուն,ազգանունը"
                      required
                      autoComplete="false"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-600   pl-0 md:pl-2 text-[12px] tracking-wide">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="pl-[4px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Էլ. հասցե
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="px-4 py-[9px] border-x-[1px] border-y-[1px]  border-slate-300 rounded-xl focus:outline-none  w-full text-black"
                      placeholder="Ձեր  Էլ. հասցեն"
                      required
                      autoComplete="false"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-600  pl-0 md:pl-2 text-[12px] tracking-wide">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="pl-[4px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Հաղորդագրությունը
                    </label>
                    <textarea
                      className="px-4 py-[9px] min-h-[140px] resize-none border-x-[1px] border-y-[1px]  border-slate-300 rounded-xl focus:outline-none  w-full text-black"
                      placeholder="Ձեր հաղորդագրությունը"
                      required
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-red-600  pl-0 md:pl-2 text-[12px] tracking-wide">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </form>
                <div className="flex relative items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="flex justify-center items-center text-white w-[120px] bg-[#1C90F3] hover:bg-[#1c8ff3ea]  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  transition-all"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Ուղարկել
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      reset();
                    }}
                    type="button"
                    className="text-gray-500 bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white hover:bg-gray-500 transition-all duration-200 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Չեղարկել
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast
        type="success"
        message="Ձեր հաղորդագրությունը հաջողությամբ ուղարկվել է"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

export default ModalContact;
