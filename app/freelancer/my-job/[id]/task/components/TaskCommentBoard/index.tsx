import { Task } from '@/app/types/task.types';
import CommentInput from './CommentInput';
import CommentContent from './CommentContent';
import { useEffect, useState } from 'react';
import { taskServices } from '@/app/services/task.services';

const TaskCommentBoard = ({ data }: { data: Task }) => {
    const [comment, setComment] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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
            if (res.data) {
                setComment((prev) => [...prev, res.data]);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

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
