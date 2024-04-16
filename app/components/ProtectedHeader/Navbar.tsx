'use client';

import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';

import { Icons } from '@/app/components/icons';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/app/components/ui/navigation-menu';
import ListItem from './ListItem';
import { NotificationContext } from '@/app/providers/NotificationProvider';
import { FiBell } from 'react-icons/fi';
import { findTalentSubMenu, findWorkSubMenu } from './menuData';
import ListNoti from './ListNoti';

const Navbar = () => {
    const { notifications } = useContext(NotificationContext);
    const [noties, setNoties] = useState<any>([]);

    const [unread, setUnread] = useState<number>(0);
    const [statusNoti, setStatusNoti] = useState<any>(0);

    useEffect(() => {
        if (notifications) {
            setNoties(notifications);
            setUnread(0);
            notifications.map((i: any) => {
                console.log('TS READ:', i.is_read);

                if (i.is_read == 0) {
                    setUnread((pre) => pre + 1);
                }
            });
        }
        console.log(notifications);
    }, [notifications]);

    const bellElement = React.useMemo(() => {
        return (
            <div style={{ position: 'relative' }}>
                <FiBell size={24} /> {/* Notification icon */}
                {noties && noties.length > 0 && (
                    <span
                        className='text-xs w-5 h-5 absolute flex items-center justify-center'
                        style={{
                            top: '-8px',
                            right: '-8px',
                            borderRadius: '50%',
                            background: 'red',
                            color: 'white',
                        }}
                    >
                        {unread} {/* {noties.length} Number of notifications */}
                    </span>
                )}
            </div>
        );
    }, [noties]);

    return (
        <NavigationMenu className='tww-full'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Talent</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='min-w-[250px]'>
                            {findTalentSubMenu.map((menu, index) => (
                                <ListItem
                                    key={`find-talent-menu-${index}`}
                                    href={menu.href}
                                    title={menu.title}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Work</NavigationMenuTrigger>
                    <NavigationMenuContent className='pt-4 pb-8'>
                        <ul className='min-w-[250px]'>
                            {findWorkSubMenu.map((menu) => (
                                <ListItem
                                    key={menu.title}
                                    title={menu.title}
                                    href={menu.href}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href='/docs/why-us' legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Why Us
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{bellElement}</NavigationMenuTrigger>
                    <NavigationMenuContent className='pt-4'>
                        <div
                            className='overflow-y-auto'
                            style={{ maxHeight: 400 }}
                        >
                            <div
                                style={{
                                    marginTop: 15,
                                    marginLeft: 13,
                                    fontWeight: 700,
                                    fontSize: 27,
                                    width: 500,
                                }}
                            >
                                Thông Báo
                            </div>
                            <div style={{ marginLeft: 30 }}>
                                <button
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 500,
                                        color:
                                            statusNoti == 0
                                                ? '#75b6ff'
                                                : 'gray',
                                        borderRadius: '24%',
                                        backgroundColor:
                                            statusNoti == 0
                                                ? '#aac9ff'
                                                : '#aac9ff00',
                                        padding: '15',
                                        margin: '10px',
                                    }}
                                    onClick={() => {
                                        setStatusNoti(0);
                                    }}
                                >
                                    Tất cả
                                </button>
                                <button
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 500,
                                        color:
                                            statusNoti == 1
                                                ? '#75b6ff'
                                                : 'gray',
                                        borderRadius: '24%',
                                        backgroundColor:
                                            statusNoti == 1
                                                ? '#aac9ff'
                                                : '#aac9ff00',
                                        padding: '15',
                                        margin: '10px',
                                    }}
                                    onClick={() => {
                                        setStatusNoti(1);
                                    }}
                                >
                                    {' '}
                                    Chưa đọc
                                </button>
                            </div>
                            <ul>
                                {notifications.map((noti: any) => {
                                    if (statusNoti == 0) {
                                        return (
                                            <ListNoti
                                                key={noti.title}
                                                title={noti.title}
                                                linkable={noti.linkable}
                                                isRead={noti.is_read}
                                            >
                                                {noti.message}
                                            </ListNoti>
                                        );
                                    } else {
                                        if (noti.is_read == 0) {
                                            return (
                                                <ListNoti
                                                    key={noti.title}
                                                    title={noti.title}
                                                    linkable={noti.linkable}
                                                    isRead={noti.is_read}
                                                >
                                                    {noti.message}
                                                </ListNoti>
                                            );
                                            return <></>;
                                        }
                                    }
                                })}
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
