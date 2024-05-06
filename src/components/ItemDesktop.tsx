import { useEffect, useState } from "react";
import AccordionItemDesktop from "./AccordionItemDesktop";
import { getLoadThunk, getTruckThunk } from "../store/asyncThunk";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";

export default function ItemDesktop({ boardType }: any) {
  const itemsPerRow = 50;
  const [next, setNext] = useState<number>(itemsPerRow);
  // const [loadData, setLoadData] = useState<LoadProps[] | TruckProps[]>([]);
  const dispatch = useTypedDispatch();
  const { load, filteredLoads, isLoading, isEmpty, message } = useTypedSelector(
    (state) => state.load
  );
  const { truck, filteredTrucks } = useTypedSelector((state) => state.truck);
  const { pathname } = useLocation();

  const chechFilteredLoads = () => {
    if (filteredLoads.length != 0) {
      return filteredLoads;
    } else {
      return load;
    }
  };

  const chechFilteredTrucks = () => {
    if (filteredTrucks.length != 0) {
      return filteredTrucks;
    } else {
      return truck;
    }
  };

  const handleMoreLoads = () => {
    setNext(next + 50);
  };

  useEffect(() => {
    dispatch(getLoadThunk());
    dispatch(getTruckThunk());
  }, []);

  return (
    <>
      <div>
        {message ? (
          <p className="w-full h-[calc(100vh-110px)]  flex justify-center items-center">
            Բեռներ չի գտնվել
          </p>
        ) : (
          <>
            {pathname === "/" ? (
              chechFilteredLoads()
                ?.slice(0, next)
                ?.map((el: any, i: any) => {
                  return (
                    <div key={i} className="pb-[2px]">
                      <AccordionItemDesktop
                        {...el}
                        i={i}
                        boardType={boardType}
                      />
                    </div>
                  );
                })
            ) : pathname.includes("/trucks") ? (
              chechFilteredTrucks()
                .slice(0, next)
                ?.map((el: any, i: any) => (
                  <div key={i} className="pb-[2px]">
                    <AccordionItemDesktop {...el} i={i} boardType={boardType} />
                  </div>
                ))
            ) : (
              <></>
            )}
          </>
        )}
        {next <
          (boardType === "load" ? chechFilteredLoads() : chechFilteredTrucks())
            ?.length && (
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
