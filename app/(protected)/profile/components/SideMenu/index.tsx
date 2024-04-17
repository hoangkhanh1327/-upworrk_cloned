'use client';

import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { menuData } from '../../configs/menuData';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/providers/AuthProvider';

const SideMenu = () => {
    const { menu, setMenu } = useContext(ProfileContext);
    const { user } = useAuth();
    return (
        <aside>
            <h3 className='line-clamp-1 block text-ellipsis text-5xl font-medium mb-6 text-black'>
                Cài đặt
            </h3>
            <div>
                <ul className='relative p-0 m-0 mb-2 list-none block'>
                    {menuData.map((menuItem, index) => {
                        // Nếu profile đã complete thì ẩn menu xác thực đi
                        // if (user?.is_completed_profile && index === 1) {
                        //     return null;
                        // }
                        return (
                            <li key={`menu-${index}`} className='border-none'>
                                <span
                                    className={cn(
                                        'm-0 bg-white leading-none relative flex items-center gap-3 text-base tracking-[0.02em] no-underline cursor-pointer py-3 pl-3 before:content-[""] before:rounded-[2px] before:absolute before:top-0 before:left-[2px] before:h-full before:w-[2px] transition-all',
                                        menu !== menuItem.key
                                            ? 'text-black'
                                            : 'text-primary-color before:top-1 before:h-[calc(100%_-_8px)] before:bg-primary-color'
                                    )}
                                    onClick={() => setMenu?.(menuItem.key)}
                                >
                                    {menuItem.title}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default SideMenu;
