'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import { cn } from '@/lib/utils';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

const signUpFormSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().min(8).required(),
    email: yup.string().email().required(),
    country: yup.number().required(),
    allowPolicy: yup.bool(),
    allowSendMail: yup.bool(),
});

export interface SignUpSubmitValue {
    [key: string]: string | number
}

interface ISignUpForm {
    handleCreateAccount: (data: SignUpSubmitValue) => void;
}

const SignUpForm: React.FC<ISignUpForm> = ({ handleCreateAccount }) => {
    const form = useForm({
        resolver: yupResolver(signUpFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            country: 84,
            allowPolicy: true,
            allowSendMail: false,
        },
    });
    const watchAllowSendMail = form.watch('allowSendMail');
    const watchAllowPolicy = form.watch('allowPolicy');
    const onSubmit: SubmitHandler<SignUpSubmitValue | any> = (data) =>
        handleCreateAccount(data);
    const onError: SubmitErrorHandler<SignUpSubmitValue | any> = (errors) => {
        console.log('error', errors);
    };

    return (
        <>
            <div className='max-w-[464px] w-[464px] mx-auto'>
                <div className='my-6'>
                    <h1 className='text-4xl -tracking-[1px] font-medium text-center'>
                        Sign up to hire talent
                    </h1>
                </div>
                <Form {...form}>
                    <form
                        className=''
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                    >
                        <div className='grid grid-cols-2 gap-x-2'>
                            <FormField
                                control={form.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'
                                                placeholder='First Name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='lastName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'
                                                placeholder='Last name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='mt-6'>
                                    <FormLabel>Work email address</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'
                                            placeholder=''
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='mt-6'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'
                                            placeholder='Password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='country'
                            render={({ field }) => (
                                <FormItem className='mt-6'>
                                    <FormLabel>Country</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'>
                                                <SelectValue placeholder='Viet Nam' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage />
                                        <SelectContent className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'>
                                            <SelectItem value='84'>
                                                Viet Nam
                                            </SelectItem>
                                            <SelectItem value='85'>
                                                Viet Nam 2
                                            </SelectItem>
                                            <SelectItem value='86'>
                                                Viet Nam 3
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <div className='mt-6'>
                            <label
                                className='relative my-2 mb-3 flex gap-x-2 items-start justify-center cursor-pointer'
                                htmlFor='send-email'
                            >
                                <input
                                    id='send-email'
                                    type='checkbox'
                                    checked={watchAllowSendMail}
                                    onChange={({ target }) =>
                                        form.setValue(
                                            'allowSendMail',
                                            target.checked
                                        )
                                    }
                                    className='absolute w-[1px] h-[1px] -m-[1px] p-0 overflow-hidden border-0'
                                />
                                <span
                                    className={cn(
                                        'flex items-center justify-center w-6 min-w-6 h-6 min-h-6 transition-[box-shadow] rounded-[6px] relative -top-[1px] border-2 border-solid border-[#beccbe]',
                                        watchAllowSendMail
                                            ? 'bg-[#108a00] !text-white'
                                            : 'bg-white'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'w-4 h-4',
                                            watchAllowSendMail
                                                ? 'block !text-white'
                                                : 'hidden'
                                        )}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            aria-hidden='true'
                                            viewBox='0 0 24 24'
                                            role='img'
                                        >
                                            <path
                                                vectorEffect='non-scaling-stroke'
                                                stroke='#fff'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeMiterlimit='10'
                                                strokeWidth='1.5'
                                                d='M19 7l-9.99 9L5 12.365'
                                            ></path>
                                        </svg>
                                    </div>
                                </span>
                                <span className='text-base font-normal'>
                                    Send me emails with tips on how to find
                                    talent that fits my needs.
                                </span>
                            </label>
                            <label
                                className='relative my-2 mb-3 flex gap-x-2 items-start justify-center cursor-pointer'
                                htmlFor='policy'
                            >
                                <input
                                    id='policy'
                                    type='checkbox'
                                    checked={watchAllowPolicy}
                                    onChange={({ target }) =>
                                        form.setValue(
                                            'allowPolicy',
                                            target.checked
                                        )
                                    }
                                    className='absolute w-[1px] h-[1px] -m-[1px] p-0 overflow-hidden border-0'
                                />
                                <span
                                    className={cn(
                                        'flex items-center justify-center w-6 min-w-6 h-6 min-h-6 transition-[box-shadow] rounded-[6px] relative -top-[1px] border-2 border-solid border-[#beccbe]',
                                        watchAllowPolicy
                                            ? 'bg-[#108a00] !text-white'
                                            : 'bg-white'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'w-4 h-4',
                                            watchAllowPolicy
                                                ? 'block !text-white'
                                                : 'hidden'
                                        )}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            aria-hidden='true'
                                            viewBox='0 0 24 24'
                                            role='img'
                                        >
                                            <path
                                                vectorEffect='non-scaling-stroke'
                                                stroke='#fff'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeMiterlimit='10'
                                                strokeWidth='1.5'
                                                d='M19 7l-9.99 9L5 12.365'
                                            ></path>
                                        </svg>
                                    </div>
                                </span>
                                <span className='text-base font-normal'>
                                    Yes, I understand and agree to the Upwork
                                    <Link
                                        className='text-link font-medium underline transition-[color]'
                                        href={'/docs/terms-of-use'}
                                    >
                                        {` `}Terms of Service{` `}
                                    </Link>
                                    , including the{' '}
                                    <Link
                                        className='text-link font-medium underline transition-[color]'
                                        href={`/docs/user-agreement`}
                                    >
                                        {` `}User Agreement{` `}
                                    </Link>
                                    and
                                    <Link
                                        className='text-link font-medium underline transition-[color]'
                                        href={`/docs/privacy-policy`}
                                    >
                                        {` `}Privacy Policy{' '}
                                    </Link>
                                    .
                                </span>
                            </label>
                        </div>

                        <div className='text-center mt-10'>
                            <Button
                                className='bg-button-primary hover:bg-button-primary/80 px-6 border-2 border-solid border-transparent rounded-[10rem] transition-all inline-flex justify-center items-center max-h-10 leading-[calc_2.5rem_-_1px] text-base font-medium disabled:bg-button-disabled disabled:text-[#9aaa97] disabled:!cursor-not-allowed disabled:pointer-events-auto'
                                onClick={() => {
                                    form.handleSubmit(onSubmit, onError);
                                }}
                            >
                                {'Create my account'}
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
                    </form>
                </Form>
            </div>
        </>
    );
};

export default SignUpForm;
