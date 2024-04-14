import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ResetFormProps } from "../interfaces/FormProps";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverPasswordScheme } from "../utils/formScheme";
import { useTypedDispatch } from "../hooks/useTypedSelector";
import {
  loginThunk,
  passRecovery,
  recoverResponse,
  recoverSend,
} from "../store/asyncThunk";
import Timer from "../components/Timer";

const Forgot: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const durationInSeconds: number = 120;
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(recoverPasswordScheme),
  });

  const handleTimerTimeout = (): void => {
    setShowTimer(false);
  };

  const handleResendClick = (): void => {
    setShowTimer(true);
  };

  const ref = useRef<any>(null);

  //-----------------------------------------------------------------------------------------
  const handleCheckEmail = async () => {
    const mail = watch("email");

    const res: any = await dispatch(recoverSend({ email: mail }));
    setCount((prev) => prev + 1);
  };

  const handleCheckVerifyCode = async () => {
    const email = watch("email");
    const code = watch("code");
    console.log(email, code);

    const res: any = await dispatch(
      recoverResponse({ email, verificationCode: code })
    );
    setCount((prev) => prev + 1);
  };

  const handleCheckNewPassword = async () => {
    const email = watch("email");
    const newPasswordOne = watch("password");
    const newPasswordTwo = watch("repetPassword");
    console.log(newPasswordOne, newPasswordTwo);
    const res: any = await dispatch(
      passRecovery({ email, newPasswordOne, newPasswordTwo })
    );
    console.log(res);

    if (res.payload._id) {
      navigate("/");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center p-[1rem]">
      <Helmet>
        <title>{`Վերականգնել գաղտնաբառը`}</title>
      </Helmet>
      <div
        ref={ref}
        className="w-[500px] h-[500px] flex flex-col justify-around items-center  overflow-hidden px-[0.4rem]"
      >
        {count === 1 && (
          <>
            <h4 className="text-2xl font-bold uppercase text-gray-700 text-center">
              Վերականգնել գաղտնաբառը
            </h4>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3178/3178283.png"
              alt="email"
              className="w-[100px] h-[100px]"
            />
            <div className="box w-full">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Էլ.հասցե"
                className="bg-[#f2f5fc] rounded-2xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400  sm:text-sm sm:leading-6 border-none"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600   pl-2 pt-1 text-[12px] tracking-wide">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleCheckEmail();
              }}
              className="flex w-full justify-center rounded-2xl bg-[#1c90f3] px-3 py-[10px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
              Ուղարկել
            </button>
          </>
        )}
        {count === 2 && (
          <>
            <h4 className="text-2xl font-bold uppercase text-gray-700 text-center">
              Վերականգնել գաղտնաբառը
            </h4>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6357/6357048.png"
              alt="email"
              className="w-[100px] h-[100px]"
            />
            <div className="box w-full relative z-50">
              <input
                id="code"
                type="text"
                autoComplete="text"
                placeholder="Ծածկագիր"
                required
                className="bg-[#f2f5fc] rounded-2xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400  sm:text-sm sm:leading-6 border-none"
                {...register("code")}
              />
              {errors.code && (
                <p className="text-red-600   pl-2 pt-1 text-[12px] tracking-wide">
                  {errors.code.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              onClick={() => {
                handleCheckVerifyCode();
                // handleSubmit(onSubmit);
              }}
              className="flex w-full justify-center rounded-2xl bg-[#1c90f3] px-3 py-[10px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
              Հաստատել
            </button>
            <div>
              {showTimer ? (
                <Timer
                  durationInSeconds={durationInSeconds}
                  onTimeout={handleTimerTimeout}
                />
              ) : (
                <button onClick={handleResendClick}>Resend Code</button>
              )}
            </div>
          </>
        )}
        {count === 3 && (
          <>
            <h4 className="text-2xl font-bold uppercase text-gray-700 text-center">
              Վերականգնել գաղտնաբառը
            </h4>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2499/2499151.png"
              alt="email"
              className="w-[100px] h-[100px]"
            />

            <input
              id="code"
              type="password"
              autoComplete="text"
              placeholder="Գաղտնաբառ"
              required
              className="bg-[#f2f5fc] rounded-2xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400  sm:text-sm sm:leading-6 border-none"
              {...register("password")}
            />

            <input
              id="code2"
              type="password"
              autoComplete="text"
              placeholder="Կրկնել գաղտնաբառը"
              required
              className="bg-[#f2f5fc] rounded-2xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400  sm:text-sm sm:leading-6 border-none"
              {...register("repetPassword")}
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded-2xl bg-[#1c90f3] px-3 py-[10px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
              onClick={() => {
                handleCheckNewPassword();
              }}
            >
              Հաստատել
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Forgot;
