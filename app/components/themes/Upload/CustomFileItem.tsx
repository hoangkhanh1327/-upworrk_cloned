import { CSSProperties, ReactNode } from 'react'

export interface FileItemProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
    file: File
}

const FileItem = (props: FileItemProps) => {
    const { file, children } = props
    const { name } = file
    const handleTruncate = (str: string, n: number) => {
        if (str.length <= n) return str
        else return str.slice(0, n - 10) + '...' + str.slice(-10)
    }

    return (
        <div className="upload-file !m-0 !border-none">
            <div className="flex">
                <div className="upload-file-info !min-h-0">
                    <h6 className="upload-file-name">
                        {handleTruncate(name, 20)}
                    </h6>
                </div>
            </div>
            {children}
        </div>
    )
}

FileItem.displayName = 'UploadFileItem'

export default FileItem
