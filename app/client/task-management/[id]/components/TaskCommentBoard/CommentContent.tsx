import { useAuth } from '@/app/providers/AuthProvider';
import { cn } from '@/lib/utils';
import { Paperclip } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function checkImageURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

const CommentContent = ({ comment }: { comment: any[] }) => {
    const { user } = useAuth();
    return (
        <div className='h-full overflow-x-hidden overflow-y-auto p-4 flex flex-col gap-y-3 border border-solid rounded-lg'>
            {comment?.map((data) => {
                const isImage = checkImageURL(data?.content);
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
                                'max-w-[80%] overflow-x-hidden line-clamp-1 flex shadow-md rounded-2xl',
                                user?.id?.toString() ===
                                    data?.user_id?.toString()
                                    ? 'bg-primary-color/80 text-white'
                                    : 'justify-start bg-white text-black',
                                isImage ? 'p-0' : 'px-4 py-2'
                            )}
                        >
                            {data?.type === 'file' ? (
                                isImage ? (
                                    <div className='relative min-w-full w-[30vw] h-[250px]'>
                                        <Image
                                            src={data?.content}
                                            fill
                                            alt=''
                                        />
                                    </div>
                                ) : (
                                    <Link href={data?.content}>
                                        {`Tệp đính kèm`}
                                        <Paperclip className='inline ml-1 w-4 h-4' />
                                    </Link>
                                )
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
