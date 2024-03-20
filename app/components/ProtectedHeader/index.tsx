import React from 'react';

import Navbar from './Navbar';
import Logo from './Logo';
import Action from './Action';

const Header = () => {
    return (
        <div className=''>
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
