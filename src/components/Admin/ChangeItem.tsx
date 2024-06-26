import React, { useEffect } from "react";
import ChangeLoadItem from "./ChangeItems";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { getUserLoadsThunk } from "../../store/asyncThunk";
import DetectCurrentUserType from "../../utils/detectUserType";

const ChangeItem: React.FC = ({}) => {
  const dispatch = useTypedDispatch();
  const { userLoads } = useTypedSelector((state) => state.load);
  const { userTrucks } = useTypedSelector((state) => state.truck);
  const currentUserType = DetectCurrentUserType();

  const sortItems = (itemType: any) => {
    const open = itemType?.filter((item: any) => item.status === "open");
    const onRoad = itemType?.filter((item: any) => item.status === "onRoad");
    const delivered = itemType?.filter(
      (item: any) => item.status === "delivered"
    );
    const paid = itemType?.filter((item: any) => item.status === "paid");

    return [...open, ...onRoad, ...delivered, ...paid];
  };

  return (
    <div className="relative z-40 flex flex-col bg-inherit">
      <div className="w-full h-8 bg-slate-700 px-4 lg:flex hidden justify-between items-center gap-2 text-[13px] text-gray-400 font-semibold">
        <div className="w-full sm:w-[48%] lg:w-[200px] pl-1flex items-center">
          Օր
        </div>
        <div className="w-full sm:w-[48%] lg:w-[200px] pl-1 flex items-center">
          Տ/Մ
        </div>
        <div className="w-full sm:w-[48%] lg:w-[350px] pl-1 flex items-center">
          Բարձում
        </div>
        <div className="w-full sm:w-[48%] lg:w-[350px] pl-1 flex items-center">
          {currentUserType === "customer"
            ? "Բեռնաթափում"
            : "Նախընտրելի ուղղություն"}
        </div>
        <div className="w-full sm:w-[48%] lg:w-[100px] pl-1 flex items-center">
          Ծավալ
        </div>
        <div className="w-full sm:w-[48%] lg:w-[150px] pl-1 flex items-center">
          Քաշ
        </div>
        <div className="w-full sm:w-[48%] lg:w-[150px] pl-1 flex items-center">
          Գին
        </div>
        <div className="w-full sm:w-[48%] lg:w-[300px] pl-1 flex items-center">
          Կարգավիճակ
        </div>
        <div className="w-full sm:w-[48%] lg:w-[80px]"></div>
      </div>
      {sortItems(currentUserType === "customer" ? userLoads : userTrucks).map(
        (el: any) => (
          <div key={el._id}>
            <ChangeLoadItem {...el} />
          </div>
        )
      )}
    </div>
  );
};

export default ChangeItem;
