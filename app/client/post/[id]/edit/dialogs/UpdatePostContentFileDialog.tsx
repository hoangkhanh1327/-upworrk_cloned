import { Button } from '@/app/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { useContext, useState } from 'react';
import { useToast } from '@/app/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { EditPostContext } from '../context/EditPostContext';
import { clientServices } from '@/app/services/client.services';
import Upload from '@/app/components/themes/Upload';

const UpdatePostContentFileDialog = () => {
    const { onCloseModal, post, handleGetPostDetail } =
        useContext(EditPostContext);
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async () => {
        if (!post || !file) return;
        try {
            const res = await clientServices.updatePost({
                id: post.id,
                content_file: file,
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
        <Dialog open={true} onOpenChange={() => onCloseModal?.()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin bài viết</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right'>File nội dung công việc</Label>
                        <div className='col-span-3'>
                            <Upload
                                className='h-[66px]'
                                multiple={false}
                                disabled={file ? true : false}
                                showList={true}
                                fileList={file ? [file as File] : []}
                                draggable={true}
                                onChange={(file) => {
                                    setFile(file[0]);
                                }}
                                onFileRemove={() => {
                                    setFile(null);
                                }}
                            />
                        </div>
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

export default UpdatePostContentFileDialog;
