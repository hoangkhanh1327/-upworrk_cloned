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
import { taskServices } from '@/app/services/task.services';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/ui/popover';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/app/components/ui/calendar';

const taskFormSchema = yup.object({
    name: yup.string().required('Vui lòng nhập tên task'),
    desc: yup.string().required('Vui lòng nhập mô tả'),
    deadline: yup.string().required('Vui lòng chọn deadline'),
});

interface ITaskForm {
    jobId: string;
    type: 'edit' | 'new';
    initialData?: any;
}

interface CreateTaskSubmitValue {
    name: string;
    desc: string;
    deadline: string;
}

const TaskForm = (props: ITaskForm) => {
    const { jobId, type, initialData } = props;
    const form = useForm({
        resolver: yupResolver(taskFormSchema),
        defaultValues: {
            name: initialData?.name || '',
            desc: initialData?.desc || '',
            deadline: initialData?.deadline || '',
        },
    });
    console.log('jobId', jobId);

    const handleSubmit: SubmitHandler<CreateTaskSubmitValue> = async (data) => {
        try {
            const res = await taskServices.createJobTask({
                id: jobId,
                ...data,
                deadline: format(data.deadline, 'yyyy-MM-dd'),
            });
            console.log('res', res);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleError: SubmitErrorHandler<CreateTaskSubmitValue | any> = (
        errors
    ) => {
        console.log('error', errors);
    };

    return (
        <div className='max-w-[464px] w-[464px] mx-auto'>
            <div className='my-2'>
                <h1 className='text-4xl -tracking-[1px] font-medium text-center'>
                    {type === 'new' ? 'Tạo task mới' : 'Chỉnh sửa task'}
                </h1>
            </div>
            <Form {...form}>
                <form
                    className=''
                    onSubmit={form.handleSubmit(handleSubmit, handleError)}
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='mt-6'>
                                <FormLabel>Tên task</FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'
                                        placeholder='Tên task'
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
                            <FormItem className='mt-6'>
                                <FormLabel>Tên task</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'
                                        placeholder='Tên task'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='deadline'
                        render={({ field }) => (
                            <FormItem className='mt-6'>
                                <FormLabel className='mr-3 block'>
                                    Ngày đến hạn{' '}
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
                                                    <span>Pick a date</span>
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
                                            selected={field.value as any}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='mt-6 flex justify-end'>
                        <Button
                            //   disabled={loading}
                            className='block bg-[#108a00] hover:bg-[#14a800]'
                            type='submit'
                        >
                            {/* {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline-flex" />
                  )} */}
                            Lưu
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TaskForm;
