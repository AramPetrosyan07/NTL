import { addLoadsSchema, addTruckSchema } from "../../utils/formScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FromInput from "../autocompleteInput/FromInput";
import { useState } from "react";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { IoIosArrowDown } from "react-icons/io";
import Toast from "../../UI/UIToast";
import {
  addNewItemThunk,
  addNewTruckThunk,
  getLoadThunk,
  getTruckThunk,
} from "../../store/asyncThunk";
import DetectCurrentUserType from "../../utils/detectUserType";
import { Coords } from "google-map-react";
import ToInput from "../autocompleteInput/ToInput";
import { Map } from "../Map";
import { distanceToPrice } from "../../utils/Tools";

export default function AddItems() {
  const [isVisible, setIsVisible] = useState(false);
  const [fromInfo, setFromInfo] = useState<any>({});
  const [toInfo, setToInfo] = useState<any>({});
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const currentUserType = DetectCurrentUserType();
  const [distance, setDistance] = useState({ distance: "" });

  const getFromInfo = (address: string, location: Coords) => {
    setFromInfo({ location, description: address });
  };
  const getToInfo = (address: string, location: Coords) => {
    setToInfo({ location, description: address });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      currentUserType === "customer" ? addLoadsSchema : addTruckSchema
    ),
  });

  const onSubmit = async (data: any) => {
    console.log("submit");

    if (isValid) {
      const { userType, parent } = user;
      if (currentUserType === "customer") {
        console.log("customer");

        dispatch(
          addNewItemThunk({
            ...data,
            userType,
            parent,
            distance: distance.distance.slice(0, -2),
            toInfo,
            fromInfo,
          })
        );
        dispatch(getLoadThunk());
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);

          reset();
        }, 3000);
      } else if (currentUserType === "carrier") {
        dispatch(
          addNewTruckThunk({
            ...data,
            userType,
            parent,
            distance: distance.distance.slice(0, -2),
            toInfo,
            fromInfo,
          })
        );
        dispatch(getTruckThunk());
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);

          reset();
        }, 3000);
      }
    } else {
      alert("some error was accured during adding");
    }
  };

  let fuelPrice = distanceToPrice(distance?.distance as string);

  console.log(fuelPrice);
  console.log(watch("truckType"));

  return (
    <>
      <Map
        pickup={fromInfo}
        delivery={toInfo}
        setDistanceAndDur={setDistance}
        className="w-0 h-0 hidden"
      />
      <form
        className="px-4 md:px-10 pb-4 "
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
      >
        <div className="addItem bg-[#f1f5f9] dark:bg-black text-black dark:text-[#f1f5f9]  placeholder:text-red-400 placeholder-gray-500">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 md:gap-y-4 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Բարձում
                </label>
                <div className="mt-2">
                  <FromInput cbSuccess={getFromInfo} />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  {user.userType === "customer" ||
                  user.userType === "subCustomer"
                    ? "Բեռնաթափում"
                    : "Նախընտրելի ուղղություն"}
                </label>
                <div className="mt-2">
                  <ToInput cbSuccess={getToInfo} />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Բարձման օր
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="date"
                    autoComplete="given-name"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5  shadow-sm  focus:ring-0  placeholder-gray-500  sm:text-sm sm:leading-6"
                    {...register("date")}
                  />
                  {errors.date && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Բեռնատարի տեսակ
                </label>
                <div className="mt-2 relative">
                  <select
                    id="truck-type"
                    autoComplete="country-name"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-[6px]   focus:ring-gray-300    sm:text-sm sm:leading-6 appearance-none"
                    {...register("truckType")}
                  >
                    <option value={"ռեֆ"}>ռեֆ</option>
                    <option value={"տենտ"}>տենտ</option>
                    <option value={"կոնտեյներ"}>կոնտեյներ</option>
                    <option value={"ավիա"}>ավիա</option>
                  </select>
                  {errors.truckType && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.truckType.message}
                    </p>
                  )}
                  <div className="absolute top-[.5rem] right-4 text-2xl text-slate-500">
                    <IoIosArrowDown />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  {currentUserType === "customer"
                    ? " Բեռի ծավալ մ³"
                    : " Բեռնատարի ծավալ մ³"}
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="length"
                    autoComplete="family-name"
                    placeholder="օր. 86"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5   focus:ring-gray-300    sm:text-sm sm:leading-6"
                    {...register("length")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  {currentUserType === "customer"
                    ? "Բեռի քաշ կգ"
                    : "Նախընտրելի քաշ կգ"}
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="weight"
                    placeholder="օր. 22000"
                    autoComplete="family-name"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5  focus:ring-0    sm:text-sm sm:leading-6"
                    {...register("weight")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Ամբողջական/հավաքական
                </label>
                <div className="mt-2 relative">
                  <select
                    id="type"
                    className=" p-4  block w-full rounded-md border-[1px] border-slate-400 py-[6px]   focus:ring-0    sm:text-sm sm:leading-6 appearance-none"
                    {...register("type")}
                  >
                    <option value={"ամբողջական"}>ամբողջական</option>
                    <option value={"հավաքական"}>հավաքական</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.type.message}
                    </p>
                  )}
                  <div className="absolute top-[.5rem] right-4 text-2xl text-slate-500">
                    <IoIosArrowDown />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 ">
                  Գին
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="rate"
                    autoComplete="given-name"
                    placeholder={
                      fuelPrice && watch("truckType") !== "ավիա"
                        ? `նվազագույն գումարը ${fuelPrice}$`
                        : "օր. 3400"
                    }
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5   focus:ring-0    sm:text-sm sm:leading-6"
                    {...register("rate")}
                  />
                </div>
              </div>
              {currentUserType === "customer" && (
                <div className="sm:col-span-3 ">
                  <label className="block text-sm font-medium leading-6 ">
                    Ապրանքի տեսակ
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="commodity"
                      autoComplete="given-commodity"
                      placeholder="օր. գինի"
                      className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5   focus:ring-0    sm:text-sm sm:leading-6"
                      {...register("commodity")}
                    />
                  </div>
                </div>
              )}

              <div
                className={`${
                  currentUserType === "customer"
                    ? "sm:col-span-3"
                    : "sm:col-span-6"
                } `}
              >
                <label className="block text-sm font-medium leading-6 ">
                  Հավելյալ ինֆումացիա
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="comment"
                    autoComplete="comment"
                    placeholder="Նշեք հավելյալ ինֆումացիա` ըստ անհրաժեշտության"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5   focus:ring-0    sm:text-sm sm:leading-6"
                    {...register("comment")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-md bg-inherit border-[1px] hover:bg-gray-400 px-3 py-2 text-sm  border-gray-400  hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            onClick={() => reset()}
          >
            Չեղարկել
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#1c90f3] hover:bg-[#1c8ff3cd] px-3 py-2 text-sm  text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            onClick={handleSubmit(onSubmit)}
          >
            Ավելացնել
          </button>
        </div>
      </form>
      <Toast
        type="success"
        message={`Ձեր ${
          currentUserType === "customer" ? "բեռը" : "բեռնատարը"
        } հաջողությամբ ավելացվել է`}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
}
