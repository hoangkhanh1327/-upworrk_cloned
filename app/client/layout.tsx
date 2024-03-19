import Header from '../components/Header';
import ProtectedFooter from '../components/ProtectedFooter';

// Layout se dung de tao giao dien chung cho cac trang trong cung folder
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='container py-8 px-20'>{children}</main>
            <ProtectedFooter />
        </>
    );
};

export default ClientLayout;
