import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addTeamMemberSchema } from "../utils/formScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiHide, BiShow } from "react-icons/bi";
import { registerSubUserThunk } from "../store/asyncThunk";
import { useTypedDispatch } from "../hooks/useTypedSelector";

export default function UIModal({ open, setOpen }: any) {
  const cancelButtonRef = useRef(null);
  const ref = useRef<any>(null);
  const dispatch  = useTypedDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const handleShow = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addTeamMemberSchema),
  });

  const onSubmit = async (data: any) => {
    if(isValid && (data.password === data.repetPassword)){
      let user = await dispatch(registerSubUserThunk(data));
      if (user?.payload?.email) {
       console.log(user)
      }
    }else{
      console.log('all fields are required')
    }
    
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[60]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-full">
          <div className="flex min-h-full items-center  justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:w-2/3 w-[90%] md:py-10 py-4"
                ref={ref}
              >
                <h4 className="w-full text-center md:text-[18px] text-[16px] font-semibold">
                  Ավելացնել թիմի նոր անդամ
                </h4>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-wrap justify-between items-center gap-y-4">
                  <div className="w-full md:w-[48%] h-12 overflow-hidden">
                    <input
                      type="text"
                      id="name"
                      placeholder="անուն"
                      className="w-full h-full rounded-xl border-[1px] border-gray-400 pl-4"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-600  pl-2 pt-1 text-[12px] tracking-wide">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-[48%] h-12 overflow-hidden">
                    <input
                      type="text"
                      id="lastName"
                      placeholder="ազգանուն"
                      className="w-full h-full  border-[1px] border-gray-400 rounded-xl pl-4"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-red-600  pl-2 pt-1 text-[12px] tracking-wide">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-[48%] h-12 overflow-hidden">
                    <input
                      type="text"
                      id="email"
                      placeholder="էլ.հասցե"
                      className="w-full h-full rounded-xl border-[1px] border-gray-400 pl-4"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-600  pl-2 pt-1 text-[12px] tracking-wide">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-[48%] h-12 overflow-hidden">
                    <input
                      type="text"
                      id="phoneNumber"
                      placeholder="հեռախոսահամար"
                      className="w-full h-full border-[1px] border-gray-400 rounded-xl pl-4"
                      {...register("phoneNumber")}
                    />
                  </div>
                  <div className="w-full md:w-[48%] h-12 overflow-hidden relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="գաղտնաբառ"
                      className="w-full h-full rounded-xl border-[1px] border-gray-400 pl-4"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-600  pl-2 pt-1 text-[12px] tracking-wide">
                        {errors.password.message}
                      </p>
                    )}
                    <div
                      className="absolute top-[0.8rem] right-6 text-2xl cursor-pointer text-slate-500"
                      onClick={handleShow}
                    >
                      {showPassword ? <BiShow /> : <BiHide />}
                    </div>
                  </div>
                  <div className="w-full md:w-[48%] h-12 overflow-hidden relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="repetPassword"
                      placeholder="կրկնել գաղտնաբառը"
                      className="w-full h-full rounded-xl border-[1px] border-gray-400 pl-4"
                      {...register("repetPassword")}
                    />
                    {errors.repetPassword && (
                      <p className="text-red-600  pl-2 pt-1 text-[12px] tracking-wide">
                        {errors.repetPassword.message}
                      </p>
                    )}
                    <div
                      className="absolute top-[0.8rem] right-6 text-2xl cursor-pointer text-slate-500"
                      onClick={handleShow}
                    >
                      {showPassword ? <BiShow /> : <BiHide />}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#1c90f3] hover:bg-[#1c8ff3cd]  px-3 py-2 text-sm  text-white shadow-sm  sm:ml-3 sm:w-auto transition-all duration-200"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Ավելացնել
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-gray-400 hover:text-white px-3 py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400  sm:mt-0 sm:w-auto transition-all duration-200"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Չեղարկել
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
