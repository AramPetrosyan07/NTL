import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import { notificationsData } from "../../data/notificationData";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useLocation, useNavigate } from "react-router-dom";

const Notifications: React.FC = () => {
  const [data, setData] = useState(notificationsData);
  const { user } = useTypedSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    if (user.userType.toLowerCase().includes("sub")) {
      navigate("/admin/settings");
    }
  }, [pathname]);

  const handleChangeOpenStatus = (id: any) => {
    const currentNotification = notificationsData.filter(
      (el: any) => el.id == id
    );
    currentNotification.isOpened = true;
  };
  const handleDeleteNotification = (id: number) => {
    const updatedNotifications = data.filter(
      (notification: any) => notification.id !== id
    );
    setData(updatedNotifications);
  };
  return (
    <div className="container mx-auto mt-8">
      <div>
        {notificationsData.length ? (
          <div className="flex flex-col gap-2">
            {data.map((notification: string | any, index: string | null) => (
              <Notification
                key={index}
                id={notification.id}
                title={notification.title}
                description={notification.description}
                handleChangeOpenStatus={handleChangeOpenStatus}
                handleDeleteNotification={handleDeleteNotification}
              />
            ))}
          </div>
        ) : (
          <p className="w-full text-center">Նոր ծանուցումներ չկան</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
