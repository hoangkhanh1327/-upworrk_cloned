'use client';
import ProtectedHeader from '../components/ProtectedHeader';

const hiddenFooterPaths = ['/'];

// Layout se dung de tao giao dien chung cho cac trang trong cung folder
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProtectedHeader />
            <main className='container py-8'>{children}</main>
        </>
    );
};

export default ProtectedLayout;
