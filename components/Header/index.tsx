import React from 'react';

import Navbar from './Navbar';
import Logo from './Logo';
import Action from './Action';

const Header = () => {
    return (
        <div className='border-b border-stone-300/95 py-4'>
            <header className='container'>
                <div className='flex items-center'>
                    <Logo />
                    <Navbar />
					<Action />
                </div>
            </header>
        </div>
    );
};

export default Header;
