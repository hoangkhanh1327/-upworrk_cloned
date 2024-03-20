import ProtectedHeader from '../components/ProtectedHeader';
import ProtectedFooter from '../components/ProtectedFooter';

// Layout se dung de tao giao dien chung cho cac trang trong cung folder
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProtectedHeader />
            <main className='container py-8 px-20'>{children}</main>
            <ProtectedFooter />
        </>
    );
};

export default ClientLayout;
