import Footer from '../(main)/components/Footer';
import Header from '../components/Header';

// Layout se dung de tao giao dien chung cho cac trang trong cung folder
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className='container'>{children}</main>
            <Footer />
        </>
    );
};

export default ClientLayout;
