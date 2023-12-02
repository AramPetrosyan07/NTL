import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Logo from "../../assets/mainlogo.svg";
interface NotificationProps {
  title?: string;
  description?: string;
}

const Notification = ({
  title,
  description,
  handleChangeOpenStatus,
  handleDeleteNotification,
  id,
}: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [isImportant, setIsImportant] = useState<boolean>(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
    setIsRead(true);
    handleChangeOpenStatus(id);
  };
  const handleSetImportant = () => {
    setShowDetails(false);
    setIsImportant((prev) => !prev);
  };
  const toggleEmailIcon = () => {
    setIsRead((prev) => !prev);
  };
  const getCurrentDateTime = (): string => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  return (
    <div className="border-2 border-gray-200 shadow-lg  rounded-xl">
      <div
        className={`font-bold cursor-pointer flex justify-center items-center p-2 ${
          isRead ? "text-gray-500 " : "text-black "
        }`}
      >
        <div className="w-[50px] h-full flex justify-center items-center">
          <div className="w-[40px] h-[40px] border-2 border-gray-400 rounded-full bg-gray-200 flex justify-center items-center ">
            <img src={Logo} alt="" className="w-[36px]" />
          </div>
        </div>
        <div className="w-full  flex md:flex-row flex-col-reverse">
          <div
            className="w-full lg:w-[70%] h-full font-semibold  flex flex-col justify-between items-start pl-4"
            onClick={toggleDetails}
          >
            <h4>Customer's support team</h4>
            <h4 className="text-sm">{title}</h4>
          </div>
          <div className="w-full lg:w-[30%] h-full  flex md:flex-col flex-row md:justify-around justify-between items-end pl-4 md:pr-4 pr-0 font-light">
            <div className="">{getCurrentDateTime()}</div>
            <div className="stars flex gap-4">
              <span className="text-xl" onClick={handleSetImportant}>
                {isImportant ? (
                  <AiFillStar color="orange" />
                ) : (
                  <AiOutlineStar />
                )}
              </span>
              <div className="text-xl flex gap-4">
                <span
                  className="transition-all hover:text-gray-500"
                  onClick={toggleEmailIcon}
                >
                  {isRead ? <HiOutlineMailOpen /> : <HiOutlineMail />}
                </span>
                <span
                  className="transition-all hover:text-gray-500"
                  onClick={() => handleDeleteNotification(id)}
                >
                  <RiDeleteBin7Line />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDetails && (
        <p className="text-gray-600 text-sm leading-6 font-semibold py-4 px-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default Notification;
