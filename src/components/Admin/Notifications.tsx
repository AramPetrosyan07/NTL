import React, { useState } from "react";
import Notification from "./Notification";
import { notificationsData } from "../../data/notificationData";

const Notifications: React.FC = () => {
  const [data, setData] = useState(notificationsData);

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
