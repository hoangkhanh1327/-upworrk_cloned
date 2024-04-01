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
    //const [isLoading, setIsLoading] = useState(true);
    const [noties, setNoties] = useState<any>([]);

    const [unread, setUnread] = useState<number>(0);


    useEffect(() => {
        if (notifications) {
            setNoties(notifications);
            setUnread(0);
            notifications.map(i => {
                console.log("TS READ:",i.is_read);
                
                if (i.is_read == 0) {
                    setUnread(pre => pre + 1);
                }
            })
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
    }, [ noties]);

    return (
        <NavigationMenu className='tww-full'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Talent</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[70vw] lg:grid-cols-[.75fr_1fr]'>
                            <li className='row-span-3'>
                                <NavigationMenuLink asChild>
                                    <a
                                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                                        href='/'
                                    >
                                        <Icons.logo className='h-6 w-6' />
                                        <div className='mb-2 mt-4 text-lg font-medium'>
                                            shadcn/ui
                                        </div>
                                        <p className='text-sm leading-tight text-muted-foreground'>
                                            Beautifully designed components
                                            built with Radix UI and Tailwind
                                            CSS.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            {findTalentSubMenu.map((menu, index) => (
                                <ListItem
                                    key={`find-talent-menu-${index}`}
                                    href={menu.href}
                                    title={menu.title}
                                >
                                    {menu.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Work</NavigationMenuTrigger>
                    <NavigationMenuContent className='pt-4 pb-8'>
                        <div className='w-full pt-4 pb-8'>
                            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[70vw] lg:grid-cols-4'>
                                {findWorkSubMenu.map((menu) => (
                                    <ListItem
                                        key={menu.title}
                                        title={menu.title}
                                        href={menu.href}
                                    >
                                        {menu.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </div>
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
                <NavigationMenuTrigger
                        >
                    {bellElement}</NavigationMenuTrigger>
                    <NavigationMenuContent className='pt-4'>

                        <div className='overflow-y-auto' style={{ maxHeight: 400 }}>
                        <div style={{marginTop:15, marginLeft:13, fontWeight:700,fontSize:27}}>Thông Báo</div>
                            <ul >
                                {notifications.map((noti) => (
                                    <ListNoti
                                        key={noti.title}
                                        title={noti.title}
                                        href={noti.href}
                                        isRead={noti.is_read}
                                    >
                                        {noti.message}
                                    </ListNoti>
                                ))}
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
