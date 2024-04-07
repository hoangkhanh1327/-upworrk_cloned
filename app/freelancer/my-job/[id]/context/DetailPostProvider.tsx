import { createContext } from 'react';

interface IDetailPostContext {}
export const DetailPostContext = createContext<IDetailPostContext>({});

export const DetailPostProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <DetailPostContext.Provider value={{}}>
            {children}
        </DetailPostContext.Provider>
    );
};
