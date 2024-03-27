import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import UpdateCommonInfoDialog from '../Dialogs/UpdateCommonInfoDialog';
import UpdatePersonalInfoDialog from '../Dialogs/UpdatePersonalInfoDialog';

const DialogProvider = () => {
    const { isModalOpen, modalType } = useContext(ProfileContext);
    if (!isModalOpen) return null;

    return (
        <>
            {modalType === 'edit-common-info' && <UpdateCommonInfoDialog />}
            {modalType === 'edit-personal-info' && <UpdatePersonalInfoDialog />}
        </>
    );
};

export default DialogProvider;
