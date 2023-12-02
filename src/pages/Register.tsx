import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";
import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsBuildingCheck } from "react-icons/bs";
import Logo from "../assets/mainlogo.svg";
import { Helmet } from "react-helmet";
import { registerSchema } from "../utils/formScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegsiserFormProps } from "../interfaces/FormProps";
import { registerThunk } from "../store/asyncThunk";
import Toast from "../UI/UIToast";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
// import { removeUser } from "../store/customerSlice";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShow = () => setShowPassword(!showPassword);
  const [isVisible, setIsVisible] = useState(false);
  const [valid, setValid] = useState(true);
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  const ref = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegsiserFormProps>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    if (isValid) {
      let user = await dispatch(registerThunk(data));
      if (user?.payload?.email) {
        navigate("/");
      } else {
        setValid(false);
        setIsVisible(true);
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 4000);

        return () => {
          clearTimeout(timer);
        };
      }
    } else {
      console.log("some error during registration");
    }
  };

  return (
    <section className="w-full min-h-screen flex">
      <Helmet>
        <title>{`Գրանցվել`}</title>
      </Helmet>
      <div className="w-full lg:w-1/2 h-screen  px-sm">
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto w-20  logo" src={Logo} alt="Your Company" />
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              ԳՐԱՆՑՎԵԼ
            </h2>
          </div>

          <div className="mt-[20px] md:mx-auto md:w-full md:max-w-sm">
            <form
              className="space-y-4"
              action="#"
              ref={ref}
              onSubmit={() => handleSubmit}
            >
              <div>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Անուն"
                    required
                    className="bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] border-slate-400 pr-[54px]"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.firstName.message}
                    </p>
                  )}
                  <div className="absolute top-[1rem] right-6 text-xl text-slate-500">
                    <CgProfile />
                  </div>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="lastName"
                    required
                    placeholder="Ազգանուն"
                    className="bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] border-slate-400 pr-[54px]"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.lastName.message}
                    </p>
                  )}
                  <div className="absolute top-[1rem] right-6 text-xl text-slate-500">
                    <CgProfile />
                  </div>
                </div>
              </div>

              <div>
                <div className=" relative">
                  <select
                    className="bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-400  placeholder:text-gray-900   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] border-slate-400 appearance-none	"
                    {...register("userType")}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-gray-200"
                    >
                      Գործունեության տեսակ
                    </option>
                    <option value="customer">Պատվիրատու</option>
                    <option value="carrier">Փոխադրող</option>
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
              <div className=" relative">
                <input
                  id="company"
                  type="text"
                  autoComplete="company"
                  required
                  placeholder="Ընկերության անվանումը"
                  className={`${ valid ? "border-slate-400" : "border-red-400"} bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px]  pr-[54px]`}
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                    {errors.companyName.message}
                  </p>
                )}
                <div className="absolute top-[1.1rem] right-6 text-[18px] text-slate-500">
                  <BsBuildingCheck />
                </div>
              </div>
              <div>
                <div className=" relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Էլ-հասցե"
                    required
                    className={`${ valid ? "border-slate-400" : "border-red-400"} bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] pr-[54px]`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-600  pt-1 pl-2 text-[12px] tracking-wide">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="absolute top-[1rem] right-6 text-xl text-slate-500">
                    <MdOutlineMailOutline />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between"></div>
                <div className=" relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Գաղտնաբառ"
                    autoComplete="current-password"
                    required
                    className="bg-[#f2f5fc] rounded-xl block w-full pl-[20px] py-[14px] text-gray-900    placeholder:text-gray-400   focus:ring-[#1c90f3] sm:text-sm sm:leading-6 border-[1px] border-slate-400 pr-[54px]"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-600   pt-1 pl-2 text-[12px] tracking-wide">
                      {errors.password.message}
                    </p>
                  )}
                  <div
                    className="absolute top-[1rem] right-6 text-2xl cursor-pointer text-slate-500 z-50"
                    onClick={handleShow}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-4 flex w-full justify-center rounded-2xl bg-[#1c90f3] px-3 py-[10px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                  onClick={handleSubmit(onSubmit)}
                >
                  Գրանցվել
                </button>
              </div>
            </form>

            <p className="mt-6  text-center text-sm text-gray-500">
              Արդեն ունե՞ք հաշիվ{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-[#1c90f3] hover:text-blue-500"
              >
                Մուտք
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-screen  hidden lg:block register"></div>
      <Toast
        type="error"
        message="Այս տվյալներով օգտատեր գոյություն ունի"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </section>
  );
}
