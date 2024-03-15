'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const signUpFormSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().min(8).required(),
    email: yup.string().email().required(),
    country: yup.number().required(),
    allowPolicy: yup.bool(),
    allowSendMail: yup.bool(),
});

interface SignUpSubmitValue {}

const SignUpForm = () => {
    const form = useForm({
        resolver: yupResolver(signUpFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            allowPolicy: true,
            allowSendMail: false,
        },
    });
    const onSubmit: SubmitHandler<SignUpSubmitValue> = (data) =>
        console.log(data);

    const [allowSendMail, toggleAllowSendMail] = useState(false);

    return (
        <div className='max-w-[464px] w-[464px] mx-auto'>
            <div className='my-6'>
                <h1 className='text-4xl -tracking-[1px] font-medium text-center'>
                    Sign up to hire talent
                </h1>
            </div>
            <Form {...form}>
                <form className='' onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className='mt-6'>
                        <div className='grid w-full items-center gap-1.5 mt-3'>
                            <Label
                                className='mb-1 text-base font-medium'
                                htmlFor='email'
                            >
                                Country
                            </Label>
                            <Select>
                                <SelectTrigger className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'>
                                    <SelectValue placeholder='Viet Nam' />
                                </SelectTrigger>
                                <SelectContent className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'>
                                    <SelectItem value='84'>Viet Nam</SelectItem>
                                    <SelectItem value='85'>
                                        Viet Nam 2
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <label
                            className='relative my-2 mb-3 flex gap-x-2 items-start justify-center cursor-pointer'
                            htmlFor='send-email'
                        >
                            <input
                                id='send-email'
                                type='checkbox'
                                checked={allowSendMail}
                                onChange={({ target }) =>
                                    toggleAllowSendMail(target.checked)
                                }
                                className='absolute w-[1px] h-[1px] -m-[1px] p-0 overflow-hidden border-0'
                            />
                            <span
                                className={cn(
                                    'flex items-center justify-center w-6 h-6 transition-[box-shadow] rounded-[6px] relative -top-[1px] border-2 border-solid border-[#beccbe]',
                                    allowSendMail
                                        ? 'bg-[#108a00] !text-white'
                                        : 'bg-white'
                                )}
                            >
                                <div
                                    className={cn(
                                        'w-4 h-4',
                                        allowSendMail
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
                                Send me emails with tips on how to find talent
                                that fits my needs.
                            </span>
                        </label>
                        <label
                            className='relative my-2 mb-3 flex gap-x-2 items-start justify-center cursor-pointer'
                            htmlFor='send-email'
                        >
                            <input
                                id='send-email'
                                type='checkbox'
                                checked={allowSendMail}
                                onChange={({ target }) =>
                                    toggleAllowSendMail(target.checked)
                                }
                                className='absolute w-[1px] h-[1px] -m-[1px] p-0 overflow-hidden border-0'
                            />
                            <span
                                className={cn(
                                    'flex items-center justify-center w-6 h-6 transition-[box-shadow] rounded-[6px] relative -top-[1px] border-2 border-solid border-[#beccbe]',
                                    allowSendMail
                                        ? 'bg-[#108a00] !text-white'
                                        : 'bg-white'
                                )}
                            >
                                <div
                                    className={cn(
                                        'w-4 h-4',
                                        allowSendMail
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
                                Send me emails with tips on how to find talent
                                that fits my needs.
                            </span>
                        </label>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SignUpForm;
