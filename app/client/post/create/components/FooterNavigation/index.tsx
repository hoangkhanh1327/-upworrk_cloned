'use client';

import { useContext } from 'react';
import { CreatePostContext } from '../../context/CreatePostContext';
import { Progress } from '@/app/components/ui/progress';

const FooterNavigation = () => {
    const { step, goNextStep, goPreviousStep } = useContext(CreatePostContext);
    const progressValue = Math.round((step / 5) * 100)
    return (
        <footer className='mt-[100px] z-[1] fixed bottom-0 right-0 left-0'>
            <div className='flex items-center w-full'>
                <Progress value={progressValue} className='h-1' color='#14a800' />
            </div>
        </footer>
    );
};

export default FooterNavigation;
