'use client';

import { useContext } from 'react';
import { CreatePostContext } from '../../context/CreatePostContext';
import { Progress } from '@/app/components/ui/progress';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';

const FooterNavigation = () => {
    const router = useRouter();
    const { step, goNextStep, goPreviousStep } = useContext(CreatePostContext);
    const progressValue = Math.round((step / 4) * 100);

    const handleGoBack = () => {
        if (step === 1) {
            router.back();
        } else {
            goPreviousStep?.();
        }
    };


    return (
        <footer className='mt-[100px] z-[1] fixed bottom-0 right-0 left-0'>
            <Progress value={progressValue} className='h-1' color='#14a800' />
            <div className='p-6'>
                <div className='h-10 w-full flex items-center justify-between'>
                    <Button
                        className='text-base text-[#14a800] bg-white hover:bg-[#f7faf7] rounded-[10rem] border-2 border-solid border-[#d5e0d5] px-6'
                        onClick={handleGoBack}
                    >
                        Back
                    </Button>
                    {step < 4 && (
                        <Button
                            className='text-base text-[#14a800] bg-white hover:bg-[#f7faf7] rounded-[10rem] border-2 border-solid border-[#d5e0d5] px-6'
                            onClick={goNextStep}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default FooterNavigation;
