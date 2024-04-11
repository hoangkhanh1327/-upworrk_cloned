import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import UpdateCommonInfoDialog from '../Dialogs/UpdateCommonInfoDialog';
import UpdatePersonalInfoDialog from '../Dialogs/UpdatePersonalInfoDialog';
import UpdateSkillDialog from '../Dialogs/UpdateSkillDialog';
import UpdateAvatarDialog from '../Dialogs/UpdateAvatarDialog';

const DialogProvider = () => {
    const { isModalOpen, modalType } = useContext(ProfileContext);
    if (!isModalOpen) return null;

    return (
        <>
            {modalType === 'edit-common-info' && <UpdateCommonInfoDialog />}
            {modalType === 'edit-personal-info' && <UpdatePersonalInfoDialog />}
            {modalType === 'edit-skill-info' && <UpdateSkillDialog />}
            {modalType === 'edit-avatar' && <UpdateAvatarDialog />}
        </>
    );
};

export default DialogProvider;
