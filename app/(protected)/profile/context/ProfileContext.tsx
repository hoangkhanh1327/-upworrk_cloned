'use client';

import {
    Dispatch,
    SetStateAction,
    createContext,
    useCallback,
    useState,
} from 'react';
import { menuData } from '../configs/menuData';

type modalType =
    | 'edit-common-info'
    | 'edit-personal-info'
    | 'edit-skill-info'
    | 'change-password'
    | 'edit-avatar';

interface IProfileContext {
    menu: string;
    isModalOpen: boolean;
    modalType: modalType | null;
    setMenu?: Dispatch<SetStateAction<string>>;
    onOpenModal?: (data: modalType) => void;
    onCloseModal?: () => void;
}

export const ProfileContext = createContext<IProfileContext>({
    menu: 'info',
    isModalOpen: false,
    modalType: null,
});

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [menu, setMenu] = useState(menuData[0].key);
    const [isModalOpen, toggleModalOpen] = useState(false);
    const [modalType, setModalType] = useState<modalType | null>(null);

    const onCloseModal = useCallback(() => {
        toggleModalOpen(false);
        setModalType(null);
    }, []);

    const onOpenModal = useCallback((type: modalType) => {
        toggleModalOpen(true);
        setModalType(type);
    }, []);

    return (
        <ProfileContext.Provider
            value={{
                menu,
                isModalOpen,
                modalType,
                setMenu,
                onCloseModal,
                onOpenModal,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
