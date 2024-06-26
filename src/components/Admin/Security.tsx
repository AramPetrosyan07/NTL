import React, { useRef, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordScheme } from "../../utils/formScheme";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { changePassword, registerThunk } from "../../store/asyncThunk";
import { useNavigate } from "react-router-dom";
import Toast from "../../UI/UIToast";
import { saveToken } from "../../utils/helpers";
const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);
  const handleShow = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [toastVisible, setToastVisible] = useState("");
  const errorMessages = [
    "Անհամապատասխան գաղտնաբառ",
    "Գաղնտաբառը պետք է պարունակի մինիմում 8 տառ,առնվազն 1 թիվ և առնվազն 1 նշան(!@#$%^&*.)",
    "Ձեր տվյալները սխալ են",
    "Սխալ գաղտնաբառ",
    "Տեղի է ունեցել սխալ գործողության ընդացքում, խնդրում ենք փորձել մի փոքր ուշ",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordScheme),
    defaultValues: {
      // email: "",
      // currentPassword: "",
      newPassword: "",
      repetPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    let res = await dispatch(
      changePassword({ ...data, userType: user.userType, email: user.email })
    );

    console.log(res.payload);
    if (errorMessages.includes(res?.payload as string)) {
      console.log("-----------ok--------------");
      ShotToast(res?.payload as string);
    } else {
      ShotToast("Գաղտնաբառը հաջողությամբ փոխվել է");
      saveToken(res?.payload);
      // setIsOpenPopUp(true);
      console.log("changed");
    }
  };

  const ShotToast = (message: string) => {
    setToastVisible(message);
    reset();
    setTimeout(() => {
      setToastVisible("");
    }, 5000);
  };

  return (
    <>
      <Toast
        type={
          toastVisible === "Գաղտնաբառը հաջողությամբ փոխվել է"
            ? "success"
            : "error"
        }
        message={toastVisible}
        isVisible={!!toastVisible}
      />
      <div
        className="w-full pt-8 pl-4 pr-4 flex flex-col justify-center items-center"
        ref={ref}
      >
        <h4 className="pb-8 text-[24px]">Փոփոխել գաղտնաբառը</h4>
        <div className="w-full flex flex-col gap-10 items-center">
          {/* <div className="box  md:w-1/2 w-full">
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
          </div> */}

          <div className="box relative md:w-1/2 w-full">
            <p>Ընթացիկ գաղտնաբառ</p>
            <input
              id="currentpassword"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              // placeholder="Ընթացիկ գաղտնաբառ"
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
              className="absolute top-[2.4rem] right-6 text-2xl cursor-pointer text-slate-500"
              onClick={handleShow}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </div>
          </div>

          <div className="box relative md:w-1/2 w-full">
            <p>Նոր գաղտնաբառ</p>
            <input
              id="newpassword"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              // placeholder="Նոր գաղտնաբառ"
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
              className="absolute top-[2.4rem] right-6 text-2xl cursor-pointer text-slate-500"
              onClick={handleShow}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </div>
          </div>

          <div className="box relative md:w-1/2 w-full">
            <p>Կրկնել գաղտնաբառը</p>
            <input
              id="repetpassword"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              // placeholder="Կրկնել գաղտնաբառը"
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
              className="absolute top-[2.4rem] right-6 text-2xl cursor-pointer text-slate-500"
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
            onClick={() => reset()}
          >
            Չեղարկել
          </button>
        </div>
      </div>
    </>
  );
};

export default Security;
