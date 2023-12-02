import React, { useState } from "react";
import TeamMember from "./TeamMember";
import UIModal from "../../UI/ModalDetail";
const teamData = [
  {
    firstName: "Hakob",
    lastName: "Harutyunyan",
    title: "dispatcher",
    email: "hakob@ntl.com",
    tell: "+37477 34-56-78",
    online: true,
  },
  {
    firstName: "Aram",
    lastName: "Harutyunyan",
    title: "dispatcher",
    email: "hakob@ntl.com",
    tell: "+37477 34-56-78",
    online: true,
  },
  {
    firstName: "Karen",
    lastName: "Harutyunyan",
    title: "dispatcher",
    email: "hakob@ntl.com",
    tell: "+37477 34-56-78",
    online: true,
  },
  {
    firstName: "Gagik",
    lastName: "Harutyunyan",
    title: "dispatcher",
    email: "hakob@ntl.com",
    tell: "+37477 34-56-78",
    online: true,
  },
];
const Teams = () => {
  const [open,setOpen] =useState(false)

  const handleAddNewTeamMember = ()=>{
    setOpen(true)
  }
  return (
    <div>
      <UIModal open={open} setOpen={setOpen}/>
      <div className="w-full h-20 border-2 rounded-xl flex justify-between items-center px-2 md:px-4">
        <div className="flex flex-col md:flex-row h-full md:items-center items-start justify-center">
          <h4 className="text-[12px] md:text-[15px]">Թիմի անդամների քանակը</h4>
          <p>({teamData.length})</p>
        </div>
        <div className="add-team">
          <button className="bg-transparent hover:bg-[#1C90F3] text-[#1C90F3] hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-all duration-200"
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
                    <th scope="col" className="px-6 py-4">
                      Էլ.հասցե
                    </th>
                    <th scope="col" className="px-6 py-4 ">
                      ջնջել
                    </th>
                  </tr>
                </thead>
                {teamData.map((el,i) => (
                  <TeamMember {...el} key={i}/>
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
