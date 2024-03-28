import { Button } from '@/app/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { useContext, useRef } from 'react';
import { useToast } from '@/app/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { EditPostContext } from '../context/EditPostContext';
import { clientServices } from '@/app/services/client.services';
import { Input } from '@/app/components/ui/input';

const UpdatePostTitleDialog = () => {
    const { onCloseModal, post, handleGetPostDetail } =
        useContext(EditPostContext);
    const { toast } = useToast();
    const titleRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async () => {
        if (!post) return;
        try {
            const res = await clientServices.updatePost({
                id: post.id,
                title: titleRef.current?.value || post.title || '',
            });
            if (res.data) {
                toast({
                    title: 'Cập nhật thành công',
                    description: 'Thông tin tài khoản đã được cập nhật',
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                    ),
                    duration: 1000,
                });
                handleGetPostDetail?.(post.id?.toString());
                onCloseModal?.();
            }
        } catch (error) {
            console.log('error', error);
            toast({
                title: 'Đã có lỗi xảy ra',
                description: (error as Error)?.message,
                variant: 'destructive',
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
            });
        }
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin bài viết</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right'>Tiêu đề công việc</Label>
                        <Input
                            className='col-span-3'
                            ref={titleRef}
                            defaultValue={post?.title}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type='button' onClick={() => onCloseModal?.()}>
                        Đóng
                    </Button>
                    <Button type='submit' onClick={() => handleSubmit()}>
                        Cập nhật
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdatePostTitleDialog;
