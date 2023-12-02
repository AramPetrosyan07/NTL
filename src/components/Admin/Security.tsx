import React, { useRef, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordFormProps } from "../../interfaces/FormProps";
import { changePasswordScheme } from "../../utils/formScheme";
const Security = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => setShowPassword(!showPassword);

  const ref = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordScheme),
  });

  const onSubmit = async (data: any) => {
    
      console.log(data);
      // let user = await dispatch(registerThunk(data));
      // if (user?.payload?.email) {
      //   navigate("/");
      // }
   
  };
  return (
    <div
      className="w-full pt-8 pl-4 pr-4 flex flex-col justify-center items-center"
      ref={ref}
    >
      <h4 className="pb-8">Փոփոխել գաղտնաբառը</h4>
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="box  md:w-1/2 w-full">
          <input
            id="email"
            type="email"
            autoComplete="current-email"
            placeholder="Էլ.հասցե"
            required
            className=" bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6  border-[1px] border-gray-400"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="box relative md:w-1/2 w-full">
          <input
            id="currentpassword"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Ընթացիկ գաղտնաբառ"
            required
            className=" bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6  border-[1px] border-gray-400"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-red-600 inline-block  pt-1 pl-2  text-[12px] tracking-wide">
              {errors.currentPassword.message}
            </p>
          )}
          <div
            className="absolute top-[0.9rem] right-6 text-2xl cursor-pointer text-slate-500"
            onClick={handleShow}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </div>
        </div>

        <div className="box relative md:w-1/2 w-full">
          <input
            id="newpassword"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Նոր գաղտնաբառ"
            required
            className=" bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6  border-[1px] border-gray-400"
            {...register("newPassword")}
          />

          {errors.newPassword && (
            <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
              {errors.newPassword.message}
            </p>
          )}
          <div
            className="absolute top-[0.9rem] right-6 text-2xl cursor-pointer text-slate-500"
            onClick={handleShow}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </div>
        </div>

        <div className="box relative md:w-1/2 w-full">
          <input
            id="repetpassword"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Կրկնել գաղտնաբառը"
            required
            className=" bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] border-gray-400"
            {...register("repetPassword")}
          />
          {errors.repetPassword && (
            <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
              {errors.repetPassword.message}
            </p>
          )}
          <div
            className="absolute top-[0.9rem] right-6 text-2xl cursor-pointer text-slate-500"
            onClick={handleShow}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </div>
        </div>
      </div>
      <div className=" md:w-1/2 w-full  pt-8  py-3 flex sm:flex-row-reverse flex-col justify-between  gap-8">
        <button
          type="button"
          className=" md:w-1/2 w-full rounded-2xl inline-flex justify-center items-center   py-[14px] text-white   bg-[#1c90f3] hover:bg-[#1c8ff3cd] sm:text-sm sm:leading-6 border-none transition-all"
          onClick={handleSubmit(onSubmit)}
        >
          Պահպանել
        </button>
        <button
          type="button"
          className=" md:w-1/2 w-full rounded-2xl inline-flex justify-center items-center   py-[14px] text-gray-900 bg-inherit   hover:bg-gray-400 hover:text-white sm:text-sm sm:leading-6 border-[1px] border-gray-400 transition-all"
        >
          Չեղարկել
        </button>
      </div>
    </div>
  );
};

export default Security;
