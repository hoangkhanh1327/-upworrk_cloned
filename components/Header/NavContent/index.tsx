import Link from 'next/link';
import SearchNav from '../SearchNav';
import { menu } from '../menuData';
import navContentStyles from './nav-content.module.scss';
import { Fragment } from 'react';

const NavContent = () => {
    return (
        <div id='nav-main' className={navContentStyles['nav-collapse']}>
            <div className={navContentStyles['left-nav']}>
                {/* <SearchNav />
                <Link href={'/sign-in'} className={navContentStyles['sign-in-link']}>
                    Đăng nhập
                </Link>
                <Link href={'/sign-up'} className={navContentStyles['sign-up-link']}>
                    Đăng ký
                </Link> */}
            </div>
            <nav className={navContentStyles['right-nav']}>
                <ul>
                    {menu.map((menu, index) => {
                        return (
                            <Fragment key={`main-nav-${index}`}>
                                <li
                                    className={navContentStyles['nav-dropdown']}
                                >
                                    <button
                                        type='button'
                                        className={navContentStyles['nav-item']}
                                    >
                                        <span
                                            className={
                                                navContentStyles[
                                                    'nav-item-label'
                                                ]
                                            }
                                        >
                                            {menu.name}
                                        </span>
                                        <span>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                aria-hidden='true'
                                                viewBox='0 0 24 24'
                                                role='img'
                                            >
                                                <path
                                                    vector-effect='non-scaling-stroke'
                                                    stroke='var(--icon-color, #001e00)'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    stroke-miterlimit='10'
                                                    stroke-width='1.5'
                                                    d='M18 10l-6 5-6-5'
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </li>
                            </Fragment>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default NavContent;
