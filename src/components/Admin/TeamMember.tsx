import React from "react";
import CheckBox from "../../UI/CheckBox";
import { RiDeleteBin6Line } from "react-icons/ri";
const TeamMember = ({
  firstName,
  lastName,
  title,
  email,
  tell,
  online,
}: any) => {
  return (
    <>
      <tbody>
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap px-6 py-4">{firstName}</td>
          <td className="whitespace-nowrap px-6 py-4">{lastName}</td>
          <td className="whitespace-nowrap px-6 py-4">{email}</td>
          <td className="whitespace-nowrap px-6 py-4">{tell}</td>
          <td className="whitespace-nowrap px-6 py-4">
            <CheckBox />
          </td>
          <td className="whitespace-nowrap px-6 py-4 cursor-pointer text-xl hover:text-gray-500 transition-all">
            <RiDeleteBin6Line />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TeamMember;
