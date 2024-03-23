'use client';
import React, { useContext, useState } from 'react';
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
import { CreatePostContext } from '../../context/CreatePostContext';

const createPostSchema = yup.object({
    title: yup
        .string()
        .min(50, 'Vui lòng nhập tiêu đề ít nhất 50 ký tự')
        .required('Vui lòng nhập tiêu đề'),
    desc: yup.string().required('Vui lòng nhập mô tả ngắn'),
    content: yup.string().required('Vui lòng nhập nội dung'),
    bids: yup.number().min(1, 'Vui lòng nhập bid lớn hơn 0').required(),
    deadline: yup.string().required('Vui lòng chọn ngày hết hạn'),
    status: yup.number().required(),
    thumbnail: yup.string().nullable(),
    content_file: yup.string().nullable(),
    skill: yup
        .array()
        .of(
            yup.object().shape({
                skill_id: yup.number(),
                point: yup.number(),
            })
        )
        .required('Vui lòng chọn ít nhất 1 skill'),
});

interface ICreatePostData {}

const FormCreateContainer = () => {
    const { step } = useContext(CreatePostContext);

    const form = useForm({
        resolver: yupResolver(createPostSchema),
        defaultValues: {
            title: '',
            desc: '',
            content: '',
            bids: 1,
            status: 0,
        },
    });
    const onSubmit: SubmitHandler<ICreatePostData> = (data) =>
        handleCreatePost(data);

    const onError: SubmitErrorHandler<ICreatePostData> = (errors) => {
        console.log('error', errors);
    };

    const handleCreatePost = (data: ICreatePostData) => {
        console.log('data', data);
    };

    return (
        <section className='container px-20 py-8'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                    {step === 1 && (
                        <div className='grid grid-cols-2 gap-x-8 px-12 mx-12'>
                            <div>
                                <small className='mb-6 inline-block text-sm'>
                                    {`1/5`}{' '}
                                    <span className='ml-6'>Job post</span>
                                </small>
                                <h2 className='mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza'>{`Let's start with a strong title and description.`}</h2>
                                <p className='text-sm leading-5 mb-8'>
                                    {`This helps your job post stand out to the right candidates. It’s the first thing they’ll see, so make it count!`}
                                </p>
                            </div>
                            <div>
                                <h5>Write a title for your job post</h5>
                                <FormField
                                    control={form.control}
                                    name='title'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                </form>
            </Form>
        </section>
    );
};

export default FormCreateContainer;
