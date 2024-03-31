"use client";
import { StateContextProvider } from "@/context";
import { FC, createContext, useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";
import Cookies from 'js-cookie';
import { commonServices } from "../services/common.services";
import { AuthContext } from "./AuthProvider";

export const NotificationContext = createContext<any>(null);

interface INotificationProvider {
  children: React.ReactNode;
}

const NotificationProvider: FC<INotificationProvider> = ({ children }) => {
  const [notifications, setNotifications] = useState<any>([]);
  const user = useContext(AuthContext);
  // getNotification
  const getNotification = async (data: any) => {
    try {
      // setIsGettingPosts(true);
      const res = await commonServices.getNotification(data);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      // setIsGettingPosts(false);
    }
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      const fetchData = async () => {
        const data = await getNotification({ user_id: 9 });
        
        return setNotifications(data);
        // console.log('notifications ------------->', notifications)
      };
      fetchData();
      // console.log("notifications", notifications);
    } else {
      return () => {
        setNotifications([]);
      };
    }
  }, [user.isAuthenticated]);

  const handelPusher = async () => {
    const pusher = new Pusher("ef55c815a7f46a4c8f1a", {
      cluster: "ap1",
      //   secret: '15836c8f7dc20e6e411e',
    });
    const user_type = Cookies.get('account_type');;
    const user_id = user.user?.id;
    const channel = pusher.subscribe(`notify.${user_type}.${user_id}`);
    //Truyền dô mỗi tài khoản sẽ có 1 kênh lắng nghe

    channel.bind("notify.new", function (data: any) {
      setNotifications((prevNotifications: any) => [
        ...prevNotifications,
        data,
      ]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  };
  if(user.isAuthenticated){
    handelPusher();
  }

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
