import { useContext } from 'react';
import { EditPostContext } from '../context/EditPostContext';
import UpdatePostTitleDialog from '../dialogs/UpdatePostTitleDialog';

const EditPostModalProvider = () => {
    const { modalType, isModalOpen } = useContext(EditPostContext);
    if (!isModalOpen) return null;
    return <>{modalType === 'edit-post-title' && <UpdatePostTitleDialog />}</>;
};

export default EditPostModalProvider;
