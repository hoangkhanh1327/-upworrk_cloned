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
import { Task } from '@/app/types/task.types';
import { useToast } from '@/app/components/ui/use-toast';
import React, { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';

const taskFormSchema = yup.object({
    name: yup.string().required('Vui lòng nhập tên task'),
    desc: yup.string().required('Vui lòng nhập mô tả'),
    deadline: yup.string().required('Vui lòng chọn deadline'),
    priority: yup.string().required('Vui lòng chọn mức độ quan trọng'),
});

interface ITaskForm {
    jobId: string;
    type: 'edit' | 'new';
    initialData?: any;
    onSuccess: (data: Task | string) => void;
    onClose: () => void;
}

interface CreateTaskSubmitValue {
    name: string;
    desc: string;
    priority: string;
    deadline: string;
}

interface IDeleteButton {
    onDelete: () => void;
}

const DeleteButton: React.FC<IDeleteButton> = ({ onDelete }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='destructive' type='button'>
                    Xoá task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Xoá task</DialogTitle>
                <DialogDescription>
                    {`Bạn chắc chắn muốn xoá task này?`}
                </DialogDescription>
                <DialogFooter>
                    <Button variant='destructive' onClick={onDelete}>
                        Xác nhận xoá
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const TaskForm = (props: ITaskForm) => {
    const { jobId, type, initialData, onClose, onSuccess } = props;
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: yupResolver(taskFormSchema),
        defaultValues: {
            name: initialData?.name || '',
            desc: initialData?.desc || '',
            deadline: initialData?.deadline || '',
            priority: initialData?.priority || '1',
        },
    });

    const onSubmit: SubmitHandler<CreateTaskSubmitValue> = async (data) => {
        try {
            setLoading(true);
            if (type === 'new') {
                const res = await taskServices.createJobTask({
                    id: jobId,
                    ...data,
                    deadline: format(data.deadline, 'yyyy-MM-dd'),
                });
                toast({
                    title: 'Thêm task thành công',
                });
                onSuccess(res.data);
                onClose();
            }
            if (type === 'edit' && initialData.id) {
                const res = await taskServices.updateJobTask({
                    task_id: initialData.id,
                    ...data,
                    deadline: data.deadline
                        ? format(data.deadline, 'yyyy-MM-dd')
                        : initialData.deadline,
                });
                toast({
                    title: 'Cập nhật task thành công',
                });
                onSuccess(res.data);
                onClose();
            }
        } catch (error) {
            toast({
                title: 'Thêm task thất bại',
                description: (error as Error)?.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            toast({
                title: 'Xoá task thành công',
            });
            const res = await taskServices.deleteJobTask(
                initialData.id.toString()
            );
            onSuccess(initialData.id);
            onClose();
        } catch (error) {
            toast({
                title: 'Xoá task thất bại',
                description: (error as Error)?.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    console.log('client task update');

    return (
        <div className='max-w-[28vw] w-[28vw] mx-auto'>
            <div className='my-2'>
                <h1 className='text-4xl -tracking-[1px] font-medium text-center'>
                    {type === 'new' ? 'Tạo task mới' : 'Chỉnh sửa task'}
                </h1>
            </div>
            <Form {...form}>
                <form className='' onSubmit={form.handleSubmit(onSubmit)}>
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
                                 <FormLabel>Mô tả task</FormLabel>
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
                        name='priority'
                        render={({ field }) => {
                            return (
                                <FormItem className='mt-6'>
                                    <FormLabel>Độ ưu tiên</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value?.toString()}
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'>
                                                <SelectValue placeholder='' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage />
                                        <SelectContent className='border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] transition-[border-color] no-underline'>
                                        <SelectItem value="1">Quan trọng</SelectItem>
                                        <SelectItem value="2">Trung bình</SelectItem>
                                        <SelectItem value="3">Ưu tiên thấp</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            );
                        }}
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
                                                    <span>
                                                        Chọn ngày hết hạn
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
                    <div className='mt-6 flex justify-end gap-x-3'>
                        <Button type='button' onClick={onClose}>
                            Đóng
                        </Button>
                        {<DeleteButton onDelete={handleDelete} />}
                        <Button
                            disabled={loading}
                            className='block bg-[#108a00] hover:bg-[#14a800]'
                            type='submit'
                        >
                            {loading && (
                                <ReloadIcon className='mr-2 h-4 w-4 animate-spin inline-flex' />
                            )}
                            Lưu
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TaskForm;
