import SubNav from './components/SubNav';
import UserProfile from './components/UserProfile';

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
                <div  className='col-span-2 ' >
                    <UserProfile/>
                </div>
            </div>
        </>
    );
};

export default FreelancerDashboardLayout;
