'use client';

import React, { useEffect, useState } from 'react';

import Navbar from './Navbar';
import Logo from './Logo';
import Action from './Action';
import { cn } from '@/lib/utils';

const Header = () => {
    const [fixed, setFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setFixed(true);
            } else {
                setFixed(false);
            }
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={cn(
                '',
                fixed ? 'fixed top-0 left-0 right-0 bg-white z-50 shadow-xl' : 'relative'
            )}
        >
            <header className='container'>
                <div className='h-16 flex items-center'>
                    <Logo />
                    <Navbar />
                    <Action />
                </div>
            </header>
        </div>
    );
};

export default Header;
