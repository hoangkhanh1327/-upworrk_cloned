'use client';

import ProtectedHeader from '../components/ProtectedHeader';
import ProtectedFooter from '../components/ProtectedFooter';
import { usePathname } from 'next/navigation';

// Layout se dung de tao giao dien chung cho cac trang trong cung folder
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <>
            <ProtectedHeader />
            {pathname === '/client/post/create' ? (
                children
            ) : (
                <>
                    <main className='container py-8'>{children}</main>
                    {pathname.includes('/client/post') ? null : (
                        <ProtectedFooter />
                    )}
                </>
            )}
        </>
    );
};

export default ClientLayout;
