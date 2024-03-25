'use client';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { CreatePostContext } from '../../context/CreatePostContext';
import { Textarea } from '@/app/components/ui/textarea';
import SkillSelect from '@/app/components/Selects/SkillSelect';
import { Skill } from '@/app/types/common.types';
import { CalendarIcon, X } from 'lucide-react';
import Upload from '@/app/components/themes/Upload';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/ui/popover';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/app/components/ui/calendar';
import { Select } from '@/app/components/ui/select';
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import { clientServices } from '@/app/services/client.services';
import SingleImageUpload from '@/app/components/themes/ImageUpload/SingleImageUpload';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';

const createPostSchema = yup.object({
    title: yup
        .string()
        .min(20, 'Vui lòng nhập tiêu đề ít nhất 50 ký tự')
        .required('Vui lòng nhập tiêu đề'),
    desc: yup.string().required('Vui lòng nhập mô tả ngắn'),
    content: yup.string().required('Vui lòng nhập nội dung'),
    bids: yup.number().min(1, 'Vui lòng nhập bid lớn hơn 0').required(),
    deadline: yup.string().required('Vui lòng chọn ngày hết hạn'),
    status: yup.number(),
    thumbnail: yup.mixed().nullable(),
    content_file: yup.mixed().nullable(),
    skill: yup
        .array()
        .of(
            yup.object().shape({
                skill_id: yup.number(),
                point: yup.number(),
                name: yup.string(),
            })
        )
        .min(3, 'Vui lòng chọn ít nhất 3 skill')
        .required('Vui lòng chọn ít nhất 1 skill'),
});

interface ICreatePostData {
    deadline: string;
}

const FormCreateContainer = () => {
    const { step, goPreviousStep } = useContext(CreatePostContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: yupResolver(createPostSchema),
        defaultValues: {
            title: '',
            desc: '',
            content: '',
            bids: 1,
            skill: [],
            content_file: null,
            status: 0,
        },
    });

    const skills = form.watch('skill');
    const fileContent = form.watch('content_file');

    const onSubmit: SubmitHandler<ICreatePostData> = (data) =>
        handleCreatePost(data);

    const onError: SubmitErrorHandler<ICreatePostData> = (errors) => {
        console.log('error', errors);
    };

    const handleCreatePost = async (data: ICreatePostData) => {
        try {
            setLoading(true);
            const res = await clientServices.createPost({
                ...data,
                deadline: format(data.deadline, 'yyyy-MM-dd'),
            });
            if (res.status === 200) {
                router.push('/client/dashboard');
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleValidate = async () => {
            let isValid = true;
            if (step === 2) {
                isValid = await form.trigger(['title', 'desc']);
            } else if (step === 3) {
                isValid = await form.trigger(['skill', 'bids']);
            } else if (step === 4) {
                isValid = await form.trigger('content');
            }

            if (!isValid) {
                goPreviousStep?.();
            }
        };
        // handleValidate();
    }, [step, form, goPreviousStep]);

    return (
        <section className='container px-20 py-8'>
            <Form {...form}>
                <form
                    id='form-create'
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                >
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
                                <FormField
                                    control={form.control}
                                    name='title'
                                    render={({ field }) => (
                                        <FormItem className='mb-6'>
                                            <FormLabel>
                                                Write a title for your job post
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='desc'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Write a short description about
                                                your job post
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={10}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className='grid grid-cols-2 gap-x-8 px-12 mx-12'>
                            <div>
                                <small className='mb-6 inline-block text-sm'>
                                    {`2/5`}{' '}
                                    <span className='ml-6'>Job post</span>
                                </small>
                                <h2 className='mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza'>{`What are the main skills required for your work?`}</h2>
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='skill'
                                    render={({ field }) => (
                                        <>
                                            <FormItem className='mb-2'>
                                                <FormLabel className='block font-medium text-base leading-[22px] mb-3'>
                                                    Select 3 - 5 skills for your
                                                    post
                                                </FormLabel>
                                                <FormControl>
                                                    <div>
                                                        <SkillSelect
                                                            onChange={(
                                                                value: any
                                                            ) => {
                                                                if (value) {
                                                                    const convertValue =
                                                                        value?.map(
                                                                            (
                                                                                s: Skill
                                                                            ) => ({
                                                                                skill_id:
                                                                                    s.id,
                                                                                name: s.name,
                                                                                point: 100,
                                                                            })
                                                                        );
                                                                    const selectedSkills =
                                                                        [
                                                                            ...skills,
                                                                            ...convertValue,
                                                                        ]?.filter(
                                                                            (
                                                                                s,
                                                                                index,
                                                                                seft
                                                                            ) =>
                                                                                index ===
                                                                                seft.findIndex(
                                                                                    (
                                                                                        t
                                                                                    ) =>
                                                                                        t.skill_id?.toString() ===
                                                                                        s.skill_id?.toString()
                                                                                )
                                                                        );
                                                                    form.setValue(
                                                                        'skill',
                                                                        selectedSkills
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            <div className='flex items-center mt-3 gap-x-4 mb-6'>
                                                <span className='w-4 h-4'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        aria-hidden='true'
                                                        viewBox='0 0 24 24'
                                                        role='img'
                                                    >
                                                        <path
                                                            vectorEffect='non-scaling-stroke'
                                                            stroke='var(--icon-color, #001e00)'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeMiterlimit='10'
                                                            strokeWidth='1.5'
                                                            d='M12 21a9 9 0 100-18 9 9 0 000 18z'
                                                        ></path>
                                                        <path
                                                            vectorEffect='non-scaling-stroke'
                                                            stroke='var(--icon-color, #001e00)'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeMiterlimit='10'
                                                            strokeWidth='1.5'
                                                            d='M11.7 7l1.2 3.2 3.5.2-2.7 2.2.9 3.4-2.9-1.9L8.8 16l.9-3.4L7 10.4l3.4-.2L11.7 7z'
                                                            clipRule='evenodd'
                                                        ></path>
                                                    </svg>
                                                </span>
                                                <span className='text-[#5e6d55]'>
                                                    For the best results, add
                                                    3-5 skills
                                                </span>
                                            </div>
                                        </>
                                    )}
                                />
                                {skills.length ? (
                                    <Fragment>
                                        <h5 className='text-base font-medium my-3'>
                                            Selected skills:{' '}
                                        </h5>
                                        <div className='flex gap-x-1 gap-y-2'>
                                            {skills.map((s) => (
                                                <div
                                                    key={`selected-skill-${s.skill_id}`}
                                                    className='cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white'
                                                    onClick={() => {
                                                        const removedSkill =
                                                            skills.filter(
                                                                (
                                                                    currentSkill
                                                                ) =>
                                                                    s.skill_id?.toString() !==
                                                                    currentSkill.skill_id?.toString()
                                                            );
                                                        form.setValue(
                                                            'skill',
                                                            removedSkill
                                                        );
                                                    }}
                                                >
                                                    {s.name}
                                                    <X className='w-5 h-5' />
                                                </div>
                                            ))}
                                        </div>
                                    </Fragment>
                                ) : null}
                                <FormField
                                    control={form.control}
                                    name='bids'
                                    render={({ field }) => (
                                        <FormItem className='mt-6'>
                                            <FormLabel className='block font-medium text-base leading-[22px] mb-3'>
                                                Enter bids
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className='grid grid-cols-2 gap-x-8 px-12 mx-12'>
                            <div>
                                <small className='mb-6 inline-block text-sm'>
                                    {`3/5`}{' '}
                                    <span className='ml-6'>Job post</span>
                                </small>
                                <h2 className='mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza'>{`Let's start with a strong title and description.`}</h2>
                                <p className='text-sm leading-5 mb-8'>
                                    {`Next, write a detail description about your job. This can help freelancer easy to access your job!`}
                                </p>
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='content'
                                    render={({ field }) => (
                                        <FormItem className='mb-6'>
                                            <FormLabel>Job content</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={10}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='desc'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{`Upload file description about your job`}</FormLabel>
                                            <Upload
                                                className='h-[66px]'
                                                multiple={false}
                                                disabled={
                                                    fileContent ? true : false
                                                }
                                                showList={true}
                                                fileList={
                                                    fileContent
                                                        ? [fileContent as File]
                                                        : []
                                                }
                                                draggable={true}
                                                onChange={(file) => {
                                                    form.setValue(
                                                        'content_file',
                                                        file[0]
                                                    );
                                                }}
                                                onFileRemove={() => {
                                                    form.setValue(
                                                        'content_file',
                                                        null
                                                    );
                                                }}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div className='grid grid-cols-2 gap-x-8 px-12 mx-12'>
                            <div>
                                <small className='mb-6 inline-block text-sm'>
                                    {`4/5`}{' '}
                                    <span className='ml-6'>Job post</span>
                                </small>
                                <h2 className='mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza'>{`Let's setup your job status and deadline!.`}</h2>
                                <p className='text-sm leading-5 mb-8'>
                                    {`Now setup your job status and deadline!`}
                                </p>
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='deadline'
                                    render={({ field }) => (
                                        <FormItem className='mb-6'>
                                            <FormLabel className='mr-3 block'>
                                                Job Deadline{' '}
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'w-full pl-3 text-left font-normal',
                                                                !field.value &&
                                                                    'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    'dd-MM-yyyy'
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
                                                            )}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className='w-auto p-0'
                                                    align='start'
                                                >
                                                    <Calendar
                                                        mode='single'
                                                        selected={
                                                            field.value as any
                                                        }
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={(date) =>
                                                            date <
                                                            new Date(
                                                                '1900-01-01'
                                                            )
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='status'
                                    render={({ field }) => (
                                        <FormItem className='mb-6'>
                                            <FormLabel>Job Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value?.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select a verified email to display' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='0'>
                                                        Ẩn
                                                    </SelectItem>
                                                    <SelectItem value='1'>
                                                        Mở ứng tuyển
                                                    </SelectItem>
                                                    <SelectItem value='2'>
                                                        Đóng ứng tuyển
                                                    </SelectItem>
                                                    <SelectItem value='3'>
                                                        Đang được thực hiện
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='thumbnail'
                                    render={({ field }) => (
                                        <FormItem className='mb-6'>
                                            <FormLabel>Job Thumbnail</FormLabel>
                                            <SingleImageUpload
                                                onFileUpload={(file) => {
                                                    form.setValue(
                                                        'thumbnail',
                                                        file
                                                    );
                                                }}
                                                onDeleteImage={() => {
                                                    form.setValue(
                                                        'thumbnail',
                                                        null
                                                    );
                                                }}
                                            />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={loading}
                                    className='block bg-[#108a00] hover:bg-[#14a800]'
                                    type='submit'
                                >
                                    {loading && (
                                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin inline-flex' />
                                    )}
                                    Create your post now!
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </Form>
        </section>
    );
};

export default FormCreateContainer;
