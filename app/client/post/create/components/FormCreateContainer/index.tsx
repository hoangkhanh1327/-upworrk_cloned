'use client';

import { useContext, useMemo } from 'react';
import { CreatePostContext } from '../../context/CreatePostContext';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import {
    Form,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface ICreatePostData {}

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
                    {step === 1 && <StepOne />}
                </form>
            </Form>
        </section>
    );
};

export default FormCreateContainer;
