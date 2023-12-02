import { useEffect, useState } from "react";
import { LoadProps } from "../interfaces/LoadProps";
import Loader from "./Loader";
import { testTrucks } from "../data/testTrucks";
import { TruckProps } from "../interfaces/TruckProps";
import AccordionItemDesktop from "./AccordionItemDesktop";
import { getLoadThunk, getTruckThunk } from "../store/asyncThunk";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";

export default function LoadItemDesktop({ boardType }: any) {
  const itemsPerRow = 50;
  const [next, setNext] = useState<number>(itemsPerRow);
  const [loadData, setLoadData] = useState<LoadProps[] | TruckProps[]>([]);
  const dispatch = useTypedDispatch();
  const { load, isLoading, isEmpty } = useTypedSelector((state) => state.load);
  const { truck,isLoadingTruck, isEmptyTruck} = useTypedSelector((state) => state.truck);
  const { pathname } = useLocation();

  const detectBoardType = async () => {
    if (boardType === "load") {
      setLoadData(load);
      return;
    } else {
      setLoadData(truck);
    }
  };

  useEffect(() => {
    detectBoardType();
  }, [load,truck]);

  useEffect(() => {
    dispatch(getLoadThunk());
    dispatch(getTruckThunk());
  }, []);

  const handleMoreLoads = () => {
    setNext(next + 50);
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div className="w-full h-[calc(100vh-110px)]  flex justify-center items-center">
            <Loader />
          </div>
        ) : isEmpty ? (
          <p className="w-full h-[calc(100vh-110px)]  flex justify-center items-center">
            Բեռներ չի գտնվել
          </p>
        ) : (
          <>
            {pathname === "/" ? (
              load?.slice(0, next)?.map((el: any, i: any) => (
                <div key={i} className="pb-[2px]">
                  <AccordionItemDesktop {...el} i={i} boardType={boardType} />
                </div>
              ))
            ) : pathname.includes("/trucks") ? (
              truck.slice(0, next)?.map((el: any, i: any) => (
                <div key={i} className="pb-[2px]">
                  <AccordionItemDesktop {...el} i={i} boardType={boardType} />
                </div>
              ))
            ) : (
              <></>
            )}
          </>
        )}
        {next < loadData?.length && (
          <div className="w-full flex justify-center py-4 ">
            <button
              onClick={handleMoreLoads}
              className="bg-[#1C90F3] text-white text-sm rounded-md px-4 py-2"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </>
  );
}
