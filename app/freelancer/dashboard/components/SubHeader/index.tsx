'use client';

import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';

const SubHeader = () => {
    const router = useRouter();
    return (
        <div className='flex items-start justify-between'>
            <h2 className='text-5xl leading-[48px] tracking-normal font-medium mt-1 mb-2'>
                All job posts
            </h2>
            <div>
                <Button className='block px-6 w-full bg-[#108a00] hover:bg-[#108a00]/80  rounded-[10rem] '>
                    Post a new job
                </Button>
            </div>
        </div>
    );
};

export default SubHeader;
