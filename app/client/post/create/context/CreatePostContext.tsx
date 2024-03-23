'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ICreatePostContex {
    step: number;
    goNextStep?: () => void;
    goPreviousStep?: () => void;
}

export const CreatePostContext = createContext<ICreatePostContex>({
    step: 1,
});

export const CreatePostProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [step, setStep] = useState(1);

    const handleGoNextStep = () => {
        if (step <= 5) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const handleGoPreviousStep = () => {
        if (step >= 1) {
            setStep((prevStep) => prevStep - 1);
        }
    };

    return (
        <CreatePostContext.Provider
            value={{
                step,
                goNextStep: handleGoNextStep,
                goPreviousStep: handleGoPreviousStep,
            }}
        >
            {children}
        </CreatePostContext.Provider>
    );
};
