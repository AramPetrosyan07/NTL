import React, { useEffect, useState } from "react";
import TeamMember from "./TeamMember";
import UIModal from "../../UI/ModalDetail";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { getCustomerSubs } from "../../store/asyncThunk";
import DetectCurrentUserType from "../../utils/detectUserType";
import { CheckTypes } from "../../utils/CheckTypes";

const Teams = () => {
  const [openAddUser, setOpenAddUser] = useState(false); //
  const dispatch = useTypedDispatch();
  const userType = DetectCurrentUserType();
  const { userSubs, user } = useTypedSelector((state) => state.user);

  const handleAddNewTeamMember = () => {
    setOpenAddUser(true);
  };

  useEffect(() => {
    if (user.userType) {
      dispatch(getCustomerSubs({ userType: user.userType }));
      console.log("getCustomerSubs");
    }
  }, [user.userType]);
  return (
    <div>
      <UIModal openAddUser={openAddUser} setOpenAddUser={setOpenAddUser} />
      <div className="w-full h-20 border-2 rounded-xl flex justify-between items-center px-2 md:px-4">
        <div className="flex flex-col md:flex-row h-full md:items-center items-start justify-center">
          <h4 className="text-[12px] md:text-[15px]">Թիմի անդամների քանակը</h4>
          <p>
            {"  "}(
            {CheckTypes({
              type: user.userType,
              customer: userSubs?.subCustomers?.length || 0,
              carrier: userSubs?.subCarrier?.length || 0,
            })}
            ){" "}
          </p>
        </div>
        <div className="add-team">
          <button
            className="bg-transparent hover:bg-[#1C90F3] text-[#1C90F3] hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-all duration-200"
            onClick={handleAddNewTeamMember}
          >
            Ավելացնել
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      անուն
                    </th>
                    <th scope="col" className="px-6 py-4">
                      ազգանուն
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Էլ.հասցե
                    </th>
                    <th scope="col" className="px-6 py-4">
                      հեռախուսահամար
                    </th>
                    {/* <th scope="col" className="px-6 py-4">
                      Էլ.հասցե
                    </th> */}
                    <th scope="col" className="px-6 py-4 ">
                      ջնջել
                    </th>
                  </tr>
                </thead>
                {CheckTypes({
                  type: user.userType,
                  customer: userSubs?.subCustomers,
                  carrier: userSubs?.subCarrier,
                })?.map((el: any, i: number) => (
                  <TeamMember {...el} key={i} />
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
