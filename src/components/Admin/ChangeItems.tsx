import React, { useState, useRef } from "react";
import { FiEdit2 } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { updateLoadsSchema } from "../../utils/formScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedDispatch } from "../../hooks/useTypedSelector";
import Toast from "../../UI/UIToast";
import { deleteItemThunk, deleteTruckThunk, updateNewItemThunk, updateNewTruckThunk } from "../../store/asyncThunk";
import DetectCurrentUserType from "../../utils/detectUserType";
import FromInput from "../autocompleteInput/FromInput";
import { Coords } from "google-map-react";
import { useLocation } from "react-router-dom";
import ToInput from "../autocompleteInput/ToInput";

const ChangeItems = ({
  _id,
  pickup,
  truckType,
  delivery,
  date,
  weight,
  length,
  rate,
  comment,
  commodity,
  status,
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDeleted,setIsDeleted] = useState(false)
  const [isUpdated,setIsUpdated] = useState(false)
  const [fromInfo,setFromInfo] = useState<any>({})
  const [toInfo,setToInfo] = useState<any>({})
  const userType = DetectCurrentUserType();
  const dispatch = useTypedDispatch();
  const {pathname} = useLocation()
  const ref = useRef<any>(null);

console.log(pickup,delivery);

  const getFromInfo = (address: string, location: Coords) => {
    setFromInfo({ location, description: address }) 
  }
  const getToInfo = (address: string, location: Coords) => {
    setToInfo({ location, description: address }) 
  }

  const makeDisabled = () => {
    setIsDisabled(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(updateLoadsSchema),
  });

  const onSubmit = async (data: any) => {
    if(userType === 'customer' && data.status === "delete"){
      dispatch(deleteItemThunk({ id: _id }));
    }else if(userType === 'carrier' && data.status === "delete"){
      dispatch(deleteTruckThunk({ id: _id }));
    }else if(userType === 'customer' && data.status !== "delete"){
      dispatch(updateNewItemThunk({ ...data, id: _id }));
      setIsDisabled(true);
      setIsVisible(true)
      setTimeout(()=>{
        setIsVisible(false)
      },3000)
    }else if(userType === 'carrier' && data.status !== "delete") {
      dispatch(updateNewTruckThunk({ ...data, id: _id }));
      setIsDisabled(true);
      setIsVisible(true)
      setTimeout(()=>{
        setIsVisible(false)
      },3000)
    }
  };

  console.log(isDisabled && pathname.includes('changeitems'));
  
  return (
    <>
      <div
        ref={ref}
        className={`w-full min-h-[50px] bg-slate-300 dark:bg-slate-300 px-4 flex py-2 lg:py-4 flex-wrap lg:flex-nowrap justify-between items-center lg:gap-4 gap-y-[8px] 
          
        }  text-sm`}
      >
        <div className="date w-full sm:w-[48%] lg:w-[200px]  h-[40px]  flex items-center mb-[1px] md:mb-0">
          <input
            type={isDisabled ? "text" : "date"}
            id="change-date"
            defaultValue={date}
            className="w-full lg:w-full px-2 h-[40px] rounded-md border-none focus:outline-none focus:bg-blue-100"
            disabled={isDisabled}
            {...register("date")}
          />
        </div>
        <div className="trailer w-full sm:w-[48%] lg:w-[200px]  h-[40px]  flex items-center -mt-[6px]  mb-[3px]">
          <div className="w-full">
            <div className="mt-2 relative w-[100%]">
              <select
                id="change-truck-type"
                disabled={isDisabled}
                autoComplete="country-name"
                className={`${
                  isDisabled ? "bg-[#D7DDE4]" : "bg-white"
                } p-2 block w-full rounded-md border-0 py-[8px] text-gray-900  focus:ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6 appearance-none`}
                {...register("truckType")}
              >
                <option value={"ռեֆ"} selected={truckType === "ռեֆ"}>
                  ռեֆ
                </option>
                <option value={"տենտ"} selected={truckType === "տենտ"}>
                  տենտ
                </option>
                <option
                  value={"կոնտեյներ"}
                  selected={truckType === "կոնտեյներ"}
                >
                  կոնտեյնեռ
                </option>
                <option value={"ավիա"} selected={truckType === "ավիա"}>
                  ավիա
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="pickup w-full sm:w-[48%] lg:w-[350px]  h-[40px]">
          {/* <input
            type="text"
            defaultValue={pickup?.description}
            id="change-pickup"
            className="w-full h-full px-2 rounded-md border-none focus:outline-none focus:bg-blue-100"
            disabled={isDisabled}
            {...register("pickup")}
          /> */}
           <FromInput cbSuccess={getFromInfo} disabled={isDisabled && pathname.includes('changeitems')} defaultLocation = {pickup?.description}/>
        </div>
        <div className="delivery w-full sm:w-[48%] lg:w-[350px]  h-[40px] ">
          {/* <input
            type="text"
            defaultValue={delivery?.description}
            id="change-delivery"
            className="px-2 w-full   h-[40px] rounded-md border-none focus:outline-none focus:bg-blue-100"
            disabled={isDisabled}
            {...register("delivery")}
          /> */}
          <ToInput cbSuccess={getToInfo} disabled={isDisabled && pathname.includes('changeitems')} defaultLocation = {delivery?.description}/>
        </div>
        <div className="length w-[49%] sm:w-[48%] lg:w-[100px]  h-[40px] relative overflow-hidden">
          <input
            type="text"
            defaultValue={length}
            id="change-length"
            className="px-2 w-full h-[40px] rounded-md border-none flex justify-center items-center focus:outline-none focus:bg-blue-100"
            disabled={isDisabled}
            {...register("length")}
          />
          <div className="w-10 h-10 text-[16px] rounded-md flex lg:hidden  justify-center items-center absolute right-0 bottom-0">
            մ³
          </div>
        </div>
        <div className="weight w-[49%] sm:w-[48%] lg:w-[150px]  h-[40px] relative overflow-hidden">
          <input
            type="text"
            defaultValue={weight}
            id="change-weight"
            className="px-2 w-full h-full rounded-md border-none focus:outline-none focus:bg-blue-100"
            disabled={isDisabled}
            {...register("weight")}
          />
          <div className="w-10 h-10 text-[16px] rounded-md flex lg:hidden  justify-center items-center absolute right-0 bottom-[1.5px]">
            կգ
          </div>
        </div>
        <div className="rate w-[49%] sm:w-[48%] lg:w-[150px]  h-[40px] relative overflow-hidden">
          <input
            type="text"
            defaultValue={rate}
            id="change-rate"
            className=" px-2 w-full h-full rounded-md border-none focus:outline-none focus:bg-blue-100"
            disabled={isDisabled}
            {...register("rate")}
          />
          <div className="w-10 h-10 text-[16px] rounded-md flex lg:hidden justify-center items-center absolute right-0 bottom-0">
            $
          </div>
        </div>
        <div className="status w-[49%] sm:w-[48%] lg:w-[300px]  h-[40px]  lg:-mt-4 -mt-4">
          <div className="sm:col-span-3">
            <div className="mt-2 relative">
              <select
                id="change-load-status"
                disabled={isDisabled}
                autoComplete="country-name"
                className={`${
                  isDisabled ? "bg-[#D7DDE4]" : "bg-white"
                } p-4 block w-full rounded-md   py-[8px] text-gray-900  focus:ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6 appearance-none`}
                {...register("status")}
              >
                <option value={"open"} selected={status === "open"}>
                  ակտիվ
                </option>
                <option value={"onRoad"} selected={status === "onRoad"}>
                  ճանապարհին
                </option>
                <option value={"delivered"} selected={status === "delivered"}>
                  դատարկված
                </option>
                <option value={"paid"} selected={status === "paid"}>
                  վճարված
                </option>
                <option value={"delete"}>ջնջել</option>
              </select>
            </div>
          </div>
        </div>
        <div className="btns w-full sm:w-[100%]  lg:w-[80px]  h-[40px]  lg:flex hidden  lg:items-center items-end justify-end gap-4 rounded-xl lg:mt-0 mt-[4px]">
          <div
            className={`text-[20px] ${
              isDisabled ? "lg:flex hidden" : "hidden"
            }  cursor-pointer bg-gray-700 hover:bg-white hover:text-black transition-all text-white w-10 h-10 rounded-full flex justify-center items-center`}
            onClick={makeDisabled}
          >
            {" "}
            <FiEdit2 />
          </div>
          <div
            className={`text-[25px] text-green-700 hover:text-green-800 transition-all ${
              isDisabled ? "hidden" : "lg:block hidden"
            } cursor-pointer`}
            onClick={handleSubmit(onSubmit)}
          >
            <BsCheck2All />
          </div>
          <div
            className={`text-[25px] text-red-600 hover:text-red-800 transition-all ${
              isDisabled ? "hidden" : "lg:block hidden"
            } cursor-pointer`}
            onClick={()=>setIsDisabled(true)}
          >
            <FiX />
          </div>
        </div>
      </div>
      {!isDisabled && (
        <div className="w-full lg:h-24 h-[90px] bg-slate-300 flex flex-col md:flex-row px-4 md:px-0 gap-y-2">
          <div className="md:w-1/2 w-full h-full  md:p-4 p-0">
            <input
              type="text"
              defaultValue={comment}
              id="change-comment"
              className="px-2 w-full border-2 border-black h-full rounded-md border-none focus:outline-none focus:bg-blue-100"
              disabled={isDisabled}
              {...register("comment")}
            />
          </div>
          <div className="md:w-1/2 w-full h-full   md:p-4 p-0 lg:pr-24 md:pr-4 pr-0">
            <input
              type="text"
              defaultValue={commodity}
              id="change-commodity"
              className="px-2  w-full border-2 border-black h-full rounded-md border-none focus:outline-none focus:bg-blue-100"
              disabled={isDisabled}
              {...register("commodity")}
            />
          </div>
        </div>
      )}
      <Toast
        type="success"
        message="Ձեր բեռը հաջողությամբ թարմացվել է"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <div className="btns-mobile  w-full h-full flex items-end justify-end pr-4 gap-6 bg-slate-300 border-b-[5px] border-white lg:py-0 py-4">
        <div
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            isDisabled ? "block lg:hidden" : "hidden"
          }`}
          onClick={makeDisabled}
        >
          Փոփոխել
        </div>
        <div
          className={`px-4 py-2 bg-green-500 text-white rounded-md  ${
            isDisabled ? "hidden" : "block lg:hidden"
          }`}
          onClick={handleSubmit(onSubmit)}
        >
          Պահպանել
        </div>
        <div
          className={`px-4 py-2 bg-red-500 text-white rounded-md  ${
            isDisabled ? "hidden" : "block lg:hidden"
          }`}
          onClick={()=>setIsDisabled(true)}
        >
          Չեղարկել
        </div>
      </div>
      <Toast
        type="success"
        message={`Ձեր ${userType === 'customer' ? 'բեռը' : 'բեռնատարը'}  հաջողությամբ թարմացվել է`}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

export default ChangeItems;
