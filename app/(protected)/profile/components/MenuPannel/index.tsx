import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { menuData } from '../../configs/menuData';
import CommonInfo from './CommonInfoMenu';
import PasswordInfoMenu from './PasswordInfoMenu';

const MenuPannel = () => {
    const { menu } = useContext(ProfileContext);
    const selectedMenu = menuData.find((i) => i.key === menu);
    return (
        <div>
            <h3 className='mb-2 text-[28px] leading-8 tracking-[0.2px] font-medium'>
                {selectedMenu?.title || ''}
            </h3>
            <p className='mb-2 text-base leading-[22px]'>
                {selectedMenu?.description || ''}
            </p>
            {selectedMenu?.key === menuData[0].key && <CommonInfo />}
            {selectedMenu?.key === menuData[1].key && <PasswordInfoMenu />}
        </div>
    );
};

export default MenuPannel;
