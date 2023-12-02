import { addLoadsSchema } from "../../utils/formScheme";
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

export default function AddItems() {
  const [isVisible, setIsVisible] = useState(false);
  const [fromInfo,setFromInfo] = useState<any>({})
  const [toInfo,setToInfo] = useState<any>({})
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const currentUserType = DetectCurrentUserType();

  const getFromInfo = (address: string, location: Coords) => {
    setFromInfo({ location, description: address }) 
  }
  const getToInfo = (address: string, location: Coords) => {
    setToInfo({ location, description: address }) 
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addLoadsSchema),
  });

  const onSubmit = async (data: any) => {
  
    if (isValid) {
      const { userType, parent } = user;
      if (currentUserType === "customer") {
        
        dispatch(addNewItemThunk({ ...data, userType, parent,toInfo,fromInfo }));
        dispatch(getLoadThunk());
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);

          reset();
        }, 3000);
      } else if (currentUserType === "carrier") {
        dispatch(addNewTruckThunk({ ...data, userType, parent, delivery:toInfo?.description,pickup:fromInfo?.description  }));
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
  return (
    <>
      <form
        className="px-4 md:px-10 pb-4 "
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 md:gap-y-4 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Բարձում
                </label>
                <div className="mt-2">
                  {/* <input
                    type="text"
                    id="pickup"
                    autoComplete="given-name"
                    placeholder="օր. Երևան"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900  ring-0 focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6"
                    {...register("pickup")}
                  /> */}
                  <FromInput cbSuccess={getFromInfo}/>

                  {/* {errors.pickup && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.pickup.message}
                    </p>
                  )} */}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  {user.userType === "customer" ||
                  user.userType === "subCustomer"
                    ? "Բեռնաթափում"
                    : "Նախընտրելի ուղղություն"}
                </label>
                <div className="mt-2">
                  {/* <input
                    type="text"
                    id="delivery"
                    autoComplete="given-name"
                    placeholder="օր. Սամարա
                  "
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900 ring-0 focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6"
                    {...register("delivery")}
                  /> */}
                  <ToInput cbSuccess={getToInfo}/>
                  {/* {errors.delivery && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.delivery.message}
                    </p>
                  )} */}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Բարձման օր
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="date"
                    autoComplete="given-name"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900 shadow-sm  focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6"
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
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Բեռնատարի տեսակ
                </label>
                <div className="mt-2 relative">
                  <select
                    id="truck-type"
                    autoComplete="country-name"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-[6px] text-gray-900  focus:ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6 appearance-none"
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
                <label className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900  focus:ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6"
                    {...register("length")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900 focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6"
                    {...register("weight")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Ամբողջական/հավաքական
                </label>
                <div className="mt-2 relative">
                  <select
                    id="type"
                    className=" p-4  block w-full rounded-md border-[1px] border-slate-400 py-[6px] text-gray-900  focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6 appearance-none"
                    {...register("loadType")}
                  >
                    <option value={"ամբողջական"}>ամբողջական</option>
                    <option value={"հավաքական"}>հավաքական</option>
                  </select>
                  {errors.loadType && (
                    <p className="text-red-600   pt-1 pl-2  text-[12px] tracking-wide">
                      {errors.loadType.message}
                    </p>
                  )}
                  <div className="absolute top-[.5rem] right-4 text-2xl text-slate-500">
                    <IoIosArrowDown />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Գին
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="rate"
                    autoComplete="given-name"
                    placeholder="օր. 3400"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900  focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6"
                    {...register("rate")}
                  />
                </div>
              </div>
              {currentUserType === "customer" && (
                <div className="sm:col-span-3 ">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Ապրանքի տեսակ
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="commodity"
                      autoComplete="given-commodity"
                      placeholder="օր. գինի"
                      className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900  focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6"
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
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Հավելյալ ինֆումացիա
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="comment"
                    autoComplete="comment"
                    placeholder="Նշեք հավելյալ ինֆումացիա` ըստ անհրաժեշտության"
                    className="p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900  focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6"
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
            className="rounded-md bg-inherit border-[1px] hover:bg-gray-400 px-3 py-2 text-sm text-gray-900 border-gray-400  hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
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
        message={`Ձեր ${currentUserType === 'customer' ? 'բեռը' : 'բեռնատարը'} հաջողությամբ ավելացվել է`}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
}
