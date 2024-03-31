"use client";
import { StateContextProvider } from "@/context";
import { FC, createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export const NotificationContext = createContext<any>(null);

interface INotificationProvider {
    children: React.ReactNode;
}

const NotificationProvider: FC<INotificationProvider> = ({ children }) => {
    const [notifications, setNotifications] = useState<any>([]);

    // useEffect(() => {
    //     const notification = new Notification('Hello world');
    //     notification.onclick = () => {
    //         console.log('Notification clicked');
    //     };
    // }, []);
    useEffect(() => {
        const pusher = new Pusher('ef55c815a7f46a4c8f1a', {
          cluster: 'ap1',
        //   secret: '15836c8f7dc20e6e411e',
        });
        const user_type = 'freelancer';
        const user_id = 9;
        const channel = pusher.subscribe(`notify.${user_type}.${user_id}`);
        //Truyền dô mỗi tài khoản sẽ có 1 kênh lắng nghe
    
        channel.bind('notify.new', function(data) {
          setNotifications(prevNotifications => [...prevNotifications, data]);
        });
    
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }, []);
    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;