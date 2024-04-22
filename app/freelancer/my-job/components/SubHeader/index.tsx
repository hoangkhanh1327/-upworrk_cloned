'use client';

import { useRouter } from 'next/navigation';

const SubHeader = () => {
    const router = useRouter();
    return (
        <div className='flex items-start justify-between'>
            <h3 className='text-5xl leading-[48px] tracking-normal font-medium mt-1 mb-2'>
                Công việc của tôi
            </h3>
        </div>
    );
};

export default SubHeader;
