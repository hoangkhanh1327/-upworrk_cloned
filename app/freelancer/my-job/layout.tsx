'use client';

import { usePathname } from 'next/navigation';
import SubNav from './components/SubNav';
import UserProfile from './components/UserProfile';
import { cn } from '@/lib/utils';

const FreelancerDashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();

    return (
        <>
            <div className='grid grid-cols-6'>
                <div
                    className={cn(
                        '',
                        pathname === '/freelancer/my-job'
                            ? 'col-span-4'
                            : 'col-span-6'
                    )}
                >
                    {/* <div className='mb-6'>
                        <SubNav />
                    </div> */}
                    {children}
                </div>
                {pathname === '/freelancer/my-job' && (
                    <div className='col-span-2 '>
                        <UserProfile />
                    </div>
                )}
            </div>
        </>
    );
};

export default FreelancerDashboardLayout;
