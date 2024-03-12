'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AccountType } from '@/@types/signup.types';
import { Button } from '@/components/ui/button';
import SelectAccountType from './SelectAccountType';
import SignUpForm from './SignUpForm';

const SignUpContainer = () => {
    const [accountType, setAccountType] = useState<AccountType | null>(null);
    const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(false);

    const handleGoToSignUp = () => {
        if (accountType) {
            setIsAccountTypeSelected(true);
        }
    };
    return (
        <div className='contaienr'>
            <div className='mt-8 mb-10'>
                {isAccountTypeSelected ? (
                    <SignUpForm />
                ) : (
                    <SelectAccountType
                        accountType={accountType}
                        setAccountType={setAccountType}
                    />
                )}

                <div className='text-center mt-10'>
                    <Button
                        disabled={accountType === null}
                        className='bg-button-primary hover:bg-button-primary/80 px-6 border-2 border-solid border-transparent rounded-[10rem] transition-all inline-flex justify-center items-center max-h-10 leading-[calc_2.5rem_-_1px] text-base font-medium disabled:bg-button-disabled disabled:text-[#9aaa97] disabled:!cursor-not-allowed disabled:pointer-events-auto'
                        onClick={() => handleGoToSignUp()}
                    >
                        {accountType === null
                            ? 'Create Account'
                            : accountType === AccountType.client
                            ? 'Join as a Client'
                            : 'Apply as a Freelancer'}
                    </Button>
                    <p className='text-center text-base leading-[22px] text-input-title tracking-[0.02em] mt-4 mb-6'>
                        Already have an account?{` `}
                        <Link
                            className='text-link hover:text-link/80 underline'
                            href={`/dang-nhap`}
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpContainer;
