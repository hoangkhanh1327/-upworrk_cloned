import { useState } from 'react';
import { HiTrash } from 'react-icons/hi';

import Upload from '../Upload';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../../ui/tooltip';

interface SingleImageUploadProps {
    defaultImageSrc?: string | null;
    onDeleteImage?: () => void;
    onFileUpload?: (file: File) => void;
    validateOptions?: {
        allowedFileType?: string[];
        maxFileSize?: number;
        maxHeight?: number;
        maxWidth?: number;
    };
    link?: string;
    containerClass?: string;
    imageClass?: string;
    disabled?: boolean;
    showPlaceholder?: boolean;
}

const defaultValidateOptions = {
    allowedFileType: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSize: 500000,
};

function checkImageSize(image: HTMLImageElement) {
    let width = 0,
        height = 0;
    return new Promise<{ width: number; height: number }>((resolve) => {
        image.onload = function () {
            width = image.naturalWidth;
            height = image.naturalHeight;
            resolve({
                width,
                height,
            });
        };
    });
}

const SingleImageUpload = (props: SingleImageUploadProps) => {
    const {
        defaultImageSrc,
        onDeleteImage,
        onFileUpload,
        validateOptions,
        containerClass,
        imageClass,
        disabled = false,
        showPlaceholder = true,
        link,
    } = props;
    const [image, setImage] = useState<File | string>(
        defaultImageSrc as string
    );

    const validateOpt = {
        ...defaultValidateOptions,
        ...validateOptions,
    };
    const imageSrc = image instanceof File ? URL.createObjectURL(image) : image;

    const onImageDelete = () => {
        setImage('');
        onDeleteImage?.();
    };

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true;

        const allowedFileType = validateOpt.allowedFileType || [];
        const maxFileSize = validateOpt.maxFileSize || 0;

        if (file) {
            const cur = file[0];
            if (!allowedFileType.includes(cur.type)) {
                valid =
                    'Vui lòng chọn hình có định dạng .jpeg hoặc .png hoặc .webp !';
            }

            if (cur.size >= maxFileSize) {
                valid = `Dụng lượng hình không quá ${maxFileSize / 1000}kb!`;
            }
        }
        return valid;
    };
    const onUpload = async (files: File[]) => {
        if (files.length > 0) {
            let valid: boolean | string = true;
            const maxWidth = validateOptions?.maxWidth;
            const maxHeight = validateOptions?.maxHeight;
            const currFile = files[0];
            const image = document.createElement('img');
            image.src = URL.createObjectURL(currFile);
            if (currFile) {
                await checkImageSize(image).then(({ width, height }) => {
                    if (maxWidth || maxHeight) {
                        if (maxWidth && maxWidth !== width) {
                            valid = `Vui lòng chọn hình ảnh có kích thước ngang bằng ${maxWidth}`;
                            return;
                        }
                        if (maxHeight && maxHeight !== height) {
                            valid = `Vui lòng chọn hình ảnh có kích thước dọc bằng ${maxHeight}`;
                            return;
                        }
                    }
                });
                if (typeof valid === 'boolean' && valid) {
                    setImage(files[0]);
                    onFileUpload && onFileUpload(files[0]);
                } else {
                    console.log('valid', valid);
                }
            }
        }
    };

    if (imageSrc) {
        return (
            <div className='grid grid-cols-1'>
                <div
                    className={cn(
                        'group relative rounded flex w-full h-full',
                        imageClass
                    )}
                >
                    <div className='w-full h-[185px] relative'>
                        <Image
                            className='rounded w-full object-cover'
                            src={imageSrc}
                            alt={''}
                            fill
                        />
                    </div>

                    {disabled ? null : (
                        <div className='absolute top-0 left-0 w-full h-full bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span
                                            className='text-gray-100 hover:text-rose-300 cursor-pointer p-1.5'
                                            onClick={onImageDelete}
                                        >
                                            <HiTrash />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Xoá ảnh hiện tại</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Upload
            draggable
            beforeUpload={beforeUpload}
            multiple={false}
            showList={false}
            disabled={disabled}
            onChange={(files) => onUpload(files)}
        >
            <div className={cn('my-2 text-center', containerClass)}>
                <Image
                    alt=''
                    width={120}
                    height={120}
                    className='mx-auto'
                    src='/images/others/upload.png'
                />
                {showPlaceholder && (
                    <>
                        <p className='font-semibold'>
                            <span className='text-blue-500'>
                                Chọn ảnh từ máy tính
                            </span>
                        </p>
                        <p className='mt-1 opacity-60 dark:text-white'>
                            Hỗ trợ: jpeg, png, webp
                        </p>
                    </>
                )}
            </div>
        </Upload>
    );
};

export default SingleImageUpload;
