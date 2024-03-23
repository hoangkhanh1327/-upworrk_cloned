import SubNav from './components/SubNav';

const ClientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='mb-6'>
                <SubNav />
            </div>
            {children}
        </>
    );
};

export default ClientDashboardLayout;
