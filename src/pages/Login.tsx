import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/mainlogo.svg";
import { Helmet } from "react-helmet";
import { loginSchema } from "../utils/formScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormProps } from "../interfaces/FormProps";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { loginThunk } from "../store/asyncThunk";
import { BiHide } from "react-icons/bi";
import UISelect from "../UI/UISelect";
import { IoIosArrowDown } from "react-icons/io";
import Toast from "../UI/UIToast";
export default function LogIn() {
  //i18n
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => setShowPassword(!showPassword);

  const ref = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
   
  } = useForm<LoginFormProps>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    if (isValid) {
      let user = await dispatch(loginThunk(data));

      if (user?.payload?.email) {
        navigate("/");
      }
    }
    setValid(false);
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <section className="w-full h-screen flex ">
      <Helmet>
        <title>{`Մուտք`}</title>
      </Helmet>
      <div className="w-full lg:w-1/2 h-screen  px-sm">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto w-20  logo" src={Logo} alt="Your Company" />
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {/* {t("login.mutq")} */}
              Մուտք
            </h2>
          </div>

          <div className="mt-10 md:mx-auto md:w-full md:max-w-sm">
            <form
              className="space-y-6"
              ref={ref}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}
            >
              <div>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="էլ-հասցե"
                    required
                    className={` bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] ${
                      valid ? "border-slate-400" : "border-red-400"
                    } pr-[54px]`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-600   pl-2 pt-1 text-[12px] tracking-wide">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="absolute top-[1rem] right-6 text-xl text-slate-500 ">
                    <MdOutlineMailOutline />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between"></div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Գաղտնաբառ"
                    required
                    className={` bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] ${
                      valid ? "border-slate-400" : "border-red-400"
                    } pr-[54px]`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-600  pl-2 pt-1 text-[12px] tracking-wide">
                      {errors.password.message}
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

              <div>
                <div className="mt-2 relative">
                  <select
                    className={` bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-400   placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] ${
                      valid ? "border-slate-400" : "border-red-400"
                    } pr-[54px] appearance-none`}
                    {...register("userType")}
                  >
                    <option disabled className="text-gray-200 " selected>
                      Գործունեության տեսակ
                    </option>
                    <option value="customer">Պատվիրատու</option>
                    <option value="subCustomer">Պատվիրատու/աշխատակից</option>
                    <option value="carrier">Փոխադրող</option>
                    <option value="subCarrier">Փոխադրող/աշխատակից</option>
                  </select>
                  {errors.userType && (
                    <p className="text-red-600   pt-1 pl-2 text-[12px] tracking-wide">
                      {errors.userType.message}
                    </p>
                  )}
                  <div className="absolute top-[1rem] right-6 text-2xl text-slate-500">
                    <IoIosArrowDown />
                  </div>
                </div>
              </div>

              <div className="text-sm text-right">
                <Link
                  to={"/forgot"}
                  className="font-[600] text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
                >
                  Մոռացե՞լ եք գաղտնաբառը
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-2xl bg-[#1c90f3] px-4 py-[10px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                  onClick={handleSubmit(onSubmit)}
                >
                  Մուտք
                </button>
              </div>
            </form>

            <p className="mt-10  text-center text-sm text-gray-500">
              Դե՞ռ չունեք հաշիվ{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-[#1c90f3] hover:text-[#1d90f1]"
              >
                Գրանցվել
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-screen  hidden lg:block login"></div>
      <Toast type="error" message="Օգտատեր չի գտնվել" isVisible={isVisible} setIsVisible={setIsVisible}/>
    </section>
  );
}
