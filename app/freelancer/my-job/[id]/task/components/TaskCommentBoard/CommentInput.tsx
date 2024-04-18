import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { File, Send } from 'lucide-react';
import React, { useRef } from 'react';

interface DataSubmit {
    content: string | File;
    type: 'text' | 'file';
}

interface ICommentInput {
    onSubmit: (data: DataSubmit) => void;
    loading: boolean;
}

const CommentInput: React.FC<ICommentInput> = ({ onSubmit, loading }) => {
    const commentText = useRef<any>(null);
    return (
        <div className='px-4 inset-x-0 absolute bottom-2 flex gap-x-3 items-center'>
            <Input
                disabled={loading}
                ref={commentText}
                placeholder='Nhập nội dung comment...'
                className='!h-7'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit({
                            type: 'text',
                            content: commentText.current?.value || '',
                        });
                        commentText.current.value = '';
                    }
                }}
            />
            <Input
                hidden
                disabled={loading}
                className='hidden'
                type='file'
                id='comment-file'
                multiple={false}
                onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.target.files) {
                        onSubmit({
                            type: 'file',
                            content: e?.target?.files[0],
                        });
                        commentText.current.value = '';
                    }
                }}
            />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Label htmlFor='comment-file'>
                            <File
                                className={cn('', loading ? 'opacity-40' : '')}
                            />
                        </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Gửi file</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Send
                            className={cn('', loading ? 'opacity-40' : '')}
                            onClick={() => {
                                !loading &&
                                    onSubmit({
                                        type: 'text',
                                        content:
                                            commentText.current?.value || '',
                                    });
                                commentText.current.value = '';
                            }}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Gửi comment</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default CommentInput;
