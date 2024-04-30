import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import { notificationsData } from "../../data/notificationData";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { getNotification } from "../../store/asyncThunk";

const Notifications: React.FC = () => {
  const { user, notifications } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    if (user.userType.toLowerCase().includes("sub")) {
      navigate("/admin/settings");
    }
  }, [pathname]);

  useEffect(() => {
    if (!notifications.length) {
      dispatch(getNotification());
    }
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div>
        {notifications.length ? (
          <div className="flex flex-col gap-2">
            {notifications.map((notification: any, index: number) => (
              <Notification key={index} notification={notification} />
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
