import { Task } from '@/app/types/task.types';
import CommentInput from './CommentInput';
import CommentContent from './CommentContent';
import { useEffect, useState } from 'react';
import { taskServices } from '@/app/services/task.services';
import { useToast } from '@/app/components/ui/use-toast';
import { cn } from '@/lib/utils';

const TaskCommentBoard = ({ data }: { data: Task }) => {
    const [comment, setComment] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (data) {
            setComment((data as any)?.comment);
        }
    }, [data]);

    const handleAddTask = async (commentData: any) => {
        try {
            setLoading(true);
            const res = await taskServices.addComment({
                task_id: data.id,
                content: commentData?.content as any,
                type: commentData?.type as any,
            });
            if (res.result === -1) {
                toast({
                    title: 'Comment thất bại!',
                    variant: 'destructive',
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                    ),
                    description: res?.message || '',
                });
            } else {
                if (res.data) {
                    setComment((prev) => [...prev, res.data]);
                }
            }
        } catch (error) {
            toast({
                title: 'Comment thất bại!',
                variant: 'destructive',
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: (error as Error)?.message || '',
            });
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };
    ``;
    return (
        <div className='h-full relative p-4 !pb-12'>
            <CommentContent comment={comment} />
            <CommentInput
                loading={loading}
                onSubmit={(data) => handleAddTask(data)}
            />
        </div>
    );
};

export default TaskCommentBoard;
