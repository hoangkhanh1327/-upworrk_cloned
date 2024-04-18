import { notification } from "antd";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";
const Notification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, msg: string) => {
    api[type]({
      message: "Thông Báo",
      description: msg,
    });
  };
  return;
  <div>Notification</div>;
};

export default Notification;
