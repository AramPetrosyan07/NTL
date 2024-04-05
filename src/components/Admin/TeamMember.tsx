import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { removeCustomerSubs } from "../../store/asyncThunk";

const TeamMember = ({
  _id,
  firstName,
  lastName,
  title,
  email,
  phoneNumber,
  online,
}: any) => {
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);

  return (
    <>
      <tbody>
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap px-6 py-4">{firstName}</td>
          <td className="whitespace-nowrap px-6 py-4">{lastName}</td>
          <td className="whitespace-nowrap px-6 py-4">{email}</td>
          <td className="whitespace-nowrap px-6 py-4">{phoneNumber}</td>
          {/* <td className="whitespace-nowrap px-6 py-4">
            <CheckBox />
          </td> */}
          <td
            onClick={() => {
              // dispatch(removeCustomerSubs(_id));
              dispatch(removeCustomerSubs({ _id, userType: user.userType }));
            }}
            className="whitespace-nowrap px-6 py-4 cursor-pointer text-xl hover:text-gray-500 transition-all"
          >
            <RiDeleteBin6Line />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TeamMember;
