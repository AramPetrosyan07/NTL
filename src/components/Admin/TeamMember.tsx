import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";

import ModalDelete from "../../UI/ModalDelete";
import { useState } from "react";

const TeamMember = ({
  _id,
  firstName,
  lastName,
  title,
  email,
  phoneNumber,
  online,
}: any) => {
  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <tbody>
        <tr className="border-b dark:border-neutral-500 bg-slate-200 dark:bg-slate-700">
          <td className="whitespace-nowrap px-6 py-4">{firstName}</td>
          <td className="whitespace-nowrap px-6 py-4">{lastName}</td>
          <td className="whitespace-nowrap px-6 py-4">{email}</td>
          <td className="whitespace-nowrap px-6 py-4">{phoneNumber}</td>
          <td className="whitespace-nowrap px-6 py-4 cursor-pointer text-xl hover:text-gray-500 transition-all">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-[#ef4444] px-2 py-2 text-sm font-medium text-white hover:bg-[#dc2626] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <RiDeleteBin6Line />
            </button>
            <ModalDelete
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              id={_id}
              userType={user.userType}
              fullName={`${firstName} ${lastName}`}
            />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TeamMember;
