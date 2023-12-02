import React from 'react'
import { CiEdit } from "react-icons/ci";
import { AiOutlineCheck } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
const Edit = ({isDisabled,handleEdit,handleSave}:any) => {
  return (
    <div className="w-full absolute top-2 right-2">
            {!isDisabled ? (
              <div
                className="edit w-6 h-6 rounded-full bg-blue-200 text-md  font-bold flex justify-center items-center absolute top-2 right-2 cursor-pointer"
                onClick={handleEdit}
              >
                <CiEdit />
              </div>
            ) : (
              <div className="absolute top-2 right-2 cursor-pointer flex gap-2">
                <div
                  className="edit w-6 h-6 rounded-full bg-blue-200 text-md text-green-600  font-bold flex justify-center items-center cursor-pointer"
                  onClick={handleSave}
                >
                  <AiOutlineCheck />
                </div>
                <div className="edit w-6 h-6 rounded-full bg-blue-200 text-md text-green-600  font-bold flex justify-center items-center  cursor-pointer">
                  <FcCancel />
                </div>
              </div>
            )}
          </div>
  )
}

export default Edit
