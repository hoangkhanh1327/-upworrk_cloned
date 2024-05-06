import { Button } from '@/app/components/ui/button';
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Applied } from '@/app/types/client.types';
import { Dialog } from '@radix-ui/react-dialog';
import { FileIcon } from 'lucide-react';
import Link from 'next/link';
import { VscFile } from 'react-icons/vsc';

interface IAppliedInfoDialog {
    info: Applied;
    onClose: () => void;
}

const AppliedInfoDialog: React.FC<IAppliedInfoDialog> = ({ info, onClose }) => {
    return (
        <Dialog open={true} onOpenChange={() => onClose()}>
            <DialogContent className='max-w-[60%]'>
                <DialogHeader>
                    <DialogTitle>Thông tin ứng viên</DialogTitle>
                    <DialogDescription>
                        {`Tóm tắt thông tin về ứng viên.`}
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right'>Username</Label>
                        <div className='col-span-3'>{info.username}</div>
                        <Label className='my-3 text-right'>
                            Thư giới thiệu:{' '}
                        </Label>
                        <div className='col-span-3'>
                            <Textarea
                                defaultValue={info.cover_letter}
                                disabled
                            />
                        </div>
                        <Label className='my-3 text-right'>Proposal: </Label>
                        <div className='col-span-3'>${info?.proposal || 0}</div>
                        <Label className='my-3 text-right'>File đính kèm</Label>
                        <div className='flex items-center gap-x-3 pl-3'>
                            {info?.attachment_url && (
                                <Link
                                    href={info?.attachment_url}
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
                                                    {`${info?.username}`}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={() => onClose()}
                    >
                        Đóng
                    </Button>
                    <Button
                        asChild
                        variant='default'
                        className='text-white bg-primary-color hover:bg-primary-color'
                    >
                        <Link
                            // target="_blank"
                            href={`/client/show-freelancer-info/${info.freelancer_id}`}
                        >
                            Xem thông tin chi tiết
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AppliedInfoDialog;
