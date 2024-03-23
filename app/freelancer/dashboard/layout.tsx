import SubNav from './components/SubNav';

const FreelancerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='grid grid-cols-6'>
                <div className='col-span-4'>
                    <div className='mb-6'>
                        <SubNav />
                    </div>
                    {children}
                </div>
                <div  className='col-span-2 bg-slate-500' >
                    RIght COntent
                </div>
            </div>
        </>
    );
};

export default FreelancerDashboardLayout;
