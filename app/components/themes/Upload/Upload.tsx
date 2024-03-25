import { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import FileItem from './FileItem';
import type { ReactNode, ChangeEvent, MouseEvent, CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';
import { X, XCircle } from 'lucide-react';
import CloseButton from '../CloseButton';

export interface UploadProps {
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
    accept?: string;
    beforeUpload?: (
        file: FileList | null,
        fileList: File[]
    ) => boolean | string;
    disabled?: boolean;
    draggable?: boolean;
    fileList?: File[];
    multiple?: boolean;
    onChange?: (file: File[], fileList: File[]) => void;
    onFileRemove?: (file: File[]) => void;
    showList?: boolean;
    tip?: string | ReactNode;
    uploadLimit?: number;
    field?: any;
}

const filesToArray = (files: File[]) =>
    Object.keys(files).map((key) => files[key as any]);

const Upload = forwardRef<HTMLDivElement, UploadProps>((props, ref) => {
    const {
        accept,
        beforeUpload,
        disabled = false,
        draggable = false,
        fileList = [],
        multiple,
        onChange,
        onFileRemove,
        showList = true,
        tip,
        uploadLimit,
        children,
        className,
        field,
        ...rest
    } = props;

    const fileInputField = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState(fileList);
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        if (JSON.stringify(files) !== JSON.stringify(fileList)) {
            // setFiles(fileList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileList]);

    const pushFile = (newFiles: FileList | null, file: File[]) => {
        if (newFiles) {
            for (const f of newFiles as any) {
                file.push(f);
            }
        }

        return file;
    };

    const addNewFiles = (newFiles: FileList | null) => {
        let file = cloneDeep(files);
        if (typeof uploadLimit === 'number' && uploadLimit !== 0) {
            if (Object.keys(file).length >= uploadLimit) {
                if (uploadLimit === 1) {
                    file.shift();
                    file = pushFile(newFiles, file);
                }

                return filesToArray({ ...file });
            }
        }
        file = pushFile(newFiles, file);
        return filesToArray({ ...file });
    };

    const onNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const { files: newFiles } = e.target;
        let result: boolean | string = true;

        if (beforeUpload) {
            result = beforeUpload(newFiles, files);

            if (result === false) {
                return;
            }

            if (typeof result === 'string' && result.length > 0) {
                return;
            }
        }

        if (result) {
            const updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            onChange?.(updatedFiles, files);
        }
    };

    const removeFile = (fileIndex: number) => {
        const deletedFileList = files.filter((_, index) => index !== fileIndex);
        setFiles(deletedFileList);
        onFileRemove?.(deletedFileList);
    };

    const triggerUpload = (e: MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            fileInputField.current?.click();
        }
        e.stopPropagation();
    };

    const renderChildren = () => {
        if (!draggable && !children) {
            return (
                <Button disabled={disabled} onClick={(e) => e.preventDefault()}>
                    Upload
                </Button>
            );
        }

        if (draggable && !children) {
            return <span>Choose a file or drag and drop here</span>;
        }

        return children;
    };

    const handleDragLeave = useCallback(() => {
        if (draggable) {
            setDragOver(false);
        }
    }, [draggable]);

    const handleDragOver = useCallback(() => {
        if (draggable && !disabled) {
            setDragOver(true);
        }
    }, [draggable, disabled]);

    const handleDrop = useCallback(() => {
        if (draggable) {
            setDragOver(false);
        }
    }, [draggable]);

    const draggableProp = {
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
    };

    const draggableEventFeedbackClass = ``;

    const uploadClass = cn(
        'upload',
        draggable && `upload-draggable`,
        draggable && !disabled && `hover:${draggableEventFeedbackClass}`,
        draggable && disabled && 'disabled',
        dragOver && draggableEventFeedbackClass,
        className
    );

    const uploadInputClass = cn('upload-input', draggable && `draggable`);

    return (
        <>
            {disabled ? null : (
                <div
                    ref={ref}
                    className={uploadClass}
                    {...(draggable
                        ? draggableProp
                        : { onClick: triggerUpload })}
                    {...rest}
                >
                    <input
                        ref={fileInputField}
                        className={uploadInputClass}
                        type='file'
                        disabled={disabled}
                        multiple={multiple}
                        accept={accept}
                        title=''
                        value=''
                        onChange={onNewFileUpload}
                        {...field}
                        {...rest}
                    ></input>
                    {renderChildren()}
                </div>
            )}

            {tip}
            {showList && (
                <div className='upload-file-list'>
                    {files.map((file, index) => (
                        <FileItem key={file.name + index} file={file}>
                            <span className='text-black'>
                                <CloseButton
                                    className='upload-file-remove'
                                    onClick={() => removeFile(index)}
                                />
                            </span>
                        </FileItem>
                    ))}
                </div>
            )}
        </>
    );
});

Upload.displayName = 'Upload';

export default Upload;
