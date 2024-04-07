'use client';

import { useRouter } from 'next/navigation';

const SubHeader = () => {
    const router = useRouter();
    return (
        <div className='flex items-start justify-between'>
            <h2 className='text-5xl leading-[48px] tracking-normal font-medium mt-1 mb-2'>
                Công việc của tôi
            </h2>
        </div>
    );
};

export default SubHeader;
