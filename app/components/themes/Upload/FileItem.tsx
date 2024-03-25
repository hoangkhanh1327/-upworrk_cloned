import { VscFilePdf, VscFileZip, VscFile } from 'react-icons/vsc';
import { CSSProperties, ReactNode } from 'react';

const BYTE = 1000;
const getKB = (bytes: number) => Math.round(bytes / BYTE);

const FileIcon = ({ children }: { children: ReactNode }) => {
    return <span className='text-4xl'>{children}</span>;
};

export interface FileItemProps {
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
    file: File;
}

const FileItem = (props: FileItemProps) => {
    const { file, children } = props;
    const { type, name, size } = file;

    const renderThumbnail = () => {
        const isImageFile = type.split('/')[0] === 'image';

        if (isImageFile) {
            return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    className='upload-file-image'
                    src={URL.createObjectURL(file)}
                    alt={`file preview ${name}`}
                />
            );
        }

        if (type === 'application/zip') {
            return (
                <FileIcon>
                    <VscFileZip />
                </FileIcon>
            );
        }

        if (type === 'application/pdf') {
            return (
                <FileIcon>
                    <VscFilePdf />
                </FileIcon>
            );
        }

        return (
            <FileIcon>
                <VscFile />
            </FileIcon>
        );
    };

    return (
        <div className='upload-file'>
            <div className='flex'>
                <div className='upload-file-thumbnail'>
                    {
                        <FileIcon>
                            <VscFile />
                        </FileIcon>
                    }
                </div>
                <div className='upload-file-info'>
                    <h6 className='upload-file-name'>{name}</h6>
                    <span className='upload-file-size'>{getKB(size)} kb</span>
                </div>
            </div>
            {children}
        </div>
    );
};

FileItem.displayName = 'UploadFileItem';

export default FileItem;
