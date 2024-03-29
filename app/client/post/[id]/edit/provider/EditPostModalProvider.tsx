import { useContext } from 'react';
import { EditPostContext } from '../context/EditPostContext';
import UpdatePostTitleDialog from '../dialogs/UpdatePostTitleDialog';
import UpdatePostDescDialog from '../dialogs/UpdatePostDescDialog';
import UpdatePostContentDialog from '../dialogs/UpdatePostContentDialog';
import UpdatePostSkillDialog from '../dialogs/UpdatePostSkillDialog';
import UpdatePostThumbnailDialog from '../dialogs/UpdatePostThumbnailDialog';
import UpdatePostContentFileDialog from '../dialogs/UpdatePostContentFileDialog';

const EditPostModalProvider = () => {
    const { modalType, isModalOpen } = useContext(EditPostContext);
    if (!isModalOpen) return null;
    return (
        <>
            {modalType === 'edit-post-title' && <UpdatePostTitleDialog />}
            {modalType === 'edit-post-desc' && <UpdatePostDescDialog />}
            {modalType === 'edit-post-content' && <UpdatePostContentDialog />}
            {modalType === 'edit-post-skill' && <UpdatePostSkillDialog />}
            {modalType === 'edit-post-content-file' && <UpdatePostContentFileDialog />}
            {modalType === 'edit-post-thumbnail' && (
                <UpdatePostThumbnailDialog />
            )}
        </>
    );
};

export default EditPostModalProvider;
