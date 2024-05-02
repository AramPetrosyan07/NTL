import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Logo from "../../assets/mainlogo.svg";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import {
  deleteNotification,
  openNotification,
  pinNotification,
} from "../../store/asyncThunk";
import {
  deleteNotificationReducer,
  openNotificationReducer,
  pinNotificationReducer,
} from "../../store/customerSlice";

interface SubContact {
  _id: string;
  firstName: string;
  lastName: string;
}
interface IsubContactCarrier {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface Load {
  pickup: {
    location: Location;
    description: string;
  };
  delivery: {
    location: Location;
    description: string;
  };
  _id: string;
  rate: number;
  commodity: string;
  status: "paid" | "open" | "onRoad" | "delivered";
}
interface Truck {
  pickup: {
    location: Location;
    description: string;
  };
  delivery: {
    location: Location;
    description: string;
  };
  _id: string;
  rate: number;
  commodity: string;
  status: "paid" | "open" | "onRoad" | "delivered";
}

interface INotification {
  _id: string;
  opened: boolean;
  pin: boolean;
  subContact: SubContact;
  subContactCarrier: IsubContactCarrier;
  load: Load;
  truck: Truck;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Notification = ({ notification }: { notification: INotification }) => {
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const [isRead, setIsRead] = useState<boolean>(false);
  const [openNot, setOpenNot] = useState<boolean>(false);

  const getTitle = (): string => {
    if (notification.load && notification.load.status === "paid") {
      return `Բեռնափոխադրումը վճարված է`;
    } else if (notification.truck && notification.truck.status === "paid") {
      return `Բեռափոխադրումը վճարված է`;
    } else if (notification.load && notification.load.status === "onRoad") {
      return `Բեռը ճանապարհին է`;
    } else if (notification.truck && notification.truck.status === "onRoad") {
      return `Բեռը ճանապարհին է`;
    } else if (notification.load && notification.load.status === "delivered") {
      return `Բեռը դատարկված է`;
    } else if (
      notification.truck &&
      notification.truck.status === "delivered"
    ) {
      return `Բեռը դատարկված է`;
    } else {
      return `Բեռնափոխադրման պատվերը ստեղծված է`;
    }
  };

  const getDescription = () => {
    return (
      <div>
        <p>
          Աշխատակից:{" "}
          {notification?.subContact?.firstName ||
            notification?.subContactCarrier?.firstName ||
            ""}
          {notification?.subContact?.lastName ||
            notification?.subContactCarrier?.lastName ||
            ""}
        </p>
        <p>
          ՈՒղղություն:{" "}
          {notification?.load?.pickup?.description ||
            notification?.truck?.pickup?.description ||
            ""}
          ից դեպի{" "}
          {notification?.load?.delivery?.description ||
            notification?.truck?.delivery?.description ||
            ""}
        </p>
        <p>
          Ապրանքի տեսակը:{" "}
          {notification?.load?.commodity ||
            notification?.truck?.commodity ||
            ""}
        </p>

        {(notification?.load?.status === "paid" ||
          notification?.truck?.status === "paid") && (
          <p>
            Բեռնափոխադրման գինը:{" "}
            {notification?.load?.rate || notification?.truck?.rate || ""}$
          </p>
        )}
      </div>
    );
  };

  const isShown = () => {
    if (!notification.opened) {
      dispatch(openNotification({ id: notification._id }));
      dispatch(openNotificationReducer({ id: notification._id }));
    }
  };

  const pin = () => {
    dispatch(
      pinNotification({
        id: notification._id,
        pin: notification.pin,
      })
    );
    dispatch(
      pinNotificationReducer({ id: notification._id, pin: notification.pin })
    );
  };

  const deleteNot = () => {
    dispatch(
      deleteNotification({ id: notification._id, userType: user.userType })
    );
    dispatch(deleteNotificationReducer({ id: notification._id }));
  };

  const convertMongoDate = (mongoDate: string): string => {
    const date = new Date(mongoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year} ${hours}.${minutes}`;
  };

  return (
    <div
      className="border-2 border-gray-200 dark:border-none shadow-lg  rounded-xl dark:bg-neutral-800"
      onClick={(e) => {
        setOpenNot((prev) => !prev);
        isShown();
      }}
    >
      <div
        className={`font-bold cursor-pointer flex justify-start items-center p-2 ${
          isRead ? "text-gray-500 " : "text-black "
        }`}
      >
        <div className="w-[50px] h-full flex justify-center items-center">
          <div className="w-[40px] h-[40px] border-2 border-gray-400 rounded-full bg-gray-200 flex justify-center items-center ">
            <img src={Logo} alt="" className="w-[36px]" />
          </div>
        </div>
        <div className="w-full  flex md:flex-row flex-col-reverse items-center">
          <div
            className={`w-full lg:w-[70%] h-full ${
              notification.opened ? "font-normal" : "font-semibold"
            }   flex flex-col justify-start pl-4 dark:text-white`}
          >
            <h4>{getTitle()}</h4>
          </div>
          <div className="w-full lg:w-[30%] h-full  flex md:flex-col flex-row md:justify-around justify-between items-end pl-4 md:pr-4 pr-0 font-light">
            <div className="">{convertMongoDate(notification.createdAt)}</div>
            <div className="stars flex gap-4">
              <span
                className="text-xl"
                onClick={(e) => {
                  pin();
                  e.stopPropagation();
                }}
              >
                {notification.pin ? (
                  <AiFillStar color="orange" />
                ) : (
                  <AiOutlineStar />
                )}
              </span>
              <div className="text-xl flex gap-4">
                <span className="transition-all hover:text-gray-500">
                  {notification.opened ? (
                    <HiOutlineMailOpen />
                  ) : (
                    <HiOutlineMail />
                  )}
                </span>
                <span
                  className="transition-all hover:text-red-500"
                  onClick={(e) => {
                    deleteNot();
                    e.stopPropagation();
                  }}
                >
                  <RiDeleteBin7Line />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openNot && (
        <div className="text-black dark:text-white text-sm leading-6 font-semibold py-4 px-2">
          {getDescription()}
        </div>
      )}
    </div>
  );
};

export default Notification;
