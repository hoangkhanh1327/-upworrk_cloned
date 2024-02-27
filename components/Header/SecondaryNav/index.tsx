import Link from 'next/link';
import { subMenu } from '../menuData';
import secondaryNavStyles from './secondary-nav.module.scss';

const SecondaryNav = () => {
    return (
        <div className={secondaryNavStyles['secondary-nav']}>
            <div id='id'></div>
            <ul className={secondaryNavStyles['nav-subnav']}>
                {subMenu.map((menu, index) => {
                    return (
                        <li
                            key={`sub-menu-${index}`}
                            className={secondaryNavStyles['nav-sub-item']}
                        >
                            <Link
                                href={'/'}
                                className={
                                    secondaryNavStyles['nav-sub-item-link']
                                }
                            >
                                {menu.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SecondaryNav;
