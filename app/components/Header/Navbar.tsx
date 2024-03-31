'use client';

import * as React from 'react';
import Link from 'next/link';
import Pusher from 'pusher-js';
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

import { findTalentSubMenu, findWorkSubMenu } from './menuData';

const Navbar = () => {

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
                                <ListItem key={`find-talent-menu-${index}`} href={menu.href} title={menu.title}>
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
          
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
