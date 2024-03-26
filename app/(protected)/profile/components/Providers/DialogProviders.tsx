import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';

const DialogProvider = () => {
    const { isModalOpen, modalType } = useContext(ProfileContext);
    if (!isModalOpen) return null;

    return <></>;
};

export default DialogProvider;
