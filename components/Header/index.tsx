import Link from 'next/link';
import Image from 'next/image';

import headerStyle from './header.module.scss';
import NavContent from './NavContent';
import SecondaryNav from './SecondaryNav';

const Header = () => {
    return (
        <div className={headerStyle['header-container']}>
            <div className={headerStyle.header}>
                <header className={headerStyle['nav-wrapper']}>
                    <div className={headerStyle['nav-container']}>
                        <div className={headerStyle['nav-header-wrapper']}>
                            <div className={headerStyle['nav-header']}>
                                <Link
                                    href={'/'}
                                    className={headerStyle['nav-link']}
                                >
                                    <span className={headerStyle['sr-only']}>
                                        Upwork home
                                    </span>
                                    <span className={headerStyle['nav-logo']}>
                                        <Image
                                            fill
                                            src={`/images/logo.svg`}
                                            alt='upwork'
                                        />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <NavContent />
                    </div>
                </header>
                <SecondaryNav />
            </div>
        </div>
    );
};

export default Header;
