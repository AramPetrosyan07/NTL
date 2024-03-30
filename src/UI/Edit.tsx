import React from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineCheck } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
const Edit = ({ isDisabled, handleEdit, handleSave }: any) => {
  return (
    <div className="w-full flex justify-end">
      {!isDisabled ? (
        <div
          className="edit w-14 h-14 rounded-full bg-blue-200 text-md  font-bold flex justify-center items-center  top-2 right-2 cursor-pointer"
          onClick={handleEdit}
        >
          <CiEdit size={30} />
        </div>
      ) : (
        <div className=" top-2 right-2 cursor-pointer flex gap-2">
          <div
            className="edit w-14 h-14 rounded-full bg-blue-200 text-md text-green-600  font-bold flex justify-center items-center cursor-pointer"
            onClick={handleSave}
          >
            <AiOutlineCheck size={30} />
          </div>
          <div
            onClick={handleSave}
            className="edit w-14 h-14 rounded-full bg-blue-200 text-md text-green-600  font-bold flex justify-center items-center  cursor-pointer"
          >
            <FcCancel size={30} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
