import React, { SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import { AccountType } from '@/app/types/signup.types';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

interface ISelectAccountType {
    accountType: AccountType | null;
    setAccountType: React.Dispatch<SetStateAction<AccountType | null>>;
    handleGoToSignUpForm: () => void;
}

const SelectAccountType: React.FC<ISelectAccountType> = ({
    accountType,
    setAccountType,
    handleGoToSignUpForm,
}) => {
    return (
        <div className=''>
            <h1 className='text-4xl text-center  text-input-title font-medium mt-6 mb-10 pb-2 tracking-[-1px] font-rza'>
                Join as a client or freelancer
            </h1>
            <div className='flex gap-x-9 max-w-[562px]'>
                <div
                    onClick={() => setAccountType(AccountType.client)}
                    className={cn(
                        'relative p-6 cursor-pointer bg-white text-input-title rounded-[.5rem] border-2 border-solid border-box hover:border-box-active transition-all',
                        accountType === AccountType.client
                            ? 'border-box-active'
                            : ''
                    )}
                >
                    <div className='absolute top-3 right-3 gap-0 flex items-center justify-center cursor-pointer'>
                        <div
                            className={cn(
                                'rounded-full flex items-center justify-center w-6 h-6 transition-shadow text-white border-2 border-solid border-[#beccbe] -top-[1px]',
                                accountType === AccountType.client
                                    ? 'bg-primary-color'
                                    : 'bg-white'
                            )}
                        >
                            <span className='block border border-solid w-3 h-3 rounded-[inherit] '></span>
                        </div>
                    </div>
                    <div className='w-8 h-8'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            data-name='Layer 1'
                            viewBox='0 0 24 24'
                            role='img'
                        >
                            <path
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M19.28 21h-6.9a1.6 1.6 0 01-1.73-1.5v-4a1.6 1.6 0 011.73-1.5h6.9A1.59 1.59 0 0121 15.5v4a1.66 1.66 0 01-1.72 1.5z'
                            ></path>
                            <path
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M16.9 12h-2.15a.65.65 0 00-.72.66V14h3.59v-1.34a.65.65 0 00-.72-.66z'
                            ></path>
                            <line
                                x1='10.65'
                                x2='21'
                                y1='17.29'
                                y2='17.29'
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                            ></line>
                            <circle
                                cx='10.04'
                                cy='5.73'
                                r='2.73'
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                            ></circle>
                            <path
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M3 18.45v-.9a7 7 0 017-7h.09a6.73 6.73 0 011.91.27'
                            ></path>
                        </svg>
                    </div>
                    <div className='pr-3'>
                        <h4 className='mt-4 mb-3 text-2xl'>
                            {`I’m a client, hiring for a project`}
                        </h4>
                    </div>
                </div>
                <div
                    onClick={() => setAccountType(AccountType.freelancer)}
                    className={cn(
                        'relative p-6 cursor-pointer bg-white text-input-title rounded-[.5rem] border-2 border-solid border-box hover:border-box-active transition-all',
                        accountType === AccountType.freelancer
                            ? 'border-box-active'
                            : ''
                    )}
                >
                    <div className='absolute top-3 right-3 gap-0 flex items-center justify-center cursor-pointer'>
                        <div
                            className={cn(
                                'rounded-full flex items-center justify-center w-6 h-6 transition-shadow text-white border-2 border-solid border-[#beccbe] -top-[1px]',
                                accountType === AccountType.freelancer
                                    ? 'bg-primary-color'
                                    : 'bg-white'
                            )}
                        >
                            <span className='border border-solid w-3 h-3 rounded-[inherit]'></span>
                        </div>
                    </div>
                    <div className='w-8 h-8'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            data-name='Layer 1'
                            viewBox='0 0 24 24'
                            role='img'
                        >
                            <path
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M19.28 21h-6.9a1.6 1.6 0 01-1.73-1.5v-4a1.6 1.6 0 011.73-1.5h6.9A1.59 1.59 0 0121 15.5v4a1.66 1.66 0 01-1.72 1.5z'
                            ></path>
                            <path
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M16.9 12h-2.15a.65.65 0 00-.72.66V14h3.59v-1.34a.65.65 0 00-.72-.66z'
                            ></path>
                            <line
                                x1='10.65'
                                x2='21'
                                y1='17.29'
                                y2='17.29'
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                            ></line>
                            <circle
                                cx='10.04'
                                cy='5.73'
                                r='2.73'
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                            ></circle>
                            <path
                                fill='none'
                                vectorEffect='non-scaling-stroke'
                                stroke='var(--icon-color, #001e00)'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                                d='M3 18.45v-.9a7 7 0 017-7h.09a6.73 6.73 0 011.91.27'
                            ></path>
                        </svg>
                    </div>
                    <div className='pr-3'>
                        <h4 className='mt-4 mb-3 text-2xl'>
                            {`I’m a freelancer, looking for work`}
                        </h4>
                    </div>
                </div>
            </div>

            <div className='text-center mt-10'>
                <Button
                    disabled={accountType === null}
                    className='bg-button-primary hover:bg-button-primary/80 px-6 border-2 border-solid border-transparent rounded-[10rem] transition-all inline-flex justify-center items-center max-h-10 leading-[calc_2.5rem_-_1px] text-base font-medium disabled:bg-button-disabled disabled:text-[#9aaa97] disabled:!cursor-not-allowed disabled:pointer-events-auto'
                    onClick={() => handleGoToSignUpForm()}
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
    );
};

export default SelectAccountType;
