import { useToast } from '@/app/components/ui/use-toast';
import { clientServices } from '@/app/services/client.services';
import { DetailClientPost } from '@/app/types/client.types';
import { createContext, useCallback, useState } from 'react';

type modalType =
    | 'edit-post-title'
    | 'edit-personal-info'
    | 'edit-skill-info'
    | 'change-password';

interface IEditPostContext {
    post: DetailClientPost | null;
    loading: boolean;
    isModalOpen: boolean;
    modalType: modalType | null;
    onOpenModal?: (data: modalType) => void;
    onCloseModal?: () => void;
    handleGetPostDetail?: (postId: string) => void;
}

export const EditPostContext = createContext<IEditPostContext>({
    isModalOpen: false,
    modalType: null,
    post: null,
    loading: false,
});

const EditPostProvider = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, toggleModalOpen] = useState(false);
    const { toast } = useToast();
    const [modalType, setModalType] = useState<modalType | null>(null);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<DetailClientPost | null>(null);

    const onCloseModal = useCallback(() => {
        toggleModalOpen(false);
        setModalType(null);
    }, []);

    const onOpenModal = useCallback((type: modalType) => {
        toggleModalOpen(true);
        setModalType(type);
    }, []);

    const handleGetPostDetail = useCallback(async (postId: string) => {
        try {
            setLoading(true);
            const res = await clientServices.getPost(postId);
            if (res.data) {
                setPost(res.data);
            }
        } catch (error) {
            toast({
                title: 'Tải thông tin công việc thất bại',
                description: (error as Error)?.message,
                duration: 1000,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <EditPostContext.Provider
            value={{
                post,
                loading,
                isModalOpen,
                modalType,
                onCloseModal,
                onOpenModal,
                handleGetPostDetail,
            }}
        >
            {children}
        </EditPostContext.Provider>
    );
};

export default EditPostProvider;
