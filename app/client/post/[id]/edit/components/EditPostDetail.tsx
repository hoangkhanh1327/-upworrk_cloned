'use client';

import { Button } from '@/app/components/ui/button';
import { Skeleton } from '@/app/components/ui/skeleton';
import { format, setWeek } from 'date-fns';
import { FileIcon, SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { VscFile } from 'react-icons/vsc';
import { EditPostContext } from '../context/EditPostContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { useToast } from '@/app/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { clientServices } from '@/app/services/client.services';

interface IEditPostDetail {
    postId: string;
}

const EditPostDetail: React.FC<IEditPostDetail> = ({ postId }) => {
    const { post, loading, handleGetPostDetail, onOpenModal } =
        useContext(EditPostContext);
    const { toast } = useToast();
    const [updateLoading, setLoading] = useState(false);

    useEffect(() => {
        if (postId) {
            handleGetPostDetail?.(postId);
        }
    }, [postId]);

    const handleChangePostStatus = async (value: string) => {
        if (!post) return;

        try {
            setLoading(true);
            const res = await clientServices.updatePost({
                id: post.id,
                status: value,
            });
            if (res.data) {
                toast({
                    title: 'Cập nhật thành công',
                    description: 'Thông tin bài viết đã được cập nhật',
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                    ),
                    duration: 1000,
                });
                handleGetPostDetail?.(post.id?.toString());
            }
        } catch (error) {
            toast({
                title: 'Đã có lỗi xảy ra',
                description: (error as Error)?.message,
                variant: 'destructive',
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='px-20'>
            <div>
                <h2 className='text-4xl font-semibold -tracking-[1px]'>
                    Chỉnh sửa công việc
                </h2>
            </div>
            <div className='my-8 border border-solid border-[#d5e0d5] rounded-[16px]'>
                <article>
                    <header className='p-8 border-b border-solid border-[#d5e0d5] flex items-center justify-between'>
                        {loading ? (
                            <Skeleton className='w-full h-7' />
                        ) : (
                            <>
                                <h3 className='text-2xl font-medium'>
                                    {post?.title || ''}
                                </h3>
                                <Button
                                    onClick={() =>
                                        onOpenModal?.('edit-post-title')
                                    }
                                    className='rounded-full p-2 bg-transparent hover:bg-transparent'
                                >
                                    <SquarePen
                                        color='#000'
                                        className='w-5 h-5'
                                    />
                                </Button>
                            </>
                        )}
                    </header>

                    <div className='p-8 pb-0'>
                        <h3 className='text-lg font-medium mb-2'>Mô tả ngắn</h3>
                        <div className='flex items-center justify-between'>
                            {loading ? (
                                <Skeleton className='w-full h-4' />
                            ) : (
                                <>
                                    <p>{post?.desc}</p>
                                    <Button
                                        onClick={() =>
                                            onOpenModal?.('edit-post-desc')
                                        }
                                        className='rounded-full p-2 bg-transparent hover:bg-transparent'
                                    >
                                        <SquarePen
                                            color='#000'
                                            className='w-5 h-5'
                                        />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='p-8 pb-0'>
                        <h3 className='text-lg font-medium mb-2'>Nội dung</h3>
                        <div className='flex items-center justify-between'>
                            {loading ? (
                                <Skeleton className='w-full h-20' />
                            ) : (
                                <>
                                    <p>{post?.content}</p>
                                    <Button
                                        onClick={() =>
                                            onOpenModal?.('edit-post-content')
                                        }
                                        className='rounded-full p-2 bg-transparent hover:bg-transparent'
                                    >
                                        <SquarePen
                                            color='#000'
                                            className='w-5 h-5'
                                        />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='p-8'>
                        <div className='mb-6'>
                            <h3 className='text-lg font-medium mb-2'>
                                Kỹ năng
                            </h3>
                            <div className='flex items-center justify-between gap-x-3'>
                                {loading ? (
                                    <>
                                        <Skeleton className='w-20 h-7' />
                                        <Skeleton className='w-20 h-7' />
                                        <Skeleton className='w-20 h-7' />
                                    </>
                                ) : (
                                    <>
                                        <div className='flex items-center gap-x-3'>
                                            {post?.skills.map((s) => (
                                                <div
                                                    key={`selected-skill-${s.skill_id}`}
                                                    className='cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white'
                                                    onClick={() => {}}
                                                >
                                                    {s.skill_name}
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            onClick={() =>
                                                onOpenModal?.('edit-post-skill')
                                            }
                                            className='rounded-full p-2 bg-transparent hover:bg-transparent'
                                        >
                                            <SquarePen
                                                color='#000'
                                                className='w-5 h-5'
                                            />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='mb-6 flex items-center'>
                            <h3 className='text-lg font-medium '>
                                Thời hạn công việc
                            </h3>
                            <div className='flex items-center justify-between gap-x-3 pl-3'>
                                {loading ? (
                                    <Skeleton className='h-[20px] w-[250px]' />
                                ) : (
                                    <>
                                        <p>
                                            {post?.deadline &&
                                                format(
                                                    post.deadline || '',
                                                    'dd-MM-yyyy'
                                                )}
                                        </p>
                                        <Button
                                            onClick={() =>
                                                onOpenModal?.(
                                                    'edit-post-thumbnail'
                                                )
                                            }
                                            className='rounded-full p-2 bg-transparent hover:bg-transparent'
                                        >
                                            <SquarePen
                                                color='#000'
                                                className='w-5 h-5'
                                            />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='mb-6 flex items-center justify-between'>
                            <h3 className='text-lg font-medium min-w-[130px]'>
                                File đính kèm
                            </h3>
                            <div className='flex-1 flex items-center justify-between gap-x-3 pl-3'>
                                <p>
                                    {!loading && post?.content_file && (
                                        <Link
                                            href={post?.content_file}
                                            target='_blank'
                                        >
                                            <div className='upload-file'>
                                                <div className='flex px-3 py-3'>
                                                    <div className='upload-file-thumbnail !p-0 w-8 h-8'>
                                                        {
                                                            <FileIcon>
                                                                <VscFile />
                                                            </FileIcon>
                                                        }
                                                    </div>
                                                    <div className='upload-file-info min-h-[2rem]'>
                                                        <h6 className='upload-file-name'>
                                                            {`${post?.title}`}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </p>
                                <Button
                                    onClick={() =>
                                        onOpenModal?.('edit-post-content-file')
                                    }
                                    className='rounded-full p-2 bg-transparent hover:bg-transparent'
                                >
                                    <SquarePen
                                        color='#000'
                                        className='w-5 h-5'
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className='mb-6 flex items-start'>
                            <h3 className='text-lg font-medium mb-2 min-w-[130px]'>
                                Hình ảnh
                            </h3>
                            <div className='flex-1 flex items-center justify-between gap-x-3 pl-3'>
                                <p>
                                    {!loading && post?.thumbnail && (
                                        <Link
                                            href={post?.thumbnail}
                                            target='_blank'
                                        >
                                            <div className='w-[120px] h-[120px] relative'>
                                                <Image
                                                    src={post?.thumbnail}
                                                    alt=''
                                                    fill
                                                />
                                            </div>
                                        </Link>
                                    )}
                                </p>
                                <Button
                                    onClick={() =>
                                        onOpenModal?.('edit-post-thumbnail')
                                    }
                                    className='rounded-full p-2 bg-transparent hover:bg-transparent'
                                >
                                    <SquarePen
                                        color='#000'
                                        className='w-5 h-5'
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <footer className='p-8 border-t border-solid border-[#d5e0d5] flex items-center justify-end'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    disabled={updateLoading || loading}
                                    variant='outline'
                                >
                                    Thay đổi trạng thái
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56'>
                                <DropdownMenuLabel>
                                    Trạng thái bài đăng
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={post?.status?.toString()}
                                    onValueChange={(value) =>
                                        handleChangePostStatus(value)
                                    }
                                >
                                    <DropdownMenuRadioItem value='0'>
                                        Ẩn
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value='1'>
                                        Mở ứng tuyển
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value='2'>
                                        Đóng ứng tuyển
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </footer>
                </article>
            </div>
        </section>
    );
};

export default EditPostDetail;
