import { useAuth } from '@/app/providers/AuthProvider';
import { cn } from '@/lib/utils';
import { Paperclip } from 'lucide-react';
import Link from 'next/link';

const CommentContent = ({ comment }: { comment: any[] }) => {
    const { user } = useAuth();
    return (
        <div className='h-full overflow-x-hidden overflow-y-auto p-4 flex flex-col gap-y-3 border border-solid rounded-lg'>
            {comment?.map((data) => {
                return (
                    <div
                        className={cn(
                            'flex flex-wrap',
                            user?.id?.toString() === data?.user_id?.toString()
                                ? 'justify-end'
                                : 'justify-start'
                        )}
                        key={`comment-${data?.task_id}-${data?.id}`}
                    >
                        <div
                            className={cn(
                                'max-w-[80%] overflow-x-hidden line-clamp-1 flex px-4 py-2 shadow-md rounded-2xl',
                                user?.id?.toString() ===
                                    data?.user_id?.toString()
                                    ? 'bg-primary-color/80 text-white'
                                    : 'justify-start bg-white text-black'
                            )}
                        >
                            {data?.type === 'file' ? (
                                <Link href={data?.content}>
                                    {`Tệp đính kèm Tệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèmTệp đính kèm`}
                                    <Paperclip className='inline ml-1 w-4 h-4' />
                                </Link>
                            ) : (
                                <span>{data?.content}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentContent;
