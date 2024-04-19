'use client'
import * as React from 'react';
import { cn } from '@/lib/utils';
import { NavigationMenuLink } from '@/app/components/ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';

 
import { useRouter } from 'next/navigation'
import { commonServices } from '@/app/services/common.services';
import { useEffect, useState, useContext } from 'react';
import { NotificationContext } from '@/app/providers/NotificationProvider';
interface ListNotiProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string;
    isRead: number;
    idNoti: number;
    image: any;
    linkable?: string; // Allow linkable to be optional
}
const ListNoti = React.forwardRef<HTMLAnchorElement, ListNotiProps>(
    ({ className, title, isRead,image, linkable, children,idNoti, ...props }, ref) => {
        let router = useRouter();
       let { markNotificationAsRead } = useContext(NotificationContext);
        
        // Hàm để cắt chuỗi nếu quá dài
        const truncateString = (str: any, maxLength: number) => {
            return str.length > maxLength
                ? str.slice(0, maxLength) + '...'
                : str;
        };

        // Sử dụng hàm truncateString để giới hạn độ dài của title và children
        const truncatedTitle = truncateString(title, 50); // Giới hạn title 50 ký tự
        const truncatedChildren = truncateString(children, 60);
        const handleClick = (e:any,linkable:any,idNoti:number) => {
            // Navigate to the desired page
            console.log("push", linkable);
            commonServices.pushSeenNoti(idNoti);
            markNotificationAsRead();
            if (linkable.startsWith("http")) {
                // Nếu linkable là một đường dẫn web bên ngoài
                window.open(linkable, '_blank'); // Mở trong tab mới
            } else {
                // Nếu linkable là một đường dẫn trong ứng dụng
                router.push(linkable);
            }
        };
    
        return (
            <div className='px-2 mt-3 py-2 border-b border-solid rounded-sm border-stone-200 hover:bg-gray-100'>
                <NavigationMenuLink asChild>
                    
                    <div
                        style={{width:'500px',cursor: 'pointer'}}
                            onClick={(e) => {
                                handleClick(e,linkable,idNoti)
                            }}
                            className='block'
                        >
                            <div className='flex items-center gap-x-4'>
                                <Image
                                    src={
                                       'https://timviecits.id.vn/storage/notificationdefault.png'
                                    }
                                    alt=''
                                    width={50}
                                    height={50}
                                />
                                <div className='flex-1'>
                                    <div style={{ fontWeight: 600 }}>
                                        {truncatedTitle}
                                    </div>
                                    <div>{truncatedChildren}</div>
                                </div>
                                <div className='w-4 h-4 text-4xl text-primary-color/75'>
                                    {isRead == 1 ? '' : '*'}
                                </div>
                            </div>
                        </div>
                    
                </NavigationMenuLink>
            </div>
        );
    }
);
ListNoti.displayName = 'ListNoti';

export default ListNoti;
